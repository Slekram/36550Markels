import { carrito } from "./carritoIndex.js";
import { btnEliminar } from "./carritoIndex.js";

export const eliminarCarrito = (eliminarId) => {
    // let idEliminar = carrito.find(producto => producto.id === eliminarId);
    // carrito.splice(idEliminar, 1);
    // console.log(carrito);
    let btnEliminar = document.getElementById(`eliminar${eliminarId}`);
    btnEliminar.addEventListener("click", () =>{
        btnEliminar.parentElement.remove();
    })
}

const restarCarrito = () => {
    
}