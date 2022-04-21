import { productos } from "./app.js";

const carrito = [];

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

    const renderCarrito = () => {

        const indexCarrito = carrito.findIndex(producto => producto.id == productoId);
        console.log(indexCarrito);
        if (indexCarrito < 0){
            let producto = productos.find(producto => producto.id == productoId);
            console.log(producto);
            carrito.push(new ObjetoCarrito (producto));
            console.log(carrito);
            let indexCarrito2 = carrito.length - 1;
            console.log(indexCarrito2);
            modalCarrito.innerHTML += `<p>Producto: ${carrito[indexCarrito2].producto}</p>
                                        <p>Precio unitario: ${carrito[indexCarrito2].precio} $</p>
                                        <p id="producto${carrito[indexCarrito2].id}">Cantidad: ${carrito[indexCarrito2].cantidad}</p>
                                        <p id="total${carrito[indexCarrito2].id}">Subtotal: ${carrito[indexCarrito2].total} </p>`;
            
        }else{
            carrito[indexCarrito].cantidad = carrito[indexCarrito].cantidad + 1;
            console.log(carrito);
            const contadorCarrito = document.getElementById(`producto${carrito[indexCarrito].id}`);
            carrito[indexCarrito].total = carrito[indexCarrito].cantidad * carrito[indexCarrito].precio;
            const totalProducto = document.getElementById(`total${carrito[indexCarrito].id}`);
            console.log(contadorCarrito);
            contadorCarrito.innerText = `Cantidad: ${carrito[indexCarrito].cantidad}`;
            totalProducto.innerText = `Subtotal: ${carrito[indexCarrito].total} $`;

        }
        const totalCompra = document.getElementById("totalCompra");
        let sumaTotal = carrito.reduce ((acc, el) => acc + el.total, 0);
        console.log(sumaTotal);
        totalCompra.innerHTML = "Total: " + sumaTotal;
    }

    renderCarrito();
}

const btnComprar = document.getElementById("btnComprar");
btnComprar.addEventListener("click", () => {
    alert("Compra realizada con exito");
} )

