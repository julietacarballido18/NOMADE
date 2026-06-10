let parametros = new URLSearchParams(window.location.search)
let identificador = parametros.get('id')
let producto = catalogo.at(identificador)
let stock = document.querySelector('.avisoStockAmpliacion')

document.querySelector("#nombre").textContent = producto.nombre
document.querySelector("#desc").textContent = producto.descripcion
document.querySelector("#stock").textContent = 'Stock Disponible: ' + producto.disponibilidad
document.querySelector("#precio").textContent = 'Precio: $' + producto.precio
document.querySelector('#comprar').textContent = 'AGREGAR AL CARRITO'

/* IMÁGEN PRINCIPAL Y SECUNDARIAS */
document.querySelector("#imagenes").src = producto.imagenes[0];

let contenedorMiniaturas = document.querySelector('#imagenesSecundarias');
contenedorMiniaturas.innerHTML = '';

for(let i = 0; i < producto.imagenes.length; i++){
    let claseActiva = '';

    if(i === 0){
        claseActiva = 'activa';
    }
    contenedorMiniaturas.innerHTML += `
        <img 
            src="${producto.imagenes[i]}" 
            alt="${producto.nombre}" 
            class="miniatura ${claseActiva}"
        >`
}

let imagenPrincipal = document.querySelector('#imagenes');
let miniatura = document.querySelectorAll('.miniatura');

for(let i = 0; i < miniatura.length; i++){
    miniatura[i].addEventListener('click', cambioImagen);
}

function cambioImagen(){
    imagenPrincipal.src = this.src;

    for(let i = 0; i < miniatura.length; i++){
        miniatura[i].classList.remove('activa');
    }
    this.classList.add('activa');
}


/*  ULTIMAS UNIDADES  */

if (producto.disponibilidad <= producto.stockAviso){
    stock.textContent = '¡Ultimas unidades!'
} else {
   stock.style.display = 'none'
}


/* productos relacionados */

let contenedorRelacionados = document.querySelector('#contenedorRelacionados');
let relacionados = [];

for(let i = 0; i < catalogo.length; i++){

    if(catalogo[i].id !== producto.id && catalogo[i].categoria === producto.categoria){
        relacionados.push(catalogo[i]);
    }

}

/* ELEMENTOS RELACIONDOS */

contenedorRelacionados.innerHTML = '';

for(let i = 0; i < relacionados.length && i < 4; i++){

    contenedorRelacionados.innerHTML += `
        <div class="producto-card">
            <p class="producto-categoria">${relacionados[i].categoria.toUpperCase()}</p>

            <h3 class="producto-nombre">${relacionados[i].nombre}</h3>

            <img src="${relacionados[i].imagenes[0]}" alt="${relacionados[i].nombre}" class="producto-img">

            <a href="ampliacion.html?id=${relacionados[i].id}" class="producto-verMas">[ Ver Más ]</a>
        </div>
    `;
}