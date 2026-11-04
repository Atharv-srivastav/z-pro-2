import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Search, 
  Trash2, 
  RefreshCw, 
  LogOut, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Database, 
  Settings, 
  ArrowLeft,
  FileSpreadsheet
} from 'lucide-react';
import { 
  adminLogin, 
  getResponses, 
  deleteResponse, 
  getApiUrl, 
  setCustomApiUrl 
} from '../services/googleSheetsAPI';

const SESSION_TOKEN_KEY = 'zeravia_admin_session_token';
const SESSION_USER_KEY = 'zeravia_admin_session_user';

export default function AdminDashboard({ setActiveView }) {
  // Authentication State
  const [sessionToken, setSessionToken] = useState(() => sessionStorage.getItem(SESSION_TOKEN_KEY) || '');
  const [adminUser, setAdminUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem(SESSION_USER_KEY)) || null;
    } catch {
      return null;
    }
  });

  // Login Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginErrors, setLoginErrors] = useState({});
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState(null);

  // Dashboard Data State
  const [responses, setResponses] = useState([]);
  const [loadingData, setLoadingLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // API Config Modal State
  const [showConfig, setShowConfig] = useState(false);
  const [customUrl, setCustomUrl] = useState(() => getApiUrl());
  const [configSuccess, setConfigSuccess] = useState(false);

  // Load responses when authenticated
  useEffect(() => {
    if (sessionToken) {
      loadResponses(sessionToken);
    }
  }, [sessionToken]);

  const loadResponses = async (token) => {
    setLoadingLoading(true);
    setFetchError(null);
    try {
      const result = await getResponses(token);
      if (result.success && Array.isArray(result.data)) {
        setResponses(result.data);
      } else {
        setFetchError(result.error || 'Failed to retrieve responses.');
      }
    } catch (err) {
      setFetchError('Network error connecting to responses database.');
    } finally {
      setLoadingLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginMessage(null);
    const errs = {};

    if (!email.trim()) {
      errs.email = 'Email address is required.';
    }
    if (!password.trim()) {
      errs.password = 'Password is required.';
    }

    if (Object.keys(errs).length > 0) {
      setLoginErrors(errs);
      return;
    }

    setLoginLoading(true);
    try {
      const result = await adminLogin(email, password);

      if (result.success && result.token) {
        setSessionToken(result.token);
        setAdminUser(result.user);
        sessionStorage.setItem(SESSION_TOKEN_KEY, result.token);
        sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(result.user));
        setLoginMessage(null);
      } else {
        setLoginMessage({
          type: 'error',
          text: result.error || 'Invalid administrator credentials.'
        });
      }
    } catch (err) {
      setLoginMessage({
        type: 'error',
        text: 'Authentication server error. Please try again.'
      });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
    sessionStorage.removeItem(SESSION_USER_KEY);
    setSessionToken('');
    setAdminUser(null);
    setResponses([]);
    setEmail('');
    setPassword('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this response record? This action cannot be undone.')) {
      return;
    }

    setDeletingId(id);
    try {
      const result = await deleteResponse(id, sessionToken);
      if (result.success) {
        setResponses(prev => prev.filter(r => r.id !== id));
      } else {
        alert(result.error || 'Failed to delete response.');
      }
    } catch (err) {
      alert('Network error while attempting to delete.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSaveApiUrl = (e) => {
    e.preventDefault();
    setCustomApiUrl(customUrl);
    setConfigSuccess(true);
    setTimeout(() => {
      setConfigSuccess(false);
      setShowConfig(false);
      if (sessionToken) loadResponses(sessionToken);
    }, 1500);
  };

  // Filter responses
  const filteredResponses = responses.filter(r => {
    const q = searchTerm.toLowerCase();
    return (
      (r.name && r.name.toLowerCase().includes(q)) ||
      (r.email && r.email.toLowerCase().includes(q)) ||
      (r.subject && r.subject.toLowerCase().includes(q)) ||
      (r.message && r.message.toLowerCase().includes(q)) ||
      (r.phone && r.phone.toLowerCase().includes(q))
    );
  });

  return (
    <div style={{ paddingTop: 'calc(76px + var(--space-2xl))', paddingBottom: 'var(--space-3xl)', minHeight: '100vh' }}>
      <div className="container">
        {/* Navigation Bar Header */}
        <div style={{ marginBottom: 'var(--space-xl)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <button
            onClick={() => setActiveView('portfolio')}
            className="btn btn-outline"
            style={{ fontSize: '0.85rem', padding: '0.45rem 0.85rem' }}
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="btn btn-secondary"
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.85rem' }}
              title="Configure Google Apps Script API URL"
            >
              <Settings size={15} />
              <span>API Settings</span>
            </button>

            {sessionToken && (
              <button
                onClick={handleLogout}
                className="btn btn-outline"
                style={{ fontSize: '0.85rem', padding: '0.45rem 0.85rem', color: 'var(--color-danger)', borderColor: 'var(--color-danger-bg)' }}
              >
                <LogOut size={15} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>

        {/* API Configuration Panel */}
        {showConfig && (
          <div className="card animate-fade-in" style={{ marginBottom: 'var(--space-2xl)', border: '1px solid var(--color-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: 'var(--space-md)' }}>
              <Database size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Google Apps Script Endpoint Configuration</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
              Enter the Web App URL generated after deploying <code style={{ color: 'var(--color-primary)' }}>google-apps-script/Code.gs</code>.
              When configured, submissions and administrative actions connect directly to your live Google Sheet.
            </p>

            {configSuccess && (
              <div className="alert alert-success" style={{ padding: '0.65rem 1rem' }}>
                <CheckCircle2 size={16} />
                <span>Endpoint updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveApiUrl} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <input
                type="url"
                className="form-control"
                style={{ flex: 1, minWidth: '280px' }}
                placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Save & Connect
              </button>
              <button 
                type="button" 
                onClick={() => { setCustomUrl(''); setCustomApiUrl(''); setConfigSuccess(true); setTimeout(() => setConfigSuccess(false), 1200); }} 
                className="btn btn-secondary"
              >
                Use Local Mock Mode
              </button>
            </form>
          </div>
        )}

        {/* VIEW 1: ADMIN LOGIN FORM (When unauthenticated) */}
        {!sessionToken ? (
          <div style={{ maxWidth: '440px', margin: 'var(--space-3xl) auto 0 auto' }}>
            <div className="card animate-fade-in" style={{ padding: 'var(--space-2xl)' }}>
              <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
                <div 
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto var(--space-md) auto'
                  }}
                >
                  <ShieldCheck size={32} />
                </div>
                <h2 style={{ fontSize: '1.6rem', marginBottom: '0.35rem' }}>Admin Portal</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
                  Enter credentials to access stored responses
                </p>
              </div>

              {loginMessage && (
                <div className={`alert ${loginMessage.type === 'error' ? 'alert-danger' : 'alert-success'} animate-fade-in`}>
                  <AlertCircle size={18} />
                  <span style={{ fontSize: '0.875rem' }}>{loginMessage.text}</span>
                </div>
              )}

              {/* Demo Credentials Helper Pill */}
              <div 
                style={{
                  background: 'var(--bg-tertiary)',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 'var(--space-lg)',
                  fontSize: '0.825rem',
                  border: '1px solid var(--border-primary)'
                }}
              >
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                  Default Admin Credentials:
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  Email: <code style={{ color: 'var(--color-primary)' }}>admin@zeravia.com</code>
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  Password: <code style={{ color: 'var(--color-primary)' }}>Admin@123456</code>
                </div>
              </div>

              <form onSubmit={handleLogin} noValidate>
                {/* Email / Username */}
                <div className="form-group">
                  <label className="form-label" htmlFor="admin-email">
                    Admin Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="email"
                      id="admin-email"
                      className={`form-control ${loginErrors.email ? 'is-invalid' : ''}`}
                      placeholder="admin@zeravia.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (loginErrors.email) setLoginErrors(prev => ({ ...prev, email: '' }));
                      }}
                      disabled={loginLoading}
                    />
                  </div>
                  {loginErrors.email && <div className="form-error"><AlertCircle size={13} /> {loginErrors.email}</div>}
                </div>

                {/* Password with Show/Hide Toggle */}
                <div className="form-group">
                  <label className="form-label" htmlFor="admin-password">
                    Password
                  </label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="admin-password"
                      className={`form-control ${loginErrors.password ? 'is-invalid' : ''}`}
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (loginErrors.password) setLoginErrors(prev => ({ ...prev, password: '' }));
                      }}
                      style={{ paddingRight: '2.75rem' }}
                      disabled={loginLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '0.75rem',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {loginErrors.password && <div className="form-error"><AlertCircle size={13} /> {loginErrors.password}</div>}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: 'var(--space-sm)' }}
                  disabled={loginLoading}
                >
                  {loginLoading ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      <span>Login to Dashboard</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* VIEW 2: AUTHENTICATED RESPONSE DASHBOARD */
          <div className="animate-fade-in">
            {/* Dashboard Header Bar */}
            <div 
              className="card"
              style={{
                marginBottom: 'var(--space-2xl)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                padding: 'var(--space-lg) var(--space-xl)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Form Submissions Manager</h2>
                  <span className="badge badge-primary">
                    {responses.length} {responses.length === 1 ? 'Response' : 'Responses'}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Logged in as <strong style={{ color: 'var(--text-primary)' }}>{adminUser?.email || 'Administrator'}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  onClick={() => loadResponses(sessionToken)}
                  className="btn btn-secondary"
                  disabled={loadingData}
                  style={{ fontSize: '0.85rem', padding: '0.5rem 0.85rem' }}
                >
                  <RefreshCw size={15} className={loadingData ? 'animate-spin' : ''} />
                  <span>Refresh Data</span>
                </button>
              </div>
            </div>

            {/* Search and Filters Bar */}
            <div 
              className="dashboard-controls"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: 'var(--space-xl)'
              }}
            >
              <div className="dashboard-search" style={{ position: 'relative', width: '360px' }}>
                <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name, email, subject, keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ paddingLeft: '2.75rem' }}
                />
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Displaying {filteredResponses.length} filtered records
              </div>
            </div>

            {/* Error Banner */}
            {fetchError && (
              <div className="alert alert-danger" style={{ marginBottom: 'var(--space-xl)' }}>
                <AlertCircle size={18} />
                <span>{fetchError}</span>
              </div>
            )}

            {/* Responses List or Table */}
            {loadingData ? (
              <div className="card" style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
                <RefreshCw size={32} className="animate-spin" color="var(--color-primary)" style={{ margin: '0 auto var(--space-md) auto' }} />
                <h4>Loading Responses...</h4>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>Connecting to Google Sheets / Storage backend</p>
              </div>
            ) : filteredResponses.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                {filteredResponses.map(res => (
                  <article 
                    key={res.id} 
                    className="card"
                    style={{
                      borderLeft: '4px solid var(--color-primary)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                          {res.subject || 'No Subject Provided'}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{res.name}</span>
                          <span>•</span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                            <Mail size={13} color="var(--color-primary)" />
                            <a href={`mailto:${res.email}`}>{res.email}</a>
                          </span>
                          {res.phone && (
                            <>
                              <span>•</span>
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                                <Phone size={13} color="var(--color-primary)" />
                                {res.phone}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Clock size={13} />
                          {res.timestamp ? new Date(res.timestamp).toLocaleString() : 'N/A'}
                        </span>

                        <button
                          onClick={() => handleDelete(res.id)}
                          disabled={deletingId === res.id}
                          className="btn-icon"
                          style={{ color: 'var(--color-danger)' }}
                          title="Delete response"
                          aria-label="Delete response"
                        >
                          {deletingId === res.id ? (
                            <RefreshCw size={15} className="animate-spin" />
                          ) : (
                            <Trash2 size={15} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div 
                      style={{
                        padding: 'var(--space-md)',
                        background: 'var(--bg-tertiary)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.95rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      {res.message}
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      Record ID: {res.id}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: 'var(--space-3xl) var(--space-xl)' }}>
                <FileSpreadsheet size={48} color="var(--color-primary)" style={{ margin: '0 auto var(--space-md) auto' }} />
                <h4 style={{ marginBottom: '0.5rem' }}>No Submissions Found</h4>
                <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto', fontSize: '0.95rem' }}>
                  {searchTerm 
                    ? `No submissions match the search term "${searchTerm}".`
                    : 'The spreadsheet contains no recorded contact submissions yet. Fill out the Contact Me form on the portfolio to create your first entry!'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
