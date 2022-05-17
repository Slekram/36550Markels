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

    const comprobacionCarrito = () => {
        const indexCarrito = carrito.findIndex(producto => producto.id == productoId);
        console.log(indexCarrito);
        if (indexCarrito < 0){
            renderCarrito(productoId);
        }else{
            sumarCarrito(productoId, indexCarrito);
        }
        //eliminarCarrito(productoId);
        actualizarCarrito();
    }
    comprobacionCarrito();
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

const actualizarCarrito = () => {
    const totalCompra = document.getElementById("totalCompra");
    let sumaTotal = carrito.reduce ((acc, el) => acc + el.total, 0);
    console.log(sumaTotal);
    totalCompra.innerHTML = "Total: " + sumaTotal;
    localStorage.setItem("carrito", JSON.stringify(carrito));
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

const renderCarrito = (productoId) => {
    let producto = productos.find(producto => producto.id == productoId);
            console.log(producto);
            carrito.push(new ObjetoCarrito (producto));
            console.log(carrito);
            let indexCarrito2 = carrito.length - 1;
            console.log(indexCarrito2);
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

    let btnRestar = document.getElementById(`restar${productoId}`);
    btnRestar.addEventListener("click", ()=>{
        let indexRestar = carrito.findIndex((productoRestar) => productoRestar.id === productoId);
        carrito[indexRestar].cantidad -= 1;
        let cantidadRender = document.getElementById(`producto${productoId}`);
        cantidadRender.innerText = "Cantidad: " + carrito[indexRestar].cantidad;
        let indexRecuperarStock = productos.findIndex((productoRecuperarStock)=> productoRecuperarStock.id === productoId);
        productos[indexRecuperarStock].stock += 1;
        let stockRender = document.getElementById(`stock${productoId}`);
        stockRender.innerText = "Stock: " + productos[indexRecuperarStock].stock;
        localStorage.setItem("productos", JSON.stringify(productos));
        localStorage.setItem("carrito", JSON.stringify(carrito));
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
                localStorage.setItem("productos", JSON.stringify(productos));
                localStorage.setItem("carrito", JSON.stringify(carrito));
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

    let btnSumar = document.getElementById(`sumar${productoId}`);
    btnSumar.addEventListener("click", ()=>{
        let indexSumar = carrito.findIndex((productoSumar) => productoSumar.id === productoId);
        carrito[indexSumar].cantidad += 1;
        let cantidadRender = document.getElementById(`producto${productoId}`);
        cantidadRender.innerText = "Cantidad: " + carrito[indexSumar].cantidad;
        let indexRecuperarStock = productos.findIndex((productoRecuperarStock)=> productoRecuperarStock.id === productoId);
        productos[indexRecuperarStock].stock -= 1;
        let stockRender = document.getElementById(`stock${productoId}`);
        stockRender.innerText = "Stock: " + productos[indexRecuperarStock].stock;
        localStorage.setItem("productos", JSON.stringify(productos));
        localStorage.setItem("carrito", JSON.stringify(carrito));
    })
}

export {carrito};

