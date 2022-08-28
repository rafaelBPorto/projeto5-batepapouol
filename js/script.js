

function tratarErro(erro){
    console.log(erro.response.status)
    if (erro.response.status ===400){
        alert ("o nome já esta sendo utilizado")
        entrarNASala()
    }
    //console.log(erro.response.data)
}

function entrarNASala(){
    const nomeUsuario ={
        name: prompt("Qual seu nickname?")
    }
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nomeUsuario)
    promessa.then(deuTudoCerto)
    promessa.catch(tratarErro)
}

function processarResposta(resposta){
    console.log(resposta.data);
}

function deuTudoCerto(){
    console.log("Usuario entrou na sala")
}


function participantes(){
    const promessa = axios.get ('https://mock-api.driven.com.br/api/v6/uol/participants');


    promessa.then(processarResposta);   
    promessa.catch(tratarErro);
}

entrarNASala();
setTimeout(participantes, 3000);