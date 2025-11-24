function renderComponents(elements){

    for (let element of elements) {
        if(element.hasAttribute("data-rendered"))
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

const componentElements =  document.querySelectorAll("[data-import]");
renderComponents(componentElements)

function loadComponentScripts(element) {
    const scripts = element.querySelectorAll("script");
    for (let script of scripts) {
        const newScript = document.createElement('script');
        if(script.src) {
            newScript.src = script.src;
        }
        if(script.textContent) {
            newScript.textContent = script.textContent;
        }
        script.remove()

       element.appendChild(newScript)
    }
}