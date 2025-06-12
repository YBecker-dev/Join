function init() {
  const logo = document.getElementById('start-logo');
  const headerLogo = document.querySelector('.main-header-logo');
  logo.classList.remove('preload');

  if (!sessionStorage.getItem('logoAnimated')) {
    logo.classList.add('logo-zoom');
    setTimeout(() => {
      logo.classList.remove('logo-zoom');
      headerLogo.classList.add('fade-out');
      sessionStorage.setItem('logoAnimated', 'true');
    }, 900);
  } else {
    logo.classList.remove('logo-zoom');
    headerLogo.classList.add('fade-out');
  }
}