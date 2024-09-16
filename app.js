document.addEventListener("DOMContentLoaded", () => {
    carregarLivros();
});

// Função para carregar e exibir todos os livros
function carregarLivros() {
    exibirLivros(dados);
}

// Função para exibir todos os livros
function exibirLivros(livros) {
    const container = document.getElementById("resultados-pesquisa");
    container.innerHTML = "";

    livros.forEach((livro, index) => {
        const livroDiv = document.createElement("div");
        livroDiv.className = "book";
        livroDiv.onclick = () => abrirModal(index);

        const img = document.createElement("img");
        img.src = livro.capa;
        img.alt = livro.titulo;

        const titulo = document.createElement("h2");
        titulo.textContent = livro.titulo;

        const status = document.createElement("p");
        status.textContent = livro.status;

        const ano = document.createElement("p");
        ano.textContent = livro.ano;

        livroDiv.appendChild(img);
        livroDiv.appendChild(titulo);
        livroDiv.appendChild(status);
        livroDiv.appendChild(ano);
        container.appendChild(livroDiv);
    });
}

// Função para abrir o modal com informações detalhadas
function abrirModal(index) {
    let modal = document.getElementById("modal");
    let modalContent = document.getElementById("modal-content");
    let dado = dados[index];

    // Atualiza o conteúdo do modal com os detalhes do livro
    modalContent.innerHTML = `
        <img src="${dado.capa}" alt="Capa grande do livro ${dado.titulo}">
        <div id="modal-details">
            <h2>${dado.titulo}</h2>
            <p><strong>Descrição:</strong> ${dado.descricao}</p>
            <p><strong>Editora:</strong> ${dado.editora || 'Não informado'}</p>
            <p>
                <strong>Status:</strong> ${dado.status} |
                <strong>Ano:</strong> ${dado.ano} |
                <strong>Nota:</strong> ${dado.avaliacao}
            </p>
            <p><strong>Tags:</strong> ${dado.tags}</p>
            <div id="modal-actions">
                <button id="edit-button" onclick="abrirModalEdicao(${index})">Editar</button>
                <button id="delete-button" onclick="deletarLivro(${index})">Apagar</button>
            </div>
        </div>
        <button id="modal-close" onclick="fecharModal()">Fechar</button>
    `;

    // Mostra o modal
    modal.style.display = "flex";
}

// Função para abrir o modal de edição
function abrirModalEdicao(index) {
    let modal = document.getElementById("modal");
    let modalContent = document.getElementById("modal-content");
    let dado = dados[index];

    // Exibe o modal de edição com campos editáveis
    modalContent.innerHTML = `
        <img src="${dado.capa}" alt="Capa grande do livro ${dado.titulo}">
        <div id="modal-details">
            <h2><input type="text" id="titulo-editar" value="${dado.titulo}"></h2>
            <p><strong>Descrição:</strong> <textarea id="descricao-editar">${dado.descricao}</textarea></p>
            <p><strong>Editora:</strong> <input type="text" id="editora-editar" value="${dado.editora || ''}"></p>
            <p>
                <strong>Status:</strong> <input type="text" id="status-editar" value="${dado.status}">
                <strong>Ano:</strong> <input type="text" id="ano-editar" value="${dado.ano}">
                <strong>Nota:</strong> <input type="text" id="avaliacao-editar" value="${dado.avaliacao}">
            </p>
            <p><strong>Tags:</strong> <input type="text" id="tags-editar" value="${dado.tags}"></p>
            <div id="modal-actions">
                <button id="save-button" onclick="salvarEdicao(${index})">Salvar</button>
                <button id="cancel-button" onclick="fecharModal()">Cancelar</button>
            </div>
        </div>
    `;

    // Mostra o modal de edição
    modal.style.display = "flex";
}

// Função para salvar as alterações feitas no modal de edição
function salvarEdicao(index) {
    dados[index].titulo = document.getElementById("titulo-editar").value;
    dados[index].descricao = document.getElementById("descricao-editar").value;
    dados[index].editora = document.getElementById("editora-editar").value;
    dados[index].status = document.getElementById("status-editar").value;
    dados[index].ano = document.getElementById("ano-editar").value;
    dados[index].avaliacao = document.getElementById("avaliacao-editar").value;
    dados[index].tags = document.getElementById("tags-editar").value;

    // Atualiza a exibição de todos os livros
    exibirLivros(dados);
    fecharModal();
}

// Função para deletar um livro da biblioteca
function deletarLivro(index) {
    dados.splice(index, 1); // Remove o livro do array 'dados'
    exibirLivros(dados); // Atualiza a exibição dos livros
    fecharModal(); // Fecha o modal
}

// Função para fechar o modal
function fecharModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

// Função para pesquisar os livros
function pesquisar() {
    const campoPesquisa = document.querySelector("#campo-pesquisa").value.toLowerCase();
    
    if (!campoPesquisa) {
        // Se o campo de pesquisa estiver vazio, exibe todos os livros
        exibirLivros(dados);
        return;
    }

    const resultados = dados.filter(livro => {
        return livro.titulo.toLowerCase().includes(campoPesquisa) ||
               livro.descricao.toLowerCase().includes(campoPesquisa) ||
               livro.status.toLowerCase().includes(campoPesquisa) ||
               livro.ano.toLowerCase().includes(campoPesquisa) ||
               livro.tags.toLowerCase().includes(campoPesquisa);
    });

    if (resultados.length === 0) {
        document.getElementById("resultados-pesquisa").innerHTML = "Nada foi encontrado";
    } else {
        exibirLivros(resultados);
    }
}

// Função para adicionar um novo livro
function salvarLivro(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const capaInput = document.getElementById("capa");
    const capa = capaInput.files[0] ? URL.createObjectURL(capaInput.files[0]) : "img/placeholder.png";

    const novoLivro = {
        titulo: titulo,
        capa: capa,
        descricao: document.getElementById("descricao").value,
        status: document.getElementById("status").value,
        ano: document.getElementById("ano").value,
        avaliacao: "N/A",
        tags: "não categorizado",
    };

    dados.push(novoLivro); // Adiciona o novo livro ao array global 'dados'
    exibirLivros(dados); // Atualiza a exibição dos livros
    fecharModalAdicionar();
}

// Função para abrir o modal de adicionar livro
function abrirModalAdicionar() {
    document.getElementById("modal-adicionar").style.display = "flex";
}

// Função para fechar o modal de adicionar livro
function fecharModalAdicionar() {
    document.getElementById("modal-adicionar").style.display = "none";
}

// Função para mostrar a prévia da capa do livro
function mostrarPreview() {
    const fileInput = document.getElementById("capa");
    const file = fileInput.files[0];
    const preview = document.getElementById("capa-preview");

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            preview.src = event.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        preview.src = "img/placeholder.png";
    }
}
