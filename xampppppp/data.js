document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    setupEventListeners();
    loadEvents();
});

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

function toggleAccount() {
    const panel = document.getElementById('accountPanel');
    panel.classList.toggle('active');
    
    if (panel.classList.contains('active')) {
        document.addEventListener('click', closeAccountPanel);
    } else {
        document.removeEventListener('click', closeAccountPanel);
    }
}

function closeAccountPanel(e) {
    const panel = document.getElementById('accountPanel');
    const accountBtn = document.querySelector('.account-btn');
    
    if (!panel.contains(e.target) && !accountBtn.contains(e.target)) {
        panel.classList.remove('active');
        document.removeEventListener('click', closeAccountPanel);
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();
    
    if (!searchTerm) return;
    
    // Add search animation
    const searchBtn = document.querySelector('.search-box button');
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    setTimeout(() => {
        searchBtn.innerHTML = '<i class="fas fa-search"></i>';
        searchInput.value = '';
        showNotification('Search completed');
    }, 1000);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function updateProfileImage(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.querySelector('.profile-img img').src = e.target.result;
            showNotification('Profile picture updated');
        };
        reader.readAsDataURL(file);
    }
}

function loadEvents() {
    const events = [
        {
            title: 'Beach Cleanup',
            date: 'March 15, 2024',
            location: 'Sunny Beach',
            image: 'images/beach-cleanup.jpg'
        },
        // Add more events here
    ];

    const eventsGrid = document.querySelector('.events-grid');
    events.forEach(event => {
        eventsGrid.innerHTML += `
            <div class="event-card">
                <img src="${event.image}" alt="${event.title}">
                <div class="event-details">
                    <h3>${event.title}</h3>
                    <p>${event.date}</p>
                    <p>${event.location}</p>
                    <button class="primary-btn">Join Event</button>
                </div>
            </div>
        `;
    });
}

function setupEventListeners() {
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            const panel = document.getElementById('accountPanel');
            if (panel.classList.contains('active')) {
                toggleAccount();
            }
        }
    });
}
// Add this function to your existing JavaScript
function goBack() {
    const sections = ['home', 'about', 'events', 'contact'];
    const currentSection = window.location.hash.slice(1) || 'home';
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex > 0) {
        const prevSection = sections[currentIndex - 1];
        window.location.hash = `#${prevSection}`;
        document.querySelector(`.nav-link[href="#${prevSection}"]`).click();
    } else {
        window.location.hash = '#home';
        document.querySelector('.nav-link[href="#home"]').click();
    }
    
    // Add smooth scroll animation
    const targetSection = document.getElementById(currentSection);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add this to your existing event listeners
document.addEventListener('scroll', () => {
    const backBtn = document.querySelector('.back-btn');
    if (window.scrollY > 300) {
        backBtn.style.opacity = '1';
        backBtn.style.visibility = 'visible';
    } else {
        backBtn.style.opacity = '0';
        backBtn.style.visibility = 'hidden';
    }
});
function loadEvents() {
    const events = [
        {
            title: 'Beach Cleanup Drive',
            date: 'March 15, 2024',
            location: 'Sunny Beach Park',
            image: 'helping.png',
            description: 'Join us in keeping our beaches clean and safe for everyone.'
        },
        {
            title: 'Community Garden Project',
            date: 'March 20, 2024',
            location: 'Green Valley Community Center',
            image: 'hih.png',
            description: 'Help us create a sustainable community garden for local families.'
        },
        {
            title: 'Youth Mentorship Program',
            date: 'March 25, 2024',
            location: 'City Library',
            image: 'back.png',
            description: 'Make a difference in young lives through our mentorship program.'
        }
    ];

    const eventsGrid = document.querySelector('.events-grid');
    eventsGrid.innerHTML = events.map(event => `
        <div class="event-card">
            <img src="${event.image}" alt="${event.title}">
            <div class="event-details">
                <h3>${event.title}</h3>
                <p class="event-date"><i class="fas fa-calendar"></i> ${event.date}</p>
                <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                <p class="event-description">${event.description}</p>
                <button class="join-btn" onclick="joinEvent('${event.title}')">Join Event</button>
            </div>
        </div>
    `).join('');
}

// Add visitor comments display
const visitorComments = [
    {
        name: "Sarah Esperas",
        date: "2024-02-20",
        comment: "Amazing experience volunteering at the beach cleanup last month! Looking forward to joining more events.",
        avatar: "cart.png"
    },
    {
        name: "Michaella Dela Cruz",
        date: "2024-02-18",
        comment: "The community garden project was incredibly rewarding. Great team and organization!",
        avatar: "cart.png"
    },
    {
        name: "Michelle Cayat",
        date: "2024-02-15",
        comment: "Being a youth mentor has been life-changing. Highly recommend getting involved!",
        avatar: "cart.png"
    }
];

function displayVisitorComments() {
    const commentsContainer = document.querySelector('.comments-container');
    commentsContainer.innerHTML = `
        <h2>Community Feedback</h2>
        <div class="comments-grid">
            ${visitorComments.map(comment => `
                <div class="comment-card">
                    <div class="comment-header">
                        <img src="${comment.avatar}" alt="${comment.name}" class="comment-avatar">
                        <div class="comment-info">
                            <h4>${comment.name}</h4>
                            <span>${comment.date}</span>
                        </div>
                    </div>
                    <p class="comment-text">${comment.comment}</p>
                </div>
            `).join('')}
        </div>
    `;
}

