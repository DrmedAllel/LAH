document.addEventListener('DOMContentLoaded', function() {
    const mainSection = document.querySelector('main');
    if (!mainSection || mainSection.querySelector('#image_gallery')) {
        return;
    }
    const language = getCookie('language');

    mainSection.innerHTML = `
        <section>
            <p>${language === 'de' ? 
                'Das Archiv wurde über mehrere Jahrzehnte hinweg ausschließlich mit privaten Mitteln aufgebaut. Seit 1990 reproduzieren wir unsere Archivunterlagen in Buchform und seit 2001 auch als digitalisierte Dateien im pdf-Format auf CD-DVD (300 dpi s/w oder 300 dpi gray-scale) oder per Download.' : 
                'The archive was built up exclusively with private funds over several decades. Since 1990, we have been reproducing our archive documents in book form and since 2001 also as digitized files in PDF format on CD-DVD (300 dpi b/w or 300 dpi gray-scale) or via download.'}</p>

            <p>${language === 'de' ? 
                'Mittelfristig wollen wir von möglichst allen deutschen Flugzeugtypen aus der Zeit von 1928 bis 1945 so genannte technische Kompendien auf CD-DVD mit ISBN herausgeben. Wir verstehen darunter eine Zusammenstellung der technischen Dokumente eines Flugzeugtyps, z.B. mit Flugzeug-Handbuch, Bedienungs-Vorschrift, Ersatzteilliste, sowie mit den dazugehörigen Motor-, Instrumenten- und Waffen-Handbüchern.' :
                'In the medium term, we want to publish so-called technical compendiums on CD-DVD with ISBN for as many German aircraft types as possible from the period 1928 to 1945. We understand this to mean a compilation of the technical documents of an aircraft type, e.g. with aircraft manual, operating instructions, spare parts list, as well as the associated engine, instrument and weapons manuals.'}</p>

            <p>${language === 'de' ? 
                'Unser Archiv ist nach Herstellern geordnet, sehr umfangreich, aber noch lange nicht vollständig. Wir sind immer am Ankauf von passenden Unterlagen interessiert. Nachfolgend ein Einblick in unser Büro mit Teilen des Archivs.' :
                'Our archive is organized by manufacturer, very extensive, but far from complete. We are always interested in purchasing suitable documents. Below is a view of our office with parts of the archive.'}</p>

            <p>${language === 'de' ?
                'Mit dem Umzug auf unsere neue Website 2025 haben wir den Bestellvorgang für unsere Produkte vereinfacht. Sie können jetzt direkt über die Website Ihre Bestellung zusammenstellen und aufgeben. Wir freuen uns auf Ihre Bestellung.' :
                'With the move to our new website in 2025, we have simplified the ordering process for our products. You can now put together and place your order directly on the website. We look forward to your order.'}</p>
        </section>

        <div id="image_gallery">
            <div class="image_element">
                <img src="files/image_about/image001.jpg" alt="Arado, Blohm & Voss, Dornier, Focke-Wulf">
                <p>Arado, Blohm & Voss, Dornier, Focke-Wulf</p>
            </div>
            <div class="image_element">
                <img src="files/image_about/image002.jpg" alt="Heinkel und Teile von Junkers">
                <p>Heinkel ${language === 'de' ? 'und Teile von' : 'and parts of'} Junkers</p>
            </div>
            <div class="image_element">
                <img src="files/image_about/image003.jpg" alt="Junkers">
                <p>Junkers</p>
            </div>
            <div class="image_element">
                <img src="files/image_about/image004.jpg" alt="Messerschmitt">
                <p>Messerschmitt</p>
            </div>
            <div class="image_element">
                <img src="files/image_about/image005.jpg" alt="Hirth und JUMO">
                <p>Hirth ${language === 'de' ? 'und' : 'and'} JUMO</p>
            </div>
            <div class="image_element">
                <img src="files/image_about/image006.jpg" alt="Originalunterlagen, Buchreproduktion und CDs">
                <p>${language === 'de' ? 'Originalunterlagen, Buchreproduktion und CDs' : 'Original documents, book reproduction and CDs'}</p>
            </div>
            <div class="image_element">
                <img src="files/image_about/image007.jpg" alt="Buchreproduktion Me 262 Ersatzteilliste">
                <p>${language === 'de' ? 'Buchreproduktion Me 262 Ersatzteilliste' : 'Book reproduction Me 262 spare parts list'}</p>
            </div>
            <div class="image_element">
                <img src="files/image_about/image008.jpg" alt="Buchreproduktion Me 262 Ersatzteilliste">
                <p>${language === 'de' ? 'Buchreproduktion Me 262 Ersatzteilliste' : 'Book reproduction Me 262 spare parts list'}</p>
            </div>
        </div>
    ` + mainSection.innerHTML;
});
