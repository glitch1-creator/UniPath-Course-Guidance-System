// Contact Form JavaScript
// Simple code for contact form

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get the form
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    // Handle form submit
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop normal submit
        
        // Get all the form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Check if form is valid
        if (checkForm(name, email, subject, message)) {
            // Show loading
            showLoading();
            
            // Pretend to send (in real life this would go to server)
            setTimeout(function() {
                // Show success
                showSuccess();
                
                // Clear form
                contactForm.reset();
                
                // Hide message after a bit
                setTimeout(function() {
                    hideMessage();
                }, 5000);
                
            }, 1500); // Wait like it's sending
        }
    });
    
    // Check if form is good
    function checkForm(name, email, subject, message) {
        hideMessage(); // Clear old messages
        
        // Check name
        if (name.length < 2) {
            showError('Name needs at least 2 letters');
            return false;
        }
        
        // Check email
        if (!email.includes('@') || !email.includes('.')) {
            showError('Need a real email address');
            return false;
        }
        
        // Check subject
        if (subject === '') {
            showError('Pick a subject');
            return false;
        }
        
        // Check message
        if (message.length < 10) {
            showError('Message needs at least 10 letters');
            return false;
        }
        
        return true; // Everything is good
    }
    
    // Show error message
    function showError(text) {
        formMessage.textContent = '❌ ' + text;
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
    }
    
    // Show success message
    function showSuccess() {
        formMessage.textContent = '✅ Message sent! We\'ll reply soon!';
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
    }
    
    // Show loading
    function showLoading() {
        const button = contactForm.querySelector('.submit-btn');
        button.textContent = '📤 Sending...';
        button.disabled = true;
    }
    
    // Hide message
    function hideMessage() {
        formMessage.style.display = 'none';
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }
    
    // Reset button
    function resetButton() {
        const button = contactForm.querySelector('.submit-btn');
        button.textContent = '📤 Send Message';
        button.disabled = false;
    }
    
    // Clear form when page loads
    contactForm.reset();
    
});
