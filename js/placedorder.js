function getItemsWithHashFromLocalStorage() {
    const items = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('#')) {
            items[key] = localStorage.getItem(key);
        }
    }
    return items;
}

document.addEventListener('DOMContentLoaded', function() {
    displaySpinner();
    //get language cookie
    const language = getCookie('language');
    let main = document.querySelector('main');
    main.innerHTML = main.innerHTML + `
                                        <h1 id='thank_you_header'>${language === 'de' ? 'Vielen Dank für Ihre Bestellung!' : 'Thank you for your order!'}</h1>
                                        <p class="note">${language === 'de' ? 'Wir bearbeiten Ihre Bestellung und senden Ihnen eine Rechnung per E-Mail. Bitte haben Sie etwas Geduld.' : 'We are processing your order and will send you an invoice by email. Please be patient.'}</p>
                                        <div id='order_container'></div>
                                        <button id='back_to_shop' class='button' onclick="globalThis.location.href='index.html'">${language === 'de' ? 'Zurück zur Startseite' : 'Back to Homepage'}</button>
                                    `;

    loadOrders('#order_container');
});


async function loadOrders(identifier) {
    const language = getCookie('language');
    const elementToPaste = document.querySelector(identifier);
    const ListOfOrders = getItemsWithHashFromLocalStorage();

    if (Object.keys(ListOfOrders).length === 0) {
        const header = document.getElementById('thank_you_header');
        if (header) {
            header.textContent = language === 'de' ? 'Keine Bestellungen gefunden' : 'No orders found';
        }

        if (elementToPaste) {
            elementToPaste.innerHTML = `
                <p class="note">
                    ${language === 'de'
                        ? 'Es wurden keine gespeicherten Bestellungen gefunden. Falls Sie gerade bestellt haben, laden Sie die Seite bitte neu oder gehen Sie zurück zur Startseite.'
                        : 'No saved orders were found. If you just placed an order, please reload the page or go back to the homepage.'}
                </p>
            `;
        }

        hideSpinner();
        return;
    }

    for (let order in ListOfOrders) {
        let orderData = JSON.parse(ListOfOrders[order]);
        orderData = JSON.parse(orderData.value);

        const orderHTML = createOrderHTML(orderData, language);
        elementToPaste.innerHTML += orderHTML;
    }

    hideSpinner();
}

function createOrderHTML(orderData, language) {
    const items = Array.isArray(orderData.items) ? orderData.items : null;

    const productsFromString = typeof orderData.products === 'string'
        ? orderData.products.split('\n').filter(Boolean)
        : [];

    const productsHTML = (items && items.length > 0)
        ? items.map((item) => {
            const name = escapeHtml(item?.name || '');
            const itemId = escapeHtml(item?.id || '');
            const itemType = escapeHtml(item?.type || '');
            const price = escapeHtml(item?.price || '');
            const image = escapeHtml(item?.image || '');

            const subtitleParts = [itemId, itemType].filter(Boolean);
            const subtitle = subtitleParts.join(' · ');

            return `
                <div class="product_card">
                    ${image
                        ? `<img class="product_image" src="${image}" alt="${name || itemId}" loading="lazy">`
                        : `<div class="product_image product_image_placeholder"></div>`}
                    <div class="product_meta">
                        <p class="product_title">${name || itemId}</p>
                        ${subtitle ? `<p class="product_sub">${subtitle}</p>` : ''}
                        ${price ? `<p class="product_sub">${price}</p>` : ''}
                    </div>
                </div>
            `;
        }).join('')
        : productsFromString.map(product => `<p>${escapeHtml(product)}</p>`).join('');

    console.log(orderData);
    return `
        <div class="order">
            <div class="order_header">
                <svg fill="#000000" width="80px" height="80px" viewBox="0 0 24 24" id="check-mark-circle" xmlns="http://www.w3.org/2000/svg" class="icon line"><path id="primary" d="M12,21h0a9,9,0,0,1-9-9H3a9,9,0,0,1,9-9h0a9,9,0,0,1,9,9h0A9,9,0,0,1,12,21ZM8,11.5l3,3,5-5" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.5;"></path></svg>
                <div class="order_header_text">
                    <p class="order_id">${language === 'de' ? 'Bestellnummer: ' : 'Order-ID: '}${orderData.orderNumber}</p>
                    <p class="thank_you">${language === 'de' ? 'Danke ' : 'Thank you '} ${orderData.first_name} ${orderData.last_name}!</p>
                </div>
            </div>
            <div class="next_steps">
                <p class="headline">${language === 'de' ? 'Nächste Schritte' : 'Next steps'}</p>
                <div class="steps">
                    <div class="step">
                        <p class="step_title">${language === 'de' ? '1) Bestellbestätigung' : '1) Order confirmation'}</p>
                        <p>${language === 'de' ? 'Wir haben Ihre Bestellung erhalten und bearbeiten sie manuell. Bitte haben Sie etwas Geduld.' : 'We received your order and process it manually. Please be patient.'}</p>
                    </div>
                    <div class="step">
                        <p class="step_title">${language === 'de' ? '2) Rechnung & Bezahlung' : '2) Invoice & Payment'}</p>
                        <p>${language === 'de' ? 'Wir erstellen Ihre Rechnung und senden diese an Ihre E-Mail-Adresse. Bitte bezahlen Sie erst nach Erhalt der Rechnung.' : 'We create your invoice and send it to your email address. Please pay only after receiving the invoice.'}</p>
                    </div>
                    <div class="step">
                        <p class="step_title">${language === 'de' ? '3) Download / DVD-Bereitstellung' : '3) Download / DVD-delivery'}</p>
                        <p>${language === 'de' ? `Nachdem Ihre  Zahlung bei uns eingegangen ist, stellen wir Ihnen gemäß Ihrer Bestellung per E-Mail einen Link zu den bestellten Dateien in der von Ihnen gewählten Download-Methode zur Verfügung, bzw. übermitteln wir Ihnen die postalischen Versanddaten der DVD-Lieferung.` : `Once your payment has been received, we will make your order available according to the download method you chose. If you chose the DVD option, you will receive a notification by email once your order is ready.`}</p>
                    </div>
                </div>
            </div>
            <div class="order_data">
                <p class="headline">${language === 'de' ? 'Bestellinformationen:' : 'Order information:'}</p>
                </br>
                <p>${language === 'de' ? 'Datum: ' : 'Date: '} ${orderData.orderdate} ${language === 'de' ? 'Uhr' : 'o\'clock'}</p>
                <p>Email: ${orderData.email}</p>
                <p>${language === 'de' ? 'Zahlungsmethode: ' : 'Payment method: '} ${orderData.payment}</p>
                <p>${language === 'de' ? 'Download-Methode: ' : 'Download method: '} ${orderData.download}</p>
                </br>
                </br>
                <p>${language === 'de' ? 'Bestellung: ' : 'Order: '}</p>
                </br>
                <div class="products ${items && items.length > 0 ? 'products_grid' : ''}">
                    ${productsHTML}
                </div>
            </div>
            <p class="order_note">${language === 'de' ? 'Wenn Sie Fragen zu Ihrer Bestellung haben oder Ihre Bestellung stornieren möchten, kontaktieren Sie uns bitte unter:' : 'If you have any questions about your order or want to cancel it, please contact us at:'} <a href="mailto:info@luftfahrt-archiv-hafner.de">info@luftfahrt-archiv-hafner.de</a></p>
        </div>
    `;
}

function escapeHtml(value) {
    return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

