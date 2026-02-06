console.log("📊 Reading Tracker loaded!");

document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('trackerForm');
    const saveBtn = document.getElementById('saveProgress');
    const loadBtn = document.getElementById('loadProgress');
    const clearBtn = document.getElementById('clearForm');
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateProgress();
    });
    
    // Save progress
    saveBtn.addEventListener('click', saveProgress);
    
    // Load saved progress
    loadBtn.addEventListener('click', loadSavedProgress);
    
    // Clear form
    clearBtn.addEventListener('click', clearForm);
    
    // Load and display saved history on page load
    displaySavedHistory();
});

function calculateProgress() {
    const calculateBtn = document.querySelector('.btn-primary');
    
    // Add loading state
    calculateBtn.classList.add('loading');
    calculateBtn.disabled = true;
    calculateBtn.textContent = 'Calculating...';
    
    // Get input values
    const bookTitle = document.getElementById('bookTitle').value.trim() || 'Your Book';
    const totalPages = parseInt(document.getElementById('totalPages').value);
    const pagesRead = parseInt(document.getElementById('pagesRead').value);
    const readingSpeed = parseInt(document.getElementById('readingSpeed').value);
    
    // Validation
    if (!totalPages || !pagesRead || !readingSpeed) {
        removeLoadingState(calculateBtn);
        showMessage('Please fill in all required fields!', 'error');
        return;
    }
    
    if (pagesRead > totalPages) {
        removeLoadingState(calculateBtn);
        showMessage('Pages read cannot exceed total pages!', 'error');
        return;
    }
    
    if (totalPages <= 0 || pagesRead < 0 || readingSpeed <= 0) {
        removeLoadingState(calculateBtn);
        showMessage('Please enter valid positive numbers!', 'error');
        return;
    }
    
    // Simulate processing delay for better UX
    setTimeout(() => {
        // Calculate statistics
        const percentage = ((pagesRead / totalPages) * 100).toFixed(1);
        const pagesLeft = totalPages - pagesRead;
        const daysLeft = Math.ceil(pagesLeft / readingSpeed);
        
        // Calculate finish date
        const finishDate = new Date();
        finishDate.setDate(finishDate.getDate() + daysLeft);
        const finishDateStr = finishDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
        
        // Display results
        displayResults({
            bookTitle,
            totalPages,
            pagesRead,
            pagesLeft,
            percentage,
            daysLeft,
            finishDateStr
        });
        
        removeLoadingState(calculateBtn);
        showMessage('Progress calculated successfully!', 'success');
    }, 500); // Small delay for effect
}

function removeLoadingState(button) {
    button.classList.remove('loading');
    button.disabled = false;
    button.textContent = 'Calculate Progress';
}

function displayResults(data) {
    // Show results section
    const resultsSection = document.getElementById('trackerResults');
    resultsSection.style.display = 'block';
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Update book title
    document.getElementById('resultBookTitle').textContent = data.bookTitle;
    
    // Animate progress bar from 0 to actual percentage
    const progressBar = document.getElementById('progressBarFill');
    progressBar.style.width = '0%';
    
    setTimeout(() => {
        progressBar.style.width = data.percentage + '%';
    }, 100);
    
    // Animate percentage counter
    animateCounter('progressPercentage', 0, parseFloat(data.percentage), '%', 1000);
    
    // Animate stats counters
    animateCounter('statPagesRead', 0, data.pagesRead, '', 800);
    animateCounter('statPagesLeft', 0, data.pagesLeft, '', 800);
    animateCounter('statDaysLeft', 0, data.daysLeft, '', 800);
    
    // Update finish date (no animation needed)
    document.getElementById('statFinishDate').textContent = data.finishDateStr;
    
    // Update motivation text
    const motivationText = document.getElementById('motivationText');
    if (data.percentage >= 100) {
        motivationText.textContent = 'congratulations! Book finished! 🎉';
        celebrateCompletion(); // Trigger confetti!
    } else if (data.percentage >= 75) {
        motivationText.textContent = 'almost there';
    } else if (data.percentage >= 50) {
        motivationText.textContent = 'halfway through';
    } else if (data.percentage >= 25) {
        motivationText.textContent = 'making great progress';
    } else {
        motivationText.textContent = 'just getting started';
    }
}

// Animated counter function
function animateCounter(elementId, start, end, suffix = '', duration = 1000) {
    const element = document.getElementById(elementId);
    const startTime = performance.now();
    const isDecimal = end % 1 !== 0; // Check if number has decimals
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        const current = start + (end - start) * easeOut;
        
        if (isDecimal) {
            element.textContent = current.toFixed(1) + suffix;
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            // Ensure final value is exact
            element.textContent = (isDecimal ? end.toFixed(1) : end) + suffix;
        }
    }
    
    requestAnimationFrame(update);
}

