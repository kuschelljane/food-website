//show the hamburger menu 
const hamburgerMenu = document.querySelector(".hamburger-menu");
const nav = document.querySelector(".navbar");
const links = document.querySelectorAll(".link"); 

hamburgerMenu.addEventListener("click", () => {
    nav.classList.toggle("active");
});

links.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
});

//click on search icon to show input value
const searchIcon = document.getElementById('search');
const selectStore = document.querySelector('.select-store');
const menuLink = document.querySelector('.view-menu');
const inputDiv = document.querySelector('.input');
const closeIcon = document.querySelector('.close');

searchIcon.addEventListener('click', function() {
    searchIcon.style.display = 'none'; 
    selectStore.style.display = 'none';
    menuLink.style.display = 'none';
    inputDiv.style.display = 'block';
    closeIcon.style.display = 'block'; 

    var menuDiv = document.getElementById('topseller');
    menuDiv.scrollIntoView({ behavior: 'smooth' });
    
});

//to hide input value
closeIcon.addEventListener('click', function() {
    searchIcon.style.display = 'block'; 
    selectStore.style.display = 'block';
    menuLink.style.display = 'block';
    inputDiv.style.display = 'none';
    closeIcon.style.display = 'none'; 

    var headerDiv = document.getElementById('award');
    headerDiv.scrollIntoView({ behavior: 'smooth' });

    const highlightedWords = document.querySelectorAll('.highlight');
    highlightedWords.forEach(function(word) {
        word.outerHTML = word.innerHTML;
    });

    document.getElementById("searchinput").value = "";
});

document.getElementById("searchinput").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
        document.getElementById("search-button").click();
    }
});


const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", function() {
    const input = document.getElementById("searchinput");
    const inputValue = input.value.trim(); 
    const contentElement = document.querySelector('.topseller-container'); 

    if (inputValue !== '') {
     const content = contentElement.innerHTML;
     const highlightedContent = content.replace(
        new RegExp(inputValue, 'gi'),
        '<span class="highlight">$&</span>'
     );
     contentElement.innerHTML = highlightedContent;

    const highlightedWords = contentElement.querySelectorAll('.highlight');
    if (highlightedWords.length === 0) {
        Swal.fire({ 
            icon: "info",
            text: "No dish matches the input value.",
            timer: "3000",
            showConfirmButton: false,
            width: "400",
            padding: "20px",
            color: "#333",
          });
    }

    } else {
        Swal.fire({ 
            icon: "warning",
            text: "Start typing the name of the dish. ",
            timer: "3000",
            showConfirmButton: false,
            width: "400",
            padding: "20px",
            color: "#333",
          });
     }
}); 


const foods = [
    {
        image: "images/food1.svg",
        name: "Tabbouleh",
        description: "Parsley bulgur wheat and tomato salad a staple of Lebanese cuisine.",
        price: "6.99"
    },
    {
        image: "images/food2.svg",
        name: "Falafel (3 Pieces)",
        description: "Finely ground garbanzo beans, cilantro, and onions, formed into patties.",
        price: "5.99"
    },
    {
        image: "images/food3.svg",
        name: "Grilled Veggie Salad (Chilled)",
        description: "Parsley bulgur wheat and tomato salad a staple of Lebanese cuisine.",
        price: "5.99"
    },
    {
        image: "images/food1.svg",
        name: "Tabbouleh",
        description: "Parsley bulgur wheat and tomato salad a staple of Lebanese cuisine.",
        price: "6.99"
    },
    {
        image: "images/food2.svg",
        name: "Falafel (3 Pieces)",
        description: "Finely ground garbanzo beans, cilantro, and onions, formed into patties.",
        price: "5.99"
    },
    {
        image: "images/food3.svg",
        name: "Grilled Veggie Salad (Chilled)",
        description: "Parsley bulgur wheat and tomato salad a staple of Lebanese cuisine.",
        price: "5.99"
    },
    {
        image: "images/food1.svg",
        name: "Tabbouleh",
        description: "Parsley bulgur wheat and tomato salad a staple of Lebanese cuisine.",
        price: "6.99"
    },
    {
        image: "images/food2.svg",
        name: "Falafel (3 Pieces)",
        description: "Finely ground garbanzo beans, cilantro, and onions, formed into patties.",
        price: "5.99"
    },
    {
        image: "images/food3.svg",
        name: "Grilled Veggie Salad (Chilled)",
        description: "Parsley bulgur wheat and tomato salad a staple of Lebanese cuisine.",
        price: "5.99"
    }
];

const topsellerValues = document.getElementById('topsellerList');
foods.forEach(food => {
    const li = document.createElement('li');
    li.className = 'slide post video';

    li.innerHTML = `
        <img src="${food.image}" alt="Food"/>
        <h3>${food.name}</h3>
        <p>${food.description}</p>
        <div class="price">
            <p>$<span>${food.price}</span></p>
            <button class="add">ADD TO CART</button>
        </div>
    `;
    topsellerValues.appendChild(li);
});


