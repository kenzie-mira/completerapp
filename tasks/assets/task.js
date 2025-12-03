function renderComponents(elements) {

    for (let element of elements) {
        if (element.hasAttribute("data-rendered"))
            continue;
        const dataImport = element.getAttribute("data-import");
        fetch(dataImport)
            .then((res) => {
                if (!res.ok) {
                    throw "Not Found"
                }
                return res.text();
            })
            .then((component) => {
                element.innerHTML = component;
                loadComponentScripts(element)

                const subComponents = document.querySelectorAll("[data-import]");
                renderComponents(subComponents)

                element.setAttribute("data-rendered", "true");
            })
            .catch(() => {
                element.innerHTML = "<h4>Component not found</h4>";
            })
    }
}

const componentElements = document.querySelectorAll("[data-import]");
renderComponents(componentElements)

function loadComponentScripts(element) {
    const scripts = element.querySelectorAll("script");
    for (let script of scripts) {
        const newScript = document.createElement('script');
        if (script.src) {
            newScript.src = script.src;
        }
        if (script.textContent) {
            newScript.textContent = script.textContent;
        }
        script.remove()

        element.appendChild(newScript)
    }
}



let tasks = [];

const modal = document.getElementById('modal-overlay');
const taskForm = document.getElementById('task-form');
const taskContainer = document.getElementById('task-container');
const emptyState = document.getElementById('empty-state');
const activeCountSpan = document.getElementById('active-count');
const completedCountSpan = document.getElementById('completed-count');

const viewTasks = document.getElementById('view-tasks');
const viewAI = document.getElementById('view-ai');
const tabButtons = document.querySelectorAll('.task__btn');

function switchView(viewName) {
    tabButtons.forEach(btn => btn.classList.remove('active'));

    if (viewName === 'tasks') {
        tabButtons[0].classList.add('active');
        viewTasks.style.display = 'block';
        viewAI.style.display = 'none';
    } else {
        tabButtons[1].classList.add('active');
        viewTasks.style.display = 'none';
        viewAI.style.display = 'block';
    }
}

const aiLatestContent = document.getElementById('ai-latest-content');
const aiHistoryContent = document.getElementById('ai-history-content');
const subTabButtons = document.querySelectorAll('.sub-tab-btn');

function switchAiTab(tabName) {
    subTabButtons.forEach(btn => btn.classList.remove('active'));
    aiLatestContent.style.display = 'none';
    aiHistoryContent.style.display = 'none';

    if (tabName === 'latest') {
        aiLatestContent.style.display = 'flex';
        subTabButtons[0].classList.add('active');
    } else {
        aiHistoryContent.style.display = 'flex';
        subTabButtons[1].classList.add('active');
    }
}

function openModal() { modal.style.display = 'flex'; }
function closeModal() { modal.style.display = 'none'; taskForm.reset(); }
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTask = {
        id: Date.now(),
        title: document.getElementById('task-title').value,
        desc: document.getElementById('task-desc').value,
        priority: document.getElementById('task-priority').value,
        date: document.getElementById('task-date').value,
        completed: false
    };
    tasks.push(newTask);
    renderTasks();
    closeModal();
});

function renderTasks() {
    activeCountSpan.textContent = tasks.filter(t => !t.completed).length;
    completedCountSpan.textContent = tasks.filter(t => t.completed).length;
    taskContainer.innerHTML = '';

    if (tasks.length === 0) {
        emptyState.style.display = 'flex';
    } else {
        emptyState.style.display = 'none';

        tasks.forEach(task => {
            const taskEl = document.createElement('div');
            taskEl.className = `task-card ${task.completed ? 'completed-task' : ''}`;

            const checkIcon = task.completed ? '<i class="material-symbols-rounded">check</i>' : '';
            const checkClass = task.completed ? 'completed' : '';

            taskEl.innerHTML = `
                <div class="task-info">
                    <h4>${task.title}</h4>
                    <p>${task.desc}</p>
                    <div class="badges">
                        <span class="badge">${task.priority}</span>
                        <span class="badge">${task.date}</span>
                    </div>
                </div>
                
                <div class="task-right-side" style="display:flex; align-items:center; gap:10px;">
                    <div class="check-btn ${checkClass}" onclick="toggleTask(${task.id})">
                        ${checkIcon}
                    </div>
                    
                    <i class="material-symbols-rounded delete-btn" 
                       onclick="deleteTask(${task.id})" 
                       style="cursor:pointer; color:#ef4444;">
                       delete
                    </i>
                </div>
            `;
            taskContainer.appendChild(taskEl);
        });
    }
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

renderTasks();