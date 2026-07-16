const NUMBER_OF_IMAGES = 5;

window.addEventListener('load', function() {
    const flugzeugImg = document.getElementById('flugzeug_img');
    fadeOut(flugzeugImg, 0);
    const randomNumber = Math.floor(Math.random() * NUMBER_OF_IMAGES) + 1;
    console.log(randomNumber); // For testing purposes
    flugzeugImg.src = `images/landing_page/landing_page${randomNumber}.png`;
    fadeIn(flugzeugImg, 500);
});


setInterval(async function() {
    const flugzeugImg = document.getElementById('flugzeug_img');
    let newNumber;
    const currentNumber = Number.parseInt(flugzeugImg.src.match(/\d+(?=\.png$)/)[0], 10);
    
    if (currentNumber === NUMBER_OF_IMAGES) {
        newNumber = 1;
    } else {
        newNumber = currentNumber + 1;
    }
    
    fadeOut(flugzeugImg, 500);
    
    setTimeout(async () => {
        flugzeugImg.src = `images/landing_page/landing_page${newNumber}.png`;
        await new Promise(resolve => setTimeout(resolve, 125));
        fadeIn(flugzeugImg, 500);
    }, 1000);
}, 5000);

function fadeOut(element, duration) {
    element.style.opacity = 1;
    const step = 10 / duration;
    
    const timer = setInterval(() => {
        if (element.style.opacity > 0) {
            element.style.opacity -= step;
        } else {
            element.style.opacity = 0;
            clearInterval(timer);
        }
    }, 10);
}

function fadeIn(element, duration) {
    element.style.opacity = 0;
    const step = 10 / duration;
    
    const timer = setInterval(() => {
        if (element.style.opacity < 1) {
            element.style.opacity = Number.parseFloat(element.style.opacity) + step;
        } else {
            element.style.opacity = 1;
            clearInterval(timer);
        }
    }, 10);
}

globalThis.addEventListener('DOMContentLoaded', function() {
    const mainSection = document.querySelector('main');
    if (!mainSection || mainSection.querySelector('#logo')) {
        return;
    }
    const language = getCookie('language');

    mainSection.innerHTML = `
        <img src="images/landing_page/landing_page1.png" alt="Luftfahrt-Archiv Hafner Flugzeug" id="flugzeug_img">
        <h2>${language === 'de' ? 'Deutsche Luftfahrttechnik 1928 - 1945' : 'German Aviation Technology 1928 - 1945'}</h2>
        <p>${language === 'de' ? 'Flugzeug -, Motoren- und Waffen-Handbücher, Betriebsanleitungen, Ersatzteillisten,</br> Bedienungsvorschriften, Luftschrauben-Anlagen, Montage - und Reparaturanleitungen' : 'Aircraft, engine and weapon manuals, operating instructions, spare parts lists,</br> operating instructions, propeller systems, assembly and repair instructions'}</p>
        <div class="links">
            <a href="mailto:info@luftfahrt-archiv-hafner.de" class="button"><i class="fa-solid fa-envelope"></i> info@luftfahrt-archiv-hafner.de</a>
        </div>
    ` + mainSection.innerHTML;
});
