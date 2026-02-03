
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
                    <p>${language === 'de' ? 'Alle Dateien werden als' : 'All files are offered as'} <img src="../images/dvd.jpg" alt="DVD" class="order_info_img"> DVD ${language === 'de' ? 'oder zum' : 'or for'} <img src="../images/download.png" alt="Download" class="order_info_img"> ${language === 'de' ? 'Download angeboten.' : 'download.'}</p>
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
    const cartDiv = document.createElement('div');
    cartDiv.className = 'shopping_cart';
    cartDiv.innerHTML = `
        <a href="../warenkorb.html" title="Warenkorb">
            <p class="cart_count"></p>
            <img src="../images/shopping-cart.png" alt="Shopping Cart" class="shopping_cart_icon cart_link">
        </a>
    `;
    mainSection.appendChild(cartDiv);
    updateCartLink();

    const infoDiv = document.createElement('div');
    infoDiv.className = 'info';
    infoDiv.innerHTML = `
            <a href="" title="Info">
            <svg fill="#000000" width="800px" height="800px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><path d="M1229.93 594.767c36.644 37.975 50.015 91.328 43.72 142.909-9.128 74.877-30.737 144.983-56.093 215.657-27.129 75.623-54.66 151.09-82.332 226.512-44.263 120.685-88.874 241.237-132.65 362.1-10.877 30.018-18.635 62.072-21.732 93.784-3.376 34.532 21.462 51.526 52.648 36.203 24.977-12.278 49.288-28.992 68.845-48.768 31.952-32.31 63.766-64.776 94.805-97.98 15.515-16.605 30.86-33.397 45.912-50.438 11.993-13.583 24.318-34.02 40.779-42.28 31.17-15.642 55.226 22.846 49.582 49.794-5.39 25.773-23.135 48.383-39.462 68.957l-1.123 1.416a1559.53 1559.53 0 0 0-4.43 5.6c-54.87 69.795-115.043 137.088-183.307 193.977-67.103 55.77-141.607 103.216-223.428 133.98-26.65 10.016-53.957 18.253-81.713 24.563-53.585 12.192-112.798 11.283-167.56 3.333-40.151-5.828-76.246-31.44-93.264-68.707-29.544-64.698-8.98-144.595 6.295-210.45 18.712-80.625 46.8-157.388 75.493-234.619l2.18-5.867 1.092-2.934 2.182-5.87 2.182-5.873c33.254-89.517 67.436-178.676 101.727-267.797 31.294-81.296 62.72-162.537 93.69-243.95 2.364-6.216 5.004-12.389 7.669-18.558l1-2.313c6.835-15.806 13.631-31.617 16.176-48.092 6.109-39.537-22.406-74.738-61.985-51.947-68.42 39.4-119.656 97.992-170.437 156.944l-6.175 7.17c-15.78 18.323-31.582 36.607-47.908 54.286-16.089 17.43-35.243 39.04-62.907 19.07-29.521-21.308-20.765-48.637-3.987-71.785 93.18-128.58 205.056-248.86 350.86-316.783 60.932-28.386 146.113-57.285 225.882-58.233 59.802-.707 116.561 14.29 157.774 56.99Zm92.038-579.94c76.703 29.846 118.04 96.533 118.032 190.417-.008 169.189-182.758 284.908-335.53 212.455-78.956-37.446-117.358-126.202-98.219-227.002 26.494-139.598 183.78-227.203 315.717-175.87Z" fill-rule="evenodd"/></svg>
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

function updateCartLink() {
    //change the number of items in the cart link
    let CountInCart = getCart().length;
    const cartCount = document.querySelector('.cart_count');
    if (cartCount) {
        cartCount.innerHTML = CountInCart;
    }
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