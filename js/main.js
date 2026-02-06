console.log("✅ Readify JavaScript loaded!");

// ============================================
// ROTATING QUOTES
// ============================================
const quotes = [
    { text: "A reader lives a thousand lives before he dies.", author: "George R.R. Martin" },
    { text: "The only thing you absolutely have to know is the location of the library.", author: "Albert Einstein" },
    { text: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
    { text: "Books are a uniquely portable magic.", author: "Stephen King" },
    { text: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero" }
];

let currentQuoteIndex = 0;

function rotateQuote() {
    const quoteElement = document.querySelector('.quote-text');
    const authorElement = document.querySelector('.quote-author');
    
    if (quoteElement && authorElement) {
        // Fade out
        quoteElement.style.opacity = '0';
        authorElement.style.opacity = '0';
        
        setTimeout(() => {
            // Change quote
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            quoteElement.textContent = `"${quotes[currentQuoteIndex].text}"`;
            authorElement.textContent = `- ${quotes[currentQuoteIndex].author}`;
            
            // Fade in
            quoteElement.style.opacity = '1';
            authorElement.style.opacity = '1';
        }, 500);
    }
}

// Add transition to quote elements
document.addEventListener('DOMContentLoaded', function() {
    const quoteElement = document.querySelector('.quote-text');
    const authorElement = document.querySelector('.quote-author');
    
    if (quoteElement && authorElement) {
        quoteElement.style.transition = 'opacity 0.5s';
        authorElement.style.transition = 'opacity 0.5s';
        
        // Rotate every 5 seconds
        setInterval(rotateQuote, 5000);
    }
});

// ============================================
// AUTHOR OF THE DAY
// ============================================
const authors = [
    {
        name: "Jane Austen",
        bio: "English novelist known for her six major novels, including Pride and Prejudice and Sense and Sensibility, which critique the British landed gentry at the end of the 18th century."
    },
    {
        name: "Mark Twain",
        bio: "American writer, humorist, and entrepreneur famous for The Adventures of Tom Sawyer and Adventures of Huckleberry Finn, often called the 'Great American Novel'."
    },
    {
        name: "J.K. Rowling",
        bio: "British author best known for the Harry Potter series, which has won multiple awards and sold more than 500 million copies, becoming the best-selling book series in history."
    },
    {
        name: "Stephen King",
        bio: "American author of horror, supernatural fiction, suspense, crime, and fantasy novels. His books have sold more than 350 million copies worldwide."
    },
    {
        name: "Agatha Christie",
        bio: "English writer known for her detective novels, particularly those featuring Hercule Poirot and Miss Marple. Her novels have sold over 2 billion copies worldwide."
    },
    {
        name: "Ernest Hemingway",
        bio: "American novelist and short-story writer whose economical and understated style had a strong influence on 20th-century fiction. Nobel Prize winner in Literature."
    },
    {
        name: "George Orwell",
        bio: "English novelist, essayist, and critic famous for his works including Nineteen Eighty-Four and Animal Farm, which have become classics of dystopian literature."
    }
];

function getAuthorOfDay() {
    const today = new Date();
    // Calculate day of year
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Use day of year to select author
    const authorIndex = dayOfYear % authors.length;
    return authors[authorIndex];
}

function displayAuthorOfDay() {
    const author = getAuthorOfDay();
    const nameElement = document.getElementById('authorName');
    const bioElement = document.getElementById('authorBio');
    
    if (nameElement && bioElement) {
        nameElement.textContent = author.name;
        bioElement.textContent = author.bio;
    }
}

// Display author when page loads
document.addEventListener('DOMContentLoaded', displayAuthorOfDay);

// ============================================
// HAMBURGER MENU
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
});

// ============================================
// NEWSLETTER FORM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newsletterForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletterEmail');
            const message = document.getElementById('newsletterMessage');
            const email = emailInput.value;
            
            // Save to localStorage
            localStorage.setItem('newsletterEmail', email);
            
            // Show confirmation
            message.textContent = '✅ Thank you for subscribing!';
            message.style.color = '#2ecc71';
            
            // Clear form
            emailInput.value = '';
            
            // Hide message after 3 seconds
            setTimeout(() => {
                message.textContent = '';
            }, 3000);
        });
    }
});

console.log("✅ All scripts initialized!");