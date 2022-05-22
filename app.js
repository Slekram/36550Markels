import {getData} from "./getData.js";
export let productos = await getData();
import {carritoIndex} from "./carritoIndex.js";

const restarStock = (restaId) => {
    let productoRestado = productos.findIndex(producto => producto.id == restaId);
    if(productos[productoRestado].stock>0){
        productos[productoRestado].stock = productos[productoRestado].stock - 1;
        const stockRender = document.getElementById(`stock${productos[productoRestado].id}`);
        stockRender.innerText = `Stock: ${productos[productoRestado].stock}`;
        carritoIndex(restaId);
        Swal.fire({
            title: 'Exito!',
            text: 'Usted agrega un producto al carrito con exito',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
        })
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El producto que usted quiere agregar no tiene stock',
        })
    }

    localStorage.setItem("productos", JSON.stringify(productos));
}

const mostrarProductosBaseDatos = async () => {
    localStorage.setItem("productos", JSON.stringify(productos));
    renderProductos();
}

export const renderProductos = () => {
    productos = JSON.parse(localStorage.getItem("productos"));
    const containerProductos = document.getElementById("container-productos");
    productos.forEach(producto => {
        const div = document.createElement('div');
        if (producto.stock >= 0){
            div.classList.add("col-3");
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
            boton.addEventListener("click", ()=> restarStock(producto.id))
        }
    });
}

if (localStorage.getItem("productos")){
    renderProductos();
}else{
    mostrarProductosBaseDatos();
}
