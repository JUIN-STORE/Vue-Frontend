function saveEmailToCookie(value) {
  document.cookie = `email=${value}`;
}

function saveAccessTokenAtCookie(value) {
  document.cookie = `Access-Token=${value}`;
}

function saveRefreshTokenAtCookie(value) {
  document.cookie = `Refresh-Token=${value}`;
}

function getEmailFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)email\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function getAuthFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)Access-Token\s*=\s*([^;]*).*$)|^.*$/,
    '$2',
  );
}

function getRefreshTokenFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)Refresh-Token\s*=\s*([^;]*).*$)|^.*$/,
    '$3',
  );
}

function deleteCookie(value) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export {
  saveRefreshTokenAtCookie,
  saveAccessTokenAtCookie,
  saveEmailToCookie,
  getEmailFromCookie,
  getAuthFromCookie,
  getRefreshTokenFromCookie,
  deleteCookie,
};
