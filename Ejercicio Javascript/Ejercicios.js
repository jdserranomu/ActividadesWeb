// Punto 1
function secret(mensaje, fun, clave) {
    return mensaje.map(fun(clave))
}

let encrypt = clave => valor => valor + clave;
let decrypt = clave => valor => valor - clave;

console.log(secret([1, 2, 3, 1], encrypt, 1))
console.log(secret([2, 3, 4, 2], decrypt, 1))

// Punto 2
let fibonacci = n => n > 1 ? fibonacci(n - 1) + fibonacci(n - 2) : 1;
console.log(fibonacci(5));

// Punto 3
let urlDetalle = "https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json";
let urlPedidos = "https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json";

const promesaDetalle = new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open('GET', urlDetalle);
    req.onload = function () {
        if (req.status === 200) {
            resolve(JSON.parse(req.response));
        } else {
            reject("No se recibió el detalle");
        }
    };
    req.send()
});


const promesaPedidos = new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open('GET', urlPedidos);
    req.onload = function () {
        if (req.status === 200) {
            resolve(JSON.parse(req.response));
        } else {
            reject("No se recibieron los pedidos");
        }
    };
    req.send();
});


promesaDetalle.then(
    detalles => {
        promesaPedidos.then(
            pedidos => {
                let masPedido = "";
                let cantidadMasPedido = -1;
                detalles.forEach(detalle => {
                    let pedidosDetalle = pedidos.filter(pedido => pedido.idproducto === detalle.idproducto);
                    let numeroPedidos = 0;
                    pedidosDetalle.forEach(pedido => {
                        numeroPedidos += parseInt(pedido.cantidad)
                    });
                    if (numeroPedidos > cantidadMasPedido) {
                        masPedido = detalle.nombreProducto;
                        cantidadMasPedido = numeroPedidos;
                    }
                });
                console.log("Producto mas pedido: "+masPedido);
                console.log("Numero de veces pedido: "+cantidadMasPedido);
            }).catch(err => console.log(err));
    }).catch(err => console.log(err));