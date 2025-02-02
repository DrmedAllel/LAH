document.addEventListener('DOMContentLoaded', function() {
    //include the navigation bar in the main element of the page
    const language = getCookie('language');
    const main = document.querySelector('main');

    const formHTML = `
        <form id="orderForm" onsubmit="handleSubmit(event)">
        
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
                        <button type="button" class="download_button button" id="onedrive" title="Microsoft OneDrive" onclick="selectDownload(this)">
                            <p>Microsoft OneDrive</p>
                            <svg  width="" height="80%" xmlns="http://www.w3.org/2000/svg" viewBox="0 5.5 32 20.5"><title>OfficeCore10_32x_24x_20x_16x_01-22-2019</title><g id="STYLE_COLOR"><path d="M12.20245,11.19292l.00031-.0011,6.71765,4.02379,4.00293-1.68451.00018.00068A6.4768,6.4768,0,0,1,25.5,13c.14764,0,.29358.0067.43878.01639a10.00075,10.00075,0,0,0-18.041-3.01381C7.932,10.00215,7.9657,10,8,10A7.96073,7.96073,0,0,1,12.20245,11.19292Z" fill="#0364b8"/><path d="M12.20276,11.19182l-.00031.0011A7.96073,7.96073,0,0,0,8,10c-.0343,0-.06805.00215-.10223.00258A7.99676,7.99676,0,0,0,1.43732,22.57277l5.924-2.49292,2.63342-1.10819,5.86353-2.46746,3.06213-1.28859Z" fill="#0078d4"/><path d="M25.93878,13.01639C25.79358,13.0067,25.64764,13,25.5,13a6.4768,6.4768,0,0,0-2.57648.53178l-.00018-.00068-4.00293,1.68451,1.16077.69528L23.88611,18.19l1.66009.99438,5.67633,3.40007a6.5002,6.5002,0,0,0-5.28375-9.56805Z" fill="#1490df"/><path d="M25.5462,19.18437,23.88611,18.19l-3.80493-2.2791-1.16077-.69528L15.85828,16.5042,9.99475,18.97166,7.36133,20.07985l-5.924,2.49292A7.98889,7.98889,0,0,0,8,26H25.5a6.49837,6.49837,0,0,0,5.72253-3.41556Z" fill="#28a8ea"/></g></svg>
                        </button>
                        <button type="button" class="download_button button" id="wetransfer" title="WeTransfer" onclick="selectDownload(this)">
                            <p>WeTransfer</p>
                            <svg fill="#FFF" width="" height="100%" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M9.253 18.659c0.409 0 0.681 0.204 0.953 0.681l1.227 1.977c0.477 0.75 0.886 1.295 1.772 1.295 0.887 0 1.363-0.341 1.772-1.362 0.637-1.37 1.199-2.984 1.601-4.66l0.036-0.18c0.467-1.426 0.783-3.077 0.883-4.786l0.003-0.054c0-1.158-0.341-1.841-1.637-2.046-1.781-0.307-3.831-0.483-5.923-0.483-0.242 0-0.483 0.002-0.724 0.007l0.036-0.001c-0.159-0.002-0.347-0.003-0.534-0.003-2.143 0-4.252 0.15-6.315 0.439l0.238-0.027c-0.935 0.080-1.663 0.858-1.663 1.806 0 0.108 0.009 0.214 0.028 0.317l-0.002-0.011c0.106 1.767 0.398 3.42 0.858 5.001l-0.040-0.16c0.501 1.908 1.060 3.519 1.726 5.072l-0.089-0.234c0.476 1.022 0.885 1.363 1.771 1.363 0.887 0 1.296-0.545 1.773-1.295l1.226-1.977c0.341-0.409 0.614-0.681 1.023-0.681zM18.318 15.864c-0.004-0.086-0.006-0.186-0.006-0.287 0-3.576 2.899-6.474 6.474-6.474 0.147 0 0.293 0.005 0.437 0.015l-0.020-0.001c3.474 0 5.792 1.773 5.792 4.226-0.061 2.125-1.799 3.824-3.933 3.824-0.080 0-0.159-0.002-0.237-0.007l0.011 0c-0.109 0.010-0.235 0.015-0.363 0.015-0.878 0-1.696-0.26-2.38-0.708l0.017 0.010c-0.204-0.205-0.34-0.136-0.34 0.069 0.002 0.848 0.34 1.617 0.887 2.181l-0.001-0.001c0.576 0.508 1.338 0.819 2.171 0.819 0.003 0 0.006 0 0.010 0h-0c0.010 0 0.022 0 0.034 0 0.833 0 1.619-0.202 2.312-0.559l-0.028 0.013c0.175-0.124 0.392-0.199 0.627-0.199 0.399 0 0.748 0.215 0.937 0.535l0.003 0.005c0.41 0.612-0.136 1.431-0.612 1.977-1.151 1.024-2.677 1.649-4.348 1.649-0.149 0-0.297-0.005-0.444-0.015l0.020 0.001c-0.074 0.003-0.161 0.005-0.248 0.005-3.744 0-6.779-3.035-6.779-6.779 0-0.111 0.003-0.221 0.008-0.33l-0.001 0.015z"></path></svg>
                        </button>
                    </div>
                    <p class="note">${language === 'de' ?  'Wir bieten den Download über Microsoft OneDrive und WeTransfer an. Bei Fragen kontaktieren Sie uns bitte.' : 'We offer Download via Microsoft OneDrive and WeTransfer. If you have any questions feel free to get in contact with us.'}</p>
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

function sendEmail(data) {
    //get Language Cookie
    const language = getCookie('language');

    const key = 'rgnignderignbirdegnbi'
    const scriptURL = decrypt('GhMaGRRUS0oBChUHEh1cAwoICQ4MXAQBBEgDBQYABhRBEUYzLwMeDQAQRjMXDDhDACcmKi8sETxLMREBVw8uRjRaKBUIIQQqKkonNFpCEDAJXzMeJxA3H1AmDSYIMz1dLzhBEVRXHxQ+RCUAHkgLHAAR', key);
    fetch(scriptURL, {
        redirect: "follow",
        method: "POST",
        headers: {
            "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
            to: "claudius.caspar.laur@gmail.com, u.e.hafner@t-online.de",
            subject: "Neue Bestellung " + data.orderNumber,
            message: generateMessage(data),
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log("Erfolgreich gesendet:", result);

        //Clear the form
        document.getElementById('orderForm').reset();
        deleteOrders();
        //Save the order element in the local storage as a jason element
        setLocalStorageItem(data.orderNumber, JSON.stringify(data), 7);
        //Clear the cart
        clearCart();

        //Redirect to the order confirmation page
        window.location.href = '/placedorder.html';
    })
    .catch(error => {
        console.error("Fehler beim Senden der E-Mail:", error);
        if (language === 'de') {
            alert("Es gab einen Fehler beim Senden Ihrer Bestellung. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.");
        } else {
            alert("There was an error sending your order. Please try again or contact us directly.");
        }
        hideSpinner();
    });
}

function handleSubmit(event) {
    displaySpinner();
    //get language cookie
    const language = getCookie('language');

    if (getProducts() === '') {
        if (language === 'de') {
            alert("Bitte fügen Sie Produkte zum Warenkorb hinzu bevor Sie die Bestellung abschicken.");
        } else {
            alert("Please add products to the cart before submitting the order.");
        }
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
        if (language === 'de') {
            alert("Bitte wählen Sie eine Zahlungsmethode bevor Sie die Bestellung abschicken.");
        } else {
            alert("Please select a payment method before submitting the order.");
        }
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
            if (language === 'de') {
                alert("Bitte wählen Sie eine Downloadmethode bevor Sie die Bestellung abschicken.");
            } else {
                alert("Please select a download method before submitting the order.");
            }
            event.preventDefault();
            hideSpinner();
            return;
        }
    }
    
    

    console.log(data);
    sendEmail(data);
}

function addOrderNumber(data) {
    //Generate a 5 Digit Order Number with a hashtag in front using Letters and Numbers based on the time in milliseconds and a random number
    const orderNumber = "#" + Math.random().toString(36).substr(2, 5).toUpperCase();
    data.orderNumber = orderNumber;
    return data;
}

function generateMessage(data) {
    let message = `Neue Bestellung ${data.orderNumber}\n\n`;
    message += `Vorname: ${data.first_name}\n`;
    message += `Nachname: ${data.last_name}\n`;
    message += `Sprache der Bestellung: ${getCookie('language')}\n`;
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
    message += `${data.products}\n`;
    return message;
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
    const downloadButtons = document.querySelectorAll('.download_button');
    if (button.classList.contains('selected_button')) {
        button.classList.remove('selected_button');
    } else {
        downloadButtons.forEach(button => button.classList.remove('selected_button'));
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
