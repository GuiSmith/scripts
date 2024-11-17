document.addEventListener('DOMContentLoaded', () => {
    console.log("Documento carregado");
    const darkModeButton = document.querySelector('.dark-mode-checkbox');
    if (darkModeButton) {
        darkModeButton.addEventListener('click',darkMode);
        console.log("Modo noturno adicionado");
    }else{
        console.log("Não foi possível adicionar modo noturno");
    }
});

function darkMode(event){
    console.log('modo noturno chamado');
    if (event.target.checked) {
        console.log("Modo noturno ativado");
        document.body.classList.add('dark-mode');
    } else {
        console.log("Modo noturno desativado");
        document.body.classList.remove('dark-mode');
    }
}

showScripts();
showFooter();

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
    try {
        let footer = await fetch('https://guismith.github.io/portfolio/footer.json');
        footer = await footer.json();
        document.body.innerHTML += footer.html;
        console.log("Rodapé adicionado");
    } catch (error) {
        document.body.innerHTML += "<p>Não foi possível inserir o Rodapé do site, clique <a href = ''>aqui</a> para ter acesso aos dados do desenvolvedor </p>"
        console.log("Não foi possível inserir o Rodapé do site, veja o motivo abaixo");
        console.error(error);
    }
}
