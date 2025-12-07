/**
 * THE SUITS WORLD - MAIN SCRIPT (UPDATED)
 * Fixes: Quick Add Button logic & General Interactions
 */

// --- 1. CART FUNCTIONALITY ---

// Initialize Cart
let cart = JSON.parse(localStorage.getItem('tsw_cart')) || [];

// DOM Elements
const cartCountEl = document.getElementById('cart-count');
const addToCartBtn = document.getElementById('addToCartBtn'); // Product Page Button
const quickAddBtns = document.querySelectorAll('.quick-add-btn'); // Index Page Buttons
const sizeBtns = document.querySelectorAll('.size-btn');

// Update Cart Count on Load
updateCartUI();

function updateCartUI() {
    if (cartCountEl) {
        cartCountEl.innerText = cart.length;
        // Bounce animation
        cartCountEl.parentElement.classList.add('animate-bounce');
        setTimeout(() => {
            cartCountEl.parentElement.classList.remove('animate-bounce');
        }, 1000);
    }
}

function addItemToCart(product) {
    cart.push(product);
    localStorage.setItem('tsw_cart', JSON.stringify(cart));
    updateCartUI();
}

// LOGIC FOR PRODUCT PAGE (Detailed Add)
let selectedSize = null;

if (sizeBtns) {
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            sizeBtns.forEach(b => {
                b.classList.remove('bg-brand-charcoal', 'text-white', 'border-brand-charcoal');
                b.classList.add('border-gray-300');
            });
            this.classList.remove('border-gray-300');
            this.classList.add('bg-brand-charcoal', 'text-white', 'border-brand-charcoal');
            selectedSize = this.innerText;
        });
    });
}

if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
        if (!selectedSize) {
            alert("Please select a size first.");
            return;
        }
        const product = {
            id: 'suit-detailed', 
            name: document.querySelector('h1').innerText,
            price: 30.00,
            size: selectedSize
        };
        
        addItemToCart(product);
        
        // Button Feedback
        const originalText = this.innerText;
        this.innerText = "Added to Bag ✓";
        this.classList.add('bg-brand-gold', 'text-black');
        setTimeout(() => {
            this.innerText = originalText;
            this.classList.remove('bg-brand-gold', 'text-black');
        }, 2000);
    });
}

// LOGIC FOR HOMEPAGE (Quick Add)
if (quickAddBtns) {
    quickAddBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Locate the specific card clicked
            const card = e.target.closest('.group');
            const title = card.querySelector('h3').innerText;
            const priceText = card.querySelector('p').innerText;
            
            // Clean price string (remove $)
            const price = parseFloat(priceText.replace('$', ''));

            const product = {
                id: 'suit-quick-' + Math.floor(Math.random() * 10000),
                name: title,
                price: price,
                size: '40 (Default)' // Quick Add assumes a standard size or triggers a modal in complex apps
            };

            addItemToCart(product);

            // Button Feedback (Show "Added" on the specific button)
            const originalText = this.innerText;
            this.innerText = "Added ✓";
            this.classList.remove('bg-brand-gold'); // Remove gold
            this.classList.add('bg-brand-charcoal', 'text-white'); // Make it dark
            
            setTimeout(() => {
                this.innerText = originalText;
                this.classList.add('bg-brand-gold');
                this.classList.remove('bg-brand-charcoal', 'text-white');
            }, 1500);
        });
    });
}

// --- 2. ANIMATIONS ---

// Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.reveal').forEach((el) => {
    el.classList.add('opacity-0');
    observer.observe(el);
});
