function baixarArquivoJSON() {
    // Pegar os valores do formulário
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const code = document.querySelector("#code");
    const page = document.querySelector("#page");
    
    const jsonData = {
        title: title.value,
        description: description.value,
        buttons: [
            {
                text: "View Code",
                class: "btn btn-secondary",
                url: code.value
            },
            {
                text: "View Page",
                class: "btn btn-success",
                url: page.value
            }
        ]
    };

    // Converter o objeto para string JSON
    const jsonString = JSON.stringify(jsonData, null, 2);

    // Criar o arquivo JSON e forçar o download
    const blob = new Blob([jsonString], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = title.value.replaceAll(" ", "_") + ".json";
    link.click();
}