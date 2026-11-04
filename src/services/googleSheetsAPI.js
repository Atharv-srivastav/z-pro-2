/**
 * GOOGLE APPS SCRIPT API SERVICE
 * Connects frontend forms and Admin Dashboard to Google Sheets backend.
 * Includes local storage fallback for standalone evaluation and offline testing.
 */

const LOCAL_STORAGE_RESPONSES_KEY = 'zeravia_contact_responses';
const CUSTOM_API_URL_KEY = 'zeravia_gas_api_url';

// Default endpoint from environment or user override
export function getApiUrl() {
  return (
    localStorage.getItem(CUSTOM_API_URL_KEY) ||
    import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL ||
    ''
  );
}

export function setCustomApiUrl(url) {
  if (!url) {
    localStorage.removeItem(CUSTOM_API_URL_KEY);
  } else {
    localStorage.setItem(CUSTOM_API_URL_KEY, url.trim());
  }
}

/**
 * Submit Contact Form
 */
export async function submitContact(formData) {
  const apiUrl = getApiUrl();
  const timestamp = new Date().toISOString();
  const submission = {
    ...formData,
    id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    timestamp
  };

  // If Google Apps Script URL is set, dispatch to server
  if (apiUrl) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        // Text/plain prevents CORS preflight OPTIONS rejection on Google Apps Script
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'submitContact',
          ...submission
        }),
        redirect: 'follow'
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Server rejected submission');
      }

      // Also mirror to localStorage for offline cache
      saveToLocalMock(submission);
      return { success: true, id: result.id || submission.id, serverSaved: true };
    } catch (networkError) {
      console.warn('Apps Script submission error. Falling back to local storage:', networkError);
      // Fallback save to localStorage
      saveToLocalMock(submission);
      return {
        success: true,
        id: submission.id,
        serverSaved: false,
        warning: 'Saved to local mock database (Google Apps Script API offline or unconfigured).'
      };
    }
  }

  // Pure Local Mock Storage implementation (Part 2 requirement)
  saveToLocalMock(submission);
  return {
    success: true,
    id: submission.id,
    serverSaved: false,
    warning: 'Saved to local mock storage. Configure Google Apps Script URL to push to Google Sheets.'
  };
}

/**
 * Admin Login Verification
 */
export async function adminLogin(email, password) {
  const apiUrl = getApiUrl();

  if (apiUrl) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'adminLogin',
          email,
          password
        }),
        redirect: 'follow'
      });

      const result = await response.json();
      if (result.success && result.token) {
        return { success: true, token: result.token, user: result.user };
      }
      return { success: false, error: result.error || 'Invalid credentials' };
    } catch (err) {
      console.warn('Remote authentication unreachable. Checking local admin fallback:', err);
    }
  }

  // Fallback demo admin authentication (for local evaluation when Apps Script is not deployed yet)
  // Default credentials: admin@zeravia.com / Admin@123456
  if (email.trim().toLowerCase() === 'admin@zeravia.com' && password === 'Admin@123456') {
    const localToken = 'mock_token_' + Date.now();
    return {
      success: true,
      token: localToken,
      user: { email: 'admin@zeravia.com', role: 'Demo Administrator (Local)' },
      isLocal: true
    };
  }

  return { success: false, error: 'Invalid admin email or password.' };
}

/**
 * Retrieve Stored Contact Form Responses
 */
export async function getResponses(token) {
  const apiUrl = getApiUrl();

  if (apiUrl) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'getResponses',
          token
        }),
        redirect: 'follow'
      });

      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        return { success: true, data: result.data, count: result.count || result.data.length };
      }
      if (!result.success) {
        return { success: false, error: result.error || 'Failed to fetch responses' };
      }
    } catch (err) {
      console.warn('Unable to load from remote Google Sheet. Reading local mock database:', err);
    }
  }

  // Fallback to local storage
  const localList = getFromLocalMock();
  return {
    success: true,
    data: localList,
    count: localList.length,
    isLocal: true
  };
}

/**
 * Delete a Response
 */
export async function deleteResponse(id, token) {
  const apiUrl = getApiUrl();

  if (apiUrl) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'deleteResponse',
          id,
          token
        }),
        redirect: 'follow'
      });

      const result = await response.json();
      if (result.success) {
        deleteFromLocalMock(id);
        return { success: true };
      }
      return { success: false, error: result.error || 'Failed to delete response' };
    } catch (err) {
      console.warn('Remote deletion failed. Performing local deletion:', err);
    }
  }

  // Local fallback deletion
  deleteFromLocalMock(id);
  return { success: true, isLocal: true };
}

/* ===================================================================
   LOCAL STORAGE MOCK DATABASE HELPERS (Part 2 Testing & Offline Fallback)
   =================================================================== */

export function getFromLocalMock() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_RESPONSES_KEY);
    if (!raw) {
      // Seed with sample responses if empty for initial test
      const seed = [
        {
          id: 'seed-01',
          name: 'Sarah Connor',
          email: 'sarah.c@techcorp.io',
          phone: '+1 (555) 234-5678',
          subject: 'Senior Full-Stack Developer Opportunity',
          message: 'Hello Alex, loved your portfolio architecture! We have an opening for a Lead Software Architect and would love to chat.',
          timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
        },
        {
          id: 'seed-02',
          name: 'David Kim',
          email: 'david@venturelabs.com',
          phone: '+1 (555) 876-5432',
          subject: 'React Native & Cloud Consulting Inquiry',
          message: 'Hi Alex, looking for technical consulting on an upcoming fintech MVP. Can you share your current availability?',
          timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
        }
      ];
      localStorage.setItem(LOCAL_STORAGE_RESPONSES_KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading localStorage responses:', e);
    return [];
  }
}

function saveToLocalMock(item) {
  try {
    const existing = getFromLocalMock();
    const updated = [item, ...existing];
    localStorage.setItem(LOCAL_STORAGE_RESPONSES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
}

function deleteFromLocalMock(id) {
  try {
    const existing = getFromLocalMock();
    const updated = existing.filter(item => item.id !== id);
    localStorage.setItem(LOCAL_STORAGE_RESPONSES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error deleting from localStorage:', e);
  }
}
