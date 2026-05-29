let productos = [

  {
    nombre: "Hamburguesa Clásica",
    precio: 12500,
    descripcion: "Carne, queso, cebolla, tomate, lechuga, papas chips.",
    imagen: "https://i.imgur.com/2DhmtJ4.png"
  },

  {
    nombre: "Hamburguesa Especial",
    precio: 15500,
    descripcion: "Carne, queso, jamón, tocineta, cebolla, tomate, lechuga, papas chips.",
    imagen: "https://i.imgur.com/rM0J6QF.png"
  },

  {
    nombre: "Hamburguesa Ranchera",
    precio: 16500,
    descripcion: "Carne, queso, chorizo, jamón, tocineta, cebolla, tomate, lechuga, papas chips.",
    imagen: "https://i.imgur.com/6Xz8B6X.png"
  },

  {
    nombre: "Hamburguesa Super Ranchera",
    precio: 20500,
    descripcion: "Doble carne, doble queso, chorizo, jamon, tocineta, cebolla, tomate, lechuga, papas chips.",
    imagen: "https://i.imgur.com/1q9Z1Zm.png"
  }

];

let carrito = [];

let productoActual = null;

let gaseosas = 0;

function entrar(){

  let nombre = document.getElementById("nombre").value;
  let telefono = document.getElementById("telefono").value;
  let direccion = document.getElementById("direccion").value;

  localStorage.setItem("nombre", nombre);
  localStorage.setItem("telefono", telefono);
  localStorage.setItem("direccion", direccion);

  document.getElementById("login").classList.add("oculto");
  document.getElementById("categorias").classList.remove("oculto");

}

function mostrarMenu(){

  document.getElementById("categorias").classList.add("oculto");
  document.getElementById("menu").classList.remove("oculto");

  let contenedor = document.getElementById("productos");

  contenedor.innerHTML = "";

  productos.forEach((producto, index)=>{

    contenedor.innerHTML += `

      <div class="producto">

        <img src="${producto.imagen}">

        <h2>${producto.nombre}</h2>

        <p>${producto.descripcion}</p>

        <h3>$${producto.precio}</h3>

        <button onclick="abrirProducto(${index})">
          Seleccionar
        </button>

      </div>

    `;

  });

}

function abrirProducto(index){

  productoActual = productos[index];

  document.getElementById("menu").classList.add("oculto");
  document.getElementById("personalizar").classList.remove("oculto");

  document.getElementById("imgProducto").src = productoActual.imagen;

  document.getElementById("nombreProducto").innerText = productoActual.nombre;

  document.getElementById("precioProducto").innerText =
  "$" + productoActual.precio;

}

let conTodo = document.getElementById("conTodo");

let opciones = document.querySelectorAll(".opcion");

conTodo.addEventListener("change", ()=>{

  if(conTodo.checked){

    opciones.forEach(opcion=>{

      opcion.checked = false;

    });

  }

});

opciones.forEach(opcion=>{

  opcion.addEventListener("change", ()=>{

    if(opcion.checked){

      conTodo.checked = false;

    }

  });

});

function agregarCarrito(){

  let extras = [];

  if(conTodo.checked){

    extras.push("✅ Con todo");

  }else{

    opciones.forEach(opcion=>{

      if(opcion.checked){

        extras.push("❌ " + opcion.parentElement.innerText);

      }

    });

  }

  carrito.push({

    nombre: productoActual.nombre,
    precio: productoActual.precio,
    extras: extras

  });

  opciones.forEach(opcion=>{

    opcion.checked = false;

  });

  conTodo.checked = false;

  document.getElementById("personalizar").classList.add("oculto");
  document.getElementById("menu").classList.remove("oculto");

}

function verCarrito(){

  document.getElementById("menu").classList.add("oculto");
  document.getElementById("carrito").classList.remove("oculto");

  let lista = document.getElementById("listaCarrito");

  lista.innerHTML = "";

  let total = 2000;

  carrito.forEach(item=>{

    total += item.precio;

    lista.innerHTML += `

      <div class="item">

        <h2>${item.nombre}</h2>

        <h3>$${item.precio}</h3>

        <p>${item.extras.join("<br>")}</p>

      </div>

    `;

  });

  total += gaseosas * 2500;

  document.getElementById("total").innerText =
  "Total: $" + total;

}

function masGaseosa(){

  gaseosas++;

  document.getElementById("cantidadGaseosa").innerText =
  gaseosas;

  verCarrito();

}

function menosGaseosa(){

  if(gaseosas > 0){

    gaseosas--;

  }

  document.getElementById("cantidadGaseosa").innerText =
  gaseosas;

  verCarrito();

}

function realizarPedido(){

  let nombre = localStorage.getItem("nombre");
  let telefono = localStorage.getItem("telefono");
  let direccion = localStorage.getItem("direccion");

  let metodo = document.querySelector(
    'input[name="pago"]:checked'
  );

  if(!metodo){

    alert("Selecciona método de pago");

    return;
  }

  let mensaje = `🍔 NUEVO PEDIDO 🍔

👤 Nombre: ${nombre}
📞 Teléfono: ${telefono}
📍 Dirección: ${direccion}

`;

  let total = 2000;

  carrito.forEach(item=>{

    mensaje += `1 ${item.nombre}

`;

    item.extras.forEach(extra=>{

      mensaje += `${extra}
`;

    });

    mensaje += `
`;

    total += item.precio;

  });

  if(gaseosas > 0){

    mensaje += `🥤 ${gaseosas} Gaseosa personal

`;

    total += gaseosas * 2500;

  }

  mensaje += `Total = $${total}

💳 Método de pago:
${metodo.value}`;

  let numeroNegocio = "573028283463";

  let url = `https://wa.me/${numeroNegocio}?text=${encodeURIComponent(mensaje)}`;

  window.open(url);

}