// Confetti celebration for 100% completion
function celebrateCompletion() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(confettiContainer);
    
    // Create confetti pieces
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${['#667eea', '#764ba2', '#3498DB', '#E74C3C', '#F39C12'][Math.floor(Math.random() * 5)]};
            top: -10px;
            left: ${Math.random() * 100}%;
            animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
            opacity: 0.8;
            border-radius: 50%;
        `;
        confettiContainer.appendChild(confetti);
    }
    
    // Add confetti animation
    if (!document.getElementById('confettiStyle')) {
        const style = document.createElement('style');
        style.id = 'confettiStyle';
        style.textContent = `
            @keyframes confettiFall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove confetti after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 4000);
}

function saveProgress() {
    const bookTitle = document.getElementById('bookTitle').value.trim();
    const totalPages = parseInt(document.getElementById('totalPages').value);
    const pagesRead = parseInt(document.getElementById('pagesRead').value);
    const readingSpeed = parseInt(document.getElementById('readingSpeed').value);
    
    if (!totalPages || !pagesRead || !readingSpeed) {
        showMessage('Please calculate progress first!', 'error');
        return;
    }
    
    // Create progress object
    const progressData = {
        id: Date.now(),
        bookTitle: bookTitle || 'Untitled Book',
        totalPages,
        pagesRead,
        readingSpeed,
        percentage: ((pagesRead / totalPages) * 100).toFixed(1),
        savedDate: new Date().toLocaleString()
    };
    
    // Get existing saved progress
    let savedProgress = JSON.parse(localStorage.getItem('readingProgress') || '[]');
    
    // Add new progress
    savedProgress.unshift(progressData); // Add to beginning
    
    // Keep only last 10 entries
    if (savedProgress.length > 10) {
        savedProgress = savedProgress.slice(0, 10);
    }
    
    // Save to localStorage
    localStorage.setItem('readingProgress', JSON.stringify(savedProgress));
    
    showMessage('Progress saved successfully! 📚', 'success');
    displaySavedHistory();
}

function loadSavedProgress() {
    const savedProgress = JSON.parse(localStorage.getItem('readingProgress') || '[]');
    
    if (savedProgress.length === 0) {
        showMessage('No saved progress found!', 'error');
        return;
    }
    
    // Load the most recent entry
    const latest = savedProgress[0];
    
    document.getElementById('bookTitle').value = latest.bookTitle;
    document.getElementById('totalPages').value = latest.totalPages;
    document.getElementById('pagesRead').value = latest.pagesRead;
    document.getElementById('readingSpeed').value = latest.readingSpeed;
    
    // Auto-calculate
    calculateProgress();
    
    showMessage('Loaded most recent saved progress!', 'success');
}

function displaySavedHistory() {
    const savedProgress = JSON.parse(localStorage.getItem('readingProgress') || '[]');
    const historySection = document.getElementById('savedProgressSection');
    const historyList = document.getElementById('savedProgressList');
    
    if (savedProgress.length === 0) {
        historySection.style.display = 'none';
        return;
    }
    
    historySection.style.display = 'block';
    
    historyList.innerHTML = savedProgress.map(item => `
        <div class="saved-item">
            <div class="saved-item-info">
                <h4>${item.bookTitle}</h4>
                <p>${item.pagesRead} / ${item.totalPages} pages (${item.percentage}%) • Saved: ${item.savedDate}</p>
            </div>
            <div class="saved-item-actions">
                <button class="btn-load" onclick="loadSpecificProgress(${item.id})">Load</button>
                <button class="btn-delete" onclick="deleteProgress(${item.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function loadSpecificProgress(id) {
    const savedProgress = JSON.parse(localStorage.getItem('readingProgress') || '[]');
    const item = savedProgress.find(p => p.id === id);
    
    if (!item) return;
    
    document.getElementById('bookTitle').value = item.bookTitle;
    document.getElementById('totalPages').value = item.totalPages;
    document.getElementById('pagesRead').value = item.pagesRead;
    document.getElementById('readingSpeed').value = item.readingSpeed;
    
    calculateProgress();
    showMessage('Progress loaded!', 'success');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteProgress(id) {
    if (!confirm('Are you sure you want to delete this saved progress?')) {
        return;
    }
    
    let savedProgress = JSON.parse(localStorage.getItem('readingProgress') || '[]');
    savedProgress = savedProgress.filter(p => p.id !== id);
    localStorage.setItem('readingProgress', JSON.stringify(savedProgress));
    
    displaySavedHistory();
    showMessage('Progress deleted!', 'success');
}

function clearForm() {
    document.getElementById('trackerForm').reset();
    document.getElementById('trackerResults').style.display = 'none';
    showMessage('Form cleared!', 'success');
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}   