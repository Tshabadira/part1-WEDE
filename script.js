// script.js - Comprehensive JavaScript for FindRes Website

// =============================================
// 1. INTERACTIVE ELEMENTS & ENHANCEMENTS
// =============================================

// Accordion functionality for FAQ/Service sections
document.addEventListener('DOMContentLoaded', function() {
    initializeAccordions();
    initializeImageLightbox();
    initializeSearchFilter();
    initializeFormValidation();
    initializeDynamicContent();
    initializeSmoothScroll();
});

// Accordion functionality
function initializeAccordions() {
    const accordions = document.querySelectorAll('.accordion-header');
    
    accordions.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = this.nextElementSibling;
            
            // Close all other accordions
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== accordionItem) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                }
            });
            
            // Toggle current accordion
            accordionItem.classList.toggle('active');
            if (accordionContent.style.maxHeight) {
                accordionContent.style.maxHeight = null;
            } else {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
            }
        });
    });
}

// Image Lightbox Gallery
function initializeImageLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    if (galleryImages.length === 0) return;
    
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close">&times;</span>
            <img src="" alt="Lightbox Image">
            <div class="lightbox-caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);

    galleryImages.forEach(image => {
        image.addEventListener('click', function(e) {
            e.preventDefault();
            const lightboxImg = lightbox.querySelector('img');
            const caption = lightbox.querySelector('.lightbox-caption');
            
            lightboxImg.src = this.src;
            caption.textContent = this.alt;
            lightbox.style.display = 'flex';
        });
    });

    lightbox.querySelector('.close').addEventListener('click', function() {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target !== this.querySelector('img')) {
            lightbox.style.display = 'none';
        }
    });
}

// Smooth scrolling for navigation
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// =============================================
// 2. DYNAMIC CONTENT & SEARCH FUNCTIONALITY
// =============================================

// Sample residence data (would typically come from API)
const residencesData = [
    {
        id: 1,
        name: "Student Housing",
        price: 3500,
        type: "single",
        location: "Near UFS",
        payment: ["NSFAS", "CASH"],
        image: "https://th.bing.com/th/id/R.c8041742884b502d250da75be9a4729f?rik=d7YnUgK%2fJHFw6Q&riu=http%3a%2f%2fcms.studentaccommodation.co.za%2fimages%2fListingImages%2for_f859bead4017482d86c61d4f35b90337.jpg&ehk=ZKLUEmg%2bKyR4Wy8tbrbyI1W8HxZCmlYafxeSr8W3S3E%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
    },
    {
        id: 2,
        name: "Central House",
        price: 4000,
        type: "single",
        location: "Central Location",
        payment: ["NSFAS", "CASH", "BURSARY"],
        image: "https://images.prop24.com/334720998"
    },
    {
        id: 3,
        name: "Palace House",
        price: 2500,
        type: "single",
        location: "Suburban Area",
        payment: ["NSFAS", "CASH"],
        image: "https://images.rentuncle.co.za/photos/3814423-m-00698c2e72245dec/Student-Accommodation-Bloemfontein.jpg"
    },
    {
        id: 4,
        name: "Villa House",
        price: 2300,
        type: "single",
        location: "Quiet Neighborhood",
        payment: ["CASH"],
        image: "https://tse1.mm.bing.net/th/id/OIP.JGP7c8D4u7cruGYZoZi_SAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
    }
];

// Search and filter functionality
function initializeSearchFilter() {
    const searchForm = document.querySelector('.search-container');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            filterResidences();
        });
    }
}

function filterResidences() {
    const university = document.querySelector('select:nth-of-type(1)')?.value || 'Any';
    const propertyType = document.querySelector('select:nth-of-type(2)')?.value || 'Any';
    const paymentType = document.querySelector('select:nth-of-type(3)')?.value || 'Any';
    const maxRent = document.querySelector('select:nth-of-type(4)')?.value || 'Any';

    let filteredResidences = residencesData.filter(residence => {
        let matches = true;
        
        if (paymentType !== 'Any' && !residence.payment.includes(paymentType)) {
            matches = false;
        }
        
        if (maxRent !== 'Any' && residence.price > parseInt(maxRent)) {
            matches = false;
        }
        
        return matches;
    });

    displayFilteredResults(filteredResidences);
}

