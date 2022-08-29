/*
//-----------------------Iniciar pagina---------------------------------------------

const nickName = entrarNASala();
//setTimeout(participantes, 3000);


//----------------------Repostas da API----------------------------------------------

function processarResposta(resposta){ //imprimi lista de participantes
    console.log(resposta.data);
}

function deuTudoCerto(){ //Informa que deu certo a entrada na sala
    console.log("Usuario entrou na sala")
}


//-----------------------Entrar na Sala---------------------------------------------


function tratarErro(erro){
    console.log(erro.response.status)
    if (erro.response.status ===400){
        alert ("o nome já esta sendo utilizado")
        entrarNASala()
    }
    //console.log(erro.response.data)
}

function testarNome(){  //So permite entrar na sala se o nome não for null
    let nome = prompt("Qual seu nickname?")
    if (nome === null){
        testarNome();
    }
    return nome;
}



function entrarNASala(){ // Envia o nome para a API
    const nomeUsuario ={
        name: testarNome()
    }
    
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nomeUsuario)
    promessa.then(deuTudoCerto)
    promessa.catch(tratarErro)

}


function participantes(){ // Solicita lista de participantes
    const promessa = axios.get ('https://mock-api.driven.com.br/api/v6/uol/participants');
    promessa.then(processarResposta);   
    promessa.catch(tratarErro);
}

//-----------------------Verificação de usuario na sala
*/