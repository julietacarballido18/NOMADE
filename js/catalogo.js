let contenedor = document.querySelector('.card')
let inputBusqueda = document.querySelector('#busqueda')
let noResultados = document.querySelector('#noResultados')
let ups = document.querySelector('#ups')

/* CALCULAR STOCK */

function compararStock(producto){
    return producto.disponibilidad <= producto.stockAviso;
}


function renderizarLista(lista){

    contenedor.innerHTML = '' /* borro lo que habia para poner lo nuevo */

    for (let producto of lista){ 

        let aviso = '';
        let temporada = '';

        if (compararStock(producto)){
            aviso = '<span class="avisoStock">¡Últimas unidades!</span>';
        }

        if(producto.enTemporada === true){
            temporada = '<span class="etiquetaTemporada">( EN TEMPORADA )</span>';
        }

        contenedor.innerHTML += `
            <div class="producto-card">
                ${temporada}

                <p class="producto-categoria">${producto.categoria.toUpperCase()}</p>

                <h3 class="producto-nombre">${producto.nombre}</h3>

                <img src="${producto.imagenes[0]}" alt="${producto.nombre}" class="producto-img">

                ${aviso}

                <a href="ampliacion.html?id=${producto.id}" class="producto-verMas">[ Ver Más ]</a>
            </div>`
        }
}

renderizarLista(catalogo) /* llamo a la función */


/* FILTROS INPUT */

inputBusqueda.addEventListener('input', filtrarBusqueda)

function filtrarBusqueda(){

    let textoBuscado = inputBusqueda.value.toLowerCase();
    let arrayFiltrado = [];

    ups.innerHTML = '';
    noResultados.innerHTML = '';

    for (let i = 0; i < catalogo.length; i++){
        let nombre = catalogo[i].nombre.toLowerCase();
        let cat = catalogo[i].categoria.toLowerCase();

        if(nombre.includes(textoBuscado)){
            arrayFiltrado.push(catalogo[i]);
        } else if(cat.includes(textoBuscado)){
            arrayFiltrado.push(catalogo[i]);
        } else{}
    }

    renderizarLista(arrayFiltrado);

    if(arrayFiltrado.length === 0){ /* si no tengo nada que coincida con la busqueda ahi muestro el mensaje */
        ups.innerHTML = 'UPSS!';
        noResultados.innerHTML = 'No hay resultados para su búsqueda';
    }
}
/* FILTROS SELECT - ETIQUETAS */

let selectEti = document.querySelector('#filtroEtiquetas');

function cargarEtiquetas(){
    let etiquetasUnicas = [];
    
    for (let i = 0; i < catalogo.length; i++){
        let etiquetas = catalogo[i].etiquetas;

        for (let j = 0; j < etiquetas.length; j++){
            let etiqueta = etiquetas[j];

            if(etiquetasUnicas.includes(etiqueta) === false){
                etiquetasUnicas.push(etiqueta);
            }
        }
    }

    for (let i = 0; i < etiquetasUnicas.length; i++){
        selectEti.innerHTML += `<option value="${etiquetasUnicas[i]}">${etiquetasUnicas[i]}</option>`;
    }
}

selectEti.addEventListener('change', filtrarEtiquetas);

function filtrarEtiquetas(){
    let etiquetaSeleccionada = selectEti.value;
    let arrayFiltrado = [];

    if (etiquetaSeleccionada === ''){
        renderizarLista(catalogo);
    } else {
        for (let i = 0; i < catalogo.length; i++){
            let etiquetas = catalogo[i].etiquetas;

            if (etiquetas.includes(etiquetaSeleccionada)){
                arrayFiltrado.push(catalogo[i]);
            }
        }

        renderizarLista(arrayFiltrado);
    }
}

cargarEtiquetas();


/* FILTRO SELECT - TEMPORADA */

let selectTemporada = document.querySelector('#filtroTemporada');

selectTemporada.addEventListener('change', filtrarTemporada);

function filtrarTemporada(){
    let temporadaSeleccionada = selectTemporada.value;
    let arrayFiltrado = [];

    if(temporadaSeleccionada === ''){
        renderizarLista(catalogo);
    } else {

        for(let i = 0; i < catalogo.length; i++){

            if(temporadaSeleccionada === 'true' && catalogo[i].enTemporada === true){
                arrayFiltrado.push(catalogo[i]);
            }

            if(temporadaSeleccionada === 'false' && catalogo[i].enTemporada === false){
                arrayFiltrado.push(catalogo[i]);
            }
        }

        renderizarLista(arrayFiltrado);
    }
}