// Add this to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    displayVisitorComments();
});
// Add these functions to your existing JavaScript
function loadComments() {
    const comments = [
        {
            author: "Sarah Johnson",
            date: "2024-02-20",
            text: "Amazing experience volunteering at the beach cleanup! The team was so welcoming.",
            avatar: "images/avatar1.jpg"
        },
        {
            author: "Michael Chen",
            date: "2024-02-18",
            text: "The community garden project was incredibly rewarding. Met wonderful people!",
            avatar: "images/avatar2.jpg"
        },
        {
            author: "Emily Rodriguez",
            date: "2024-02-15",
            text: "Being a youth mentor changed my perspective. Highly recommend getting involved!",
            avatar: "images/avatar3.jpg"
        }
    ];

    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = comments.map(comment => `
        <div class="comment-card">
            <div class="comment-header">
                <img src="${comment.avatar}" alt="${comment.author}" class="comment-avatar">
                <div class="comment-info">
                    <div class="comment-author">${comment.author}</div>
                    <div class="comment-date">${comment.date}</div>
                </div>
            </div>
            <div class="comment-text">${comment.text}</div>
        </div>
    `).join('');
}

function showCommentForm() {
    document.getElementById('commentForm').style.display = 'flex';
}

function hideCommentForm() {
    document.getElementById('commentForm').style.display = 'none';
}

document.getElementById('newCommentForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    // Add new comment logic here
    hideCommentForm();
    showNotification('Comment posted successfully!');
    this.reset();
});

// Add this to your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    loadComments();
});
let commentsArray = [];

function addNewComment(comment) {
    commentsArray.unshift(comment);
    displayComments();
    saveComments();
}

function displayComments() {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = commentsArray.map(comment => `
        <div class="comment-card" id="comment-${comment.id}">
            <div class="comment-header">
                <img src="${comment.avatar || 'images/default-avatar.png'}" alt="${comment.author}" class="comment-avatar">
                <div class="comment-info">
                    <div class="comment-author">${comment.author}</div>
                    <div class="comment-timestamp">${formatTimestamp(comment.timestamp)}</div>
                </div>
            </div>
            <div class="comment-text">${comment.text}</div>
            <div class="comment-actions">
                <div class="comment-likes" onclick="likeComment(${comment.id})">
                    <i class="fas fa-heart"></i>
                    <span>${comment.likes || 0}</span>
                </div>
                <div class="comment-timestamp">${comment.date}</div>
            </div>
        </div>
    `).join('');
}

function handleCommentSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const comment = form.querySelector('textarea').value;

    const newComment = {
        id: Date.now(),
        author: name,
        text: comment,
        date: new Date().toLocaleDateString(),
        timestamp: new Date().getTime(),
        likes: 0
    };

    addNewComment(newComment);
    form.reset();
    hideCommentForm();
    showNotification('Comment posted successfully!');
}

function likeComment(commentId) {
    const commentIndex = commentsArray.findIndex(c => c.id === commentId);
    if (commentIndex !== -1) {
        commentsArray[commentIndex].likes = (commentsArray[commentIndex].likes || 0) + 1;
        displayComments();
        saveComments();
    }
}

function formatTimestamp(timestamp) {
    const now = new Date().getTime();
    const diff = now - timestamp;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff/60000)} minutes ago`;
    if (diff < 86400000) return `${Math.floor(diff/3600000)} hours ago`;
    return new Date(timestamp).toLocaleDateString();
}

function saveComments() {
    localStorage.setItem('comments', JSON.stringify(commentsArray));
}

function loadSavedComments() {
    const saved = localStorage.getItem('comments');
    if (saved) {
        commentsArray = JSON.parse(saved);
        displayComments();
    }
}

// Add to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    loadSavedComments();
    document.getElementById('newCommentForm').addEventListener('submit', handleCommentSubmit);
});
let comments = [];

function postComment() {
    const commentInput = document.getElementById('commentInput');
    const nameInput = document.getElementById('nameInput');
    const text = commentInput.value.trim();
    const author = nameInput.value.trim();

    if (!text || !author) {
        showNotification('Please fill in all fields', 'warning');
        return;
    }

    const newComment = {
        id: Date.now(),
        author: author,
        text: text,
        timestamp: new Date().toISOString()
    };

    comments.unshift(newComment);
    updateCommentsDisplay();
    saveComments();

    // Clear inputs
    commentInput.value = '';
    nameInput.value = '';
    showNotification('Comment posted successfully!', 'success');
}

function updateCommentsDisplay() {
    const display = document.getElementById('commentsDisplay');
    const count = document.getElementById('commentCount');
    
    count.textContent = comments.length;
    
    display.innerHTML = comments.map(comment => `
        <div class="comment-item" id="comment-${comment.id}">
            <div class="comment-header">
                <span class="comment-author">${comment.author}</span>
                <span class="comment-time">${formatTime(comment.timestamp)}</span>
            </div>
            <div class="comment-text">${comment.text}</div>
        </div>
    `).join('');
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = (now - date) / 1000; // difference in seconds

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    
    return date.toLocaleDateString();
}

function saveComments() {
    localStorage.setItem('siteComments', JSON.stringify(comments));
}

function loadComments() {
    const saved = localStorage.getItem('siteComments');
    if (saved) {
        comments = JSON.parse(saved);
        updateCommentsDisplay();
    }
}

// Add to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    loadComments();
});