function displayFilteredResults(residences) {
    const resultsContainer = document.getElementById('search-results') || createResultsContainer();
    resultsContainer.innerHTML = '';

    if (residences.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">No residences found matching your criteria.</p>';
        return;
    }

    residences.forEach(residence => {
        const residenceCard = document.createElement('div');
        residenceCard.className = 'residence-card';
        residenceCard.innerHTML = `
            <img src="${residence.image}" alt="${residence.name}" class="res-card">
            <h3>${residence.name}</h3>
            <p><strong>Price:</strong> R${residence.price}/month</p>
            <p><strong>Payment Options:</strong> ${residence.payment.join(', ')}</p>
            <p><strong>Location:</strong> ${residence.location}</p>
            <a href="res${residence.id}.html" class="view-details-btn">View Details</a>
        `;
        resultsContainer.appendChild(residenceCard);
    });
}

function createResultsContainer() {
    const container = document.createElement('div');
    container.id = 'search-results';
    container.className = 'search-results-container';
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
        searchContainer.after(container);
    }
    return container;
}

// Dynamic content loading
function initializeDynamicContent() {
    // Load featured residences on homepage
    if (document.querySelector('.residences-container')) {
        loadFeaturedResidences();
    }
    
    // Initialize any dynamic elements based on current page
    updateActiveNavLink();
}

function loadFeaturedResidences() {
    // This would typically fetch from an API
    const featuredContainer = document.querySelector('.residences-container');
    if (featuredContainer) {
        // Content is already in HTML, but we can enhance it
        addHoverEffects();
    }
}

function addHoverEffects() {
    const residenceCards = document.querySelectorAll('.res-card');
    residenceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-item');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// =============================================
// 3. FORM VALIDATION & FUNCTIONALITY
// =============================================

function initializeFormValidation() {
    const enquiryForm = document.querySelector('.enquiry-page-form');
    const contactForm = document.querySelector('form[action*="contact"]');
    
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', validateEnquiryForm);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', validateContactForm);
    }
    
    // Real-time validation
    initializeRealTimeValidation();
    
    // Prevent numbers in name fields
    preventNumbersInNameFields();
}

// Prevent numbers in name fields
function preventNumbersInNameFields() {
    const nameFields = document.querySelectorAll('input[type="text"][id="name"], input[type="text"][name="name"]');
    
    nameFields.forEach(field => {
        field.addEventListener('input', function(e) {
            // Remove any numbers that were entered
            this.value = this.value.replace(/[0-9]/g, '');
        });
        
        field.addEventListener('keypress', function(e) {
            // Prevent number keys from being pressed
            if (e.key >= '0' && e.key <= '9') {
                e.preventDefault();
            }
        });
    });
}

function validateEnquiryForm(e) {
    e.preventDefault();
    const form = e.target;
    let isValid = true;
    
    // Clear previous errors
    clearErrors(form);
    
    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showError(field, 'This field is required');
            isValid = false;
        }
    });
    
    // Validate full name (letters only, at least 2 characters)
    const nameField = form.querySelector('input[type="text"][id="name"], input[type="text"][name="name"]');
    if (nameField && !isValidName(nameField.value)) {
        showError(nameField, 'Please enter a valid full name (letters only, minimum 2 characters)');
        isValid = false;
    }
    
    // Validate email
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && !isValidEmail(emailField.value)) {
        showError(emailField, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone number (exactly 10 digits)
    const phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value && !isValidPhone(phoneField.value)) {
        showError(phoneField, 'Please enter a valid 10-digit phone number');
        isValid = false;
    }
    
    // Validate message length
    const messageField = form.querySelector('textarea[name="message"]');
    if (messageField && messageField.value.length < 10) {
        showError(messageField, 'Please enter a message with at least 10 characters');
        isValid = false;
    }
    
    if (isValid) {
        submitEnquiryForm(form);
    }
}

