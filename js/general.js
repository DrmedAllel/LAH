const BOOTSTRAP_CSS_URL = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css';
const BOOTSTRAP_JS_URL = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
const CUSTOM_NAV_CSS_URL = '/css/bootstrap-custom.css';

function ensureStylesheet(href, referenceHref, position = 'after') {
  if (document.querySelector(`link[href="${href}"]`)) {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;

  const referenceLink = referenceHref ? document.querySelector(`link[href$="${referenceHref}"]`) : null;
  if (referenceLink?.parentNode) {
    if (position === 'before') {
      referenceLink.parentNode.insertBefore(link, referenceLink);
    } else {
      referenceLink.parentNode.insertBefore(link, referenceLink.nextSibling);
    }
    return;
  }

  document.head.appendChild(link);
}

function ensureScript(src) {
  if (document.querySelector(`script[src="${src}"]`)) {
    return;
  }

  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
}

ensureStylesheet(BOOTSTRAP_CSS_URL, 'css/general.css', 'before');
ensureStylesheet(CUSTOM_NAV_CSS_URL, 'css/general.css', 'after');
ensureScript(BOOTSTRAP_JS_URL);
ensureScript('https://kit.fontawesome.com/4fdca3d787.js');

function buildNavLink(href, label, extraClasses = '') {
  return `
        <li class="nav-item">
          <a class="nav-link px-lg-3 py-2 ${extraClasses}" href="${href}">${label}</a>
        </li>
  `;
}

function buildCartLink(href, label, extraClasses = '') {
  return `
        <li class="nav-item">
          <a class="nav-link px-lg-3 py-2 ${extraClasses}" href="${href}"><i class="fa-solid fa-cart-shopping"></i>  ${label}<p class="cart_count"></p></a>
        </li>
  `;
}

function buildNavDropdown(title, items) {
  const menuItems = items.map(item => `
            <li><a class="dropdown-item${item.active ? ' active' : ''}" href="${item.href}">${item.label}</a></li>
  `).join('');

  return `
        <li class="nav-item dropdown">
          <button class="nav-link dropdown-toggle px-lg-3 py-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            ${title}
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow-sm">
${menuItems}
          </ul>
        </li>
  `;
}

function buildLanguageDropdown(language) {
  const isGerman = language == 'de';

  return `
        <li class="nav-item dropdown">
          <button class="nav-link dropdown-toggle px-lg-3 py-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-language"></i>${isGerman ? ' Sprache' : ' Language'}
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow-sm">
            <li>
              <button class="dropdown-item${isGerman ? ' active' : ''}" type="button" onclick="setLanguage('de')">Deutsch</button>
            </li>
            <li>
              <button class="dropdown-item${!isGerman ? ' active' : ''}" type="button" onclick="setLanguage('en')">English</button>
            </li>
          </ul>
        </li>
  `;
}

function buildNavbar(language) {
  return `
    <nav class="navbar navbar-expand-lg navbar-light bg-body-white border border-1 shadow-sm px-3 py-2 site-navbar" data-bs-theme="light" aria-label="Hauptnavigation">
      <div class="container-fluid">
        <a class="navbar-brand site-navbar-brand me-lg-4" style="display: flex; align-items: center; gap: 1rem;" href="/index.html" title="${language === 'de' ? 'Startseite' : 'Homepage'}">
          <img src="../images/logo.png" alt="Logo" width="auto" height="70px" class="d-inline-block align-text-top">
          <div style="display: flex; flex-direction: column; line-height: 1.2;">
            <span id="navbar-brand-text">Luftfahrt-Archiv Hafner</span>
            <small style="font-size: 0.75rem;">${language === 'de' ? 'gegr. 1990' : 'est. 1990'}</small>
            <small style="font-size: 0.75rem;">Ludwigsburg, ${language === 'de' ? 'Deutschland' : 'Germany'}</small>
          </div>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">${language === 'de' ? 'Hauptnavigation' : 'Main Navigation'}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              ${buildNavDropdown(language === 'de' ? 'Flugzeuge' : 'Aircraft', [
                { href: '/Flugzeuge/arado.html', label: 'Arado' },
                { href: '/Flugzeuge/ago.html', label: 'AGO' },
                { href: '/Flugzeuge/blohm_voss.html', label: 'Blohm & Voss' },
                { href: '/Flugzeuge/bücker.html', label: 'Bücker' },
                { href: '/Flugzeuge/dfs.html', label: 'DFS' },
                { href: '/Flugzeuge/dornier.html', label: 'Dornier' },
                { href: '/Flugzeuge/erla.html', label: 'Erla' },
                { href: '/Flugzeuge/fieseler.html', label: 'Fieseler' },
                { href: '/Flugzeuge/focke-achgelis.html', label: 'Focke-Achgelis' },
                { href: '/Flugzeuge/focke_wulf.html', label: 'Focke Wulf' },
                { href: '/Flugzeuge/gotha.html', label: 'Gotha' },
                { href: '/Flugzeuge/heinkel.html', label: 'Heinkel' },
                { href: '/Flugzeuge/henschel.html', label: 'Henschel' },
                { href: '/Flugzeuge/junkers.html', label: 'Junkers' },
                { href: '/Flugzeuge/klemm.html', label: 'Klemm' },
                { href: '/Flugzeuge/messerschmitt.html', label: 'Messerschmitt' },
                { href: '/Flugzeuge/segelflugzeuge.html', label: language === 'de' ? 'Segelflugzeuge' : 'Gliders' },
                { href: '/Flugzeuge/siebel.html', label: 'Siebel' }
              ])}
              ${buildNavDropdown(language === 'de' ? 'Motoren & Luftschrauben' : 'Engines & Propellers', [
                { href: '/Motoren_Luftschrauben/argus.html', label: 'Argus' },
                { href: '/Motoren_Luftschrauben/bmw.html', label: 'BMW' },
                { href: '/Motoren_Luftschrauben/daimler_benz.html', label: 'Daimler Benz' },
                { href: '/Motoren_Luftschrauben/gnome_rhone.html', label: 'Gnome Rhone' },
                { href: '/Motoren_Luftschrauben/hirth.html', label: 'Hirth' },
                { href: '/Motoren_Luftschrauben/jumo.html', label: 'JUMO' },
                { href: '/Motoren_Luftschrauben/oberursel.html', label: 'Oberursel' },
                { href: '/Motoren_Luftschrauben/salmson.html', label: 'Salmson' },
                { href: '/Motoren_Luftschrauben/siemens_bramo.html', label: 'Siemens - BRAMO' },
                { href: '/Motoren_Luftschrauben/vdm.html', label: 'VDM' },
                { href: '/Motoren_Luftschrauben/vergaser_einspritzanlagen.html', label: language === 'de' ? 'Vergaser und Einspritzanlagen' : 'Carburetors and Injection Systems' },
                { href: '/Motoren_Luftschrauben/walter.html', label: `Walter ${language === 'de' ? 'Motoren' : 'Engines'}` },
                { href: '/Motoren_Luftschrauben/walter_hwk.html', label: 'Walter HWK' },
                { href: '/Motoren_Luftschrauben/zuendapp.html', label: 'Zündapp' }
              ])}
              ${buildNavLink('/Zusatz/flugzeug_bewaffnung.html', language === 'de' ? 'Flugzeug-Bewaffnung' : 'Aircraft Armament')}
              ${buildNavLink('/Zusatz/flugzeug_ausruestung.html', language === 'de' ? 'Flugzeug-Ausrüstung' : 'Aircraft Equipment')}
              ${buildCartLink('/warenkorb.html', language === 'de' ? 'Warenkorb' : 'Cart', 'cart-link')}
              ${buildLanguageDropdown(language)}

            </ul>
          </div>
        </div>
      </div>
    </nav>
  `;
}

function initNavbarAutoHide(scrollUpThreshold = 80) {
  const navbar = document.querySelector('.site-navbar');

  if (!navbar || navbar.dataset.autoHideInitialized === 'true') {
    return;
  }

  navbar.dataset.autoHideInitialized = 'true';

  let lastScrollY = window.scrollY;
  let accumulatedScrollUp = 0;
  let isHidden = false;
  let ticking = false;

  const showNavbar = () => {
    if (!isHidden) {
      return;
    }

    navbar.classList.remove('site-navbar--hidden');
    isHidden = false;
    accumulatedScrollUp = 0;
  };

  window.showNavbar = showNavbar;

  const hideNavbar = () => {
    if (isHidden) {
      return;
    }

    navbar.classList.add('site-navbar--hidden');
    isHidden = true;
    accumulatedScrollUp = 0;
  };

  const updateNavbarVisibility = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 200) {
      showNavbar();
      lastScrollY = currentScrollY;
      return;
    }

    if (currentScrollY > lastScrollY && currentScrollY >= 200 && !isHidden) {
      accumulatedScrollUp = 0;
      hideNavbar();
    } else if (currentScrollY < lastScrollY && isHidden) {
      accumulatedScrollUp += lastScrollY - currentScrollY;

      if (accumulatedScrollUp >= scrollUpThreshold) {
        showNavbar();
      }
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', () => {
    if (ticking) {
      return;
    }

    ticking = true;

    window.requestAnimationFrame(() => {
      updateNavbarVisibility();
      ticking = false;
    });
  }, { passive: true });

  updateNavbarVisibility();
}

