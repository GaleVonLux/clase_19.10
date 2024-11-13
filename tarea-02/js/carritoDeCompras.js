'user strict';
/*---------------DEFINITION_SECTION----------------*/

// Estructura basica de cada producto:
const productoBase = {
  id: 0,
  nombre: "",
  precio: 0.0,
  cantidad: 0,
  venta: 0.0,
  actualizarPrecio: function(nuevoPrecio, masItems) {

    this.precio = nuevoPrecio;
    this.cantidad = masItems;
  },
  calcularVenta: function() {

    this.venta = this.cantidad * this.precio;
    // console.log('venta: ' + this.venta);
  }
};
// Esteuctura del Carrito de compras:
const carritoDeCompras = {

  productos: [],
  totalArticulos: 0,
  montoTotal: 0.0,
  impuestos: 0.0,
  totalAPagar: 0.0,
  agregarProducto: function(idProducto, nombreProducto, precioUnitario, cantidadComprada) {

    const nuevoProducto = Object.create(productoBase);
    nuevoProducto.id = idProducto;
    nuevoProducto.nombre = nombreProducto;
    nuevoProducto.precio = precioUnitario;
    nuevoProducto.cantidad = cantidadComprada;
    nuevoProducto.calcularVenta();

    // console.log(nuevoProducto.venta);
    this.productos.push(nuevoProducto);
  },
  calcularTotalArticulosMontoTotal: function() {

    let size = this.productos.length;
    // console.log(size);

    for (let i = 0; i < size; i++) {

      const {cantidad, venta} = this.productos[i];
      // console.log(cantidad);
      this.totalArticulos += cantidad;
      this.montoTotal += venta;
    };

    // console.log('Items: ' + this.totalArticulos);
    // console.log(this.montoTotal);
  },
  calcularImpuestos: function(iva) {

    let impuesto = iva / 100;
    // console.log(impuesto)
    
    this.impuestos = this.montoTotal * impuesto;
    // console.log(this.impuestos);
  },
  calcularTotalAPagar: function() {

    this.totalAPagar = this.montoTotal + this.impuestos;
  },
  mostrarCompraPorConsola: function() {
    console.log( 'Carrito de Compras:' + '\n' +
          '---------------------------------------------' + '\n' +
          this.productosDetalles() +
          '---------------------------------------------' + '\n' +
          'Monto Total: ' + this.montoTotal + '\n' +
          'Iva 16%  ----  ' + this.impuestos + '\n' + 
          'Total a Pagar: ' + this.totalAPagar + '\n' +
          '---------------------------------------------' + '\n' +
          'Items: ' + this.totalArticulos + '\n' +
          '---------------------------------------------'
        );
  },
  mostrarCompraConAlert: function() {
    alert( 'Carrito de Compras:' + '\n' +
          '---------------------------------------------' + '\n' +
          this.productosDetalles() +
          '---------------------------------------------' + '\n' +
          'Monto Total: ' + this.montoTotal + '\n' +
          'Iva 16%  ----  ' + this.impuestos + '\n' + 
          'Total a Pagar: ' + this.totalAPagar + '\n' +
          '---------------------------------------------' + '\n' +
          'Items: ' + this.totalArticulos + '\n' +
          '---------------------------------------------'
        );
  },
  productosDetalles: function(){

    let size = this.productos.length;
    let productosDetalles = [];

    for (let i = 0; i < size; i++) {

      const { id, nombre, precio, cantidad, venta } = this.productos[i];
      productosDetalles.push(id + ' | ' + nombre + ' : ' + cantidad + ' | ' + precio + ' | ' + venta + '\n');

    };
    return productosDetalles;
  },
  removerProducto: function(idProducto) {

    // falta añadir casos de uso, tipo cuantos elementos va a quitar, y si son todos elimine el producto directamente
    this.productos = this.productos.filter(producto => producto.id !== idProducto)
  },
  vaciarCarrito: function() {
    this.productos = 0;
  }
};

/*--------------LOOP_SECTION----------------*/
const productos = [
  { id: 1, nombre: "Laptop HP", precioPorUnidad: 800},
  { id: 2, nombre: "Smartphone Samsung", precioPorUnidad: 600},
  { id: 3, nombre: "Auriculares Sony", precioPorUnidad: 100},
  { id: 4, nombre: "Teclado Mecánico Razer", precioPorUnidad: 120},
  { id: 5, nombre: "Monitor LG 27\"", precioPorUnidad: 300},
  { id: 6, nombre: "Disco Duro Externo 1TB", precioPorUnidad: 80},
  { id: 7, nombre: "Impresora Canon", precioPorUnidad: 150},
  { id: 8, nombre: "Webcam Logitech", precioPorUnidad: 70},
  { id: 9, nombre: "Proyector Epson", precioPorUnidad: 400},
  { id: 10, nombre: "Ratón Inalámbrico", precioPorUnidad: 50}
];
let i = 'no';
let iva = 16;
do {
  alert("¡Bienvenido!\n Este es el Carrito de Compras de la Tienda de Don Gorge.");

  i = prompt('¿Desea Comprar? si / no');
  
  if (i === 'si' || i === 'SI' || i === 'Si' || i === 'sI') {

    console.log('Catalogo de Productos:\n' +
      '---------------------------------------------' + '\n' +
      'ID | Articulo => Precio Unitario\n' +
      catalogo(productos) +
      '---------------------------------------------' + '\n' +
      'Si desea comprar algo, de aceptar para continuar.'
     );

    alert('OK! Vea nuestro catalogo:\n' +
          '---------------------------------------------' + '\n' +
          'ID | Articulo => Precio Unitario\n' +
          catalogo(productos)+
          '---------------------------------------------' + '\n' +
          ' Si desea comprar algo, de aceptar para continuar.'
          );
  } else {
    i = 'no'
  }

} while (i === 'si');

function catalogo(productos) {
  let catalogo = [];
  for (let i = 0; i < productos.length; i++) {
    const { id, nombre, precioPorUnidad} = productos[i];
    catalogo.push(id + ' | ' + nombre + ' => ' + precioPorUnidad + '\$ \n');
  };
  return catalogo;
}