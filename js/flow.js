console.log("🎵 Reading Flow loaded!");

// Audio objects for ambient sounds
const activeSounds = {};

// Timer variables
let timerInterval = null;
let timerSeconds = 0;
let timerRunning = false;

document.addEventListener('DOMContentLoaded', function() {
    
    // Ambient Sounds
    setupAmbientSounds();
    
    // Reading Timer
    setupTimer();
    
    // Completed Books
    setupCompletedBooks();
    
    // Load stats
    loadTimerStats();
    loadCompletedStats();
});

// ============================================
// AMBIENT SOUNDS - WITH REAL AUDIO FILES
// ============================================

function setupAmbientSounds() {
    const soundToggles = document.querySelectorAll('.sound-toggle');
    const volumeSliders = document.querySelectorAll('.volume-slider');
    const stopAllBtn = document.getElementById('stopAllSounds');
    
    soundToggles.forEach(button => {
        button.addEventListener('click', function() {
            const soundName = this.dataset.sound;
            toggleSound(soundName, this);
        });
    });
    
    volumeSliders.forEach(slider => {
        slider.addEventListener('input', function() {
            const soundName = this.dataset.sound;
            const volume = this.value;
            
            // Update volume display
            const volumeValue = this.parentElement.querySelector('.volume-value');
            volumeValue.textContent = volume;
            
            // Update actual volume if sound is playing
            if (activeSounds[soundName]) {
                activeSounds[soundName].audio.volume = volume / 100;
            }
        });
    });
    
    stopAllBtn.addEventListener('click', stopAllSounds);
}

function toggleSound(soundName, button) {
    const soundCard = button.closest('.sound-card');
    
    if (activeSounds[soundName]) {
        // Stop sound
        stopSound(soundName);
        button.textContent = 'Play';
        button.classList.remove('playing');
        soundCard.classList.remove('playing');
    } else {
        // Start sound
        startSound(soundName);
        button.textContent = 'Stop';
        button.classList.add('playing');
        soundCard.classList.add('playing');
    }
}

function startSound(soundName) {
    try {
        // Create audio element with real audio file
        const audio = new Audio(`sounds/${soundName}.mp3`);
        audio.loop = true; // Loop the sound
        
        // Get volume from slider
        const slider = document.querySelector(`.volume-slider[data-sound="${soundName}"]`);
        const volume = slider ? slider.value / 100 : 0.5;
        audio.volume = volume;
        
        // Play audio
        audio.play().catch(error => {
            console.error(`Error playing ${soundName}:`, error);
            alert(`Could not play ${soundName}. Make sure the file exists in the sounds folder.`);
        });
        
        // Store reference
        activeSounds[soundName] = { audio };
        
    } catch (error) {
        console.error(`Error loading ${soundName}:`, error);
        alert(`Sound file not found: sounds/${soundName}.mp3`);
    }
}

function stopSound(soundName) {
    if (activeSounds[soundName]) {
        activeSounds[soundName].audio.pause();
        activeSounds[soundName].audio.currentTime = 0;
        delete activeSounds[soundName];
    }
}

function stopAllSounds() {
    Object.keys(activeSounds).forEach(soundName => {
        stopSound(soundName);
        
        // Update UI
        const button = document.querySelector(`.sound-toggle[data-sound="${soundName}"]`);
        const soundCard = button.closest('.sound-card');
        button.textContent = 'Play';
        button.classList.remove('playing');
        soundCard.classList.remove('playing');
    });
}

// ============================================
// READING TIMER
// ============================================

function setupTimer() {
    const startBtn = document.getElementById('startTimer');
    const pauseBtn = document.getElementById('pauseTimer');
    const resetBtn = document.getElementById('resetTimer');
    
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
}

function startTimer() {
    if (timerRunning) return;
    
    timerRunning = true;
    timerInterval = setInterval(() => {
        timerSeconds++;
        updateTimerDisplay();
    }, 1000);
}

function pauseTimer() {
    if (!timerRunning) return;
    
    timerRunning = false;
    clearInterval(timerInterval);
    
    // Save session
    saveTimerSession();
}

