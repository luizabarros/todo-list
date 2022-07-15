let listaTarefas = [[], [], []]

const btnAdicionar = document.getElementById('adicionar')
const pesquisar = document.getElementById('lupa')
const ul = document.getElementById('tarefas-lista')

btnAdicionar.addEventListener('click', interceptarAgenda)
pesquisar.addEventListener('click', pesquisarItem)
ul.addEventListener('click', removerTarefa)

function interceptarAgenda() {
    const inputTexto = document.getElementById('titulo')
    const selecionarOpcoes = document.getElementById('tipo-tarefa')
    
    const tituloTarefa = inputTexto.value.trim()
    const tipoTarefa = selecionarOpcoes.value

    if (tituloTarefa == '' || tipoTarefa == '') {
        alert('Por favor, insira os dados da tarefa!')

    } else {
        const tarefa = {
            titulo: tituloTarefa,
            tipo: tipoTarefa
        }

        adicionarItem(tarefa, listaTarefas)
        listarTarefas(listaTarefas)
    }
    
    inputTexto.value = ''
    selecionarOpcoes.value = ''

    return listaTarefas
}


function pesquisarItem() {
    const inputPesquisar = document.getElementById('pesquisar')
    const textPesquisar = inputPesquisar.value
    
    let resultadoBusca = [[], [], []]
    listaTarefas.forEach(arrSecundaria => {
        arrSecundaria.forEach(obj => {
            if (textPesquisar.toLowerCase() == obj.titulo.toLowerCase()) {
                adicionarItem(obj, resultadoBusca)
            }
        })
    })

    inputPesquisar.value = ''
    listarTarefas(resultadoBusca)

    return resultadoBusca
}


function removerTarefa(event) {
    let elemento = event.target
    let idElemento = event.target.id
    
    let spanDoElemento = elemento.parentElement
    let liTarefa = spanDoElemento.parentElement
    
    if (liTarefa.classList.contains('urgente')) {
        listaTarefas[0].splice(idElemento, 1)

    } else if (liTarefa.classList.contains('prioritario')) {
        listaTarefas[1].splice(idElemento - 1, 1)

    } else if (liTarefa.classList.contains('normal')) {
        listaTarefas[2].splice(idElemento - 2, 1)
    }
    
    listarTarefas(listaTarefas)
    return listaTarefas
}


function adicionarItem(atividade, array) {
    if (atividade.tipo == 'urgente') {
        array[0].push(atividade)

    } else if (atividade.tipo == 'prioritario') {
        array[1].push(atividade)

    } else if (atividade.tipo == 'normal') {
        array[2].push(atividade)
    }

    return array
}


function geradorId() {
    let elementosImg = document.getElementsByTagName('img')

    for (let index = 0; index < elementosImg.length; index++) {
        elementosImg[index].id = index
    }
}


function criarItens(objetoTarefa) {
    const li = document.createElement('li')
    const tarefaTitulo = document.createElement('span')
    const btnRemoverTarefa = document.createElement('span')
    const imgLixo = document.createElement('img') 

    li.classList.add('tarefas-item')
    li.classList.add('campo-interacao')
    li.classList.add(objetoTarefa.tipo)

    tarefaTitulo.classList.add('tarefa-titulo')
    btnRemoverTarefa.classList.add('remover')

    imgLixo.src = './src/img/icones/trash-icon.png'
    imgLixo.alt = 'Lixo'
    imgLixo.title = 'Clique para remover esta tarefa'

    tarefaTitulo.innerText = objetoTarefa.titulo

    btnRemoverTarefa.append(imgLixo)
    li.append(tarefaTitulo, btnRemoverTarefa)

    return li
}


function listarTarefas(arrayTarefas) {
    ul.innerHTML = ''

    const comprimentoArrayPrincipal = arrayTarefas.length
    for (let index = 0; index <  comprimentoArrayPrincipal; index++) {

        const arraySecundaria = arrayTarefas[index]
        const comprimentoArraySecundaria = arraySecundaria.length
        if (comprimentoArraySecundaria != 0) {

            for (let posicao = 0; posicao < comprimentoArraySecundaria; posicao++) {
                let objeto = arraySecundaria[posicao]

                let item = criarItens(objeto)
                ul.append(item)
            }
        }
    }
    geradorId()
    return ul
}