function validateContactForm(e) {
    e.preventDefault();
    const form = e.target;
    let isValid = true;
    
    clearErrors(form);
    
    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showError(field, 'This field is required');
            isValid = false;
        }
    });
    
    // Validate full name (letters only, at least 2 characters)
    const nameField = form.querySelector('input[type="text"][id="name"], input[type="text"][name="name"]');
    if (nameField && !isValidName(nameField.value)) {
        showError(nameField, 'Please enter a valid full name (letters only, minimum 2 characters)');
        isValid = false;
    }
    
    // Validate email
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && !isValidEmail(emailField.value)) {
        showError(emailField, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone number (exactly 10 digits)
    const phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value && !isValidPhone(phoneField.value)) {
        showError(phoneField, 'Please enter a valid 10-digit phone number');
        isValid = false;
    }
    
    // Validate message length
    const messageField = form.querySelector('textarea[name="message"]');
    if (messageField && messageField.value.length < 10) {
        showError(messageField, 'Please enter a message with at least 10 characters');
        isValid = false;
    }
    
    if (isValid) {
        submitContactForm(form);
    }
}

function initializeRealTimeValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
                
                // Real-time phone number formatting and validation
                if (this.type === 'tel') {
                    formatPhoneNumber(this);
                }
            });
        });
    });
}

function validateField(field) {
    clearFieldError(field);
    
    if (field.hasAttribute('required') && !field.value.trim()) {
        showError(field, 'This field is required');
        return false;
    }
    
    // Name field validation
    if ((field.type === 'text' && (field.id === 'name' || field.name === 'name')) && field.value && !isValidName(field.value)) {
        showError(field, 'Please enter a valid name (letters only, minimum 2 characters)');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
        showError(field, 'Please enter a valid email address');
        return false;
    }
    
    // Phone validation
    if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
        showError(field, 'Please enter a valid 10-digit phone number');
        return false;
    }
    
    // Message validation
    if (field.name === 'message' && field.value && field.value.length < 10) {
        showError(field, 'Message must be at least 10 characters long');
        return false;
    }
    
    return true;
}

