// navigation.js - Hamburger Menu Handler
console.log("🍔 Navigation.js loaded");

function initializeNavigation() {
    console.log("Initializing navigation...");
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    console.log("Hamburger element:", hamburger);
    console.log("NavMenu element:", navMenu);
    
    if (!hamburger || !navMenu) {
        console.error("❌ Navigation elements not found!");
        return;
    }
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = navMenu.classList.contains('active');
        console.log("Hamburger clicked! Current state:", isActive ? "active" : "inactive");
        
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        console.log("New state:", navMenu.classList.contains('active') ? "active" : "inactive");
    });
    
    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    console.log("✅ Navigation initialized successfully");
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNavigation);
} else {
    initializeNavigation();
}