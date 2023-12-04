const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sTipo = document.querySelector('#m-tipo');
const sModelo = document.querySelector('#m-modelo');
const sEtiqueta = document.querySelector('#m-etiqueta');
const btnSalvar = document.querySelector('#btnSalvar');

let itens = [];
let id = 0;

function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active');
    }
  };

  if (edit) {
    sTipo.value = itens[index].tipo;
    sModelo.value = itens[index].modelo;
    sEtiqueta.value = itens[index].etiqueta;
    id = index;
  } else {
    sTipo.value = '';
    sModelo.value = '';
    sEtiqueta.value = '';
    id = itens.length; 
  }
}

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  itens.splice(index, 1);
  for (let i = index; i < itens.length; i++) {
    itens[i].id = i;
  }
  setItensBD();
  loadItens();
}


function insertItem(item) {
  let tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${item.tipo}</td>
    <td>${item.modelo}</td>
    <td>${item.etiqueta}</td>
    <td class="acao">
      <button onclick="editItem(${item.id})"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${item.id})"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbody.appendChild(tr);
}

function loadItens() {
  itens = getItensBD();
  tbody.innerHTML = '';
  itens.forEach(item => {
    insertItem(item);
  });
}

function saveItem() {
  const newItem = {
    id: id,
    tipo: sTipo.value,
    modelo: sModelo.value,
    etiqueta: sEtiqueta.value
  };

  if (id < itens.length) {
   
    itens[id] = newItem;
  } else {
    
    itens.push(newItem);
  }

  setItensBD();
  loadItens();
  modal.classList.remove('active');
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) || [];
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens));

loadItens();
btnSalvar.addEventListener('click', saveItem);
