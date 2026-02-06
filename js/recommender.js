console.log("🎲 Book Recommender loaded!");

let currentRecommendation = null;

document.addEventListener('DOMContentLoaded', function() {
    
    const recommendBtn = document.getElementById('recommendBtn');
    const pickAgainBtn = document.getElementById('pickAgainBtn');
    const addToListBtn = document.getElementById('addToListBtn');
    const clearListBtn = document.getElementById('clearListBtn');
    
    // Get random book
    recommendBtn.addEventListener('click', getRandomBook);
    
    // Pick again
    pickAgainBtn.addEventListener('click', getRandomBook);
    
    // Add to reading list
    addToListBtn.addEventListener('click', addToReadingList);
    
    // Clear entire list
    clearListBtn.addEventListener('click', clearReadingList);
    
    // Load and display reading list
    displayReadingList();
});

function getRandomBook() {
    const recommendBtn = document.getElementById('recommendBtn');
    
    // Add loading state
    recommendBtn.classList.add('loading');
    recommendBtn.textContent = 'Finding the perfect book...';
    
    // Get filter values
    const selectedGenre = document.getElementById('genreSelect').value;
    const selectedLength = document.getElementById('lengthSelect').value;
    
    // Filter books based on selection
    let filteredBooks = booksData.filter(book => {
        const matchesGenre = !selectedGenre || book.genre === selectedGenre;
        const matchesLength = !selectedLength || book.length === selectedLength;
        return matchesGenre && matchesLength;
    });
    
    // Simulate loading delay
    setTimeout(() => {
        if (filteredBooks.length === 0) {
            showRecMessage('No books found with those filters. Try different options!', 'error');
            recommendBtn.classList.remove('loading');
            recommendBtn.textContent = '🎲 Get Random Book';
            return;
        }
        
        // Get random book from filtered list
        const randomIndex = Math.floor(Math.random() * filteredBooks.length);
        currentRecommendation = filteredBooks[randomIndex];
        
        // Display recommendation
        displayRecommendation(currentRecommendation);
        
        // Remove loading state
        recommendBtn.classList.remove('loading');
        recommendBtn.textContent = '🎲 Get Random Book';
        
    }, 800);
}

function displayRecommendation(book) {
    // Show recommendation section
    const displaySection = document.getElementById('recommendationDisplay');
    displaySection.style.display = 'block';
    
    // Scroll to recommendation
    displaySection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Update display with real image
    const coverElement = document.getElementById('recBookCover');
    coverElement.innerHTML = `<img src="${book.image}" alt="${book.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" onerror="this.src='images/placeholder.jpg'">`;
    
    document.getElementById('recTitle').textContent = book.title;
    document.getElementById('recAuthor').textContent = book.author;
    document.getElementById('recGenre').textContent = book.genre.charAt(0).toUpperCase() + book.genre.slice(1);
    document.getElementById('recPages').textContent = book.pages;
    document.getElementById('recRating').textContent = book.rating;
    document.getElementById('recSynopsis').textContent = book.synopsis;
    
    // Clear previous message
    const recMessage = document.getElementById('recMessage');
    recMessage.style.display = 'none';
}

function getBookEmoji(genre) {
    const emojis = {
        'fiction': '📖',
        'fantasy': '🧙‍♂️',
        'historical': '⚔️',
        'dystopian': '🌆',
        'romance': '💕',
        'sci-fi': '🚀',
        'adventure': '🗺️',
        'magical-realism': '✨'
    };
    return emojis[genre] || '📚';
}

function addToReadingList() {
    if (!currentRecommendation) return;
    
    // Get existing reading list
    let readingList = JSON.parse(localStorage.getItem('readingList') || '[]');
    
    // Check if book already in list
    const alreadyExists = readingList.some(item => item.id === currentRecommendation.id);
    
    if (alreadyExists) {
        showRecMessage('This book is already in your reading list!', 'error');
        return;
    }
    
    // Add book to list
    readingList.push({
        id: currentRecommendation.id,
        title: currentRecommendation.title,
        author: currentRecommendation.author,
        genre: currentRecommendation.genre,
        addedDate: new Date().toLocaleString()
    });
    
    // Save to localStorage
    localStorage.setItem('readingList', JSON.stringify(readingList));
    
    // Show success message
    showRecMessage('✅ Added to your reading list!', 'success');
    
    // Update reading list display
    displayReadingList();
}

function displayReadingList() {
    const readingList = JSON.parse(localStorage.getItem('readingList') || '[]');
    const listSection = document.getElementById('readingListSection');
    const listGrid = document.getElementById('readingListGrid');
    
    if (readingList.length === 0) {
        listSection.style.display = 'none';
        return;
    }
    
    listSection.style.display = 'block';
    
    listGrid.innerHTML = readingList.map(savedBook => {
        // Find the full book data to get the image
        const fullBook = booksData.find(b => b.id === savedBook.id);
        const bookImage = fullBook ? fullBook.image : 'images/placeholder.jpg';
        
        return `
            <div class="reading-list-item">
                <img src="${bookImage}" alt="${savedBook.title}" class="list-item-cover-img" onerror="this.src='images/placeholder.jpg'">
                <h4>${savedBook.title}</h4>
                <p>by ${savedBook.author}</p>
                <button class="btn-remove" onclick="removeFromList(${savedBook.id})">Remove</button>
            </div>
        `;
    }).join('');
}

function removeFromList(bookId) {
    let readingList = JSON.parse(localStorage.getItem('readingList') || '[]');
    readingList = readingList.filter(book => book.id !== bookId);
    localStorage.setItem('readingList', JSON.stringify(readingList));
    
    displayReadingList();
    showRecMessage('Book removed from reading list', 'success');
}

function clearReadingList() {
    if (!confirm('Are you sure you want to clear your entire reading list?')) {
        return;
    }
    
    localStorage.setItem('readingList', '[]');
    displayReadingList();
    showRecMessage('Reading list cleared!', 'success');
}

function showRecMessage(message, type) {
    const messageDiv = document.getElementById('recMessage');
    messageDiv.textContent = message;
    messageDiv.className = `rec-message ${type}`;
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}