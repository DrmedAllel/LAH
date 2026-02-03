document.addEventListener('DOMContentLoaded', function() {
    //include the navigation bar in the main element of the page
    const language = getCookie('language');
    const main = document.querySelector('main');

    const formHTML = `
        <form id="orderForm" onsubmit="handleSubmit(event)">
        <div id="checkoutNotice" class="checkout-notice" role="status" aria-live="polite" hidden></div>
        
        <div class="left-side">
            <div class="input_form">
                <h2>${language === 'de' ? 'Kontakt' : 'Contact'}</h2>
                <div class="form-group">
                    <input type="email" id="email" name="email" placeholder="${language === 'de' ? 'E-Mail' : 'Email'}" class="standard_input" required>
                </div>

                <h2>${language === 'de' ? 'Adresse' : 'Address'}</h2>
                <div class="form-group">
                    <input type="text" id="country" name="country" placeholder="${language === 'de' ? 'Land' : 'Country'}" class="standard_input" required>
                </div>
                <div class="form-group">
                    <input type="text" id="first_name" name="first_name" placeholder="${language === 'de' ? 'Vorname' : 'First name'}" class="standard_input" required>
                    <input type="text" id="last_name" name="last_name" placeholder="${language === 'de' ? 'Nachname' : 'Last name'}" class="standard_input" required>
                </div>
                <div class="form-group">
                    <input type="text" id="company" name="company" placeholder="${language === 'de' ? 'Firma (optional)' : 'Company (optional)'}" class="standard_input">
                </div>
                <div class="form-group">
                    <input type="text" id="adress" name="adress" placeholder="${language === 'de' ? 'Straße, Hausnummer' : 'Street, House number'}" class="standard_input" required>
                </div>
                <div class="form-group">
                    <input type="text" id="zip" name="zip" placeholder="${language === 'de' ? 'PLZ' : 'ZIP'}" class="standard_input" required>
                    <input type="text" id="city" name="city" placeholder="${language === 'de' ? 'Stadt' : 'City'}" class="standard_input" required>
                </div>

                <div class="form-group_download form-group">
                    <h2>Download</h2>
                    <div class="form-group">
                        <button type="button" class="download_button button selected_button" id="onedrive" title="Microsoft OneDrive" onclick="selectDownload(this)">
                            <p>Microsoft OneDrive</p>
                            <svg  width="" height="80%" xmlns="http://www.w3.org/2000/svg" viewBox="0 5.5 32 20.5"><title>OfficeCore10_32x_24x_20x_16x_01-22-2019</title><g id="STYLE_COLOR"><path d="M12.20245,11.19292l.00031-.0011,6.71765,4.02379,4.00293-1.68451.00018.00068A6.4768,6.4768,0,0,1,25.5,13c.14764,0,.29358.0067.43878.01639a10.00075,10.00075,0,0,0-18.041-3.01381C7.932,10.00215,7.9657,10,8,10A7.96073,7.96073,0,0,1,12.20245,11.19292Z" fill="#0364b8"/><path d="M12.20276,11.19182l-.00031.0011A7.96073,7.96073,0,0,0,8,10c-.0343,0-.06805.00215-.10223.00258A7.99676,7.99676,0,0,0,1.43732,22.57277l5.924-2.49292,2.63342-1.10819,5.86353-2.46746,3.06213-1.28859Z" fill="#0078d4"/><path d="M25.93878,13.01639C25.79358,13.0067,25.64764,13,25.5,13a6.4768,6.4768,0,0,0-2.57648.53178l-.00018-.00068-4.00293,1.68451,1.16077.69528L23.88611,18.19l1.66009.99438,5.67633,3.40007a6.5002,6.5002,0,0,0-5.28375-9.56805Z" fill="#1490df"/><path d="M25.5462,19.18437,23.88611,18.19l-3.80493-2.2791-1.16077-.69528L15.85828,16.5042,9.99475,18.97166,7.36133,20.07985l-5.924,2.49292A7.98889,7.98889,0,0,0,8,26H25.5a6.49837,6.49837,0,0,0,5.72253-3.41556Z" fill="#28a8ea"/></g></svg>
                        </button>
                    </div>
                    <p class="note">${language === 'de' ?  'Wir bieten den Download über Microsoft OneDrive an. Bei Fragen kontaktieren Sie uns bitte.' : 'We offer Download via Microsoft OneDrive. If you have any questions feel free to get in contact with us.'}</p>
                </div>
                

                <h2>${language === 'de' ? 'Zahlungsmethode' : 'Payment'}</h2>
                <div class="form-group">
                    <button type="button" class="payment_button button" id="paypal" title="PayPal" onclick="selectPayment(this)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="80%" viewBox="0 0 101 32" preserveAspectRatio="xMinYMin meet"><path fill="#003087" d="M 12.237 2.8 L 4.437 2.8 C 3.937 2.8 3.437 3.2 3.337 3.7 L 0.237 23.7 C 0.137 24.1 0.437 24.4 0.837 24.4 L 4.537 24.4 C 5.037 24.4 5.537 24 5.637 23.5 L 6.437 18.1 C 6.537 17.6 6.937 17.2 7.537 17.2 L 10.037 17.2 C 15.137 17.2 18.137 14.7 18.937 9.8 C 19.237 7.7 18.937 6 17.937 4.8 C 16.837 3.5 14.837 2.8 12.237 2.8 Z M 13.137 10.1 C 12.737 12.9 10.537 12.9 8.537 12.9 L 7.337 12.9 L 8.137 7.7 C 8.137 7.4 8.437 7.2 8.737 7.2 L 9.237 7.2 C 10.637 7.2 11.937 7.2 12.637 8 C 13.137 8.4 13.337 9.1 13.137 10.1 Z"/><path fill="#003087" d="M 35.437 10 L 31.737 10 C 31.437 10 31.137 10.2 31.137 10.5 L 30.937 11.5 L 30.637 11.1 C 29.837 9.9 28.037 9.5 26.237 9.5 C 22.137 9.5 18.637 12.6 17.937 17 C 17.537 19.2 18.037 21.3 19.337 22.7 C 20.437 24 22.137 24.6 24.037 24.6 C 27.337 24.6 29.237 22.5 29.237 22.5 L 29.037 23.5 C 28.937 23.9 29.237 24.3 29.637 24.3 L 33.037 24.3 C 33.537 24.3 34.037 23.9 34.137 23.4 L 36.137 10.6 C 36.237 10.4 35.837 10 35.437 10 Z M 30.337 17.2 C 29.937 19.3 28.337 20.8 26.137 20.8 C 25.037 20.8 24.237 20.5 23.637 19.8 C 23.037 19.1 22.837 18.2 23.037 17.2 C 23.337 15.1 25.137 13.6 27.237 13.6 C 28.337 13.6 29.137 14 29.737 14.6 C 30.237 15.3 30.437 16.2 30.337 17.2 Z"/><path fill="#003087" d="M 55.337 10 L 51.637 10 C 51.237 10 50.937 10.2 50.737 10.5 L 45.537 18.1 L 43.337 10.8 C 43.237 10.3 42.737 10 42.337 10 L 38.637 10 C 38.237 10 37.837 10.4 38.037 10.9 L 42.137 23 L 38.237 28.4 C 37.937 28.8 38.237 29.4 38.737 29.4 L 42.437 29.4 C 42.837 29.4 43.137 29.2 43.337 28.9 L 55.837 10.9 C 56.137 10.6 55.837 10 55.337 10 Z"/><path fill="#009cde" d="M 67.737 2.8 L 59.937 2.8 C 59.437 2.8 58.937 3.2 58.837 3.7 L 55.737 23.6 C 55.637 24 55.937 24.3 56.337 24.3 L 60.337 24.3 C 60.737 24.3 61.037 24 61.037 23.7 L 61.937 18 C 62.037 17.5 62.437 17.1 63.037 17.1 L 65.537 17.1 C 70.637 17.1 73.637 14.6 74.437 9.7 C 74.737 7.6 74.437 5.9 73.437 4.7 C 72.237 3.5 70.337 2.8 67.737 2.8 Z M 68.637 10.1 C 68.237 12.9 66.037 12.9 64.037 12.9 L 62.837 12.9 L 63.637 7.7 C 63.637 7.4 63.937 7.2 64.237 7.2 L 64.737 7.2 C 66.137 7.2 67.437 7.2 68.137 8 C 68.637 8.4 68.737 9.1 68.637 10.1 Z"/><path fill="#009cde" d="M 90.937 10 L 87.237 10 C 86.937 10 86.637 10.2 86.637 10.5 L 86.437 11.5 L 86.137 11.1 C 85.337 9.9 83.537 9.5 81.737 9.5 C 77.637 9.5 74.137 12.6 73.437 17 C 73.037 19.2 73.537 21.3 74.837 22.7 C 75.937 24 77.637 24.6 79.537 24.6 C 82.837 24.6 84.737 22.5 84.737 22.5 L 84.537 23.5 C 84.437 23.9 84.737 24.3 85.137 24.3 L 88.537 24.3 C 89.037 24.3 89.537 23.9 89.637 23.4 L 91.637 10.6 C 91.637 10.4 91.337 10 90.937 10 Z M 85.737 17.2 C 85.337 19.3 83.737 20.8 81.537 20.8 C 80.437 20.8 79.637 20.5 79.037 19.8 C 78.437 19.1 78.237 18.2 78.437 17.2 C 78.737 15.1 80.537 13.6 82.637 13.6 C 83.737 13.6 84.537 14 85.137 14.6 C 85.737 15.3 85.937 16.2 85.737 17.2 Z"/><path fill="#009cde" d="M 95.337 3.3 L 92.137 23.6 C 92.037 24 92.337 24.3 92.737 24.3 L 95.937 24.3 C 96.437 24.3 96.937 23.9 97.037 23.4 L 100.237 3.5 C 100.337 3.1 100.037 2.8 99.637 2.8 L 96.037 2.8 C 95.637 2.8 95.437 3 95.337 3.3 Z"/></svg>
                    </button>
                    <button type="button" class="payment_button button" id="bank_transfer" title="BankTransfer" onclick="selectPayment(this)">
                        <p>${language === 'de' ? 'Überweisung' : 'Bank Transfer'}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="" height="100%" viewBox="0 0 24 24"><path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"/></svg>
                    </button>
                </div>
                <p class="note">${language === 'de' ?  'Wir bieten die Zahlung per PayPal und Überweisung an. Nach Absenden der Bestellung erhalten Sie eine Rechnung per E-Mail.' : 'We offer payment via PayPal and Bank Transfer. After submitting the order you will receive an invoice by email.'}</p>

                <h2>${language === 'de' ? 'Zusätzliche Informationen' : 'Additional Information'}</h2>
                <div class="form-group">
                    <textarea id="additional_info" name="additional_info" placeholder="${language === 'de' ? 'Zusätzliche Informationen (optional)' : 'Additional Information (optional)'}" class="standard_input"></textarea>
                </div>

                <div class="form-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="terms" required>
                        <span>${language === 'de' ? 'Ich habe die ' : 'I have read the '}<a href="/agb.html" target="_blank">${language === 'de' ? 'AGB' : 'Terms and Conditions'}</a> ${language === 'de' ? 'gelesen und akzeptiere diese.' : 'and accept them.'}</span>
                    </label>
                </div>

                <div class="form-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="saveFormData" checked>
                        <span>${language === 'de' ? 'Formular für den nächsten Einkauf speichern' : 'Save form for next checkout'}</span>
                    </label>
                </div>

                <div class="form-group">
                    <button type="submit" class="submit_button button" id="submit">${language === 'de' ? 'Bestellung abschicken' : 'Submit'}</button>
                </div>
                <p class="note" id="bottom_note">${language === 'de' ? 'Sollten Sie Fragen zum Bestellprozess haben, treten Sie gerne mit uns in Kontakt.' : 'If you have any questions regarding the order process feel free to get in contact with us.'}</p>
            </div> 
        </div>
        <div class="right-side">
            <h2>${language === 'de' ? 'Warenkorb' : 'Cart'}</h2>
            <div class="cart"></div>
            <h2 id="subtotal">${language === 'de' ? 'Summe:' : 'Total:'}</h2>
        </div>
    </form>
    `;
    main.innerHTML = main.innerHTML + formHTML;
});

