const productos = [];
const carrito = [];

//Constructores de objetos
class Producto {
    constructor(id, nombre, marca, precio, stock, img) {
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio;
        this.stock = stock;
        this.img = img;
    }
}

//Objetos de los productos para comprar
productos.push(new Producto(1, "Impresora 3D", "Hellbot", 47000, 0, "./src/images/impresora-3d.webp"));
productos.push(new Producto(2, "PlayStation 5", "Sony", 150000, 10, "./src/images/play.webp"));
productos.push(new Producto(3, "GTX 1660 Super", "Nvidia", 90000, 50, "./src/images/1660.webp"));
productos.push(new Producto(4, "Camara DSRL D3500", "Nikon", 45000, 15, "./src/images/3500.webp"));

const carritoIndex = (productoId) => {
    const modalCarrito = document.getElementById("modalCarrito");

    const renderCarrito = () => {

        let producto = productos.find(producto => producto.id == productoId);
        carrito.push(producto);
        
        let div = document.createElement("div");
        div.innerHTML = `<p>Producto: ${producto.nombre}</p>
                        <p>Precio: ${producto.precio} $</p>
                        <p id="producto${producto.id}">Cantidad: ${producto.stock}</p>`;
        modalCarrito.appendChild(div);

    }

    renderCarrito();
}

const mostrarProductos = (productos) => {
    const containerProductos = document.getElementById("container-productos");
    productos.forEach(producto => {
        const div = document.createElement('div');
        if (producto.stock==0){
            div.classList.add('bg-danger');
        }else{
            div.classList.add('bg-primary');
        }
        div.classList.add('col-3');
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
                                <span>Stock: ${producto.stock}</span>
                            </div>`
        containerProductos.appendChild(div);

        const boton = document.getElementById(`boton${producto.id}`);

        boton.addEventListener("click", ()=>{
            carritoIndex(producto.id);
        })

    });
}

mostrarProductos(productos);