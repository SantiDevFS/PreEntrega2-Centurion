// Variables
const alerta = document.querySelector('.alerta'); 
const formulario = document.querySelector('.lista-form'); 
const lista = document.getElementById('lista');
const submitBtn = document.querySelector('.submit-btn');
const contenedorLista = document.querySelector('.contenedor-lista');
const carritoLista = document.querySelector('.carrito-lista'); 
const contador = document.createElement('p');
contador.classList.add('contador');
contador.textContent = 'Cantidad de items: 0';
contenedorLista.insertBefore(contador, carritoLista);

// Lista de ítems 
let listaItems = [];

// Event Listener para el formulario
formulario.addEventListener('submit', agregarItem);

// Función para agregar un item a la lista
function agregarItem(event) {
    event.preventDefault();
    const valor = lista.value.trim();
    if (valor !== "") {
        const newItem = {
            id: new Date().getTime(),
            nombre: valor
        };

        // Agregar el nuevo item al array
        listaItems.push(newItem);

        // Renderizar el nuevo item en la lista
        renderizarItem(newItem);

        // Actualizar contador y mostrar mensaje
        actualizarContador();
        mostrarAlerta('Item agregado a la lista', 'exito');

        // Resetear el formulario
        lista.value = "";
    } else {
        mostrarAlerta('Por favor ingrese un valor', 'peligro');
    }
}

// Función para renderizar un item en el DOM
function renderizarItem(item) {
    const itemElement = document.createElement('article');
    itemElement.classList.add('item-lista');
    itemElement.dataset.itemId = item.id; // Guardar el ID del item en el atributo data

    itemElement.innerHTML = `
        <p class="titulo">${item.nombre}</p>
        <div class="btn-contenedor">
            <button type="button" class="editar-btn">Editar</button>
            <button type="button" class="borrar-btn">Borrar</button>
        </div>
    `;

    // Añadir eventos a los botones de editar y borrar
    const editarBtn = itemElement.querySelector('.editar-btn');
    const borrarBtn = itemElement.querySelector('.borrar-btn');

    editarBtn.addEventListener('click', editarItem);
    borrarBtn.addEventListener('click', borrarItem);

    // Agregar el elemento a la lista en el DOM
    carritoLista.appendChild(itemElement);
}

// Función para editar un item
function editarItem(event) {
    const itemElement = event.target.closest('.item-lista');
    const itemId = parseInt(itemElement.dataset.itemId);

    // Encontrar el ítem en el array
    const itemIndex = listaItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        // Mostrar el nombre del ítem en el formulario para editar
        lista.value = listaItems[itemIndex].nombre;

        // Remover el ítem del array y del DOM
        listaItems.splice(itemIndex, 1);
        carritoLista.removeChild(itemElement);

        // Actualizar contador y mostrar mensaje
        actualizarContador();
        mostrarAlerta('Item editado', 'exito');
    }
}

// Función para borrar un item
function borrarItem(event) {
    const itemElement = event.target.closest('.item-lista');
    const itemId = parseInt(itemElement.dataset.itemId);

    // Encontrar el ítem en el array
    const itemIndex = listaItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        // Remover el ítem del array y del DOM
        listaItems.splice(itemIndex, 1);
        carritoLista.removeChild(itemElement);

        // Actualizar contador y mostrar mensaje
        actualizarContador();
        mostrarAlerta('Item borrado de la lista', 'peligro');
    }
}

// Función para actualizar el contador de items y la visibilidad del contenedor
function actualizarContador() {
    const items = listaItems.length;
    contador.textContent = `Cantidad de items: ${items}`;

    if (items === 0) {
        contenedorLista.classList.add('oculto');
    } else {
        contenedorLista.classList.remove('oculto');
    }
}

// Función para mostrar alertas
function mostrarAlerta(texto, tipo) {
    alerta.textContent = texto;
    alerta.className = `alerta alerta-${tipo}`; // Añade la clase correcta para mostrar la alerta

    // Desaparecer la alerta después de 3 segundos
    setTimeout(function() {
        alerta.textContent = '';
        alerta.className = 'alerta'; // Restablece la clase
    }, 3000);
}

// Función para limpiar toda la lista
document.querySelector('.limpiar-btn').addEventListener('click', function() {
    carritoLista.innerHTML = '';
    listaItems = []; // Vaciar el array de items
    actualizarContador(); // Actualizar el contador
    mostrarAlerta('Lista limpiada', 'exito');
});