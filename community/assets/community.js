const feedContainer = document.getElementById('feed');
const userInput = document.getElementById('userInput');
const postBtn = document.getElementById('postBtn');
const clearStorageBtn = document.getElementById('clearStorage');

const STORAGE_KEY = 'community_board_posts';

// 1. Load posts from Local Storage on startup
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
});

// 2. Function to load and render posts
function loadPosts() {
    const storedPosts = localStorage.getItem(STORAGE_KEY);
    const posts = storedPosts ? JSON.parse(storedPosts) : [];

    feedContainer.innerHTML = ''; // Clear current view

    if (posts.length === 0) {
        renderEmptyState();
    } else {
        posts.forEach(post => renderPostHTML(post));
    }
}

// 3. Render Empty State
function renderEmptyState() {
    feedContainer.innerHTML = `
        <div class="empty-state">
            <span class="material-symbols-rounded">chat_bubble</span>
            <p>No posts yet. Be the first to share something!</p>
        </div>
    `;
}

// 4. Render a Single Post Object
function renderPostHTML(post) {
    // Remove empty state if it exists
    const emptyState = document.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }

    const postElement = document.createElement('div');
    postElement.classList.add('post');

    // Avatar Logic
    let avatarHTML = '';
    if (post.type === 'ai') {
        avatarHTML = `<span class="material-symbols-outlined" style="font-size:18px;">auto_awesome</span>`;
    } else {
        avatarHTML = post.initials;
    }

    // Badge Logic
    let badgeHTML = post.type === 'ai' ? `<span class="ai-badge">AI Assistant</span>` : '';

    postElement.innerHTML = `
        <div class="avatar ${post.avatarClass}">
            ${avatarHTML}
        </div>
        <div class="post-content">
            <div class="post-header">
                <span class="username">${post.name}</span>
                ${badgeHTML}
                <span class="timestamp">${post.time}</span>
            </div>
            <div class="post-body">
                ${post.text}
            </div>
        </div>
    `;

    // Append to top or bottom? Usually new posts go to bottom in chat, or top in feed. 
    // Based on screenshots, it looks like a feed (newest at bottom).
    feedContainer.appendChild(postElement);
    
    // Auto scroll to bottom
    feedContainer.scrollTop = feedContainer.scrollHeight;
}

// 5. Handle New Post Creation
postBtn.addEventListener('click', handleNewPost);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleNewPost();
});

function handleNewPost() {
    const text = userInput.value.trim();
    if (!text) return;

    // Create User Post Object
    const newPost = {
        id: Date.now(),
        type: 'user',
        name: 'Kevin Miles', // Matching the "KM" avatar in your UI
        initials: 'KM',
        avatarClass: 'km',
        time: 'Just now',
        text: text
    };

    saveAndRender(newPost);
    userInput.value = ''; // Clear input

    // CHECK FOR AI TRIGGER
    if (text.toLowerCase().includes('@comsq')) {
        simulateAIResponse();
    }
}

// 6. Save to Local Storage
function saveAndRender(post) {
    const storedPosts = localStorage.getItem(STORAGE_KEY);
    const posts = storedPosts ? JSON.parse(storedPosts) : [];
    
    posts.push(post);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    
    renderPostHTML(post);
}

// 7. Simulate AI Response
function simulateAIResponse() {
    // Simulate "Typing" delay
    setTimeout(() => {
        const aiResponse = {
            id: Date.now() + 1,
            type: 'ai',
            name: 'Comsq AI',
            avatarClass: 'ai',
            time: 'Just now',
            text: `
                <p style="margin-bottom:10px;">Hey there! Comsq here, happy to help. 😊</p>
                <p style="margin-bottom:10px;">I noticed you asked for assistance. Here are a few quick tips based on your query:</p>
                <ul>
                    <li><strong>Review:</strong> Check your current task list priority.</li>
                    <li><strong>Break it down:</strong> Split complex problems into smaller steps.</li>
                    <li><strong>Focus:</strong> Try the Pomodoro technique for 25 minutes.</li>
                </ul>
                <p style="margin-top:10px;">Let me know if you need more specific advice!</p>
            `
        };
        saveAndRender(aiResponse);
    }, 1500); // 1.5 second delay
}

// Utility: Clear Storage
clearStorageBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(confirm('Are you sure you want to delete all posts?')) {
        localStorage.removeItem(STORAGE_KEY);
        loadPosts();
    }
});