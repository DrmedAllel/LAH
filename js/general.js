document.addEventListener('DOMContentLoaded', function() {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = '/images/favicon.png';
  document.head.appendChild(link);
});

document.addEventListener('DOMContentLoaded', function() {
  // add navigation to the header
  const header = document.querySelector('header');
  if (header) {
      const language = getCookie('language');
      header.innerHTML = `
          <h1><a href="/index.html" title="${language === 'de' ? 'Startseite' : 'Homepage'}">Luftfahrt-Archiv Hafner</a></h1>
          <p>${language === 'de' ? 'gegr. 1990' : 'est. 1990'}</p>
          <nav>
            <div class="dropdown">
              <h2 class="title">${language === 'de' ? 'Flugzeuge' : 'Aircraft'}</h2>
              <ul class="submenu">
                <a href="/Flugzeuge/arado.html">Arado</a>
                <a href="/Flugzeuge/ago.html">AGO</a>
                <a href="/Flugzeuge/blohm_voss.html">Blohm & Voss</a>
                <a href="/Flugzeuge/bücker.html">Bücker</a>
                <a href="/Flugzeuge/dfs.html">DFS</a>
                <a href="/Flugzeuge/dornier.html">Dornier</a>
                <a href="/Flugzeuge/erla.html">Erla</a>
                <a href="/Flugzeuge/fieseler.html">Fieseler</a>
                <a href="/Flugzeuge/focke-achgelis.html">Focke-Achgelis</a>
                <a href="/Flugzeuge/focke_wulf.html">Focke Wulf</a>
                <a href="/Flugzeuge/gotha.html">Gotha</a>
                <a href="/Flugzeuge/heinkel.html">Heinkel</a>
                <a href="/Flugzeuge/henschel.html">Henschel</a>
                <a href="/Flugzeuge/junkers.html">Junkers</a>
                <a href="/Flugzeuge/klemm.html">Klemm</a>
                <a href="/Flugzeuge/messerschmitt.html">Messerschmitt</a>
                <a href="/Flugzeuge/segelflugzeuge.html">${language === 'de' ? 'Segelflugzeuge' : 'Gliders'}</a>
                <a href="/Flugzeuge/siebel.html">Siebel</a>
              </ul>
            </div>

            <div class="dropdown">
              <h2 class="title">${language === 'de' ? 'Motoren & Luftschrauben' : 'Engines & Propellers'}</h2>
              <ul class="submenu">
                <a href="/Motoren_Luftschrauben/argus.html">Argus</a>
                <a href="/Motoren_Luftschrauben/bmw.html">BMW</a>
                <a href="/Motoren_Luftschrauben/daimler_benz.html">Daimler Benz</a>
                <a href="/Motoren_Luftschrauben/gnome_rhone.html">Gnome Rhone</a>
                <a href="/Motoren_Luftschrauben/hirth.html">Hirth</a>
                <a href="/Motoren_Luftschrauben/jumo.html">JUMO</a>
                <a href="/Motoren_Luftschrauben/oberursel.html">Oberursel</a>
                <a href="/Motoren_Luftschrauben/salmson.html">Salmson</a>
                <a href="/Motoren_Luftschrauben/siemens_bramo.html">Siemens - BRAMO</a>
                <a href="/Motoren_Luftschrauben/vdm.html">VDM</a>
                <a href="/Motoren_Luftschrauben/vergaser_einspritzanlagen.html">${language === 'de' ? 'Vergaser und Einspritzanlagen' : 'Carburetors and Injection Systems'}</a>
                <a href="/Motoren_Luftschrauben/walter.html">Walter ${language === 'de' ? 'Motoren' : 'Engines'}</a>
                <a href="/Motoren_Luftschrauben/walter_hwk.html">Walter HWK</a>
                <a href="/Motoren_Luftschrauben/zuendapp.html">Zündapp</a>
              </ul>
            </div>

            <div class="dropdown">
              <a class="title title_link" href="/Zusatz/flugzeug_bewaffnung.html">${language === 'de' ? 'Flugzeug-Bewaffnung' : 'Aircraft Armament'}</a>
            </div>

            <div class="dropdown">
              <a class="title title_link" href="/Zusatz/flugzeug_ausruestung.html">${language === 'de' ? 'Flugzeug-Ausrüstung' : 'Aircraft Equipment'}</a>
            </div>

            <div class="dropdown">
              <a class="title cart_link title_link" href="/warenkorb.html">${language === 'de' ? 'Warenkorb' : 'Cart'}</a>
            </div>
          </nav>
      `;
  }
  mobileMenu();
});


