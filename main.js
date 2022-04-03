//Ver productos
//Agregar al carrito
//Modificar el carrito
//Comprar
//Salir


//Variables globales
let opcion;
let itemCarrito;
let resultadoId;
let idIngresado;
let confirmacionCompra;
let indexStock;
let indexStockRecuperado;
let cantidadItems;
let finalizacionCompra;
let validacionCantidad;

//Arrays
const productos = [];
const carrito = [];

//Constructores de objetos
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
        this.subtotal= 0;
    }
    calcularSubTotal(){
        this.subtotal = this.precio*this.cantidad;
    }

}

//Objetos de los productos para comprar
productos.push(new Producto("01", "Impresora 3D", "Hellbot", 47000, 0));
productos.push(new Producto("02", "PlayStation 5", "Sony", 150000, 10));
productos.push(new Producto("03", "GTX 1660 Super", "Nvidia", 90000, 50));
productos.push(new Producto("04", "Camara DSRL D3500", "Nikon", 45000, 15));

//FUNCIONES
//MENU
const menu = () => {
    do{
        opcion = parseInt(prompt ("Bienvenido al mundo de Maxi\n En esta pagina solo se venden los objetos con los que me encapricho\n Elija una opcion:\n 1-Ver listado de productos\n 2-Agregar productos al carrito\n 3-Eliminar productos del carrito\n 4-Comprar\n5- Salir"));
        switch (opcion){
            case 1:
                mostrarLista ();
                break;
            case 2:
                comprobarId();
                break;
            case 3:
                comprobarId();
                break;
            case 4:
                comprar();
                break;
            case 5:
                alert("Hasta luego");
                break;
            default:
                alert("Usted no ingreso una opcion correcta")
                break;
        }
    } while (opcion !== 5);
}

//Funcion que muestra la lista de items en venta.
function mostrarLista () {
    const listaItems = productos.map((el) => "\nID: " + el.id + "\nProducto: " + el.nombre + "\nMarca: " + el.marca + "\nPrecio: " + el.precio + " $" + "\nStock: " + el.stock + "\n");
    alert("Estos son los productos que podra encontrar el dia de hoy en el mundo de Maxi:\n" + listaItems);
}

//Funcion comprobacion de id de producto
function comprobarId (){
    idIngresado = prompt ("Ingrese el ID del producto que usted desea agregar/quitar a su carrrito (tal cual como aparece en el listado de productos)");
    //Comprobacion de si el ID existe.
    resultadoId = productos.find((el)=>el.id === idIngresado);
    if (resultadoId){
        if(opcion===2){
            comprobarStock();
        }else{
            quitarCarrito();
        }
    }else{
        alert ("Usted no ingreso un id de producto valido");
    }
}

function comprobarStock (){
    indexStock= productos.findIndex((i)=>i.id ===idIngresado);
    if (productos[indexStock].stock<=0){
        alert("No hay suficiente stock del producto que usted quiere comprar");
    }else{
        cantidadItems = parseInt(prompt ("Que cantidad del item "+ resultadoId.nombre +" desea llevar?"));
        if (productos[indexStock].stock<cantidadItems){
            alert("No hay suficiente stock del producto que usted quiere comprar");
        }else{
            confirmacionCompra = confirm("¿Usted desea agregar al carrito " + cantidadItems +  " unidades del producto " + resultadoId.nombre + " por el total de " + (resultadoId.precio * cantidadItems) + " $?");
            console.log(confirmacionCompra)
            if(confirmacionCompra){
                agregarCarrito();
            }else{
                menu ();
            }
        }
    }
}

function agregarCarrito(){
    //Funcion de grado superior que modifica el stock del objeto Productos
    productos[indexStock].stock = productos[indexStock].stock - cantidadItems;
    alert("Usted agrego al carrito: " + resultadoId.nombre);
    let item = resultadoId.nombre;
    let valor = resultadoId.precio;
    let idCarrito = resultadoId.id;
    //Comprobacion de si el producto ya fue agregado una vez al carrito para decidir si crea un objeto de 0 o si le modifica la cantidad de items.
    let productoEncontrado = carrito.find((indice)=>indice.producto == item);
    if (productoEncontrado){
        let index = carrito.findIndex ((i)=>i.id === idCarrito);
        carrito[index].cantidad = carrito[index].cantidad + cantidadItems;
        console.log (carrito);
    } else {
        itemCarrito = new Carrito (idCarrito, item, valor);
        itemCarrito.cantidad = itemCarrito.cantidad + cantidadItems;
        carrito.push(itemCarrito);
    }
}

function quitarCarrito(){
    indexStock= carrito.findIndex((i)=>i.id ===idIngresado);
    cantidadItems = parseInt(prompt ("Usted tiene cargado en su carrito " + carrito[indexStock].cantidad+ " unidades de " + resultadoId.nombre +"\n Cuantas unidades desea quitar de su carrito?"));
    if (carrito[indexStock].cantidad<cantidadItems){
        alert ("Usted no tiene ese numero de unidades en el carrito");
    }else{
        indexStockRecuperado= productos.findIndex((i)=>i.id ===idIngresado);
        productos[indexStockRecuperado].stock = productos[indexStockRecuperado].stock + cantidadItems;
        if(carrito[indexStock].cantidad - cantidadItems >=1){
            carrito[indexStock].cantidad = carrito[indexStock].cantidad - cantidadItems;
        }else{
            carrito.splice(indexStock,1);
        }
    }
}

function comprar (){
    const confirmacionCompra = carrito.map((el)=> "Usted esta llevando: \n" + el.cantidad + " unidades de " + el.producto + " por un subtotal de: " + (el.subtotal= el.precio*el.cantidad) + " $" + "(Precio Unitario: " + el.precio + " $)\n");
    let total = carrito.reduce((acc,el)=>acc + el.subtotal,0);
    finalizacionCompra = confirm(confirmacionCompra + "\n El total es: " + total + " $ \nUsted desea concluir con la compra?");
    if(finalizacionCompra){
        alert('Su compra se ha realizado con exito!!!');
    } else {
        menu();
    }
}

menu ();
console.log(productos);
console.log(carrito);