function sendMailRequest(to, subject, message) {
    const key = 'rgnignderignbirdegnbi';
    const scriptURL = decrypt('GhMaGRRUS0oBChUHEh1cAwoICQ4MXAQBBEgDBQYABhRBEUYzLwMeDQAQRjMXDDhDACcmKi8sETxLMREBVw8uRjRaKBUIIQQqKkonNFpCEDAJXzMeJxA3H1AmDSYIMz1dLzhBEVRXHxQ+RCUAHkgLHAAR', key);
    
    return fetch(scriptURL, {
        redirect: "follow",
        method: "POST",
        headers: {
            "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
            to: to,
            subject: subject,
            message: message,
        })
    })
    .then(async (response) => {
        const responseText = await response.text();
        let parsed;

        try {
            parsed = responseText ? JSON.parse(responseText) : null;
        } catch (parseError) {
            parsed = {
                ok: response.ok,
                status: response.status,
                body: responseText,
                parseError: String(parseError)
            };
        }

        if (!response.ok) {
            throw new Error(`Mail request failed (${response.status}): ${responseText}`);
        }

        return parsed;
    });
}

function sendEmail(data) {
    //get Language Cookie
    const language = getCookie('language');

    // Determine recipients based on additional info
    const recipients = data.additional_info === "Test1234CL" 
        ? "claudius.caspar.laur@gmail.com" 
        : "claudius.caspar.laur@gmail.com, u.e.hafner@t-online.de";
    
    // Prepare email subject and message
    const subject = "Neue Bestellung " + data.orderNumber;
    const message = generateMessage(data);

    // Send the email
    sendMailRequest(recipients, subject, message)
        .then(result => {
            console.log("Erfolgreich gesendet:", result);

            try {
                // Save full cart items (incl. images) into the stored order
                data.items = getCartItemsForOrder();
                // Clear the form
                document.getElementById('orderForm')?.reset();
                deleteOrders();
                // Save the order element in the local storage
                setLocalStorageItem(data.orderNumber, JSON.stringify(data), 7);
                // Clear the cart
                clearCart();
                clearCheckoutNotice();
            } catch (cleanupError) {
                console.error('Checkout cleanup failed:', cleanupError);
            }

            let confirm_message = '';
            let confirm_subject = '';
            const itemsText = formatOrderItemsForEmail(data, language);
            if (language === 'de') {
                confirm_message =
                    "Vielen Dank für Ihre Bestellung! Wir werden uns in Kürze bei Ihnen melden. Bitte haben Sie etwas Geduld, da wir alle Bestellungen manuell bearbeiten." +
                    "\n\n" +
                    `Bestellnummer: ${data.orderNumber}` +
                    (data.orderdate ? `\nDatum: ${data.orderdate} Uhr` : '') +
                    (data.payment ? `\nZahlungsmethode: ${data.payment}` : '') +
                    (data.download ? `\nDownload-Methode: ${data.download}` : '') +
                    (itemsText ? `\n\nBestellte Produkte:\n${itemsText}` : '') +
                    "\n\nFalls Sie Fragen haben, können Sie uns jederzeit über folgende E-Mail-Adresse kontaktieren: info@luftfahrt-archiv-hafner.de" +
                    "\n\nDies ist eine automatisch generierte E-Mail. Bitte antworten Sie nicht auf diese E-Mail.";
                confirm_subject = "Vielen Dank für Ihre Bestellung! " + data.orderNumber;
            } else {
                confirm_message =
                    "Thank you for your order! We will get in touch with you shortly. Please be patient as we process all orders manually." +
                    "\n\n" +
                    `Order ID: ${data.orderNumber}` +
                    (data.orderdate ? `\nDate: ${data.orderdate}` : '') +
                    (data.payment ? `\nPayment method: ${data.payment}` : '') +
                    (data.download ? `\nDownload method: ${data.download}` : '') +
                    (itemsText ? `\n\nOrdered items:\n${itemsText}` : '') +
                    "\n\nIf you have any questions, feel free to contact us at: info@luftfahrt-archiv-hafner.de" +
                    "\n\nThis is an automatically generated email. Please do not reply to this email.";
                confirm_subject = "Thank you for your order! " + data.orderNumber;
            }

            // Fire-and-forget confirmation mail (do not block redirect)
            sendMailRequest(data.email, confirm_subject, confirm_message)
                .then(r => console.log('Confirmation mail sent:', r))
                .catch(e => console.warn('Confirmation mail failed:', e));

            // Redirect to the order confirmation page (shows text + back button)
            // Use relative URL to work on GitHub Pages subpaths as well.
            globalThis.location.href = 'placedorder.html';
        })
        .catch(error => {
            console.error("Fehler beim Senden der E-Mail:", error);
            setCheckoutNotice(
                language === 'de'
                    ? 'Es gab einen Fehler beim Senden Ihrer Bestellung. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.'
                    : 'There was an error sending your order. Please try again or contact us directly.',
                'error'
            );
            hideSpinner();
        });
}

