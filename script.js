document.addEventListener('DOMContentLoaded', main);

async function main() {
    await showScripts();
    await showFooter();
    darkMode();
}

function darkMode() {
    try {
        const darkModeButton = document.querySelector(".dark-mode-checkbox");
        //console.log('modo noturno chamado');
        darkModeButton.addEventListener('click', () => {
            console.log("clicked");
            document.body.classList.toggle("dark-mode");
        });
        console.log("Modo noturno adicionado");
    } catch (error) {
        console.log("Não foi possível adicionar modo noturno, veja o erro a seguir");
        console.error(error);
    }
}

//Create HTML based on scripts json
async function showScripts() {
    try {
        //Pegando dados do objeto
        let scripts = await fetch('info.json');
        scripts = await scripts.json();

        //Scripts element container
        const container = document.querySelector("#scripts-container");

        //Mostrando scripts
        scripts.forEach((script) => {
            //Script Container
            let div = document.createElement("div");
            div.classList.add("card");
            div.classList.add("shadow");
            //Script title
            let h2 = document.createElement("h2");
            h2.textContent = script.title;

            //Script description
            let p = document.createElement("p");
            p.textContent = script.description;

            //Script buttons container
            let buttonsContainer = document.createElement("div");
            buttonsContainer.classList.add('btn-container');

            script.buttons.forEach(button => {
                let a = document.createElement("a");
                a.target = "_blank";
                a.href = button.url;
                a.className = button.class;
                a.textContent = button.text;
                buttonsContainer.appendChild(a);
            });

            div.appendChild(h2);
            div.appendChild(p);
            div.appendChild(buttonsContainer);
            container.innerHTML += `
                <!-- ${script.title} -->
            `;
            container.appendChild(div);
        });
        console.log("Scripts adicionados");

    } catch (error) {
        console.log("Não foi possível mostrar os scripts, veja o erro abaixo")
        console.error(error);
    }
}

//Footer
async function showFooter() {
    let footer = document.createElement('footer');
    try {
        const footer_response = await fetch('https://guismith.github.io/portfolio/footer.html');
        const footer_html = await footer_response.text();
        footer.innerHTML = footer_html;
        document.body.appendChild(footer);
        console.log("Rodapé adicionado");
    } catch (error) {
        let url = 'https://github.com/GuiSmith';
        footer.innerHTML = 
        `<p>
            Não foi possível inserir o Rodapé do site, clique <a target='_blank' href = '${url}'>aqui</a> para ter acesso aos dados do desenvolvedor
        </p>`;
        console.log("Não foi possível inserir o Rodapé do site, veja o motivo abaixo");
        console.error(error);
    }
}

