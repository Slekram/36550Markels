import { productos } from "./app.js";

let carrito = [];
const modalCarrito = document.getElementById("modalCarrito");
const totalCompra = document.getElementById("totalCompra");

class ObjetoCarrito {
    constructor (obj){
        this.id = obj.id;
        this.producto = obj.nombre;
        this.precio = obj.precio;
        this.img = obj.img;
        this.cantidad = 1;
        this.total = this.precio * this.cantidad;
    }
}

export const carritoIndex = (productoId) => {

    if (localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"));
    }
    comprobacionCarrito(productoId);
}

const comprobacionCarrito = (productoId) => {
    const indexCarrito = carrito.findIndex(producto => producto.id == productoId);
    if (indexCarrito < 0){
        let producto = productos.find(producto => producto.id == productoId);
        carrito.push(new ObjetoCarrito (producto));
        let indexCarrito2 = carrito.length - 1;
        renderCarrito(productoId, indexCarrito2);
    }else{
        sumarCarrito(productoId, indexCarrito);
    }
    actualizarCarrito();
}

const btnComprar = document.getElementById("btnComprar");
btnComprar.addEventListener("click", () => {
    const modalCarrito = document.getElementById("modalCarrito");
    if (carrito.length>=1) {
        Swal.fire({
            title: "¿Usted esta seguro que quiere llevar todo lo que puso en el carrito?",
            text: `En este momento solo estamos aceptando pago en efectivo al momento de recibir la compra en el hogar. `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Comprar",
            cancelButtonText: "Cancelar",
        })
        .then(resultado => {
            if (resultado.value) {
                carrito.splice(0,carrito.length);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                modalCarrito.innerHTML = `<p id="textoModal">El carrito se encuentra vacio</p>`;
                totalCompra.innerHTML = "Total: " + 0 + "$";
                Swal.fire({
                    title: 'Exito!',
                    text: 'Usted Realizo la compra con éxito',
                    text: 'El envio sera llevado de forma gratuita a su hogar en los proximos dias',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 4000,
                })
        }
        });
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Su carrito esta vacio',
        })
    }

} )

export const actualizarCarrito = () => {
    localStorage.setItem("productos", JSON.stringify(productos));
    localStorage.setItem("carrito", JSON.stringify(carrito));
    let sumaTotal = carrito.reduce ((acc, el) => acc + el.total, 0);
    totalCompra.innerHTML = "Total: " + sumaTotal + "$";
}

const sumarCarrito = (productoId, indexCarrito) => {
    carrito[indexCarrito].cantidad ++;
    const contadorCarrito = document.getElementById(`producto${carrito[indexCarrito].id}`);
    carrito[indexCarrito].total = carrito[indexCarrito].cantidad * carrito[indexCarrito].precio;
    const totalProducto = document.getElementById(`total${carrito[indexCarrito].id}`);
    contadorCarrito.innerText = `Cantidad: ${carrito[indexCarrito].cantidad}`;
    totalProducto.innerText = `Subtotal: ${carrito[indexCarrito].total} $`;
}

const renderCarrito = (productoId, indexCarrito2) => {
    const modalCarrito = document.getElementById("modalCarrito");
    const textoModal = document.getElementById("textoModal");
    if(textoModal.innerText= ""){
    }else{
        textoModal.innerText= "";
    }
    const divCarrito = document.createElement('div');
    divCarrito.classList = `producto${productoId}`
    divCarrito.classList.add("d-flex", "flex-column", "align-items-center", "carrito");
    divCarrito.innerHTML += `<img src="${carrito[indexCarrito2].img}" height="250" width="250" alt="carrito${productoId}">
                                <p>Producto: ${carrito[indexCarrito2].producto}</p>
                                <p>Precio unitario: ${carrito[indexCarrito2].precio} $</p>
                                <div class="d-flex flex-column align-items-center">
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
                                <p id="total${carrito[indexCarrito2].id}">Subtotal: ${carrito[indexCarrito2].total}$</p>
                                <hr>`;
    modalCarrito.appendChild(divCarrito);
    botonera(productoId);
}

export const botonera = (productoId) => {
    let btnSumar = document.getElementById(`sumar${productoId}`);
    btnSumar.addEventListener("click", ()=>{
        let indexSumar = carrito.findIndex((productoSumar) => productoSumar.id === productoId);
        let indexRecuperarStock = productos.findIndex((productoRecuperarStock)=> productoRecuperarStock.id === productoId);
        if (productos[indexRecuperarStock].stock > 0){
            carrito[indexSumar].cantidad ++;
            carrito[indexSumar].total = carrito[indexSumar].cantidad * carrito[indexSumar].precio;
            productos[indexRecuperarStock].stock --;

            const totalProducto = document.getElementById(`total${productoId}`);
            totalProducto.innerText = `Subtotal: ${carrito[indexSumar].total}$`;

            const cantidadRender = document.getElementById(`producto${productoId}`);
            cantidadRender.innerText = "Cantidad: " + carrito[indexSumar].cantidad;

            const stockRender = document.getElementById(`stock${productoId}`);
            stockRender.innerText = "Stock: " + productos[indexRecuperarStock].stock;
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El producto que usted quiere agregar no tiene stock',
            })
        }

        actualizarCarrito();
    })

    let btnRestar = document.getElementById(`restar${productoId}`);
    btnRestar.addEventListener("click", ()=>{
        let indexRestar = carrito.findIndex((productoRestar) => productoRestar.id === productoId);
        let indexRecuperarStock = productos.findIndex((productoRecuperarStock)=> productoRecuperarStock.id === productoId);
        const totalProducto = document.getElementById(`total${productoId}`);
        const cantidadRender = document.getElementById(`producto${productoId}`);
        const stockRender = document.getElementById(`stock${productoId}`);
        carrito[indexRestar].cantidad --;
        carrito[indexRestar].total = carrito[indexRestar].cantidad * carrito[indexRestar].precio;
        productos[indexRecuperarStock].stock ++;
        stockRender.innerText = "Stock: " + productos[indexRecuperarStock].stock;

        if(carrito[indexRestar].cantidad >= 1){
            cantidadRender.innerText = "Cantidad: " + carrito[indexRestar].cantidad;
            totalProducto.innerText = `Subtotal: ${carrito[indexRestar].total}$`;
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

const mostrarCarritoExistente = () => {
    if(localStorage.getItem("carrito")){
        const textoModal = document.getElementById("textoModal");
        if(textoModal.innerText= ""){
        }else{
            textoModal.innerText= "";
        }
        carrito = JSON.parse(localStorage.getItem("carrito"));
        carrito.forEach((producto)=>{
            const divCarrito = document.createElement('div');
            divCarrito.className = `producto${producto.id}`
            divCarrito.classList.add("d-flex", "flex-column", "align-items-center", "carrito")
            divCarrito.innerHTML += `<img src="${producto.img}" height="250" width="250" alt="carrito${producto.id}">
                                        <p>Producto: ${producto.producto}</p>
                                        <p>Precio unitario: ${producto.precio} $</p>
                                        <div class="d-flex flex-column align-items-center">
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
                                        <p id="total${producto.id}">Subtotal: ${producto.total}$ </p>
                                        <hr>`;
            modalCarrito.appendChild(divCarrito);
            let productoId = producto.id;
            botonera(productoId);
            actualizarCarrito();
        })

    }
}

export {carrito};

mostrarCarritoExistente();
