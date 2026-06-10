/* //////////////// CUENTA REGRESIVA - DATASET//////////////// */
 
let fechaLimite = new Date(catalogo[0].fechaFinDescuento).getTime();

for (let i = 1; i < catalogo.length; i++) {
    let fechaProducto = new Date(catalogo[i].fechaFinDescuento).getTime();

    if (fechaProducto < fechaLimite) {
        fechaLimite = fechaProducto;
    }
}

let intervalo = setInterval(function(){

    let ahora = new Date().getTime();
    let distancia = fechaLimite - ahora;

    let dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    let horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60)); 
    let segundos = Math.floor((distancia % (1000 * 60)) / 1000); 
 
    dias = dias < 10 ? '0' + dias : dias; 
    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;

    if(document.querySelector('#conteoDias')){
        document.querySelector('#conteoDias').innerHTML = dias;
        document.querySelector('#conteoHoras').innerHTML = horas;
        document.querySelector('#conteoMin').innerHTML = minutos;
        document.querySelector('#conteoSec').innerHTML = segundos;
    }

    if(distancia < 0){
        clearInterval(intervalo);

        if(document.querySelector('#conteoDias')){ 
            document.querySelector('#conteoDias').innerHTML = "00";
            document.querySelector('#conteoHoras').innerHTML = "00";
            document.querySelector('#conteoMin').innerHTML = "00";
            document.querySelector('#conteoSec').innerHTML = "00";
        }
    }

}, 1000); 


/* //////////////// RANDOM - DESTACADOS //////////////// */

let contenedorDestacados = document.querySelector('#productosDestacados');

function cargarProductosDestacados() {
    contenedorDestacados.innerHTML = " ";

    let productosRandom = [];

    while (productosRandom.length < 3) {
        let numeroRandom = Math.floor(Math.random() * catalogo.length);
        let productoRandom = catalogo[numeroRandom];

        if (productosRandom.includes(productoRandom) === false) { 
            productosRandom.push(productoRandom); 
        }
    }
    
    for (let i = 0; i < productosRandom.length; i++) {
        contenedorDestacados.innerHTML += `
        <div class="producto-card">
            <p class="producto-categoria">${productosRandom[i].categoria.toUpperCase()}</p>

            <h3 class="producto-nombre">${productosRandom[i].nombre}</h3>

            <img src="${productosRandom[i].imagenes[0]}" alt="${productosRandom[i].imagenes[0]}" class="producto-img">

            <a href="ampliacion.html?id=${productosRandom[i].id}" class="producto-verMas">[ Ver Más ]</a>
        </div>`
    }
}

cargarProductosDestacados();


/* //////////////// FORMULARIO SUSCRIPCIÓN //////////////// */

let input1 = document.querySelector('#nombreFormulario');
let input2 = document.querySelector('#apellidoFormulario');
let input3 = document.querySelector('#mailFormulario');
let input4 = document.querySelector('#fechaFormulario');
let input5 = document.querySelector('#numeroFormulario');
let input6 = document.querySelector('#direcFormulario');

let resultado1 = document.querySelector('#resultadoNombre');
let resultado2 = document.querySelector('#resultadoApellido');
let resultado3 = document.querySelector('#resultadoMail');
let resultado4 = document.querySelector('#resultadoFecha');
let resultado5 = document.querySelector('#resultadoCelular');
let resultado6 = document.querySelector('#resultadoDireccion');
let resultadoValidacion = document.querySelector('#resultadoFormulario');

let btnFormulario = document.querySelector('#btnFormulario');

btnFormulario.addEventListener('click', validar);

function validar(){
    let nombre = input1.value;
    let apellido = input2.value;

    let mail = input3.value;
    let tieneArroba = mail.includes('@');
    let noEmpieza = !mail.startsWith('@');
    let noTermina = !mail.endsWith('@');
    let com = mail.endsWith('.com');
    let org = mail.endsWith('.org');
    let edu = mail.endsWith('.edu');

    let fecha = input4.value;
    let numero = input5.value;
    let direc = input6.value;

    resultado1.innerHTML = '';
    resultado2.innerHTML = '';
    resultado3.innerHTML = '';
    resultado4.innerHTML = '';
    resultado5.innerHTML = '';
    resultado6.innerHTML = '';
    resultadoValidacion.innerHTML = '';


    /* Colores: */
    resultado1.style.color = '';
    resultado2.style.color = '';
    resultado3.style.color = '';
    resultado4.style.color = '';
    resultado5.style.color = '';
    resultado6.style.color = '';
    resultadoValidacion.style.color = '';

    if (nombre === ''){
        resultado1.innerHTML = 'Complete el nombre';
        resultado1.style.color = 'red';
    } else if (!isNaN(nombre)){
        resultado1.innerHTML = 'Ingrese una palabra';
        resultado1.style.color = 'red';
    } else {
        resultado1.innerHTML = 'Nombre válido';
        resultado1.style.color = 'green';
    }

    if (apellido === ''){
        resultado2.innerHTML = 'Complete el apellido';
        resultado2.style.color = 'red';
    } else if (!isNaN(apellido)){
        resultado2.innerHTML = 'Ingrese una palabra';
        resultado2.style.color = 'red';
    } else {
        resultado2.innerHTML = 'Apellido válido';
        resultado2.style.color = 'green';
    }

    if (mail === ''){
        resultado3.innerHTML = 'Ingrese su mail';
        resultado3.style.color = 'red';
    } else if (tieneArroba && noEmpieza && noTermina && (com || org || edu)){
        resultado3.innerHTML = 'Mail válido';
        resultado3.style.color = 'green';
    } else {
        resultado3.innerHTML = 'Mail inválido';
        resultado3.style.color = 'red';
    }

    if (fecha === ''){
        resultado4.innerHTML = 'Ingrese su fecha de nacimiento';
        resultado4.style.color = 'red';
    } else {
        resultado4.innerHTML = 'Fecha válida';
        resultado4.style.color = 'green';
    }

    if (numero === ''){
        resultado5.innerHTML = 'Ingrese su número de celular';
        resultado5.style.color = 'red';
    } else if (isNaN(numero)){
        resultado5.innerHTML = 'Ingrese solo números';
        resultado5.style.color = 'red';
    } else {
        resultado5.innerHTML = 'Número válido';
        resultado5.style.color = 'green';
    }

    if (direc === ''){
        resultado6.innerHTML = 'Ingrese su dirección';
        resultado6.style.color = 'red';
    } else {
        resultado6.innerHTML = 'Dirección válida';
        resultado6.style.color = 'green';
    }

    if ( resultado1.style.color === 'green' && resultado2.style.color === 'green' && resultado3.style.color === 'green' && resultado4.style.color === 'green' && resultado5.style.color === 'green' && resultado6.style.color === 'green' ){
        resultadoValidacion.innerHTML = 'Formulario enviado correctamente. Muchas gracias!';
        resultadoValidacion.style.color = 'green';
    } else {
        resultadoValidacion.innerHTML = 'Revise los campos marcados';
        resultadoValidacion.style.color = 'red';
    }

}