function formatOrderItemsForEmail(data, language) {
    // Prefer structured items (includes image, price, etc.), fallback to plain products string.
    if (Array.isArray(data?.items) && data.items.length > 0) {
        return data.items
            .map((item) => {
                const parts = [item?.name, item?.id, item?.type].filter(Boolean);
                return `- ${parts.join(' - ')}`;
            })
            .join('\n');
    }

    if (typeof data?.products === 'string' && data.products.trim()) {
        const lines = data.products.split('\n').map(l => l.trim()).filter(Boolean);
        return lines.map(l => `- ${l}`).join('\n');
    }

    return '';
}

function handleSubmit(event) {
    displaySpinner();
    //get language cookie
    const language = getCookie('language');
    clearCheckoutNotice();

    if (getProducts() === '') {
        setCheckoutNotice(
            language === 'de'
                ? 'Bitte fügen Sie Produkte zum Warenkorb hinzu, bevor Sie die Bestellung abschicken.'
                : 'Please add products to the cart before submitting the order.',
            'error'
        );
        event.preventDefault();
        hideSpinner();
        return;
    }

    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    let data = Object.fromEntries(formData);
    data = addOrderNumber(data);
    data.products = getProducts();
    data.orderdate = new Date().toLocaleString();
    try {
        const paymentButton = document.querySelector('.payment_button.selected_button');
        data.payment = paymentButton.title;
    } catch (e) {
        console.error('Error getting payment method:', e);
        setCheckoutNotice(
            language === 'de'
                ? 'Bitte wählen Sie eine Zahlungsmethode, bevor Sie die Bestellung abschicken.'
                : 'Please select a payment method before submitting the order.',
            'error'
        );
        event.preventDefault();
        hideSpinner();
        return;
    }

    try {
        const downloadButton = document.querySelector('.download_button.selected_button');
        data.download = downloadButton.title;
    } catch (e) {
        console.error('Error getting download method:', e);
        //check if the products include the word 'download' and send an alert if true
        if (data.products.includes('download')) {
            setCheckoutNotice(
                language === 'de'
                    ? 'Bitte wählen Sie eine Downloadmethode, bevor Sie die Bestellung abschicken.'
                    : 'Please select a download method before submitting the order.',
                'error'
            );
            event.preventDefault();
            hideSpinner();
            return;
        }
    }
    
    

    console.log(data);
    sendEmail(data);
}