const events = {
    mobile: {
        start: "touchstart",
        move: "touchmove",
        end: "touchend"
    },
    desktop: {
        start: "mousedown",
        move: "mousemove",
        end: "mouseup"
    }
};

class Swiper {
constructor(selector) {
    this.container = document.querySelector(selector);
    this.startPosition = 0;
    this.slideWidth = document.querySelector(".slide").offsetWidth;
    this.scrollValue = this.slideWidth + 10;
    this.slidesCount = this.container.querySelectorAll(".slide").length;
    this.transformValue = 0;
    this._move = this._move.bind(this);
    this._endMove = this._endMove.bind(this);
    let isMobile =
    "ontouchstart" in window ||
    (window.DocumentTouch && document instanceof DocumentTouch);
    this.eventType = isMobile ? "mobile" : "desktop";
}
initHandlers() {
this.container.addEventListener(events[this.eventType].start, e => {
    this.startPosition = e.clientX || e.changedTouches[0].clientX;
    document.body.addEventListener(events[this.eventType].move, this._move);
    document.body.addEventListener(events[this.eventType].end, this._endMove);
});

this.container.querySelectorAll('.add').forEach(button => {
    button.addEventListener(events[this.eventType].start, e => {
        e.stopPropagation();
    });
});}
_move(e) {
    e.preventDefault();
    let nextPosition = e.clientX || e.changedTouches[0].clientX;
    let shift = this.startPosition - nextPosition + this.transformValue;
    this.container.style.transform = `translateX(${-shift}px)`;
}
_endMove(e) {
    document.body.removeEventListener(events[this.eventType].move, this._move);
    document.body.removeEventListener(
    events[this.eventType].end,
    this._endMove
    );
    this.container.classList.add("animate");

    let endPosition = e.clientX || e.changedTouches[0].clientX;
    let moveDirection = this.startPosition >= endPosition ? "left" : "right";
    let newCoordinate = 0;

    if (moveDirection === "left") {
    newCoordinate = this.transformValue + this.scrollValue;
    } else {
    newCoordinate = this.transformValue - this.scrollValue;
    }

    if (
    newCoordinate >= 0 &&
    newCoordinate < this.slidesCount * this.scrollValue
    ) {
    this.transformValue = newCoordinate;
    }

    this.container.style.transform = `translateX(${-this.transformValue}px)`;

    this.animationTimeoutID = setTimeout(() => {
    this.container.classList.remove("animate");
    }, 300);
}
}

let swiper = new Swiper(".topseller-wrapper");
swiper.initHandlers();


const buttons = document.querySelectorAll(".add");
const originalButtonTexts = [];
buttons.forEach(button => {

    originalButtonTexts.push(button.textContent);

    button.addEventListener("click", function() {
        button.textContent = "ADDED";
        button.classList.add("clicked"); 
        button.disabled = true; 
    });
});


var select = document.getElementById('store');
var p = document.getElementById('store-location');

const originalValue = select.value;

select.addEventListener('change', () => {
    p.innerHTML = select.options[select.selectedIndex].value;
})

const badgeIcon = document.getElementById('badge'); 
badgeIcon.addEventListener('click', function (){
    const cartValues = document.querySelectorAll('.cart-values');
    cartValues.forEach(cart => {
        if (cart.style.display === 'block') {
            cart.style.display = 'none';
        } else {
            cart.style.display = 'block';
        }
    });
});

const orderIcon = document.getElementById('circle'); 
orderIcon.addEventListener('click', function() {
    if (value === 0) {
        Swal.fire({ 
            icon: "question",
            title: "Hungry?",
            text: "There are no items in your cart yet. Continue browsing our top sellers and menu. ",
            timer: "3000",
            showConfirmButton: false,
            width: "400",
            padding: "20px",
            color: "#333",
        });
    }
    else {
        const cartValues = document.querySelectorAll('.cart-values');
        cartValues.forEach(cart => {
            cart.style.display = 'block'; 
    });
    }
})

const checkoutIcon = document.getElementById('checkout'); 
checkoutIcon.addEventListener('click', function () {
    if (value === 0) {
        Swal.fire({ 
            icon: "error",
            text: "There are no items in your cart yet.",
            timer: "3000",
            showConfirmButton: false,
            width: "400",
            padding: "20px",
            color: "#333",
        });
    }
    else if (select.value === 'Locations' && value > 0){
        Swal.fire({ 
            icon: "error",
            text: "Select your preferred restaurant from our locations. ",
            timer: "3000",
            showConfirmButton: false,
            width: "400",
            padding: "20px",
            color: "#333",
        });
    }
    else {
        Swal.fire({ 
            icon: "success",
            title: "Order Received!", 
            text: "The restaurant has been notified for your order. ",
            timer: "3000",
            showConfirmButton: false,
            width: "400",
            padding: "20px",
            color: "#333",
        });
        const productItems = document.querySelectorAll('.product');
            productItems.forEach(product => {
            product.remove(); 
            });
        value = 0;
        badge.setAttribute('value', value.toString());      
        const totalElement = document.querySelector('.total-price');
        totalElement.textContent = '0.00';

        const productLine = document.querySelector('.cart-line');
            if (productLine) {
                productLine.remove();
        } 

        select.value = originalValue;
        p.innerHTML = select.value;

        buttons.forEach((button, index) => {
            button.textContent = originalButtonTexts[index];
            button.classList.remove("clicked"); 
            button.disabled = false; 
        });

        const cartValues = document.querySelectorAll('.cart-values');
        cartValues.forEach(cart => {
            cart.style.display = 'none'; 
    });
    }
})

