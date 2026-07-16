document.addEventListener('DOMContentLoaded', function() {
    const mainSection = document.querySelector('main');
    if (!mainSection || mainSection.querySelector('.impressum')) {
        return;
    }
    const language = getCookie('language');

    mainSection.innerHTML = `
        <section class="impressum">
            <h1>${language === 'de' ? 'Impressum' : 'Imprint'}</h1>
            <h2>${language === 'de' ? 'Verantwortlich für den Inhalt gemäß § 5 TMG' : 'Responsible for content according to § 5 TMG'}</h2>
            
            <p>Udo Hafner<br>
            Luftfahrt-Archiv Hafner<br>
            Salonallee 5<br>
            D-71638 Ludwigsburg</p>
    
            <p>Tel.: 07141 / 90 16 03<br>
            E-Mail: <a href="mailto:info@luftfahrt-archiv-hafner.de">info@luftfahrt-archiv-hafner.de</a></p>

            <h2>${language === 'de' ? 'Technische Verantwortung' : 'Technical Responsibility'}</h2>
            <p>Claudius Laur<br>
            E-Mail: <a href="mailto:business@claudiuslaur.de">business@claudiuslaur.de</a><br>
            Website: <a href="https://claudiuslaur.de">claudiuslaur.de</a></p>
            
        </section>
    ` + mainSection.innerHTML;
});