document.addEventListener('DOMContentLoaded', function() {
  const faviconLink = document.createElement('link');
  faviconLink.rel = 'icon';
  faviconLink.href = '/images/favicon.png';
  document.head.appendChild(faviconLink);
});

document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  if (header) {
    const language = getCookie('language');
    header.innerHTML = buildNavbar(language);
    initNavbarAutoHide();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const footer = document.querySelector('footer');
  if (footer && !footer.children.length) {
    const language = getCookie('language');
    footer.innerHTML = `
    <p class="footer_imprint">Luftfahrt-Archiv Hafner, Udo Hafner, 1990 - ${new Date().getFullYear()}</p>
    <a href="/agb.html">${language === 'de' ? 'AGB' : 'Terms'}</a>
    <a href="/links.html">Links</a>
    <a href="/about.html">${language === 'de' ? 'Wir über uns' : 'About Us'}</a>
    <a href="/impressum.html">${language === 'de' ? 'Impressum' : 'Imprint'}</a>
    <a href="/datenschutz.html">${language === 'de' ? 'Datenschutz' : 'Privacy'}</a>
    `;
  }
});

// functions to manage cookies

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = '; expires=' + date.toUTCString();
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getAllCookies() {
  return document.cookie.split(';');
}

function getCookie(name) {
  const cookiePrefix = `${name}=`;
  const cookies = document.cookie ? document.cookie.split('; ') : [];

  for (const cookie of cookies) {
    if (cookie.startsWith(cookiePrefix)) {
      return cookie.substring(cookiePrefix.length);
    }
  }

  return null;
}

