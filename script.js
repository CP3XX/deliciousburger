function enviarPedido() {

  let nombre = document.getElementById("nombre").value;
  let telefono = document.getElementById("telefono").value;
  let hamburguesa = document.getElementById("hamburguesa").value;
  let direccion = document.getElementById("direccion").value;
  let pago = document.getElementById("pago").value;

  let detalles = "";

  if (document.getElementById("contodo").checked) {
    detalles += "✅ Con todo\n";
  }

  if (document.getElementById("sincebolla").checked) {
    detalles += "❌ Sin cebolla\n";
  }

  if (document.getElementById("sinlechuga").checked) {
    detalles += "❌ Sin lechuga\n";
  }

  if (document.getElementById("sinsalsa").checked) {
    detalles += "❌ Sin salsa\n";
  }

  let gaseosa = document.getElementById("gaseosa").checked
    ? "🥤 Gaseosa personal\n"
    : "";

  let mensaje =
`🍔 NUEVO PEDIDO 🍔

👤 Nombre: ${nombre}
📞 Teléfono: ${telefono}

🍔 Hamburguesa:
${hamburguesa}

📝 Detalles:
${detalles}

${gaseosa}

📍 Dirección:
${direccion}

💳 Método de pago:
${pago}`;

  let numero = "573028283463";

  let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
}

