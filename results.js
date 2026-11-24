// results.js - Student made code
// Shows course recommendations

// Course data
let courses = [
    {
        id: 1,
        name: "Computer Science",
        category: "Technology",
        description: "Learn programming and software development",
        difficulty: "Hard",
        keywords: ["technology", "math", "programming"]
    },
    {
        id: 2,
        name: "Business Management",
        category: "Business",
        description: "Learn how to manage companies",
        difficulty: "Medium",
        keywords: ["business", "management", "leadership"]
    },
    {
        id: 3,
        name: "Graphic Design",
        category: "Arts",
        description: "Create visual designs and graphics",
        difficulty: "Medium",
        keywords: ["art", "design", "creative"]
    },
    {
        id: 4,
        name: "Psychology",
        category: "Science",
        description: "Study human behavior and mind",
        difficulty: "Medium",
        keywords: ["people", "behavior", "helping"]
    },
    {
        id: 5,
        name: "Engineering",
        category: "Technology",
        description: "Design and build things",
        difficulty: "Hard",
        keywords: ["building", "technology", "math"]
    },
    {
        id: 6,
        name: "English Literature",
        category: "Arts",
        description: "Study books and writing",
        difficulty: "Easy",
        keywords: ["books", "writing", "reading"]
    }
];

// When page loads
window.onload = function() {
    showResults();
};

// Main function
function showResults() {
    // Get user answers
    let answers = getUserAnswers();
    
    if (!answers) {
        alert('No answers found! Please take the quiz first.');
        window.location.href = 'questionnaire.html';
        return;
    }
    
    // Show user name
    showUserName(answers.name);
    
    // Calculate matches
    let matches = calculateMatches(answers);
    
    // Display results
    displayResults(matches, answers);
}

// Get user answers from storage
function getUserAnswers() {
    let answers = localStorage.getItem('answers');
    return answers ? JSON.parse(answers) : null;
}

// Show user name
function showUserName(name) {
    let nameElement = document.getElementById('userName');
    if (nameElement && name) {
        nameElement.textContent = name;
    }
}

// Calculate course matches
function calculateMatches(answers) {
    let matches = [];
    
    // Check each course
    for (let i = 0; i < courses.length; i++) {
        let course = courses[i];
        let score = 0;
        
        // Check interests
        if (answers.interests) {
            let userInterests = answers.interests.split(',');
            for (let j = 0; j < userInterests.length; j++) {
                let interest = userInterests[j].trim().toLowerCase();
                if (course.keywords.some(k => k.toLowerCase().includes(interest))) {
                    score = score + 30;
                }
            }
        }
        
        // Check strengths
        if (answers.strengths) {
            let userStrengths = answers.strengths.split(',');
            for (let j = 0; j < userStrengths.length; j++) {
                let strength = userStrengths[j].trim().toLowerCase();
                if (course.keywords.some(k => k.toLowerCase().includes(strength))) {
                    score = score + 20;
                }
            }
        }
        
        // Check career goal
        if (answers.career) {
            let goal = answers.career.toLowerCase();
            if (course.keywords.some(k => k.toLowerCase().includes(goal))) {
                score = score + 25;
            }
        }
        
        // Add some random points
        score = score + Math.floor(Math.random() * 10);
        
        // Don't go over 100
        score = Math.min(score, 100);
        
        // Add if score is good
        if (score > 20) {
            matches.push({
                course: course,
                score: score
            });
        }
    }
    
    // Sort by score
    matches.sort(function(a, b) {
        return b.score - a.score;
    });
    
    return matches.slice(0, 3);
}

// Display results
function displayResults(recommendations, userAnswers) {
    let container = document.getElementById('resultsContainer');
    
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Title
    let title = document.createElement('h2');
    title.textContent = 'Your recommended courses:';
    container.appendChild(title);
    
    // Show each recommendation
    for (let i = 0; i < recommendations.length; i++) {
        let rec = recommendations[i];
        let card = createCourseCard(rec.course, rec.score, i + 1);
        container.appendChild(card);
    }
    
    // No results message
    if (recommendations.length === 0) {
        let noResults = document.createElement('p');
        noResults.textContent = 'No courses matched. Try exploring different options!';
        noResults.className = 'no-results';
        container.appendChild(noResults);
    }
    
    // Add buttons
    addButtons(container);
}

// Create course card
function createCourseCard(course, score, rank) {
    let card = document.createElement('div');
    card.className = 'course-card';
    
    // Header
    let header = document.createElement('div');
    header.className = 'course-header';
    header.innerHTML = `
        <h3>${rank}. ${course.name}</h3>
        <div class="match-score">${score}% Match</div>
    `;
    card.appendChild(header);
    
    // Details
    let details = document.createElement('div');
    details.className = 'course-details';
    details.innerHTML = `
        <p><strong>Category:</strong> ${course.category}</p>
        <p><strong>Difficulty:</strong> ${course.difficulty}</p>
        <p><strong>Description:</strong> ${course.description}</p>
    `;
    card.appendChild(details);
    
    return card;
}

// Add action buttons
function addButtons(container) {
    let buttonContainer = document.createElement('div');
    buttonContainer.className = 'action-buttons';
    
    // Retake quiz button
    let retakeBtn = document.createElement('button');
    retakeBtn.textContent = 'Retake Quiz';
    retakeBtn.onclick = function() {
        window.location.href = 'questionnaire.html';
    };
    buttonContainer.appendChild(retakeBtn);
    
    // Home button
    let homeBtn = document.createElement('button');
    homeBtn.textContent = 'Back to Home';
    homeBtn.onclick = function() {
        window.location.href = 'index.html';
    };
    buttonContainer.appendChild(homeBtn);
    
    container.appendChild(buttonContainer);
}

// Restart quiz
function restartQuiz() {
    localStorage.removeItem('answers');
    window.location.href = 'questionnaire.html';
}

console.log('Results page ready!');
