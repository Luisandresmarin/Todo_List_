const listaDeTareas = document.querySelector("#tareas");
const tareaInput = document.querySelector("#nuevaTarea");
const btnAgregar = document.querySelector("#agregarTarea");
const cuentaTareasTotal = document.querySelector("#cuenta-tareas-total");
const cuentaTareasRealizadas = document.querySelector("#cuenta-tareas-realizadas");

let proximoId = 4; // Siguiente ID disponible

const tareas = [
    { id: obtenerIdUnico(), descripcion: "Completar informe semanal", realizada: false },
    { id: obtenerIdUnico(), descripcion: "Reunión con el equipo de proyecto", realizada: true },
    { id: obtenerIdUnico(), descripcion: "Preparar presentación para cliente", realizada: false }
];

function obtenerIdUnico() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

function actualizarListaTareas() {
    let html = "";
    let realizadas = 0;

    tareas.forEach(tarea => {
        const idVisible = String(tarea.id).slice(-3);
        const tareaRealizada = tarea.realizada ? 'checked' : '';

        html += `
            <li data-id="${tarea.id}">
                <span>ID: ${idVisible}</span>
                <input type="checkbox" id="tarea-${tarea.id}" ${tareaRealizada}>
                <label for="tarea-${tarea.id}" ${tarea.realizada ? 'style="text-decoration: line-through;"' : ''}>${tarea.descripcion}</label>
                <i class="fas fa-times-circle eliminar" data-id="${tarea.id}"></i>
            </li>
        `;

        if (tarea.realizada) {
            realizadas++;
        }
    });

    listaDeTareas.innerHTML = html;
    cuentaTareasTotal.textContent = `Total: ${tareas.length}`;
    cuentaTareasRealizadas.textContent = `Realizadas: ${realizadas}`;

    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const id = parseInt(checkbox.id.split('-')[1]);
            const tarea = tareas.find(t => t.id === id);
            tarea.realizada = checkbox.checked;
            actualizarListaTareas();
        });
    });

    const iconosEliminar = document.querySelectorAll(".eliminar");
    iconosEliminar.forEach(icono => {
        icono.addEventListener("click", () => {
            const id = parseInt(icono.getAttribute("data-id"));
            const indice = tareas.findIndex(t => t.id === id);
            tareas.splice(indice, 1);
            actualizarListaTareas();
        });
    });
}

btnAgregar.addEventListener("click", () => {
    agregarTarea();
});

tareaInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        agregarTarea();
    }
});

function agregarTarea() {
    const descripcionTarea = tareaInput.value.trim();
    if (descripcionTarea === "") {
        alert("Por favor, ingresa una tarea válida");
        return;
    }
    
    const tareaExistente = tareas.find(t => t.descripcion.toLowerCase() === descripcionTarea.toLowerCase());
    if (tareaExistente) {
        alert("¡Tarea ya agendada!");
        return;
    }

    const nuevaTarea = {
        id: obtenerIdUnico(),
        descripcion: descripcionTarea,
        realizada: false
    };

    tareas.push(nuevaTarea);
    tareaInput.value = "";
    actualizarListaTareas();
}

actualizarListaTareas();
