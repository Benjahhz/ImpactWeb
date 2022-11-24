$(window).on('load', function() {
    // Path: assets\js\modules\home\home.js
    $(".loader").fadeOut("slow");



    const productos = [
        {
            nombre: "Caja de cartón",
            stock: 100,
        },
        {
            nombre: "Caja de cartón",
            stock: 50,
        },
        {
            nombre: "Caja de cartón",
            stock: 40,
        },
    ]
    const productosFiltrados = productos.filter((producto) => {
        return producto.stock >= 50;
    })

    
})


