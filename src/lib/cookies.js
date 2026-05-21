/**
 * Set a cookie with name, value, and expiration in days
 * @param {string} name - Name of the cookie
 * @param {string} value - Value of the cookie
 * @param {number} [days=365] - Expiration in days
 */
export function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const secure = window.location.protocol === 'https:' ? 'Secure;' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax; ${secure}`;
}

/**
 * Get a cookie value by name
 * @param {string} name - Name of the cookie
 * @returns {string} - Decoded value of the cookie or empty string
 */
export function getCookie(name) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
}

/**
 * Delete a cookie by name
 * @param {string} name - Name of the cookie
 */
export function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax;`;
}

/**
 * Get the current consent settings object
 * @returns {object|null} - Consent object or null if not yet set
 */
export function getConsent() {
  const consentCookie = getCookie('mso_cookie_consent');
  if (!consentCookie) return null;
  try {
    return JSON.parse(consentCookie);
  } catch (e) {
    return null;
  }
}

/**
 * Set the current consent settings and trigger updates (such as cleanup if revoked)
 * @param {object} consentObj - Consent object e.g. { necessary: true, analytics: false, preferences: false }
 */
export function setConsent(consentObj) {
  setCookie('mso_cookie_consent', JSON.stringify(consentObj), 365);
  
  // Clean up cookies if consent is revoked
  if (!consentObj.analytics) {
    deleteCookie('mso_visitor_session');
    // Clear analytical local storage fallbacks as well
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mso_visitor_sessions');
    }
  }

  // Dispatch custom event to notify listeners (e.g., visitor tracker)
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('mso_cookie_consent_updated', { detail: consentObj }));
  }
}