function setCheckoutNotice(message, type = 'info') {
    const notice = document.getElementById('checkoutNotice');
    if (!notice) {
        console.warn('checkoutNotice element not found');
        return;
    }

    notice.classList.remove('checkout-notice--error', 'checkout-notice--success', 'checkout-notice--info');
    notice.classList.add(`checkout-notice--${type}`);
    notice.textContent = message;
    notice.hidden = false;

    if (typeof notice.scrollIntoView === 'function') {
        notice.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function clearCheckoutNotice() {
    const notice = document.getElementById('checkoutNotice');
    if (!notice) return;
    notice.textContent = '';
    notice.hidden = true;
    notice.classList.remove('checkout-notice--error', 'checkout-notice--success', 'checkout-notice--info');
}

function addOrderNumber(data) {
    //Generate a 5 Digit Order Number with a hashtag in front using Letters and Numbers based on the time in milliseconds and a random number
    const orderNumber = "#" + Math.random().toString(36).slice(2, 7).toUpperCase();
    data.orderNumber = orderNumber;
    return data;
}

function generateMessage(data) {
    let message = `Neue Bestellung ${data.orderNumber}\n\n`;
    message += `Vorname: ${data.first_name}\n`;
    message += `Nachname: ${data.last_name}\n`;
    message += `Sprache der Bestellung: ${(getCookie('language') || 'en')}\n`;
    message += `E-Mail: ${data.email}\n`;
    message += `Firma: ${data.company}\n`;
    message += `Adresse: ${data.adress}\n`;
    message += `PLZ: ${data.zip}\n`;
    message += `Ort: ${data.city}\n`;
    message += `Land: ${data.country}\n`;
    message += `Download: ${data.download}\n`;
    message += `Zahlung: ${data.payment}\n`;
    message += `Zusätzliche Informationen: ${data.additional_info}\n\n\n`;
    message += `Bestellung:\n\n`;
    message += `${data.products}\n\n\n`;
    message += `IP-Adresse: ${ip}\n`;
    return message;
}

async function getIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.warn('Error getting IP:', error);
        return 'Error getting IP'
    }
}