// Validation functions
function isValidName(name) {
    // Allows letters, spaces, hyphens, apostrophes - minimum 2 characters
    const nameRegex = /^[A-Za-z\s\-']{2,}$/;
    return nameRegex.test(name.trim());
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Remove all non-digit characters and check if exactly 10 digits
    const cleanedPhone = phone.replace(/\D/g, '');
    return cleanedPhone.length === 10;
}

function formatPhoneNumber(phoneField) {
    // Remove all non-digit characters
    let phoneValue = phoneField.value.replace(/\D/g, '');
    
    // Limit to 10 digits
    if (phoneValue.length > 10) {
        phoneValue = phoneValue.substring(0, 10);
    }
    
    // Format as XXX XXX XXXX
    if (phoneValue.length > 6) {
        phoneField.value = phoneValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    } else if (phoneValue.length > 3) {
        phoneField.value = phoneValue.replace(/(\d{3})(\d{3})/, '$1 $2');
    } else {
        phoneField.value = phoneValue;
    }
}

function showError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function clearErrors(form) {
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const errorFields = form.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
}

// Form submission handlers
function submitEnquiryForm(form) {
    const formData = new FormData(form);
    const enquiryData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        university: formData.get('university'),
        service: formData.get('service'),
        budget: formData.get('budget'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    // Simulate AJAX submission
    showLoadingState(form, true);
    
    setTimeout(() => {
        showLoadingState(form, false);
        showSuccessMessage(form, 'Thank you for your enquiry! We will get back to you within 24 hours.');
        form.reset();
        
        // Log enquiry for demo purposes
        console.log('Enquiry submitted:', enquiryData);
    }, 2000);
}

function submitContactForm(form) {
    const formData = new FormData(form);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject') || 'General Enquiry',
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    // Simulate email sending
    showLoadingState(form, true);
    
    setTimeout(() => {
        showLoadingState(form, false);
        showSuccessMessage(form, 'Your message has been sent successfully! We will respond as soon as possible.');
        form.reset();
        
        // Create email content
        const emailBody = `Name: ${contactData.name}%0D%0AEmail: ${contactData.email}%0D%0ASubject: ${contactData.subject}%0D%0AMessage: ${contactData.message}`;
        const mailtoLink = `mailto:info@findres.com?subject=Contact Form: ${contactData.subject}&body=${emailBody}`;
        
        // For demo purposes, show the mailto link
        console.log('Email link:', mailtoLink);
        // Uncomment the line below to actually open email client
         window.location.href = mailtoLink;
    }, 2000);
}

function showLoadingState(form, isLoading) {
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (isLoading) {
        submitButton.disabled = true;
        submitButton.setAttribute('data-original-text', submitButton.innerHTML);
        submitButton.innerHTML = 'Sending...';
        submitButton.classList.add('loading');
    } else {
        submitButton.disabled = false;
        submitButton.innerHTML = submitButton.getAttribute('data-original-text') || 'Submit';
        submitButton.classList.remove('loading');
    }
}

function showSuccessMessage(form, message) {
    // Remove any existing success messages
    const existingSuccess = form.parentNode.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.innerHTML = `
        <div class="success-content">
            <span class="success-icon">✓</span>
            <p>${message}</p>
        </div>
    `;
    
    form.parentNode.insertBefore(successElement, form);
    
    setTimeout(() => {
        successElement.remove();
    }, 5000);
}

// =============================================
// 4. SEO & PERFORMANCE ENHANCEMENTS
// =============================================

// Dynamic meta tags for better SEO
function updateMetaTags() {
    const pageTitle = document.title;
    const pageDescription = getPageDescription();
    
    // Update meta description if not present
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
    }
    metaDescription.content = pageDescription;
    
    // Add structured data for better SEO
    addStructuredData();
}

function getPageDescription() {
    const currentPage = window.location.pathname.split('/').pop();
    const descriptions = {
        'homepage.html': 'FindRes - Connect students with affordable and reliable student residences near universities and colleges in South Africa.',
        'services.html': 'FindRes services - Student residence listings, NSFAS-approved accommodation, flexible rental options and 24/7 support.',
        'enquiry.html': 'Submit an enquiry about student accommodation. Get information about available residences, NSFAS housing, and rental options.',
        'aboutus.html': 'Learn about FindRes history, mission and vision. Providing students with reliable housing options since 2025.',
        'contact.html': 'Contact FindRes for student accommodation assistance. Email, phone and contact form available.'
    };
    
    return descriptions[currentPage] || 'FindRes - Your trusted student accommodation platform in South Africa.';
}

function addStructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "FindRes",
        "url": window.location.origin,
        "logo": window.location.origin + "/logo.png",
        "description": "Student accommodation platform connecting students with affordable residences near universities",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bloemfontein",
            "addressCountry": "South Africa"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+067-871-7944",
            "contactType": "customer service",
            "email": "info@findres.com"
        }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

// Lazy loading for images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Update the DOMContentLoaded event in script.js
document.addEventListener('DOMContentLoaded', function() {
    initializeAccordions();
    initializeImageLightbox();
    initializeSearchFilter();
    initializeFormValidation();
    initializeDynamicContent();
    initializeSmoothScroll();
    initializeLazyLoading();
    updateMetaTags();
    addStructuredData();
    
    // Initialize maps - choose one version:
    initializeMap(); // Simple version
    // initializeInteractiveMap(); // Interactive version with filters
});

// Performance monitoring
window.addEventListener('load', function() {
    // Log performance metrics
    if (window.performance) {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
});

// Error handling for better user experience
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEnquiryForm,
        validateContactForm,
        filterResidences,
        initializeAccordions
    };
}
// Add to script.js
function initializeMap() {
    // Simple Google Maps implementation
    const mapElement = document.getElementById('map');
    if (mapElement) {
        mapElement.innerHTML = `
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3482.23456789!2d26.123456!3d-29.123456!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDA3JzI0LjQiUyAyNsKwMDcnMjQuNCJF!5e0!3m2!1sen!2sza!4v1234567890" 
                width="100%" 
                height="400" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy">
            </iframe>
        `;
    }
}
// =============================================
// 5. INTERACTIVE MAP FUNCTIONALITY
// =============================================

function initializeMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    // Bloemfontein coordinates -29.0852, 26.1596
    const bloemfonteinCoords = { lat: -29.0852, lng: 26.1596 };
    
    // Create map container
    mapElement.innerHTML = `
        <div class="map-container">
            <div class="map-placeholder">
                <div class="map-info">
                    <h3>FindRes Headquarters</h3>
                    <p>📍 123 University Road, Bloemfontein Central</p>
                    <p>📍 Near University of Free State & Central University of Technology</p>
                    <p>📍 Easy access to all major colleges</p>
                </div>
                <div class="map-image">
                    <img src="https://maps.googleapis.com/maps/api/staticmap?center=-29.0852,26.1596&zoom=13&size=600x300&markers=color:red%7C-29.0852,26.1596&key=AIzaSyCwSJQw" 
                         alt="FindRes Location in Bloemfontein" 
                         style="width: 100%; height: 300px; border-radius: 8px;">
                </div>
                <div class="map-actions">
                    <button onclick="openGoogleMaps()" class="view-map-btn">Open in Google Maps</button>
                    <button onclick="getDirections()" class="directions-btn">Get Directions</button>
                </div>
            </div>
        </div>
    `;
}

function openGoogleMaps() {
    const url = `https://www.google.com/maps?q=-29.0852,26.1596&z=15`;
    window.open(url, '_blank');
}

function getDirections() {
    const url = `https://www.google.com/maps/dir//-29.0852,26.1596/@-29.0852,26.1596,15z`;
    window.open(url, '_blank');
}

// Enhanced map with interactive features
function initializeInteractiveMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Create interactive map with multiple markers for student areas
    mapElement.innerHTML = `
        <div class="interactive-map">
            <div class="map-controls">
                <button class="map-btn active" data-area="all">All Areas</button>
                <button class="map-btn" data-area="ufs">Near UFS</button>
                <button class="map-btn" data-area="cut">Near CUT</button>
                <button class="map-btn" data-area="colleges">Near Colleges</button>
            </div>
            <div class="map-content">
                <div class="map-visual">
                    <img src="https://via.placeholder.com/600x300/4A90E2/FFFFFF?text=Bloemfontein+Student+Accommodation+Map" 
                         alt="Bloemfontein Student Accommodation Map" 
                         class="map-image">
                    <div class="map-marker" style="top: 40%; left: 45%;" data-area="ufs">
                        <div class="marker-dot"></div>
                        <div class="marker-info">UFS Area Residences</div>
                    </div>
                    <div class="map-marker" style="top: 55%; left: 60%;" data-area="cut">
                        <div class="marker-dot"></div>
                        <div class="marker-info">CUT Area Residences</div>
                    </div>
                    <div class="map-marker" style="top: 35%; left: 70%;" data-area="colleges">
                        <div class="marker-dot"></div>
                        <div class="marker-info">College Area Residences</div>
                    </div>
                </div>
                <div class="map-legend">
                    <h4>Student Accommodation Areas</h4>
                    <div class="legend-item">
                        <span class="legend-color ufs"></span>
                        <span>University of Free State Area</span>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color cut"></span>
                        <span>Central University of Technology Area</span>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color colleges"></span>
                        <span>College District Area</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add map controls functionality
    initializeMapControls();
}

function initializeMapControls() {
    const mapButtons = document.querySelectorAll('.map-btn');
    const markers = document.querySelectorAll('.map-marker');
    
    mapButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            mapButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const area = this.dataset.area;
            
            // Show/hide markers based on selection
            markers.forEach(marker => {
                if (area === 'all' || marker.dataset.area === area) {
                    marker.style.display = 'block';
                } else {
                    marker.style.display = 'none';
                }
            });
        });
    });
}