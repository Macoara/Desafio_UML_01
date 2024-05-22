// Definición de la clase Paciente con getters y setters
function Paciente(nombre, apellido, edad, telefono, direccion, diagnostico) {
    this._nombre = nombre;
    this._apellido = apellido;
    this._edad = edad;
    this._telefono = telefono;
    this._direccion = direccion;
    this._diagnostico = diagnostico;
}
// Getters
Paciente.prototype.getNombre = function() {
    return this._nombre;
};
Paciente.prototype.getApellido = function() {
    return this._apellido;
};
Paciente.prototype.getEdad = function() {
    return this._edad;
};
Paciente.prototype.getTelefono = function() {
    return this._telefono;
};
Paciente.prototype.getDireccion = function() {
    return this._direccion;
};
Paciente.prototype.getDiagnostico = function() {
    return this._diagnostico;
};
// Setters
Paciente.prototype.setNombre = function(nombre) {
    this._nombre = nombre;
};
Paciente.prototype.setApellido = function(apellido) {
    this._apellido = apellido;
};
Paciente.prototype.setEdad = function(edad) {
    this._edad = edad;
};
Paciente.prototype.setTelefono = function(telefono) {
    this._telefono = telefono;
};
Paciente.prototype.setDireccion = function(direccion) {
    this._direccion = direccion;
};
Paciente.prototype.setDiagnostico = function(diagnostico) {
    this._diagnostico = diagnostico;
};
// Método para mostrar todos los datos de los pacientes
Paciente.prototype.mostrarDatos = function () {
    return `<div class="paciente-card">
                <h5>Nombre: ${this._nombre} ${this._apellido}</h5>
                <p>Edad: ${this._edad}</p>
                <p>Teléfono: ${this._telefono}</p>
                <p>Dirección: ${this._direccion}</p>
                <p>Diagnóstico: ${this._diagnostico}</p>
            </div>`;
};
// Método para buscar pacientes por nombre
Paciente.buscarPorNombre = function(nombre, pacientes) {
    return pacientes.filter(paciente => paciente.getNombre().toLowerCase() === nombre.toLowerCase());
};
// Método para mostrar todos los pacientes
Paciente.mostrarTodos = function(pacientes) {
    return pacientes.map(paciente => paciente.mostrarDatos()).join('');
};
// Array para almacenar los pacientes
let pacientes = [];
// Función para agregar un nuevo paciente
function agregarPaciente(nombre, apellido, edad, telefono, direccion, diagnostico) {
    let paciente = new Paciente(nombre, apellido, edad, telefono, direccion, diagnostico);
    pacientes.push(paciente);
}
// Función para mostrar todos los pacientes en el DOM
function mostrarTodosLosPacientes() {
    let pacientesDiv = $('#pacientes');
    pacientesDiv.html("<h2 class='text-center mb-3'>Datos de todos los pacientes:</h2>");
    pacientesDiv.append(Paciente.mostrarTodos(pacientes));
}
// Función para buscar y mostrar pacientes por nombre en el DOM
function buscarPacientePorNombre(nombre) {
    let resultado = Paciente.buscarPorNombre(nombre, pacientes);
    let resultadoBusquedaDiv = $('#resultadoBusqueda');
    resultadoBusquedaDiv.html("");
    if (resultado.length > 0) {
        resultadoBusquedaDiv.html("<h2 class='text-center mb-3'>Resultados de la búsqueda:</h2>");
        resultadoBusquedaDiv.append(Paciente.mostrarTodos(resultado));
    } else {
        resultadoBusquedaDiv.html("<p class='text-center'>No se encontraron pacientes con ese nombre.</p>");
    }
}
// Función para manejar la adición de un nuevo paciente
function manejarAgregarPaciente() {
    let nombre = $('#nombre').val().trim();
    let apellido = $('#apellido').val().trim();
    let edad = $('#edad').val().trim();
    let telefono = $('#telefono').val().trim();
    let direccion = $('#direccion').val().trim();
    let diagnostico = $('#diagnostico').val().trim();
    if (nombre && apellido && edad && telefono && direccion && diagnostico) {
        agregarPaciente(nombre, apellido, edad, telefono, direccion, diagnostico);
        mostrarTodosLosPacientes();
        $('#nombre').val('');
        $('#apellido').val('');
        $('#edad').val('');
        $('#telefono').val('');
        $('#direccion').val('');
        $('#diagnostico').val('');
    } else {
        alert('Por favor, complete todos los campos.');
    }
}
// Función para mostrar u ocultar secciones
function mostrarSeccion(seccionId) {
    $('#pacientes').addClass('hidden');
    $('#buscar').addClass('hidden');
    $('#agregar').addClass('hidden');
    $(`#${seccionId}`).removeClass('hidden');
}
// Instanciar cada objeto Paciente utilizando la instrucción new
agregarPaciente("Juan", "Pérez", 30, "12345678-9", "Calle 123", "Gripe");
agregarPaciente("María", "Gómez", 25, "98765432-1", "Avenida XYZ", "Fiebre");
agregarPaciente("Pedro", "López", 40, "55555555-5", "Calle ABC", "Dolor de cabeza");
// Mostrar todos los pacientes al cargar la página
$(document).ready(function() {
    mostrarTodosLosPacientes();
    // Asignar eventos a los botones del menú
    $('#mostrarTodosBtn').on('click', function() {
        mostrarTodosLosPacientes();
        mostrarSeccion('pacientes');
    });
    $('#buscarPacienteBtn').on('click', function() {
        mostrarSeccion('buscar');
    });
    $('#agregarPacienteBtn').on('click', function() {
        mostrarSeccion('agregar');
    });
    // Asignar evento al botón de búsqueda
    $('#buscarBtn').on('click', function() {
        let nombreABuscar = $('#buscarNombre').val().trim();
        buscarPacientePorNombre(nombreABuscar);
    });
    // Asignar evento al botón de agregar paciente
    $('#agregarBtn').on('click', manejarAgregarPaciente);
});
