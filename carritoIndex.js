//import { eliminarCarrito } from "./botoneraCarrito.js";
//import { productos } from "./productos.js";
import { productos } from "./app.js";

let carrito = [];

class ObjetoCarrito {
    constructor (obj){
        this.id = obj.id;
        this.producto = obj.nombre;
        this.precio = obj.precio;
        this.cantidad = 1;
        this.total = this.precio * this.cantidad;
    }
}



export const carritoIndex = (productoId) => {
    const modalCarrito = document.getElementById("modalCarrito");

    if (localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"));
        console.log(carrito);
    }
    comprobacionCarrito(productoId);
}

const comprobacionCarrito = (productoId) => {
    const indexCarrito = carrito.findIndex(producto => producto.id == productoId);
    console.log(indexCarrito);
    if (indexCarrito < 0){
        let producto = productos.find(producto => producto.id == productoId);
        console.log(producto);
        carrito.push(new ObjetoCarrito (producto));
        console.log(carrito);
        let indexCarrito2 = carrito.length - 1;
        console.log(indexCarrito2);
        renderCarrito(productoId, indexCarrito2);
    }else{
        sumarCarrito(productoId, indexCarrito);
    }
    actualizarCarrito();
}

const btnComprar = document.getElementById("btnComprar");
btnComprar.addEventListener("click", () => {
    Swal.fire({
        title: 'Exito!',
        text: 'Usted realizo la compra con exito',
        icon: 'success',
        showConfirmButton: false,
        timer: 4000,
    })
} )

const mostrarCarritoExistente = () => {
    if(localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"));
        console.log(carrito);
        carrito.forEach((producto)=>{
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
            console.log(producto.id);
            let productoId = producto.id;
            botonera(productoId);
        })

    }
}

const actualizarCarrito = () => {
    localStorage.setItem("productos", JSON.stringify(productos));
    localStorage.setItem("carrito", JSON.stringify(carrito));
    const totalCompra = document.getElementById("totalCompra");
    let sumaTotal = carrito.reduce ((acc, el) => acc + el.total, 0);
    console.log(sumaTotal);
    totalCompra.innerHTML = "Total: " + sumaTotal;
}

const sumarCarrito = (productoId, indexCarrito) => {
    carrito[indexCarrito].cantidad = carrito[indexCarrito].cantidad + 1;
    console.log(carrito);
    const contadorCarrito = document.getElementById(`producto${carrito[indexCarrito].id}`);
    carrito[indexCarrito].total = carrito[indexCarrito].cantidad * carrito[indexCarrito].precio;
    const totalProducto = document.getElementById(`total${carrito[indexCarrito].id}`);
    console.log(contadorCarrito);
    contadorCarrito.innerText = `Cantidad: ${carrito[indexCarrito].cantidad}`;
    totalProducto.innerText = `Subtotal: ${carrito[indexCarrito].total} $`;
}

const renderCarrito = (productoId, indexCarrito2) => {
    const divCarrito = document.createElement('div');
    divCarrito.className = `producto${productoId}`
    divCarrito.innerHTML += `<p>Producto: ${carrito[indexCarrito2].producto}</p>
                                <p>Precio unitario: ${carrito[indexCarrito2].precio} $</p>
                                <div class="d-flex">
                                    <p id="producto${carrito[indexCarrito2].id}">
                                        Cantidad: ${carrito[indexCarrito2].cantidad}
                                    </p>
                                    <div class="botonera-carrito">
                                        <button type="button" class="btn btn-success" id="restar${carrito[indexCarrito2].id}">
                                            <img src="./src/images/cart-dash.svg" alt="restar-carrito">
                                        </button>
                                        <button type="button" class="btn btn-success" id="sumar${carrito[indexCarrito2].id}">
                                            <img src="./src/images/cart-plus.svg" alt="sumar-carrito">
                                        </button>
                                        <button type="button" class="btn btn-danger" id="eliminar${carrito[indexCarrito2].id}">
                                            <img src="./src/images/trash.svg" alt="papelera">
                                        </button>
                                    </div>
                                </div>
                                <hr>
                                <p id="total${carrito[indexCarrito2].id}">Subtotal: ${carrito[indexCarrito2].total} </p>
                                <hr>`;
    modalCarrito.appendChild(divCarrito);
    botonera(productoId);
}

const botonera = (productoId) => {
    let btnSumar = document.getElementById(`sumar${productoId}`);
    btnSumar.addEventListener("click", ()=>{
        let indexSumar = carrito.findIndex((productoSumar) => productoSumar.id === productoId);
        let indexRecuperarStock = productos.findIndex((productoRecuperarStock)=> productoRecuperarStock.id === productoId);
        console.log(indexSumar);
        console.log(indexRecuperarStock);
        if (productos[indexRecuperarStock].stock > 0){
            carrito[indexSumar].cantidad += 1;
            productos[indexRecuperarStock].stock -= 1;
            let cantidadRender = document.getElementById(`producto${productoId}`);
            cantidadRender.innerText = "Cantidad: " + carrito[indexSumar].cantidad;
            let stockRender = document.getElementById(`stock${productoId}`);
            stockRender.innerText = "Stock: " + productos[indexRecuperarStock].stock;
        }else{
            alert("No hay mas Stock")
        }

        actualizarCarrito();
    })

    let btnRestar = document.getElementById(`restar${productoId}`);
    btnRestar.addEventListener("click", ()=>{
        let indexRestar = carrito.findIndex((productoRestar) => productoRestar.id === productoId);
        let indexRecuperarStock = productos.findIndex((productoRecuperarStock)=> productoRecuperarStock.id === productoId);
        let cantidadRender = document.getElementById(`producto${productoId}`);
        let stockRender = document.getElementById(`stock${productoId}`);
        carrito[indexRestar].cantidad -= 1;
        productos[indexRecuperarStock].stock += 1;
        stockRender.innerText = "Stock: " + productos[indexRecuperarStock].stock;

        if(carrito[indexRestar].cantidad >= 1){
            cantidadRender.innerText = "Cantidad: " + carrito[indexRestar].cantidad;
        }else{
            btnRestar.parentElement.parentElement.parentElement.remove();
            carrito.splice(indexRestar,1);
        }

        actualizarCarrito();
    })

    

    let btnEliminar = document.getElementById(`eliminar${productoId}`);
    btnEliminar.addEventListener("click", ()=>{
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
                let indexEliminar = carrito.findIndex((productoEliminar) => productoEliminar.id === productoId);
                let indexRecuperarStock = productos.findIndex((productoRecuperarStock)=> productoRecuperarStock.id === productoId);
                let recuperadorStock = carrito[indexEliminar].cantidad;
                productos[indexRecuperarStock].stock = productos[indexRecuperarStock].stock + recuperadorStock;
                carrito.splice(indexEliminar,1);
                let stockRender = document.getElementById(`stock${productoId}`);
                stockRender.innerText = "Stock: " + productos[indexRecuperarStock].stock;
                actualizarCarrito();
                Swal.fire({
                    title: 'Exito!',
                    text: 'Usted elimino el producto del carrito',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        });
    });
}

export {carrito};

mostrarCarritoExistente();
