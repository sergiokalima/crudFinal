




















let tareas = []

const title = document.getElementById('title')

const desc = document.getElementById('desc')

const boton = document.getElementById('boton')

const tabla = document.getElementById('cuerpoTabla')

const form = document.getElementById('form')

const actualizar = document.getElementById('actualizar')

traerLS()
listar()

let editMode = false;
let idEditing = null;

boton.addEventListener('click',

function crear (e) {
 // e.preventDefault()

let id = Date.now()

  const tarea= {
    id,
    title: title.value,
    desc: desc.value,
    completed: false
  }

  tareas.push(tarea)
  listar()
  resetForm()

  saveLS()
}
)

function traerLS () {
  tareas = JSON.parse(localStorage.getItem('tareas'))

  if(tareas) {
    tareas = tareas
  } else {
    tareas = []
  }
}
function saveLS () {
  localStorage.setItem('tareas', JSON.stringify
  (tareas))
}


function listar () {
  tabla.innerHTML = ''

  tareas.forEach(tarea => {
    tabla.innerHTML += `
    <td>${tarea.title}</td>
    <td>${tarea.desc}</td>
    <td>${tarea.completed}</td>
    <td>
    <button onclick="editarFila(${tarea.id})" class="btn btn-secondary">Editar</button>
    <button onclick="eliminarFila(${tarea.id})" class="btn btn-dark">Eliminar</button>
    </td>
    `
  })
}


function resetForm () {
  form.reset()
}

function eliminarFila (id) {

  const index = tareas.findIndex((el) => el.id == id)

  tareas.splice(index, 1)

  saveLS()
  traerLS()
  listar()


}

function editarFila (id) {

editMode = true;
idEditing = id;

boton.classList.add('hide');
actualizar.classList.remove('hide');

const index = tareas.findIndex((el) => el.id == id)


const tarea = tareas[index]

title.value = tarea.title
desc.value = tarea.desc
}

function edit (e) {
  e.preventDefault()

  const index = tareas.findIndex((el) => el.id == idEditing)


const tarea= {
  id: idEditing,
  title: title.value,
  desc: desc.value,
  completed: false
}

tareas[index] = tarea

saveLS()
traerLS()
listar()
resetForm()

editMode = false;
idEditing = null;

boton.classList.remove('hide');
actualizar.classList.add('hide');
}


actualizar.addEventListener('click', edit)