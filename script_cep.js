document.getElementById("cep").onchange = pesquisacep;

function limpaFormularioCep() {
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('uf').value = "";
}

function processarDados(conteudo) {
    if ("erro" in conteudo)
        processarCepInvalido();        
    else 
        processarCepValido(conteudo);    
}

function isCepValido(cep){
    var regex_cepvalido = /^[0-9]{8}$/;
    return regex_cepvalido.test(cep);    
}

function setVisible(name, visible){
    var x = document.getElementById(name);
    x.style.visibility = visible ? "visible" : 'hidden';    
}

function processarCepInvalido(){
    mostrarMsgErro("CEP Inválido");
    limpaFormularioCep();    
}

function mostrarMsgErro(mensagem){
    document.getElementById('msg_erro').innerHTML = mensagem;    
}

function apagarMsgErro(){
    document.getElementById('msg_erro').innerHTML = "";
}

function processarCepValido(conteudo){    
    apagarMsgErro();
    document.getElementById('rua').value = conteudo.logradouro;
    document.getElementById('bairro').value = conteudo.bairro;
    document.getElementById('cidade').value = conteudo.localidade;
    document.getElementById('uf').value = conteudo.uf;    
}

function pesquisacep(){    
	
    var cep = document.getElementById("cep").value;    
    
    if (!isCepValido(cep)){
        return processarCepInvalido();
    }
    
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            var jsonObject = JSON.parse(xhr.responseText);
            processarDados(jsonObject);
        } 
    }

    url = 'https://viacep.com.br/ws/'+ cep + '/json/';
    xhr.open('GET', url);
    xhr.send();
}