let tareas = [
    {
        id: 1,
        descripcion: "Tarea 1" ,
        completado: false,
    },
    {
        id: 2,
        descripcion: "Tarea 2" ,
        completado: false,
    },
    {
        id: 3,
        descripcion: "Tarea 3" ,
        completado: false,
    },
];

let contadorId = 3;

const listadoTareas = document.querySelector("#listadoTareas");
const tareaInput = document.querySelector("#nuevaTarea");
const btnAgregar = document.querySelector("#agregarTarea");
const totalTareas = document.querySelector("#total");

function renderizarTareas() {
    let listadoInicial = "";
    for (let tarea of tareas) {
        listadoInicial += `
        <tr>
            <td>${tarea.id}</td>
            <td>${tarea.descripcion}</td>
            <td class=" px-5 form-check">               
                <input class="form-check-input" type="checkbox" id="tarea-${tarea.id}" onchange="actualizarTarea(${tarea.id})" ${tarea.completado ? "checked" : ""}>                    
            </td>
            <td> 
                <button type="button" class="btn-close" onclick="eliminar(${tarea.id})" aria-label="Close"></button>        
            </td>
        </tr>`;
    };

    listadoTareas.innerHTML = listadoInicial;
    totalTareas.innerHTML = tareas.length;
    contarRealizadas()
};

btnAgregar.addEventListener("click", () => {
    const tareaAgregada = tareaInput.value;
    if (tareaAgregada.trim() !== "") {
        const nuevoId = ++contadorId;
        tareas.push({id: nuevoId, descripcion: tareaAgregada, completado: false});
        tareaInput.value = "";  
        renderizarTareas();   
        } else {
            alert("Ingresa una tarea");
        }
    }
);

function contarRealizadas() {
    let completadas = tareas.filter(tarea => tarea.completado).length;
    document.getElementById(`totalRealizadas`).textContent = `${completadas}`; 
}

function actualizarTarea(idTarea) {
    const tarea = tareas.find(t => t.id === idTarea)
    if (tarea) {
        const checkbox = document.getElementById(`tarea-${idTarea}`);
        tarea.completado = checkbox.checked;
        contarRealizadas();
    }
};

function eliminar(id) {
    const index = tareas.findIndex((ele) => ele.id == id);
    if (index !== -1) {
        if (tareas[index].completado) {
            alert("No puedes eliminar una tarea realizada");
            return;
        }
        tareas.splice(index, 1);
        contarRealizadas();
        renderizarTareas();
    }
}

tareaInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        btnAgregar.click();
    }
});

renderizarTareas();
