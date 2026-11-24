// questionnaire.js - Simple student code
// Made by a student for coursework

let question = 1;
let total = 10;

// When page loads
window.onload = function() {
    showQuestion(1);
    updateProgress();
};

// Show a question
function showQuestion(num) {
    // Hide all questions
    let all = document.querySelectorAll('.question-card');
    for (let i = 0; i < all.length; i++) {
        all[i].style.display = 'none';
    }
    
    // Show current question
    let current = document.querySelector('[data-question="' + num + '"]');
    if (current) {
        current.style.display = 'block';
    }
    
    updateProgress();
    updateButtons();
}

// Next question
function nextQuestion() {
    if (isAnswered(question) === false) {
        alert('Please answer the question!');
        return;
    }
    
    if (question < total) {
        question = question + 1;
        showQuestion(question);
    }
}

// Previous question  
function prevQuestion() {
    if (question > 1) {
        question = question - 1;
        showQuestion(question);
    }
}

// Check if question answered
function isAnswered(num) {
    let card = document.querySelector('[data-question="' + num + '"]');
    
    // Check text inputs
    let inputs = card.querySelectorAll('input[type="text"]');
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() === '') {
            return false;
        }
    }
    
    // Check checkboxes
    let boxes = card.querySelectorAll('input[type="checkbox"]');
    let checked = 0;
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) {
            checked = checked + 1;
        }
    }
    
    if (boxes.length > 0 && checked === 0) {
        return false;
    }
    
    return true;
}

// Update progress bar
function updateProgress() {
    let bar = document.getElementById('progressBar');
    let text = document.getElementById('currentQuestion');
    
    let progress = (question / total) * 100;
    bar.style.width = progress + '%';
    
    if (text) {
        text.textContent = question;
    }
}

// Update buttons
function updateButtons() {
    let prev = document.getElementById('prevBtn');
    let next = document.getElementById('nextBtn');
    let submit = document.getElementById('submitBtn');
    
    // Hide previous on first question
    if (prev) {
        prev.style.display = question === 1 ? 'none' : 'inline-block';
    }
    
    // Show submit on last question
    if (next && submit) {
        if (question === total) {
            next.style.display = 'none';
            submit.style.display = 'inline-block';
        } else {
            next.style.display = 'inline-block';
            submit.style.display = 'none';
        }
    }
}

// Limit checkboxes
function limitCheckboxes(name, max) {
    let boxes = document.querySelectorAll('input[name="' + name + '"]');
    let count = 0;
    
    // Count checked
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) {
            count = count + 1;
        }
    }
    
    // Too many checked?
    if (count > max) {
        alert('Only ' + max + ' options allowed!');
        
        // Uncheck last one
        for (let i = boxes.length - 1; i >= 0; i--) {
            if (boxes[i].checked) {
                boxes[i].checked = false;
                break;
            }
        }
    }
}

// Submit questionnaire
function submitQuestionnaire() {
    let data = {
        name: document.getElementById('userName').value,
        interests: getChecked('interests'),
        strengths: getChecked('strengths'),
        career: getChecked('careerGoal'),
        info: document.getElementById('additionalInfo').value,
        time: new Date().toString()
    };
    
    // Save to browser storage
    localStorage.setItem('answers', JSON.stringify(data));
    
    alert('Thanks! Going to results...');
    
    // Go to results page
    window.location.href = 'results.html';
}

// Get checked values
function getChecked(name) {
    let boxes = document.querySelectorAll('input[name="' + name + '"]:checked');
    let values = [];
    
    for (let i = 0; i < boxes.length; i++) {
        values.push(boxes[i].value);
    }
    
    return values.join(',');
}

// Setup checkbox limits
document.addEventListener('DOMContentLoaded', function() {
    // Strengths max 3
    let strengths = document.querySelectorAll('input[name="strengths"]');
    for (let i = 0; i < strengths.length; i++) {
        strengths[i].addEventListener('change', function() {
            limitCheckboxes('strengths', 3);
        });
    }
    
    // Interests max 5
    let interests = document.querySelectorAll('input[name="interests"]');
    for (let i = 0; i < interests.length; i++) {
        interests[i].addEventListener('change', function() {
            limitCheckboxes('interests', 5);
        });
    }
});

console.log('Questionnaire loaded!');
