// CONSUMO DA API E EXIBIÇÃO DOS DADOS RECEBIDOS NO HTML  

window.addEventListener('load', () => {
    const gridContainer = document.getElementById('pokemonGrid');
    const loadingIndicator = document.getElementById('loading');

    if (!gridContainer || !loadingIndicator) return;

    consumeManipulaDadosAPI(gridContainer, loadingIndicator);
});

async function consumeManipulaDadosAPI(gridContainer, loadingIndicator) {
    try {
        loadingIndicator.style.display = 'block';
        gridContainer.style.display = 'none';

        const resposta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');

        if (!resposta.ok) throw new Error(`Erro HTTP: ${resposta.status}`);

        const dados = await resposta.json();
        const promessasDeDetalhes = dados.results.map(pokemon =>
            fetch(pokemon.url).then(res => res.json())
        );

        const pokemonsComDetalhes = await Promise.all(promessasDeDetalhes);
        gridContainer.innerHTML = '';

        pokemonsComDetalhes.forEach(pokemon => criarCardPokemon(pokemon, gridContainer));

    } catch (erro) {
        console.error("Erro ao consumir a API: ", erro);
        if (loadingIndicator) loadingIndicator.textContent = "Não foi possível carregar os dados.";
    } finally {
        if (loadingIndicator) loadingIndicator.style.display = 'none';
        if (gridContainer) gridContainer.style.display = 'grid';
    }
}

function criarCardPokemon(pokemon, container) {
    const card = document.createElement('div');
    card.classList.add('poke-card');

    const imagem = document.createElement('img');
    imagem.src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    imagem.alt = `Imagem do ${pokemon.name}`;

    const nome = document.createElement('h2');
    nome.classList.add('poke-name');
    nome.textContent = pokemon.name;

    const typesContainer = document.createElement('div');
    typesContainer.classList.add('types');

    pokemon.types.forEach(tipoInfo => {
        const tipoElemento = document.createElement('span');
        tipoElemento.classList.add('type', `type-${tipoInfo.type.name}`);
        tipoElemento.textContent = tipoInfo.type.name;
        typesContainer.appendChild(tipoElemento);
    });

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('pokemon-info');

    const altura = document.createElement('p');
    altura.textContent = `Altura: ${(pokemon.height / 10).toFixed(1)} m`;

    const peso = document.createElement('p');
    peso.textContent = `Peso: ${(pokemon.weight / 10).toFixed(1)} kg`;

    infoContainer.appendChild(altura);
    infoContainer.appendChild(peso);

    card.appendChild(imagem);
    card.appendChild(nome);
    card.appendChild(typesContainer);
    card.appendChild(infoContainer);

    container.appendChild(card);
}

// VALIDAR SE AS SENHAS SÃO IGUAIS AO FAZER CADASTRO 

const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {
    const erro = document.getElementById("erro");
    const senhaEL = document.getElementById("senha");
    const confirmarSenhaEL = document.getElementById("confirmarSenha");

    formCadastro.addEventListener("submit", function (event) {
        event.preventDefault();

        const senha = senhaEL.value.trim();
        const confirmarSenha = confirmarSenhaEL.value.trim();

        if (senha !== confirmarSenha) {
            erro.textContent = "As senhas não coincidem!";
            return;
        }

        if (!validarSenha(senha)) {
            erro.textContent = "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial.";
            return;
        }

        erro.textContent = "";
        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html";
    });

    // VALIDAR SE A SENHA FORTE É FORTE AO FAZER CADASTRO 

    function validarSenha(senha) {
        const tamanhoValido = senha.length >= 8;
        const temMaiuscula = /[A-Z]/.test(senha);
        const temMinuscula = /[a-z]/.test(senha);
        const temNumero = /[0-9]/.test(senha);
        const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
        return tamanhoValido && temMaiuscula && temMinuscula && temNumero && temEspecial;
    }
}

// VALIDA USUÁRIO(EMAIL) E SENHA PARA LOGAR 

const formLogin = document.querySelector("form");

if (formLogin && document.getElementById("emailLogin")) {
    formLogin.addEventListener("submit", (event) => {
        event.preventDefault();

        const user = document.getElementById("emailLogin").value.trim();
        const password = document.getElementById("passwordLogin").value.trim();

        if (user === "user@email.com.br" && password === "Senai2025!") {
            alert("Login realizado com sucesso!");
            window.location.href = "pokedex.html";
        } else {
            alert("Usuário ou senha incorretos!");
        }
    });
}