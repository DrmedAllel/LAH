document.addEventListener('DOMContentLoaded', function() {
    const mainSection = document.querySelector('main');
    const language = getCookie('language');

    mainSection.innerHTML = `
        <section class="impressum">
            <h1>${language === 'de' ? 'Impressum' : 'Imprint'}</h1>
            <h2>${language === 'de' ? 'Verantwortlich für den Inhalt gemäß § 10 Absatz 3 MDStV' : 'Responsible for content according to § 10 paragraph 3 MDStV'}</h2>
            
            <p>Udo Hafner<br>
            Luftfahrt-Archiv Hafner<br>
            Salonallee 5<br>
            D-71638 Ludwigsburg</p>
    
            <p>Tel.: 07141 / 90 16 03<br>
            Email: <a href="mailto:info@luftfahrt-archiv-hafner.de">info@luftfahrt-archiv-hafner.de</a></p>

            <h2>${language === 'de' ? 'Technische Verantwortung' : 'Technical Responsibility'}</h2>
            <p>Claudius Laur<br>
            Email: <a href="mailto:business@claudiuslaur.de">business@claudiuslaur.de</a><br>
            Website: <a href="https://claudiuslaur.de">claudiuslaur.de</a></p>
            </p>
            
        </section>
    ` + mainSection.innerHTML;
});
