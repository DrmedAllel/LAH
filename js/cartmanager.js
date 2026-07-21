function addToCart(itemId, itemName, itemPrice, itemType, itemImage, button) {
    const cartItem = {
        id: itemId,
        name: itemName,
        price: itemPrice,
        type: itemType,
        image: itemImage
    };

    // Convert the cart item to a JSON string
    const cartItemString = JSON.stringify(cartItem);

    // Set the cookie with the cart item
    setLocalStorageItem(itemId, cartItemString, 1);

    console.log(`Item added to cart: ${itemName} (${itemId}) - $${itemPrice}`);


    const language = getCookie('language');

    //Change the button text to remove from cart
    if (language === 'de') {
        button.innerHTML = 'Im Warenkorb';
    } else {
        button.innerHTML = 'In Cart';
    }
    if (typeof window.showNavbar === 'function') {
        window.showNavbar();
    }
    
    
    //add the class remove-from-cart to the button
    button.classList.add('remove-from-cart');

    //get the cart_link element
    const cartLinks = document.getElementsByClassName('cart_link');

    for (let cartLink of cartLinks) {
        // Add a wiggle animation class
        cartLink.classList.add('wiggle');
        // Remove the class after 2 seconds
        setTimeout(() => {
            cartLink.classList.remove('wiggle');
        }, 500);
    }
}


function removeFromCart(itemId, button) {
    //delete the cookie
    removeLocalStorageItem(itemId);

    if (button) {
        //remove the class remove-from-cart from the button
        button.classList.remove('remove-from-cart');

        const language = getCookie('language');

        //Change the button text to add to cart
        if (language === 'de') {
            button.innerHTML = 'In den Warenkorb';
        } else {
            button.innerHTML = 'Add to Cart';
        }
    } else {
        console.error('Button is undefined');
    }

    if (typeof window.showNavbar === 'function') {
        window.showNavbar();
    }

    console.log(`Item removed from cart: ${itemId}`);
}

function clearCart() {
    // Clear all items from localStorage beginning with LAH-
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('LAH-')) {
            keysToRemove.push(key);
        }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));

    console.log('Cart cleared');
    loadCart();
}

function editCartItem(itemId, itemName, itemPrice, itemType, itemImage, button) {
    // Check if the item is in the cart
    if (localStorage.getItem(itemId)) {
        removeFromCart(itemId, button);
    } else {
        addToCart(itemId, itemName, itemPrice, itemType, itemImage, button);
    }

    loadCart();
    updateCartLink();
}

window.onload = function() {
    loadCart();
}

function loadCart() {
    //Get the Language Cookie
    const language = getCookie('language');

    console.log('Loading cart...');
    // Get all items from localStorage beginning with LAH- and add them to a list
    const cartItems = getCart();

    // Get all cart elements
    const carts = document.getElementsByClassName('cart');

    // Loop through each cart element
    Array.from(carts).forEach(cart => {
        // Remove all children of the cart element
        while (cart.firstChild) {
            cart.removeChild(cart.firstChild);
        }
    });

    Array.from(carts).forEach(cart => {
        //Get the Language Cookie
        const language = getCookie('language');

        // Add each item to the cart
        for (let item of cartItems) {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
            <div class="ItemRow cart-item-row">
                <img src="${item.image}" alt="" class="ItemImage">
                <div class="ItemColumn">
                    <div class="ItemRow">
                        <h3 class="ItemTitle">${item.name}</h3>
                        <select class="item-options">
                            <option value="download">Download</option>
                            <option value="dvd">DVD</option>
                            <option value="book">${language === 'de' ? 'Buch' : 'Book'}</option>    
                        </select>
                    </div>
                    <div class="ItemRow">
                        <p class="ItemID">ID: ${item.id}</p>
                        <p class="ItemPrice">${item.price}</p>
                    </div>
                    <button class="add-to-cart" onclick="editCartItem('${item.id}', '${item.name}', '${item.price}', '${item.option}', this);">${language === 'de' ? 'Entfernen' : 'Remove'}</button>
                </div>
            </div>
            `;
            cart.appendChild(cartItem);
            let selectedOption = item.type;
            const itemOptions = cartItem.querySelector('.item-options');
            itemOptions.value = selectedOption;

            const itemPriceElement = cartItem.querySelector('.ItemPrice');
            if (selectedOption === 'book') {
                if (language === 'de') {
                    itemPriceElement.innerHTML = 'Preis als Buch nur auf Anfrage.';
                } else {
                    itemPriceElement.innerHTML = 'Price as a book only on request.';
                }
            } else {
                itemPriceElement.innerHTML = `${item.price}`;
            }
            checkDownload();
        }
    });

    // Get the total price element
    const totalPriceElement = document.querySelector('#subtotal');
    if (totalPriceElement) {
        totalPriceElement.innerHTML = `${language === 'de' ? 'Summe:' : 'Total:'} ${getTotalPrice()}`;
    }
}

document.addEventListener('change', function(event) {
    // get Language Cookie
    const language = getCookie('language');

    if (event.target.classList.contains('item-options')) {
        const selectedOption = event.target.value;
        const itemPriceElement = event.target.closest('.cart-item').querySelector('.ItemPrice');
        const itemId = event.target.closest('.cart-item').querySelector('.ItemID').textContent.split(': ')[1];

        if (selectedOption === 'book') {
            if (language === 'de') {
                itemPriceElement.innerHTML = 'Preis als Buch nur auf Anfrage.';
            } else {
                itemPriceElement.innerHTML = 'Price as a book only on request.';
            }
        } else {
            const itemId = event.target.closest('.cart-item').querySelector('.ItemID').textContent.split(': ')[1];
            const cartItem = JSON.parse(getLocalStorageItem(itemId));
            itemPriceElement.innerHTML = `${cartItem.price}`;
        }

        let Item = getLocalStorageItem(itemId);
        Item = JSON.parse(Item);
        Item.type = selectedOption;
        Item = JSON.stringify(Item);
        setLocalStorageItem(itemId, Item, 1);
    }
    loadCart();
});


function checkDownload() {
    //check if any of the cart items is download
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

    const formGroupDownload = document.querySelector('.form-group_download');
    if (formGroupDownload) {
        for (let item of cartItems) {
            if (item.type === 'download') {
                //make visible the download form
                formGroupDownload.style.display = 'flex';
                return;
            }
        }
        //make invisible the download form
        formGroupDownload.style.display = 'none';

    }
    
}

function getTotalPrice() {
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

    const language = getCookie('language');

    let bookString = '';
    let totalPrice = 0;
    let book = false;
    let shippingcost = false;
    for (let item of cartItems) {
        if (item.type !== 'book' || book) {
            totalPrice += parseFloat(item.price);
        } else {
            book = true;
            totalPrice += 0;
            if (language === 'de') {
                bookString += ' + Preis der Bücher auf Anfrage';
            } else {
                bookString += '+ Price of the books on request';
            }
        }

        if (item.type === 'dvd' && !shippingcost) {
            shippingcost = true;
            if (language === 'de') {
                bookString += ' + Versandkosten der DVDs';
            } else {
                bookString += '+ Shipping costs of the DVDs';
            }
        }


    }
    return `${totalPrice.toFixed(2)} € ${bookString}`;
}