function getProducts() {
    //get all products from the local storage with an id starting with 'LAH-' and append them in a new line to a string
    let products = '';

    // Get all items from localStorage beginning with LAH- and add them to a list
    const cartItems = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('LAH-')) {
            try {
                getLocalStorageItem(key);
                cartItems.push(JSON.parse(getLocalStorageItem(key)));
            } catch (e) {
                console.error('Error parsing JSON from localStorage:', e);
                console.error('Key:', key);
            }
        }
    }

    for (let item of cartItems) {
        products += `${item.name} - ${item.id} - ${item.type}\n`;
    }
    return products;
}

function getCartItemsForOrder() {
    // Return full cart items (incl. image) so placedorder.html can render images.
    const cartItems = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('LAH-')) {
            const raw = getLocalStorageItem(key);
            if (!raw) continue;

            try {
                cartItems.push(JSON.parse(raw));
            } catch (e) {
                console.error('Error parsing cart item JSON from localStorage:', e);
                console.error('Key:', key);
            }
        }
    }

    return cartItems;
}


function selectPayment(button) {
    const paymentButtons = document.querySelectorAll('.payment_button');
    if (button.classList.contains('selected_button')) {
        button.classList.remove('selected_button');
    } else {
        paymentButtons.forEach(button => button.classList.remove('selected_button'));
        button.classList.add('selected_button');
    }
    saveFormData();
}