function resetTimer() {
    timerRunning = false;
    clearInterval(timerInterval);
    timerSeconds = 0;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const hours = Math.floor(timerSeconds / 3600);
    const minutes = Math.floor((timerSeconds % 3600) / 60);
    const seconds = timerSeconds % 60;
    
    const display = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    document.getElementById('timerDisplay').textContent = display;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

function saveTimerSession() {
    if (timerSeconds < 60) return;
    
    const sessions = JSON.parse(localStorage.getItem('timerSessions') || '[]');
    
    const session = {
        duration: timerSeconds,
        date: new Date().toISOString(),
        dateStr: new Date().toLocaleDateString()
    };
    
    sessions.push(session);
    localStorage.setItem('timerSessions', JSON.stringify(sessions));
    
    loadTimerStats();
}

function loadTimerStats() {
    const sessions = JSON.parse(localStorage.getItem('timerSessions') || '[]');
    const today = new Date().toLocaleDateString();
    
    // Today's total
    const todaySeconds = sessions
        .filter(s => s.dateStr === today)
        .reduce((total, s) => total + s.duration, 0);
    
    const todayMinutes = Math.floor(todaySeconds / 60);
    document.getElementById('todayTime').textContent = `${todayMinutes} min`;
    
    // Total sessions
    document.getElementById('totalSessions').textContent = sessions.length;
}

// ============================================
// COMPLETED BOOKS
// ============================================

function setupCompletedBooks() {
    const form = document.getElementById('completeBookForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        addCompletedBook();
    });
    
    displayCompletedBooks();
}

function addCompletedBook() {
    const title = document.getElementById('completedBookTitle').value.trim();
    const author = document.getElementById('completedBookAuthor').value.trim();
    
    if (!title || !author) return;
    
    const completedBooks = JSON.parse(localStorage.getItem('completedBooks') || '[]');
    
    const book = {
        id: Date.now(),
        title,
        author,
        completedDate: new Date().toISOString(),
        completedDateStr: new Date().toLocaleDateString()
    };
    
    completedBooks.unshift(book);
    localStorage.setItem('completedBooks', JSON.stringify(completedBooks));
    
    // Clear form
    document.getElementById('completedBookTitle').value = '';
    document.getElementById('completedBookAuthor').value = '';
    
    displayCompletedBooks();
    loadCompletedStats();
}

function displayCompletedBooks() {
    const completedBooks = JSON.parse(localStorage.getItem('completedBooks') || '[]');
    const listContainer = document.getElementById('completedBooksList');
    
    if (completedBooks.length === 0) {
        listContainer.innerHTML = '<p style="text-align: center; opacity: 0.5; padding: 2rem;">No completed books yet. Start tracking your achievements!</p>';
        return;
    }
    
    listContainer.innerHTML = completedBooks.map(book => `
        <div class="completed-book-item">
            <div class="completed-book-info">
                <h4>✅ ${book.title}</h4>
                <p>by ${book.author}</p>
                <p class="completed-book-date">Completed on ${book.completedDateStr}</p>
            </div>
            <button class="btn-remove-completed" onclick="removeCompletedBook(${book.id})">Remove</button>
        </div>
    `).join('');
}

function removeCompletedBook(bookId) {
    let completedBooks = JSON.parse(localStorage.getItem('completedBooks') || '[]');
    completedBooks = completedBooks.filter(book => book.id !== bookId);
    localStorage.setItem('completedBooks', JSON.stringify(completedBooks));
    
    displayCompletedBooks();
    loadCompletedStats();
}

function loadCompletedStats() {
    const completedBooks = JSON.parse(localStorage.getItem('completedBooks') || '[]');
    
    // Total completed
    document.getElementById('totalCompleted').textContent = completedBooks.length;
    
    // This month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonth = completedBooks.filter(book => {
        const bookDate = new Date(book.completedDate);
        return bookDate.getMonth() === currentMonth && bookDate.getFullYear() === currentYear;
    }).length;
    document.getElementById('thisMonthCompleted').textContent = thisMonth;
    
    // This year
    const thisYear = completedBooks.filter(book => {
        const bookDate = new Date(book.completedDate);
        return bookDate.getFullYear() === currentYear;
    }).length;
    document.getElementById('thisYearCompleted').textContent = thisYear;
}