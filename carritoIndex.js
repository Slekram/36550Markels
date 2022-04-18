import { productos } from "./app.js";

const carrito = [];

class objetoCarrito { 
    constructor (obj){
        this.id = obj.id;
        this.producto = obj.nombre;
        this.precio = obj.precio;
        this.cantidad = 1
    }
}

export const carritoIndex = (productoId) => {
    const modalCarrito = document.getElementById("modalCarrito");

    const renderCarrito = () => {

        let productoCarrito = carrito.findIndex(producto => producto.id == productoId)
        console.log(productoCarrito);
        if (productoCarrito == -1){
            let producto = productos.find(producto => producto.id == productoId);
            carrito.push(new objetoCarrito (producto));
            console.log(carrito);
            carrito.forEach(producto => {
                modalCarrito.innerHTML += `<p>Producto: ${producto.producto}</p>
                            <p>Precio: ${producto.precio} $</p>
                            <p id="producto${producto.id}">Cantidad: ${producto.cantidad}</p>`;
            });
        }else{
            carrito[productoCarrito].cantidad = carrito[productoCarrito].cantidad + 1;
            console.log(carrito);
            const contadorCarrito = document.getElementById(`producto${carrito[productoCarrito].id}`);
            console.log(contadorCarrito);
            contadorCarrito.innerText = `Cantidad: ${carrito[productoCarrito].cantidad}`
        }

    }

    renderCarrito();
}