
async function loadButtons () {
    //get all buttons from the class add-to-cart
    const buttons = document.getElementsByClassName('add-to-cart');

    //get the language cookie
    const language = getCookie('language');

    //for each button check if there exists a cookie with the id of the button
    for (let button of buttons) {
        //get the id attribute of the button element
        const itemId = button.getAttribute('id');
        if (getLocalStorageItem(itemId) !== null) {
            if (language === 'de') {
                button.innerHTML = 'Im Warenkorb';
            } else {
                button.innerHTML = 'In Cart';
            }
            button.classList.add('remove-from-cart');
        } 
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const language = getCookie('language');
    const order_info = document.getElementById('order_info');
    if (order_info) {
        order_info.innerHTML = `
            <div class="order_info_card">
                <div id="close_order_info"></div>
                <div class="order_info_row">
                    <p>${language === 'de' ? 'Alle Dateien werden als' : 'All files are offered as'} <img src="../images/dvd.jpg" alt="DVD" class="order_info_img"> DVD ${language === 'de' ? 'oder zum' : 'or for'} <i class="fa-solid fa-file-arrow-down"></i> ${language === 'de' ? 'Download angeboten.' : 'download.'}</p>
                </div>
                <div class="order_info_row">
                    <p><img src="../images/buch.png" alt="${language === 'de' ? 'Buch-Reproduktion' : 'Book reproduction'}" class="order_info_img"> ${language === 'de' ? 'Buch-Reproduktion auf Anfrage:' : 'Book reproduction on request:'} <a href="mailto:info@luftfahrt-archiv-hafner.de">info@luftfahrt-archiv-hafner.de</a></p>
                </div>
                <div class="order_info_row">
                <p>${language === 'de' ? 'Bestellungen über die Website oder über Mail möglich:' : 'Orders possible via the website or by mail:'} <a href="mailto:info@luftfahrt-archiv-hafner.de">info@luftfahrt-archiv-hafner.de</a></p>
                </div>
            </div>
            <div class="order_info_background"></div>
            <div class="order_info_background" id="blocker"></div>
        `;
    }
    const orderInfo = document.getElementById('order_info');
    if (orderInfo) {
        const closeOrderInfo = document.getElementById('close_order_info');
        const orderInfoBackground = document.getElementsByClassName('order_info_background')[0];

        const hideOrderInfo = () => {
            orderInfo.style.display = 'none';
            unfreeze();
        };

        if (closeOrderInfo) closeOrderInfo.addEventListener('click', hideOrderInfo);
        if (orderInfoBackground) orderInfoBackground.addEventListener('click', hideOrderInfo);
    }

    const mainSection = document.querySelector('main');

    const infoDiv = document.createElement('div');
    infoDiv.className = 'info';
    infoDiv.innerHTML = `
            <a href="" title="Info">
            <i class="fa-solid fa-circle-info" style="font-size: 1.5em; color: var(--text-color);"></i>
        </a>
    `;
    mainSection.appendChild(infoDiv);
    
    const infoLink = infoDiv.querySelector('a');
    if (infoLink) {
        infoLink.addEventListener('click', function(event) {
            event.preventDefault();
            const orderInfo = document.getElementById('order_info');
            if (orderInfo) {
                orderInfo.style.display = 'flex';
                freeze();
            }
        });
    }

    const firstItem = document.querySelector('.item');
    if (firstItem) {
        const itemTitles = document.querySelectorAll('.item_title');
        if (itemTitles.length > 2) {
            const table_of_contents = document.createElement('div');
            table_of_contents.className = 'table_of_contents';
            table_of_contents.innerHTML = `
                <h2>Quicklinks</h2>
                <ul class="toc">
                </ul>
            `;
            firstItem.before(table_of_contents);
            generateTableOfContents();
        }
    }
});

