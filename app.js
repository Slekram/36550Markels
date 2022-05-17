//import { productos } from "./productos.js";
import {carrito, carritoIndex } from "./carritoIndex.js";
import {getData} from "./getData.js";
export let productos = await getData();

//const productos = [];

// for (let index = 0; index < localStorage.length; index++) {
//     const productosAlmacenados = JSON.parse(localStorage.getItem(localStorage.key(index)));
//     productos.push(productosAlmacenados);
// }

const restarStock = (restaId) => {
    let productoRestado = productos.findIndex(producto => producto.id == restaId);
    //console.log(productoRestado);
    if(productos[productoRestado].stock>1){
        productos[productoRestado].stock = productos[productoRestado].stock - 1;
        //console.log(productos[productoRestado].stock);
        const stockRender = document.getElementById(`stock${productos[productoRestado].id}`);
        //console.log(stockRender);
        stockRender.innerText = `Stock: ${productos[productoRestado].stock}`;
    }else{
        productos[productoRestado].stock = productos[productoRestado].stock - 1;
        const eliminarDom = document.getElementById(`objeto${productos[productoRestado].id}`);
        eliminarDom.remove();
    }
    
    localStorage.setItem("productos", JSON.stringify(productos));
}

const mostrarProductosBaseDatos = async () => {
    localStorage.setItem("productos", JSON.stringify(productos));
    productos = JSON.parse(localStorage.getItem("productos"));
}

const mostrarProductosStorage = () => {
    productos = JSON.parse(localStorage.getItem("productos"));
}

const renderProductos = () => {
    const containerProductos = document.getElementById("container-productos");
    productos.forEach(producto => {
        const div = document.createElement('div');
        if (producto.stock > 0){
            div.classList.add('col-3');
            div.setAttribute("id", `objeto${producto.id}`)
            div.innerHTML +=    `<div class="d-flex align-items-center flex-column" >
                                    <img src=${producto.img} width="250" height="250" alt="">
                                    <span>${producto.nombre}</span>
                                    <button type="button" class="btn btn-primary" id="boton${producto.id}">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="16" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
                                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="d-flex align-items-center flex-column">
                                    <span>Marca: ${producto.marca}</span>
                                    <span>Precio: ${producto.precio}$ </span>
                                    <span id="stock${producto.id}">Stock: ${producto.stock}</span>
                                </div>`
            containerProductos.appendChild(div);

            const boton = document.getElementById(`boton${producto.id}`);
            boton.addEventListener("click", ()=>{
                restarStock(producto.id);
                carritoIndex(producto.id);
                Swal.fire({
                    title: 'Exito!',
                    text: 'Usted agrega un producto al carrito con exito',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                })

            })
        }
    });
}

const mostrarCarritoExistente = () => {
    if(localStorage.getItem("carrito")){
        let carritoExistente = JSON.parse(localStorage.getItem("carrito"));
        console.log(carritoExistente);
        carritoExistente.forEach((producto)=>{
            const divCarrito = document.createElement('div');
            divCarrito.className = `producto${producto.id}`
            divCarrito.innerHTML += `<p>Producto: ${producto.producto}</p>
                                        <p>Precio unitario: ${producto.precio} $</p>
                                        <div class="d-flex">
                                            <p id="producto${producto.id}">
                                                Cantidad: ${producto.cantidad}
                                            </p>
                                            <div class="botonera-carrito">
                                                <button type="button" class="btn btn-success" id="restar${producto.id}">
                                                    <img src="./src/images/cart-dash.svg" alt="restar-carrito">
                                                </button>
                                                <button type="button" class="btn btn-success" id="sumar${producto.id}">
                                                    <img src="./src/images/cart-plus.svg" alt="sumar-carrito">
                                                </button>
                                                <button type="button" class="btn btn-danger" id="eliminar${producto.id}">
                                                    <img src="./src/images/trash.svg" alt="papelera">
                                                </button>
                                            </div>
                                        </div>
                                        <hr>
                                        <p id="total${producto.id}">Subtotal: ${producto.total} </p>
                                        <hr>`;
            modalCarrito.appendChild(divCarrito);
            let btnEliminar = document.getElementById(`eliminar${producto.id}`);
            btnEliminar.addEventListener("click", () =>{
                Swal.fire({
                    title: "Cuidado",
                    text: "¿Eliminar producto por completo?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: "Eliminar",
                    cancelButtonText: "Cancelar",
                })
                .then(resultado => {
                    if (resultado.value) {
                        btnEliminar.parentElement.parentElement.parentElement.remove();
                        Swal.fire({
                            title: 'Exito!',
                            text: 'Usted elimino el producto del carrito',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                        })
                    }
                });
            })
        })

    }
}

if (localStorage.getItem("productos")){
    mostrarProductosStorage();
}else{
    mostrarProductosBaseDatos();
}
renderProductos();

mostrarCarritoExistente();