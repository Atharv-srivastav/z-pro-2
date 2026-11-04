/**
 * GOOGLE APPS SCRIPT BACKEND FOR PORTFOLIO CONTACT MANAGER & ADMIN DASHBOARD
 * 
 * Features:
 * - doGet(e) and doPost(e) action-based routing
 * - Form validation (server-side)
 * - Formula injection protection (CSV/Spreadsheet Injection mitigation)
 * - Admin authentication and session token verification
 * - Dynamic CRUD (submitContact, getResponses, deleteResponse)
 * - CORS-compliant JSON responses
 */

// Configuration constants
var SHEET_NAME = 'Contacts';
var HEADERS = ['ID', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Timestamp'];

// Default admin credentials (Can be overridden in File > Project Properties > Script Properties)
var DEFAULT_ADMIN_USER = 'atharvsrivastava8197@gmail.com';
var DEFAULT_ADMIN_PASS = 'Admin@123456';

/**
 * Handle HTTP GET Requests
 */
function doGet(e) {
  try {
    var params = e && e.parameter ? e.parameter : {};
    var action = params.action || 'ping';

    if (action === 'ping') {
      return createJsonResponse({
        success: true,
        message: 'Google Apps Script API is active and running',
        timestamp: new Date().toISOString()
      });
    }

    if (action === 'getResponses') {
      return handleGetResponses(params);
    }

    return createJsonResponse({
      success: false,
      error: 'Invalid GET action: ' + action
    });
  } catch (error) {
    return createJsonResponse({
      success: false,
      error: error.message || 'Server error processing GET request'
    });
  }
}

/**
 * Handle HTTP POST Requests
 */
function doPost(e) {
  try {
    var payload = {};

    // Parse incoming payload from JSON or post data
    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        // Fallback to URL-encoded parameters if not JSON
        payload = e.parameter || {};
      }
    } else if (e && e.parameter) {
      payload = e.parameter;
    }

    var action = payload.action;

    if (!action) {
      return createJsonResponse({
        success: false,
        error: 'Missing required field: action'
      });
    }

    switch (action) {
      case 'submitContact':
        return handleSubmitContact(payload);

      case 'adminLogin':
        return handleAdminLogin(payload);

      case 'getResponses':
        return handleGetResponses(payload);

      case 'deleteResponse':
        return handleDeleteResponse(payload);

      default:
        return createJsonResponse({
          success: false,
          error: 'Unrecognized action: ' + action
        });
    }
  } catch (error) {
    return createJsonResponse({
      success: false,
      error: error.message || 'Server error processing POST request'
    });
  }
}

/**
 * Submit Contact Form Entry
 */
function handleSubmitContact(data) {
  // 1. Server-side validation
  var name = (data.name || '').trim();
  var email = (data.email || '').trim();
  var phone = (data.phone || '').trim();
  var subject = (data.subject || '').trim();
  var message = (data.message || '').trim();

  if (!name || !email || !subject || !message) {
    return createJsonResponse({
      success: false,
      error: 'Validation failed: Name, Email, Subject, and Message are required fields.'
    });
  }

  // Email format validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return createJsonResponse({
      success: false,
      error: 'Validation failed: Invalid email address format.'
    });
  }

  // 2. Prevent formula injection (sanitize values starting with =, +, -, @)
  name = sanitizeForSpreadsheet(name);
  email = sanitizeForSpreadsheet(email);
  phone = sanitizeForSpreadsheet(phone);
  subject = sanitizeForSpreadsheet(subject);
  message = sanitizeForSpreadsheet(message);

  var sheet = getOrCreateSheet();
  var id = Utilities.getUuid();
  var timestamp = new Date().toISOString();

  // Append new row: [ID, Name, Email, Phone, Subject, Message, Timestamp]
  sheet.appendRow([id, name, email, phone, subject, message, timestamp]);

  return createJsonResponse({
    success: true,
    message: 'Contact form submitted successfully.',
    id: id,
    timestamp: timestamp
  });
}

/**
 * Authenticate Admin User & Generate Session Token
 */
