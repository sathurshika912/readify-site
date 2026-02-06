console.log("💬 Feedback page loaded!");

document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('feedbackForm');
    const messageTextarea = document.getElementById('feedbackMessage');
    const clearFeedbackBtn = document.getElementById('clearFeedbackBtn');
    
    // Form submission
    form.addEventListener('submit', handleSubmit);
    
    // Character counter
    messageTextarea.addEventListener('input', updateCharCount);
    
    // Real-time validation
    document.getElementById('feedbackName').addEventListener('blur', validateName);
    document.getElementById('feedbackEmail').addEventListener('blur', validateEmail);
    messageTextarea.addEventListener('blur', validateMessage);
    
    // FAQ accordion
    setupFAQ();
    
    // Clear all feedback
    if (clearFeedbackBtn) {
        clearFeedbackBtn.addEventListener('click', clearAllFeedback);
    }
    
    // Display submitted feedback
    displaySubmittedFeedback();
});

// ============================================
// FORM VALIDATION
// ============================================

function validateName() {
    const nameInput = document.getElementById('feedbackName');
    const errorSpan = document.getElementById('nameError');
    const name = nameInput.value.trim();
    
    if (name.length < 2) {
        nameInput.classList.add('error');
        errorSpan.textContent = 'Name must be at least 2 characters';
        return false;
    }
    
    nameInput.classList.remove('error');
    errorSpan.textContent = '';
    return true;
}

function validateEmail() {
    const emailInput = document.getElementById('feedbackEmail');
    const errorSpan = document.getElementById('emailError');
    const email = emailInput.value.trim();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        emailInput.classList.add('error');
        errorSpan.textContent = 'Please enter a valid email address';
        return false;
    }
    
    emailInput.classList.remove('error');
    errorSpan.textContent = '';
    return true;
}

function validateMessage() {
    const messageInput = document.getElementById('feedbackMessage');
    const errorSpan = document.getElementById('messageError');
    const message = messageInput.value.trim();
    
    if (message.length < 10) {
        messageInput.classList.add('error');
        errorSpan.textContent = 'Message must be at least 10 characters';
        return false;
    }
    
    if (message.length > 500) {
        messageInput.classList.add('error');
        errorSpan.textContent = 'Message must not exceed 500 characters';
        return false;
    }
    
    messageInput.classList.remove('error');
    errorSpan.textContent = '';
    return true;
}

function updateCharCount() {
    const messageInput = document.getElementById('feedbackMessage');
    const charCount = document.getElementById('charCount');
    const length = messageInput.value.length;
    
    charCount.textContent = length;
    
    if (length > 500) {
        charCount.style.color = '#e74c3c';
    } else {
        charCount.style.color = 'inherit';
    }
}

// ============================================
// FORM SUBMISSION
// ============================================

function handleSubmit(e) {
    e.preventDefault();
    
    const submitBtn = document.querySelector('.btn-submit-feedback');
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    
    if (!isNameValid || !isEmailValid || !isMessageValid) {
        showFeedbackMessage('Please fix the errors above', 'error');
        return;
    }
    
    // Add loading state
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Submitting...';
    
    // Get form data
    const feedback = {
        id: Date.now(),
        name: document.getElementById('feedbackName').value.trim(),
        email: document.getElementById('feedbackEmail').value.trim(),
        category: document.getElementById('feedbackCategory').value,
        message: document.getElementById('feedbackMessage').value.trim(),
        subscribe: document.getElementById('subscribeNewsletter').checked,
        date: new Date().toISOString(),
        dateStr: new Date().toLocaleString()
    };
    
    // Simulate submission delay
    setTimeout(() => {
        // Save to localStorage
        saveFeedback(feedback);
        
        // Show success message
        showFeedbackMessage('✅ Thank you for your feedback! We appreciate your input.', 'success');
        
        // Reset form
        document.getElementById('feedbackForm').reset();
        updateCharCount();
        
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.textContent = '✉️ Submit Feedback';
        
        // Update display
        displaySubmittedFeedback();
        
        // Scroll to submitted feedback
        setTimeout(() => {
            document.getElementById('submittedFeedbackSection').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 500);
        
    }, 1000);
}

function saveFeedback(feedback) {
    let allFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
    allFeedback.unshift(feedback); // Add to beginning
    
    // Keep only last 20 entries
    if (allFeedback.length > 20) {
        allFeedback = allFeedback.slice(0, 20);
    }
    
    localStorage.setItem('feedback', JSON.stringify(allFeedback));
}

function showFeedbackMessage(message, type) {
    const messageDiv = document.getElementById('feedbackMessage');
    messageDiv.textContent = message;
    messageDiv.className = `feedback-message ${type}`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// ============================================
// DISPLAY SUBMITTED FEEDBACK
// ============================================

function displaySubmittedFeedback() {
    const allFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
    const section = document.getElementById('submittedFeedbackSection');
    const list = document.getElementById('submittedFeedbackList');
    
    if (allFeedback.length === 0) {
        section.style.display = 'none';
        return;
    }
    
    section.style.display = 'block';
    
    list.innerHTML = allFeedback.map(item => `
        <div class="feedback-item">
            <div class="feedback-item-header">
                <span class="feedback-item-name">${item.name}</span>
                <span class="feedback-item-category">${getCategoryLabel(item.category)}</span>
            </div>
            <div class="feedback-item-email">${item.email}</div>
            <div class="feedback-item-message">${item.message}</div>
            <div class="feedback-item-date">Submitted: ${item.dateStr}</div>
        </div>
    `).join('');
}

function getCategoryLabel(category) {
    const labels = {
        general: 'General',
        bug: 'Bug Report',
        feature: 'Feature Request',
        question: 'Question',
        other: 'Other'
    };
    return labels[category] || category;
}

function clearAllFeedback() {
    if (!confirm('Are you sure you want to clear all feedback submissions?')) {
        return;
    }
    
    localStorage.setItem('feedback', '[]');
    displaySubmittedFeedback();
    showFeedbackMessage('All feedback cleared', 'success');
}

// ============================================
// FAQ ACCORDION
// ============================================

function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current FAQ
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}
`