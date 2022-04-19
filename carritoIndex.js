import { productos } from "./app.js";

const carrito = [];

class ObjetoCarrito { 
    constructor (obj){
        this.id = obj.id;
        this.producto = obj.nombre;
        this.precio = obj.precio;
        this.cantidad = 1;
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
            carrito.forEach(producto => {
                modalCarrito.innerHTML += `<p>Producto: ${producto.producto}</p>
                            <p>Precio: ${producto.precio} $</p>
                            <p id="producto${producto.id}">Cantidad: ${producto.cantidad}</p>`;
            });
        }else{
            carrito[indexCarrito].cantidad = carrito[indexCarrito].cantidad + 1;
            console.log(carrito);
            const contadorCarrito = document.getElementById(`producto${carrito[indexCarrito].id}`);
            console.log(contadorCarrito);
            contadorCarrito.innerText = `Cantidad: ${carrito[indexCarrito].cantidad}`;
        }

    }

    renderCarrito();
}