    (function() {
        const savedName = localStorage.getItem('currentUser_Name') || "Friend"; 
        const hour = new Date().getHours();
        let timeGreeting = "Good morning";
        
        if (hour >= 12 && hour < 17) {
            timeGreeting = "Good afternoon";
        } else if (hour >= 17) {
            timeGreeting = "Good evening";
        }
        const container = document.currentScript.parentElement;
        const greetingElement = container.querySelector('h1'); 
        if (greetingElement) {
            greetingElement.innerHTML = `${timeGreeting}, <span style="color:var(--primary-color)">${savedName}</span>!`;
        }
    })();