function setLanguage(language) {
  setCookie('language', language, 365);
  location.reload();
}

function acceptCookies() {
  setCookie('acceptCookies', 'true', 365);
  const banner = document.querySelector('.cookie-banner');
  if (banner) {
    banner.style.transform = 'translateY(100%)';
    setTimeout(() => {
      banner.remove();
      document.body.style.paddingBottom = '';
    }, 1000);
  }
}


//Accept cookies on first visit
document.addEventListener('DOMContentLoaded', function() {
  if (getCookie('acceptCookies') === null) {
      const cookieBanner = document.createElement('div');
      cookieBanner.classList.add('cookie-banner');
      cookieBanner.style.transform = 'translateY(100%)';
      cookieBanner.style.transition = 'transform 1s ease-in-out';
      cookieBanner.innerHTML = `
      <p>We use cookies and local browser storage to ensure you get the best experience on our website. By continuing to use this site, you consent to the use of cookies.</p>
      <button onclick="acceptCookies()">Accept</button>
      `;
      document.body.appendChild(cookieBanner);
        document.body.style.paddingBottom = `${cookieBanner.offsetHeight}px`;
      
      // Trigger the animation after a small delay to ensure the transition works
      setTimeout(() => {
          cookieBanner.style.transform = 'translateY(0)';
      }, 700);

      //with the next click on the page add the acceptCookies cookie
      document.addEventListener('click', function() {
          setCookie('acceptCookies', 'true', 365);
          // setCookie('language', 'de', 365);
          // location.reload();
          const banner = document.querySelector('.cookie-banner');
          if (banner) {
            banner.style.transform = 'translateY(100%)';
            setTimeout(() => {
              banner.remove();
              document.body.style.paddingBottom = '';
            }, 1000);
          }
      });
  }
});

//local storage functions

function setLocalStorageItem(key, value, expireDays) {
  const item = {
    value: value,
    expiry: expireDays ? Date.now() + expireDays * 24 * 60 * 60 * 1000 : null
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getLocalStorageItem(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  if (item.expiry && Date.now() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

function getLocalStorageItems() {
  const items = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    items[key] = getLocalStorageItem(key);
  }
  return items;
}


function removeLocalStorageItem(key) {
  localStorage.removeItem(key);
}

function clearLocalStorage() {
  localStorage.clear();
}

function displaySpinner() {
  //get element with the id spinner
  const spinner = document.getElementById('spinner');
  //remove class spinner_invisible from the spinner element
  spinner.classList.remove('spinner_invisible');
  //add class spinner_visible to the spinner element
  spinner.classList.add('spinner_visible');
}

function hideSpinner() {
  //get element with the id spinner
  const spinner = document.getElementById('spinner');
  //remove class spinner_visible from the spinner element
  spinner.classList.remove('spinner_visible');
  //add class spinner_invisible to the spinner element
  spinner.classList.add('spinner_invisible');
}

document.addEventListener('DOMContentLoaded', function() {
  const spinnerHTML = `
      <div class="spinner_invisible" id="spinner">
          <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', spinnerHTML);
});



function encrypt(text, key) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode);
  }
  return btoa(result);
}

function decrypt(encoded, key) {
  const text = atob(encoded);
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode);
  }
  return result;
}



function freeze() {
  const top = globalThis.scrollY;

  document.body.style.overflow= 'hidden';

  globalThis.onscroll= function() {
    globalThis.scrollTo(0, top);
  }
}

function unfreeze() {
  document.body.style.overflow= '';
  globalThis.onscroll= null;
}

document.addEventListener('DOMContentLoaded', function() {
    updateCartLink();
});

function updateCartLink() {
    //change the number of items in the cart link
    let CountInCart = getCart().length;
    const cartCount = document.querySelector('.cart_count');
    if (cartCount && CountInCart > 0) {
        cartCount.innerHTML = CountInCart;
        cartCount.style.opacity = '1';
    } else {
        cartCount.innerHTML = '';
        cartCount.style.opacity = '0';
    }
}

function getCart() {
    const cart = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('LAH-')) {
            try {
                getLocalStorageItem(key);
                cart.push(JSON.parse(getLocalStorageItem(key)));
            } catch (e) {
                console.error('Error parsing JSON from localStorage:', e);
                console.error('Key:', key);
            }
        }
    }
    return cart;
}