const addToCartButtons = document.querySelectorAll('.add');
const cartContainer = document.querySelector('.cart-values');
const badge = document.querySelector('.badge');
let value = 0;

addToCartButtons.forEach(button => {
button.addEventListener('click', () => {
    Swal.fire({ 
        icon: "success",
        text: "Dish has been successfully added.",
        timer: "2000",
        showConfirmButton: false,
        position: "top-end",
        width: "400",
        padding: "20px",
        color: "#333",
      });

    value++;
    badge.setAttribute('value', value.toString());
        
    const slide = button.closest('.slide');
    const imageSrc = slide.querySelector('img').src;
    const title = slide.querySelector('h3').textContent;
    const priceSpan = slide.querySelector('.price p span');
    const price = parseFloat(priceSpan.textContent);
        
    const product = document.createElement('div');
    product.classList.add('product');
    product.dataset.addedToCart = true;
        
    const productImage = document.createElement('div');
    productImage.classList.add('product-image');
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = "Food";
    productImage.appendChild(img);
        
    const productTitle = document.createElement('div');
    productTitle.classList.add('product-title');
    productTitle.textContent = title;
        
    const productPrice = document.createElement('div');
    productPrice.classList.add('product-price');
    productPrice.textContent = '$' + price.toFixed(2); 
        
    product.appendChild(productImage);
    product.appendChild(productTitle);
    product.appendChild(productPrice);
        
    const cartValues = document.querySelector('.cart-values');
    cartValues.appendChild(product);

    if (cartValues.querySelectorAll('.product').length > 0) {
        const hr = document.createElement('hr');
        hr.classList.add('cart-line');
        cartValues.appendChild(hr);
    }

    const cartProducts = document.querySelectorAll('.product');
    let totalPrice = 0; 

    cartProducts.forEach(product => {
    const addedToCart = product.dataset.addedToCart === 'true';
        if (addedToCart) {
            const priceText = product.querySelector('.product-price').textContent;
            const price = parseFloat(priceText.replace('$', '')); 
            totalPrice += price; 
        }
    });

    const totalElement = document.querySelector('.total-price');
    totalElement.textContent = totalPrice.toFixed(2);

    });
});

const menuItems = document.querySelectorAll('.menu-text h1');
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        menuItems.forEach(item => {
            item.classList.remove('active');
        });
        item.classList.add('active');

        const menuImages = document.querySelector('.menu-images');
        menuImages.classList.remove('active');
        setTimeout(() => {
            menuImages.classList.add('active');
        }, 10); 
        
    });
});

const eventTargets = [
    { selector: '.footer-location', target: '.select-store' },
    { selector: '.footer-menu', target: '.view-menu' },
    { selector: '.footer-services', target: '#services' },
    { selector: '.footer-story', target: '#story' },
    { selector: '.footer-contact', target: '#contact' }
];

eventTargets.forEach(item => {
    document.querySelector(item.selector).addEventListener('click', function() {
        document.querySelector(item.target).classList.add('pulse');
    });
});

const footerSearch = document.querySelector('.footer-search');
footerSearch.addEventListener('click', function() {
    searchIcon.style.display = 'none'; 
    selectStore.style.display = 'none';
    menuLink.style.display = 'none';
    inputDiv.style.display = 'block';
    closeIcon.style.display = 'block'; 

    var menuDiv = document.getElementById('topseller');
    menuDiv.scrollIntoView({ behavior: 'smooth' });
});

const footerCart = document.querySelector('.footer-cart'); 
footerCart.addEventListener('click', function() {
    if (value === 0) {
        Swal.fire({ 
            icon: "question",
            title: "Hungry?",
            text: "There are no items in your cart yet. Continue browsing our top sellers and menu. ",
            timer: "3000",
            showConfirmButton: false,
            width: "400",
            padding: "20px",
            color: "#333",
        });
    }
    else {
        const cartValues = document.querySelectorAll('.cart-values');
        cartValues.forEach(cart => {
            cart.style.display = 'block'; 
    });
    }
});

const footerTopSellers = document.querySelector('.footer-top'); 
footerTopSellers.addEventListener('click', function () {
    var menuDiv = document.getElementById('topseller');
    menuDiv.scrollIntoView({ behavior: 'smooth' });
});

const arrowTop = document.querySelector('#arrow-top');
arrowTop.addEventListener('click', function () {
    var headerDiv = document.getElementById('award'); 
    headerDiv.scrollIntoView({behavior: 'smooth'}); 
});

const logoIcon = document.getElementById('footer-logo');
logoIcon.addEventListener('click', function () {
    var headerDiv = document.getElementById('award'); 
    headerDiv.scrollIntoView({behavior: 'smooth'}); 
});

