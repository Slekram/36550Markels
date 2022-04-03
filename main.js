//Ver productos
//Agregar al carrito
//Modificar el carrito
//Comprar
//Salir

let opcion;
let itemCarrito;


const productos = [];
const carrito = [];

class Producto {
    constructor(id, nombre, marca, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio;
        this.stock = stock;
    }
}

class Carrito {
    constructor (id, producto, precio){
        this.id = id;
        this.producto = producto;
        this.precio = precio;
        this.cantidad = 0;
    }
}

productos.push(new Producto("01", "Impresora 3D", "Hellbot", 47000, 5));
productos.push(new Producto("02", "PlayStation 5", "Sony", 150000, 10));
productos.push(new Producto("03", "GTX 1660 Super", "Nvidia", 90000, 50));
productos.push(new Producto("04", "Camara DSRL D3500", "Nikon", 45000, 15));


const menu = () => {
    do{
        opcion = parseInt(prompt ("Bienvenido al mundo de Maxi\n En esta pagina solo se venden los objetos con los que me encapricho\n Elija una opcion:\n 1-Ver listado de productos\n 2-Agregar productos al carrito\n 3-Eliminar productos del carrito\n 4-Comprar\n5- Salir"));
        switch (opcion){
            case 1:
                mostrarLista ();
                break;
            case 2:
                agregarCarrito ();
                break;
            case 3:
            case 4:
            case 5:
                alert("Hasta luego");
                break;
            default:
                alert("Usted no ingreso una opcion correcta")
                break;
        }
    } while (opcion !== 5);
}

function mostrarLista () {

const listaItems = productos.map((el) => "\nID: " + el.id + "\nProducto: " + el.nombre + "\nMarca: " + el.marca + "\nPrecio: " + el.precio + " $" + "\nStock: " + el.stock + "\n");
alert("Estos son los productos que podra encontrar el dia de hoy en el mundo de Maxi:\n" + listaItems);
}

function agregarCarrito (){
    let idIngresado = prompt ("Ingrese el ID del producto que desea comprar (tal cual como aparece en el listado de productos)");
    let resultado = productos.find((el)=>el.id === idIngresado);
    let cantidadItems = parseInt(prompt ("Que cantidad de items desea llevar?"));
    let confirmacionCompra = confirm("¿Usted desea agregar al carrito" + cantidadItems +  " unidades del producto " + resultado.nombre + " por el precio de " + (resultado.precio * cantidadItems) + " $?");
    if(confirmacionCompra){
        alert("Usted agrego al carrito: " + resultado.nombre);
        indexStock= productos.findIndex((i)=>i.id ===idIngresado);
        productos[indexStock].stock = productos[indexStock].stock - cantidadItems;
        let item = resultado.nombre;
        let valor = resultado.precio;
        let idCarrito = resultado.id;
        let productoEncontrado = carrito.find((indice)=>indice.producto == item);
        if (productoEncontrado){
            let index = carrito.findIndex ((i)=>i.id === idCarrito);
            carrito[index].cantidad = carrito[index].cantidad + cantidadItems;
            console.log (carrito);
        } else {
            itemCarrito = new Carrito (idCarrito, item, valor);
            itemCarrito.cantidad = itemCarrito.cantidad + cantidadItems;
            console.log(itemCarrito);
            carrito.push(itemCarrito);
            console.log(carrito);
        }
    }else{
        menu ();
    }
}

menu ();


console.log(productos);
console.log(carrito);