function generateTableOfContents() {
    const toc = document.querySelector('.toc');
    const itemTitles = document.querySelectorAll('.item_title');
    itemTitles.forEach((title, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="#item-${index}">${title.innerText}</a>`;
        toc.appendChild(listItem);
        title.setAttribute('id', `item-${index}`);
    });
}


document.addEventListener('click', function() {
    //every time the user clicks on the page update the cart link
    updateCartLink();
});

function getInitialFormatForItem(itemId) {
    try {
        const existing = getLocalStorageItem(itemId);
        if (!existing) return 'download';
        const parsed = JSON.parse(existing);
        return parsed?.type || 'download';
    } catch (e) {
        console.warn('Could not read initial format for item:', itemId, e);
        return 'download';
    }
}

function createFormatSelect(language, initialValue) {
    const select = document.createElement('select');
    select.className = 'format_select';

    const optionDownload = document.createElement('option');
    optionDownload.value = 'download';
    optionDownload.textContent = 'Download';

    const optionDvd = document.createElement('option');
    optionDvd.value = 'dvd';
    optionDvd.textContent = 'DVD';

    const optionBook = document.createElement('option');
    optionBook.value = 'book';
    optionBook.textContent = language === 'de' ? 'Buch' : 'Book';

    // Order: Download / DVD / Book (matches checkout expectations)
    select.appendChild(optionDownload);
    select.appendChild(optionDvd);
    select.appendChild(optionBook);

    select.value = initialValue || 'download';
    return select;
}

function updateStoredItemTypeIfPresent(itemId, selectedType) {
    try {
        const existing = getLocalStorageItem(itemId);
        if (!existing) return;
        const parsed = JSON.parse(existing);
        parsed.type = selectedType;
        setLocalStorageItem(itemId, JSON.stringify(parsed), 1);
    } catch (e) {
        console.warn('Could not update stored item type:', itemId, e);
    }
}

function updateDisplayedItemPrice(priceElement, selectedType, language) {
    if (!priceElement) return;

    const basePrice = priceElement.dataset.basePrice ?? priceElement.innerText;
    // Persist the original/base price once, so we can restore it later.
    if (!priceElement.dataset.basePrice) {
        priceElement.dataset.basePrice = basePrice;
    }

    if (selectedType === 'book') {
        priceElement.innerText = language === 'de'
            ? 'Preis als Buch nur auf Anfrage.'
            : 'Price as a book only on request.';
    } else {
        priceElement.innerText = priceElement.dataset.basePrice;
    }
}

window.addEventListener('load', function () {
    const items = document.getElementsByClassName('item');
    const language = getCookie('language');

    for (let item of items) {
        const ItemTitle = item.getElementsByClassName('item_title')[0]?.innerText || '';
        const priceElement = item.getElementsByClassName('price')[0];
        const ItemPrice = priceElement?.innerText || '';
        let ItemID = item.getElementsByClassName('item-number')[0]?.innerText || '';
        ItemID = ItemID.split(': ')[1] || ItemID;

        const itemImageElement = item.getElementsByClassName('image_item')[0];
        const itemThumbnailElement = item.getElementsByClassName('itemThumbnail')[0];
        let ItemImage = '';
        if (itemThumbnailElement) {
            ItemImage = itemThumbnailElement.src;
        } else if (itemImageElement) {
            ItemImage = itemImageElement.src;
        }

        const actions = document.createElement('div');
        actions.className = 'item_actions';

        const initialFormat = getInitialFormatForItem(ItemID);
        const formatSelect = createFormatSelect(language, initialFormat);

        updateDisplayedItemPrice(priceElement, formatSelect.value, language);

        const button = document.createElement('button');
        button.className = 'add-to-cart';
        button.id = ItemID;
        button.innerHTML = language === 'de' ? 'In den Warenkorb' : 'Add to Cart';

        button.addEventListener('click', function () {
            editCartItem(ItemID, ItemTitle, ItemPrice, formatSelect.value, ItemImage, button);
        });

        formatSelect.addEventListener('change', function () {
            updateStoredItemTypeIfPresent(ItemID, formatSelect.value);
            updateDisplayedItemPrice(priceElement, formatSelect.value, language);
        });

        actions.appendChild(formatSelect);
        actions.appendChild(button);
        item.appendChild(actions);
    }

    loadButtons();
});