document.addEventListener('DOMContentLoaded', function() {
    // add footer to the page
    const footer = document.querySelector('footer');
    if (footer) {
      const language = getCookie('language');
      footer.innerHTML = `
    <p>Luftfahrt-Archiv Hafner, Udo Hafner, 1990 - ${new Date().getFullYear()}</p>
    <a href="/agb.html">${language === 'de' ? 'AGB' : 'Terms'}</a> 
    <a href="/links.html">Links</a> 
    <a href="/about.html">${language === 'de' ? 'Wir über uns' : 'About Us'}</a>
    <a href="/impressum.html">${language === 'de' ? 'Impressum' : 'Imprint'}</a>
      `;
    }
});

document.addEventListener('DOMContentLoaded', function() {
  // add the language selection to the page
  const main = document.querySelector('main');
  if (main) {
      console.log(window.location.href);
      if (!window.location.href.includes('127.0.0.1:3000')) {
        main.innerHTML = `
        <div id="language_selection">
          <img src="/images/language_selection/germany.png" alt="Germany Flag" id="germany_flag" class="flag flag_active" title="Seite auf Deutsch">
          <img src="/images/language_selection/uk.png" alt="UK Flag" id="uk_flag" class="flag" title="Page in English">
        </div>
        ` + main.innerHTML;
      } else {
        main.innerHTML = `
        <div id="language_selection">
          <img src="/images/language_selection/germany.png" alt="Germany Flag" id="germany_flag" class="flag flag_active" title="Seite auf Deutsch">
          <img src="/images/language_selection/uk.png" alt="UK Flag" id="uk_flag" class="flag" title="Page in English">
        </div>
        ` + main.innerHTML;
        console.log('Local Test'); 
      }
  }
});
  



function mobileMenu() {
  const main = document.querySelector('main');
  main.innerHTML = `
  <div id="menu_button" class="menu_button" onclick="showMobileMenu()">
    <div id="menu_button_div">|||</div>
  </div>
  ` + main.innerHTML;
  mobileMenuSubmenuEventlistener();
}

function mobileMenuSubmenuEventlistener() {
  const titles = document.querySelectorAll('.title');
  titles.forEach(title => {
    title.addEventListener('click', function() {
      const submenu = this.nextElementSibling;
      if (submenu?.classList.contains('submenu')) {
        submenu.classList.toggle('submenu_visible');
      }
    });
  });
}

function showMobileMenu() {
  const header = document.querySelector('header');
  const menuButtonDiv = document.querySelector('#menu_button_div');

  header.classList.toggle('header_visible');
  

  const currentRotation = parseInt(menuButtonDiv.getAttribute('data-rotation') || '0');
  const newRotation = currentRotation + 90;
  menuButtonDiv.style.transform = `rotate(${newRotation}deg)`;
  menuButtonDiv.setAttribute('data-rotation', newRotation);

}


//functions to manage cookies

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let c of ca) {
      let cookie = c.trim();
      if (cookie.startsWith(nameEQ)) return cookie.substring(nameEQ.length, cookie.length);
  }
  return null;
}

function getAllCookies() {
  return document.cookie.split(';');
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
            }, 1000);
          }
      });
  }
});

//When clicked on one of the flags, set the language cookie and reload the page
document.addEventListener('click', function(event) {
  if (event.target.id === 'germany_flag') {
      setCookie('language', 'de', 365);
      location.reload();
  } else if (event.target.id === 'uk_flag') {
      setCookie('language', 'en', 365);
      location.reload();
  }
});


//local storage functions

function setLocalStorageItem(key, value, expireDays) {
  const item = {
    value: value,
    expiry: expireDays ? new Date().getTime() + expireDays * 24 * 60 * 60 * 1000 : null
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getLocalStorageItem(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  if (item.expiry && new Date().getTime() > item.expiry) {
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
  var top= window.scrollY;

  document.body.style.overflow= 'hidden';

  window.onscroll= function() {
    window.scroll(0, top);
  }
}

function unfreeze() {
  document.body.style.overflow= '';
  window.onscroll= null;
}
