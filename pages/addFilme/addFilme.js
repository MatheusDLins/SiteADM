if(!isNewFilme()){
    const uid = getFilmeUid();
    findFilmeByUid(uid);
}


function getFilmeUid(){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('uid');
}

function isNewFilme(){
    return getFilmeUid() ? false : true;
}

function findFilmeByUid(uid){
    
    firebase.firestore()
        .collection('filmes_teste')
        .doc(uid)
        .get()
        .then(doc => {
            if(doc.exists){
                fillFilmeScreen(doc.data());
                
            } else {
                alert("Documento nao encontrado!");
                window.location.href = '../filmes/filmes.html';
            }
        })
        .catch(() => {
            alert("Erro ao recuperar documento");
            window.location.href = '../filmes/filmes.html';
        })
}

//essa função pega os valores dos filmes e coloca na tabela para atualizar
function fillFilmeScreen(filme){
    form.idx().value = filme.idx;
    form.sala().value = filme.sala;
    form.titulo().value = filme.titulo;
    form.sinopse().value = filme.sinopse;
    form.duracao().value = filme.duracao;
    form.image().value = filme.image;
}



function saveFilme() {
    const filme = createFilme();

    if(isNewFilme()){
        save(filme);
    }else{
        update(filme);
    }
}

function save(filme){
    

    firebase.firestore()
        .collection('filmes_teste')
        .add(filme)
        .then(() => {
            
            window.location.href = "../filmes/filmes.html";
        })
        .catch(() => {
            alert("Error ao salvar o filme")
        })
}

function update(filme){
    firebase.firestore()
        .collection('filmes_teste')
        .doc(getFilmeUid())
        .update(filme)
        .then(() => {
            window.location.href = "../filmes/filmes.html";
        })
        .catch(() => {
            alert("Error ao atualizar o filme")
        })
}



function createFilme(){
    return{
        idx: form.idx().value,
        sala: form.sala().value,
        titulo: form.titulo().value,
        sinopse: form.sinopse().value,
        duracao: form.duracao().value,
        image: form.image().value 
    }
}

function onChangeValue(){
    const idx = form.idx().value;
    //sem valor
    form.valueRequiredError().style.display = !idx ? 'block' : 'none';
    

    //valo menor ou igual a zero
    form.valueLessOrEqualToZeroError().style.display = idx<0 ? 'block' : 'none';
    

    //valor maior que seis
    form.valueMaiorQueSeis().style.display = idx>6 ? 'block' : 'none';

    toggleSaveButtonDisable();
}

//função para ver se a sala foi selecionada
function onChangeSalaType(){
    const salaType = form.salaType().value;
    form.salaTypeRequiredError().style.display = !salaType ? 'block' : 'none';

    toggleSaveButtonDisable();
}

//função para ativar o botão
function toggleSaveButtonDisable(){
    form.saveButton().disabled = !isFormValid();
}

//verificar se o formulario foi validado
function isFormValid(){

    const idx = form.idx().value;
    if (!idx || idx < 0 || idx > 6) {
        return false;
    }

    const salaType = form.salaType().value;
    if (!salaType){
        return false;
    }

    

    return true;



}





const form = {
    idx: () => document.getElementById('idx'),
    sala: () => document.getElementById('sala-type'),
    titulo: () => document.getElementById('titulo'),
    sinopse: () => document.getElementById('sinopse'),
    duracao: () => document.getElementById('duracao'),
    image: () => document.getElementById('image'),

    valueRequiredError: () => document.getElementById('value-required-error'),
    valueLessOrEqualToZeroError: () => document.getElementById('value-less-or-equal-to-zero-error'),
    valueMaiorQueSeis: () => document.getElementById('value-maior-que-seis'),

    salaType: () => document.getElementById('sala-type'),
    salaTypeRequiredError: () => document.getElementById('sala-type-required-error'),

    saveButton: () => document.getElementById('save-button'),
}