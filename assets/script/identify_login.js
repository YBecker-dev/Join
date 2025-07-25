function checkAuth() {
  const user = localStorage.getItem('announcedUser');
  if (!user) {
    window.location.href = '/index.html';
  }
}
checkAuth();

let logoutTimer;
function resetLogoutTimer() {
  clearTimeout(logoutTimer);
  logoutTimer = setTimeout(() => {
    localStorage.removeItem('announcedUser');
    window.location.href = '/index.html';
  }, 10 * 60 * 1000);
}
['click', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach(evt => {
  window.addEventListener(evt, resetLogoutTimer);
});
resetLogoutTimer();