function selectDownload(button) {
    // Microsoft OneDrive should always be active (not toggleable)
    const onedriveButton = document.getElementById('onedrive');
    if (onedriveButton) {
        onedriveButton.classList.add('selected_button');
    } else if (button) {
        button.classList.add('selected_button');
    }
    saveFormData();
}

function deleteOrders() {
    //delete all items from the local storage with an id starting with '#'
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('#')) {
            localStorage.removeItem(key);
        }
    }
}


// Funktion zum Speichern der Form-Daten
function saveFormData() {
    if (!document.getElementById('saveFormData').checked) {
        return;
    }
    const formData = {
        email: document.getElementById('email').value,
        country: document.getElementById('country').value,
        firstName: document.getElementById('first_name').value,
        lastName: document.getElementById('last_name').value,
        company: document.getElementById('company').value,
        address: document.getElementById('adress').value,
        zip: document.getElementById('zip').value,
        city: document.getElementById('city').value,
        additionalInfo: document.getElementById('additional_info').value,
        paymentMethod: document.querySelector('.payment_button.selected_button')?.id || '',
        downloadMethod: document.querySelector('.download_button.selected_button')?.id || ''
    };
    
    setLocalStorageItem('savedFormData', formData, 30); // 30 Tage gültig
}

// Funktion zum Laden der Form-Daten
function loadFormData() {
    const savedData = getLocalStorageItem('savedFormData');
    if (savedData) {
        document.getElementById('email').value = savedData.email || '';
        document.getElementById('country').value = savedData.country || '';
        document.getElementById('first_name').value = savedData.firstName || '';
        document.getElementById('last_name').value = savedData.lastName || '';
        document.getElementById('company').value = savedData.company || '';
        document.getElementById('adress').value = savedData.address || '';
        document.getElementById('zip').value = savedData.zip || '';
        document.getElementById('city').value = savedData.city || '';
        document.getElementById('additional_info').value = savedData.additionalInfo || '';

        // Apply selected_button class to saved payment method
        if (savedData.paymentMethod) {
            const paymentButton = document.getElementById(savedData.paymentMethod);
            if (paymentButton) {
                paymentButton.classList.add('selected_button');
            }
        }

        // Apply selected_button class to saved download method
        if (savedData.downloadMethod) {
            const downloadButton = document.getElementById(savedData.downloadMethod);
            if (downloadButton) {
                downloadButton.classList.add('selected_button');
            }
        }
    }

    // Ensure OneDrive is always selected
    const onedriveButton = document.getElementById('onedrive');
    if (onedriveButton) {
        onedriveButton.classList.add('selected_button');
    }
}

// Event Listener für Form Änderungen
document.addEventListener('DOMContentLoaded', function() {
    // Form laden wenn vorhanden
    loadFormData();
    
    // Alle Input Felder überwachen
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('change', saveFormData);
    }); 
});

document.addEventListener('DOMContentLoaded', function() {
    //if the checkbox get unchecked, delete the saved form data
    const saveFormCheckbox = document.getElementById('saveFormData');
    if (saveFormCheckbox) {
        saveFormCheckbox.addEventListener('change', function() {
            console.log('Checkbox changed');
            if (!saveFormCheckbox.checked) {
                removeLocalStorageItem('savedFormData');
                console.log('Data removed');
            }
        });
    }
});

let ip;
document.addEventListener('DOMContentLoaded', async function(){
    ip = await getIP();
});
