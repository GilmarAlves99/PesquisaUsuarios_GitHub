let conteudo = document.querySelector('#conteudo');
let form = document.querySelector('#name-form');
let buttonLogout = document.querySelector('#logout');
let mostraNome = document.querySelector('#mostraNome');
let partePesquisa = document.querySelector('#pesquisaruser');
let mostraLocation = document.querySelector('#mostralocalizacao');
let mostarBio = document.getElementById('bio');
let seguidores = document.getElementById('followers');
let seguindo = document.getElementById('following');
let mostrarQtdRepo = document.getElementById('repo');
let links = document.getElementById('links');
mostraNome.style.display = "none";
buttonLogout.style.display = "none"
conteudo.style.display = 'none'
let imagemUser = document.querySelector("#imgUser")

function verificaUser() {
    const nomeUser = localStorage.getItem("name");
    if (nomeUser) {
        console.log(`Tem um nome ${nomeUser}`)

        buttonLogout.style.display = "block"

        mostraNome.style.display = "block";


        partePesquisa.style.display = 'none'
        conteudo.style.display = 'block'
        fetch(`https://api.github.com/users/${nomeUser}`, {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.github.v3+json',
            },
        }).then((response) => {
            console.log(response);
            console.log(typeof response);
            return response.json();
        }).then((data) => {
            console.log(data);
            mostraNome.textContent = data.name;
            mostraLocation.textContent = data.location;
            mostarBio.textContent = data.bio;
            imagemUser.src = data.avatar_url;
            mostrarQtdRepo.textContent = `Quantidade de Repositio: ${data.public_repos}`;
            seguindo.textContent = `Seguidores: ${data.following}`;
            seguidores.textContent = `Seguindo: ${data.followers}`;
            links.innerHTML = `Blog: <a href="${data.blog}">${data.blog}</a>`;

            if (404) {
                localStorage.removeItem("name");
                verificaUser();
            }


        }).catch((erro) => {
            console.log('Usuario não encontrado' + erro)
        });
    } else {
        console.log('vazio')
        conteudo.style.display = 'none'
        buttonLogout.style.display = "none"
        mostraNome.style.display = "none";
        partePesquisa.style.display = 'block'
    }



}


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameinput = document.querySelector('#nome');

    if (nameinput.value != "") {
        localStorage.setItem("name", nameinput.value);
        nameinput.value = "";
        verificaUser();
    } else {
        let status = document.querySelector('#status');
        status.innerHTML = "Campo vazio";

    }

})

buttonLogout.addEventListener("click", () => {

    localStorage.removeItem("name");

    verificaUser();
})
verificaUser();


