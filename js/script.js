let nome = entrarNASala();
buscarMessagens();

setInterval(verificarConexao, 5000)
setInterval(buscarMessagens, 3000)

//----------------------------------------------------------------------------------------------------------
//------------------------------------Entrar na Sala--------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
function entrarNASala (){  
    const nomeUsuario = {
        name: verificarNome()
    }

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nomeUsuario)
    promessa.then(tudoCerto)
    promessa.catch(tratarErro)

    return nomeUsuario;

}

function verificarNome(){
    let nome = prompt('Qual o seu nome?')
    if (nome === '' || nome === null){
        alert('Por favor digite um nome!');
        verificarNome();
    }
    return nome;
}

function tratarErro(erro){
    console.log(erro)
    if(erro.response.status === 400){
        alert("Este nome já está sendo utilizado. Por favor escolha outro nome.");
        entrarNASala();
    }
}

function tudoCerto(){
}

function participantes(){ // Solicita lista de participantes
    const promessa = axios.get ('https://mock-api.driven.com.br/api/v6/uol/participants');
    promessa.then(resposta);   
    //promessa.catch(tratarErro);
}

function resposta(resposta){
    console.log(resposta.data)
}

function participantes(){ // Solicita lista de participantes
    const promessa = axios.get ('https://mock-api.driven.com.br/api/v6/uol/participants');
    promessa.then(processarResposta);   
    promessa.catch(tratarErro);
}
function processarResposta(resposta){ //imprimi lista de participantes
    console.log(resposta.data);
}
//----------------------------------------------------------------------------------------------------------
//------------------------------------Manter conexão--------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
function verificarConexao(){
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nome)

    promessa.then(respostaConexao)
    promessa.catch(respostaConexao)

}

function respostaConexao(resposta){
    if (resposta.data !=='OK'){
        alert('conexão encerrada')
        window.location.reload()
    }
}

//----------------------------------------------------------------------------------------------------------
//------------------------------------Buscar mensagens------------------------------------------------------
//----------------------------------------------------------------------------------------------------------

function buscarMessagens(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(imprimirMensagens)

}

function imprimirMensagens(mensagens){

    const ul = document.querySelector("ul");
    for (let index = 0; index < mensagens.data.length; index++) {
        const element = mensagens.data[index];
        ul.innerHTML +=`
            <li class="${element.type}"><span>${element.time}</span><span> <strong>${element.from}</strong> para <strong>${element.to}</strong>: ${element.text}</span></li>
        `
                
    }

    ul.scrollIntoView({block: "end"});
}

//----------------------------------------------------------------------------------------------------------
//------------------------------------Enviar mensagens------------------------------------------------------
//----------------------------------------------------------------------------------------------------------

function enviarMensagem(){
    
    const mensagem = document.querySelector("input")
    
    const textoMensagem = {
        from: nome.name,
        to: "Todos",
        text: mensagem.value,
        type: "message"
    }

    console.log(textoMensagem)

    mensagem.value="";

    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", textoMensagem);
    promessa.catch(function() {window.location.reload()});
}