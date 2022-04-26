import { eliminarCarrito } from "./botoneraCarrito.js";
import { productos } from "./productos.js";

const carrito = [];
let btnEliminar;
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
    swal("Compra realizada con exito");
} )

const actualizarCarrito = () => {
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
    let btnEliminar = document.getElementById(`eliminar${productoId}`);
    btnEliminar.addEventListener("click", () =>{
        btnEliminar.parentElement.parentElement.parentElement.remove();
    })
}

export {btnEliminar};
export {carrito};