function handleAdminLogin(data) {
  var email = (data.email || '').trim().toLowerCase();
  var password = (data.password || '').trim();

  if (!email || !password) {
    return createJsonResponse({
      success: false,
      error: 'Email and password are required.'
    });
  }

  var scriptProperties = PropertiesService.getScriptProperties();
  var configuredEmail = (scriptProperties.getProperty('ADMIN_EMAIL') || DEFAULT_ADMIN_USER).toLowerCase();
  var configuredPass = scriptProperties.getProperty('ADMIN_PASSWORD') || DEFAULT_ADMIN_PASS;

  if (email === configuredEmail && password === configuredPass) {
    var sessionToken = 'tok_' + Utilities.getUuid() + '_' + Date.now();
    
    // Store active token with 24-hour expiration
    scriptProperties.setProperty('ACTIVE_TOKEN', sessionToken);
    scriptProperties.setProperty('TOKEN_EXPIRY', (Date.now() + 24 * 60 * 60 * 1000).toString());

    return createJsonResponse({
      success: true,
      message: 'Admin authentication successful.',
      token: sessionToken,
      user: {
        email: configuredEmail,
        role: 'Administrator'
      }
    });
  }

  return createJsonResponse({
    success: false,
    error: 'Invalid email or password credentials.'
  });
}

/**
 * Retrieve Stored Contact Form Responses (Admin Only)
 */
function handleGetResponses(data) {
  if (!isAuthorized(data.token)) {
    return createJsonResponse({
      success: false,
      error: 'Unauthorized: Valid admin session token required.'
    });
  }

  var sheet = getOrCreateSheet();
  var lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    // Only header exists or sheet is empty
    return createJsonResponse({
      success: true,
      data: [],
      count: 0
    });
  }

  var values = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
  var responses = [];

  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    responses.push({
      id: String(row[0] || ''),
      name: desanitizeFromSpreadsheet(String(row[1] || '')),
      email: desanitizeFromSpreadsheet(String(row[2] || '')),
      phone: desanitizeFromSpreadsheet(String(row[3] || '')),
      subject: desanitizeFromSpreadsheet(String(row[4] || '')),
      message: desanitizeFromSpreadsheet(String(row[5] || '')),
      timestamp: String(row[6] || '')
    });
  }

  // Sort descending by timestamp
  responses.reverse();

  return createJsonResponse({
    success: true,
    data: responses,
    count: responses.length
  });
}

/**
 * Delete Contact Response by ID (Admin Only)
 */
function handleDeleteResponse(data) {
  if (!isAuthorized(data.token)) {
    return createJsonResponse({
      success: false,
      error: 'Unauthorized: Valid admin session token required.'
    });
  }

  var idToDelete = (data.id || '').trim();
  if (!idToDelete) {
    return createJsonResponse({
      success: false,
      error: 'Response ID is required to delete.'
    });
  }

  var sheet = getOrCreateSheet();
  var lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    return createJsonResponse({
      success: false,
      error: 'No responses found in spreadsheet.'
    });
  }

  var ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  var foundRow = -1;

  for (var i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === idToDelete) {
      foundRow = i + 2; // +2 for 1-based index and header offset
      break;
    }
  }

  if (foundRow === -1) {
    return createJsonResponse({
      success: false,
      error: 'Response not found with ID: ' + idToDelete
    });
  }

  sheet.deleteRow(foundRow);

  return createJsonResponse({
    success: true,
    message: 'Response deleted successfully.',
    id: idToDelete
  });
}

/**
 * Verify whether session token is valid and unexpired
 */
function isAuthorized(token) {
  if (!token) return false;

  var scriptProperties = PropertiesService.getScriptProperties();
  var activeToken = scriptProperties.getProperty('ACTIVE_TOKEN');
  var tokenExpiry = parseInt(scriptProperties.getProperty('TOKEN_EXPIRY') || '0', 10);

  if (!activeToken || activeToken !== token) {
    return false;
  }

  if (Date.now() > tokenExpiry) {
    return false;
  }

  return true;
}

/**
 * Sanitize strings to prevent Spreadsheet Formula Injection
 */
function sanitizeForSpreadsheet(val) {
  if (!val) return '';
  var firstChar = val.charAt(0);
  if (firstChar === '=' || firstChar === '+' || firstChar === '-' || firstChar === '@') {
    return "'" + val;
  }
  return val;
}

function desanitizeFromSpreadsheet(val) {
  if (val && val.charAt(0) === "'") {
    return val.substring(1);
  }
  return val;
}

/**
 * Get or initialize the spreadsheet sheet with headers
 */
function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    // Format headers with bold and background color
    sheet.getRange(1, 1, 1, HEADERS.length)
         .setFontWeight('bold')
         .setBackground('#3b82f6')
         .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

/**
 * Helper to return standard JSON Output with CORS
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

