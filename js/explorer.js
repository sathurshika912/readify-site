console.log("📚 Book Explorer loaded!");

document.addEventListener('DOMContentLoaded', function() {
    
    // Display all books initially
    displayBooks(booksData);
    
    // Search functionality
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const genreFilter = document.getElementById('genreFilter');
    const resetBtn = document.getElementById('resetBtn');
    
    // Search on button click
    if (searchBtn) {
        searchBtn.addEventListener('click', filterBooks);
    }
    
    // Search on Enter key
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterBooks();
            }
        });
    }
    
    // Filter on genre change
    if (genreFilter) {
        genreFilter.addEventListener('change', filterBooks);
    }
    
    // Reset button
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            searchInput.value = '';
            genreFilter.value = '';
            displayBooks(booksData);
        });
    }
    
    // Close modal functionality
    setupModalClose();
});

// Setup modal close handlers
function setupModalClose() {
    const modal = document.getElementById('bookModal');
    const closeBtn = document.querySelector('.close-modal');
    
    // Close on X button
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeModal();
        });
    }
    
    // Close when clicking outside modal content
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Display books as cards
function displayBooks(books) {
    const grid = document.getElementById('booksGrid');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');
    
    if (!grid) return;
    
    if (books.length === 0) {
        grid.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
        if (resultsCount) resultsCount.textContent = '';
        return;
    }
    
    if (noResults) noResults.style.display = 'none';
    if (resultsCount) resultsCount.textContent = `Showing ${books.length} book${books.length !== 1 ? 's' : ''}`;
    
    grid.innerHTML = books.map(book => `
        <div class="book-card" data-id="${book.id}">
            <img src="${book.image}" alt="${book.title}" class="book-cover-image" onerror="this.onerror=null; this.src='images/books/book1.jpg';">
            <h3>${book.title}</h3>
            <p class="book-author">by ${book.author}</p>
            <div class="book-meta">
                <span>⭐ ${book.rating}</span>
                <span>📄 ${book.pages}p</span>
            </div>
        </div>
    `).join('');
    
    // Add click listeners to all book cards
    document.querySelectorAll('.book-card').forEach(card => {
        card.addEventListener('click', function() {
            const bookId = this.getAttribute('data-id');
            openModal(bookId);
        });
    });
}

// Filter books based on search and genre
function filterBooks() {
    const searchInput = document.getElementById('searchInput');
    const genreFilter = document.getElementById('genreFilter');
    
    if (!searchInput || !genreFilter) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const selectedGenre = genreFilter.value;
    
    const filtered = booksData.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm) ||
                            book.author.toLowerCase().includes(searchTerm);
        const matchesGenre = !selectedGenre || book.genre === selectedGenre;
        return matchesSearch && matchesGenre;
    });
    
    displayBooks(filtered);
}

// Open modal with book details
function openModal(bookId) {
    console.log("Opening modal for book ID:", bookId);
    
    const book = booksData.find(b => b.id == bookId);
    if (!book) {
        console.error("Book not found:", bookId);
        return;
    }
    
    console.log("Found book:", book);
    
    // Populate modal text content
    const modalTitle = document.getElementById('modalTitle');
    const modalAuthor = document.getElementById('modalAuthor');
    const modalGenre = document.getElementById('modalGenre');
    const modalPages = document.getElementById('modalPages');
    const modalRating = document.getElementById('modalRating');
    const modalSynopsis = document.getElementById('modalSynopsis');
    
    if (modalTitle) modalTitle.textContent = book.title;
    if (modalAuthor) modalAuthor.textContent = book.author;
    if (modalGenre) modalGenre.textContent = book.genre.charAt(0).toUpperCase() + book.genre.slice(1);
    if (modalPages) modalPages.textContent = book.pages;
    if (modalRating) modalRating.textContent = book.rating;
    if (modalSynopsis) modalSynopsis.textContent = book.synopsis;
    
    // Update book cover with REAL IMAGE
    const modalBookCover = document.getElementById('modalBookCover');
    if (modalBookCover) {
        modalBookCover.innerHTML = `
            <img 
                src="${book.image}" 
                alt="${book.title}" 
                class="modal-book-cover-img"
                onerror="this.onerror=null; this.src='images/books/book1.jpg';"
            >
        `;
        console.log("Set modal image:", book.image);
    }
    
    // Sequels
    const sequelsDiv = document.getElementById('modalSequels');
    const sequelsList = document.getElementById('sequelsList');
    if (sequelsDiv && sequelsList) {
        if (book.sequels && book.sequels.length > 0) {
            sequelsDiv.style.display = 'block';
            sequelsList.innerHTML = book.sequels
                .map(sequel => `<li>${sequel}</li>`)
                .join('');
        } else {
            sequelsDiv.style.display = 'none';
        }
    }
    
    // Prequels
    const prequelsDiv = document.getElementById('modalPrequels');
    const prequelsList = document.getElementById('prequelsList');
    if (prequelsDiv && prequelsList) {
        if (book.prequels && book.prequels.length > 0) {
            prequelsDiv.style.display = 'block';
            prequelsList.innerHTML = book.prequels
                .map(prequel => `<li>${prequel}</li>`)
                .join('');
        } else {
            prequelsDiv.style.display = 'none';
        }
    }
    
    // Reviews
    const reviewsBody = document.getElementById('reviewsBody');
    if (reviewsBody) {
        if (book.reviews && book.reviews.length > 0) {
            reviewsBody.innerHTML = book.reviews.map(review => `
                <tr>
                    <td>${review.reviewer}</td>
                    <td>⭐ ${review.rating}</td>
                    <td>${review.comment}</td>
                </tr>
            `).join('');
        } else {
            reviewsBody.innerHTML = '<tr><td colspan="3">No reviews yet</td></tr>';
        }
    }
    
    // Show modal
    const modal = document.getElementById('bookModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log("Modal opened successfully");
    } else {
        console.error("Modal element not found");
    }
}

// Close modal
function closeModal() {
    console.log("Closing modal");
    const modal = document.getElementById('bookModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}