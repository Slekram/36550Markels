const productos = [];

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
productos.push(new Producto(1, "Impresora 3D", "Hellbot", 47000, 2, "./src/images/impresora-3d.webp"));
productos.push(new Producto(2, "PlayStation 5", "Sony", 150000, 10, "./src/images/play.webp"));
productos.push(new Producto(3, "GTX 1660 Super", "Nvidia", 90000, 50, "./src/images/1660.webp"));
productos.push(new Producto(4, "Camara DSRL D3500", "Nikon", 45000, 15, "./src/images/3500.webp"));

//export {productos};

// const guardarStorage = (key, valor) =>{
//     localStorage.setItem(key, valor)
// };

// for (const producto of productos) {
//     guardarStorage(`Producto${producto.id}`, JSON.stringify(producto))
// };


