(function () {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleBtn');
    const navItems = document.querySelectorAll('.nav-item');

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
})();

(function () {
    let savedName = localStorage.getItem('currentUser_Name');
    const savedEmail = localStorage.getItem('currentUser_Email') || "guest@email.com";
    if (!savedName) {
        savedName = savedEmail.split('@')[0];
    }
    const container = document.currentScript.parentElement;
    const avatarBox = container.querySelector('.avatar') || container.querySelector('#sidebar-avatar');
    const nameBox = container.querySelector('.sidebar-name') || container.querySelector('h2');
    const emailBox = container.querySelector('.sidebar-email') || container.querySelector('p');
    if (nameBox) nameBox.innerText = savedName;
    if (emailBox) emailBox.innerText = savedEmail;

    if (avatarBox) {
        avatarBox.innerText = savedName.charAt(0).toUpperCase();
    }
})();




(function () {
    const logoutBtn = document.querySelector('#logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();

            localStorage.removeItem('currentUser_Name');
            localStorage.removeItem('currentUser_Email');

            window.location.href = '../index.html';
        })
    }
})