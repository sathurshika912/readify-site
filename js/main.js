console.log("✅ Readify JavaScript loaded!");

// ============================================
// ROTATING QUOTES (Home page only)
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
        quoteElement.style.opacity = '0';
        authorElement.style.opacity = '0';
        
        setTimeout(() => {
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            quoteElement.textContent = `"${quotes[currentQuoteIndex].text}"`;
            authorElement.textContent = `- ${quotes[currentQuoteIndex].author}`;
            
            quoteElement.style.opacity = '1';
            authorElement.style.opacity = '1';
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const quoteElement = document.querySelector('.quote-text');
    const authorElement = document.querySelector('.quote-author');
    
    if (quoteElement && authorElement) {
        quoteElement.style.transition = 'opacity 0.5s';
        authorElement.style.transition = 'opacity 0.5s';
        setInterval(rotateQuote, 5000);
    }
});

// ============================================
// AUTHOR OF THE DAY
// ============================================
const authors = [
    {
        name: "Kalki Krishnamurthy",
        bio: "Renowned Tamil writer and freedom fighter, best known for historical novels Ponniyin Selvan and Sivagamiyin Sabadham."
    },
    {
        name: "Jayakanthan",
        bio: "Jnanpith Award-winning Tamil writer exploring human psychology and social issues."
    },
    {
        name: "Sujatha",
        bio: "Prolific Tamil author who wrote over 100 novels, bridging Tamil literature with technology."
    },
    {
        name: "Perumal Murugan",
        bio: "Contemporary Tamil writer known for powerful novels exploring rural Tamil Nadu life."
    },
    {
        name: "Sivasankari",
        bio: "Acclaimed Tamil novelist and Padma Shri awardee known for strong female characters."
    },
    {
        name: "Jane Austen",
        bio: "English novelist known for Pride and Prejudice and other classics critiquing British society."
    },
    {
        name: "J.K. Rowling",
        bio: "British author of the Harry Potter series, the best-selling book series in history."
    },
    {
        name: "Stephen King",
        bio: "American author of horror and suspense with over 350 million books sold worldwide."
    },
    {
        name: "George Orwell",
        bio: "English novelist famous for Nineteen Eighty-Four and Animal Farm."
    },
    {
        name: "J.R.R. Tolkien",
        bio: "English writer and creator of Middle-earth, author of The Hobbit and The Lord of the Rings."
    }
];

function getAuthorOfDay() {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
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

document.addEventListener('DOMContentLoaded', displayAuthorOfDay);

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
            
            localStorage.setItem('newsletterEmail', email);
            
            message.textContent = '✅ Thank you for subscribing!';
            message.style.color = '#2ecc71';
            
            emailInput.value = '';
            
            setTimeout(() => {
                message.textContent = '';
            }, 3000);
        });
    }
});

console.log("✅ All scripts initialized!");