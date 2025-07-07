let carrito = [];
let total = 0;

// Cargar carrito guardado al cargar la página
window.onload = function () {
  const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
  const totalGuardado = parseFloat(localStorage.getItem("total"));

  if (Array.isArray(carritoGuardado) && !isNaN(totalGuardado)) {
    carrito = carritoGuardado;
    total = totalGuardado;
    actualizarCarrito();
  }
};

function agregarAlCarrito(nombre, precio) {
  // Buscar si el producto ya existe
  const index = carrito.findIndex(item => item.nombre === nombre);

  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  guardarCarrito();
  actualizarCarrito();
}

function cambiarCantidad(index, delta) {
  let carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];

  if (!carritoGuardado[index]) return;

  carritoGuardado[index].cantidad += delta;

  if (carritoGuardado[index].cantidad <= 0) {
    carritoGuardado.splice(index, 1);
  }

  const nuevoTotal = carritoGuardado.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  localStorage.setItem("carrito", JSON.stringify(carritoGuardado));
  localStorage.setItem("total", nuevoTotal);

  carrito = carritoGuardado;
  total = nuevoTotal;

  actualizarCarrito();
}

function eliminarDelCarrito(index) {
  let carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carritoGuardado[index]) {
    carritoGuardado.splice(index, 1);
  }

  const nuevoTotal = carritoGuardado.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  localStorage.setItem("carrito", JSON.stringify(carritoGuardado));
  localStorage.setItem("total", nuevoTotal);

  carrito = carritoGuardado;
  total = nuevoTotal;

  actualizarCarrito();
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("total", carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0));
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalElemento = document.getElementById("total");
  const contador = document.getElementById("contador");

  if (!lista || !totalElemento || !contador) return;

  const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalGuardado = parseFloat(localStorage.getItem("total")) || 0;

  lista.innerHTML = "";

  carritoGuardado.forEach((item, index) => {
    const li = document.createElement("li");

    const subtotal = item.precio * item.cantidad;

    li.innerHTML = `
      <strong>${item.nombre}</strong><br>
      Precio: $${item.precio} x ${item.cantidad} = <strong>$${subtotal}</strong>
    `;

    // Botón ➕
    const btnMas = document.createElement("button");
    btnMas.textContent = "+";
    btnMas.onclick = () => cambiarCantidad(index, 1);

    // Botón ➖
    const btnMenos = document.createElement("button");
    btnMenos.textContent = "-";
    btnMenos.onclick = () => cambiarCantidad(index, -1);

    // Botón ❌
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "❌";
    btnEliminar.onclick = () => eliminarDelCarrito(index);

    [btnMas, btnMenos, btnEliminar].forEach(btn => {
      btn.style.marginLeft = "5px";
      btn.style.backgroundColor = "#900";
      btn.style.color = "#fff";
      btn.style.border = "none";
      btn.style.borderRadius = "4px";
      btn.style.cursor = "pointer";
    });

    li.appendChild(btnMas);
    li.appendChild(btnMenos);
    li.appendChild(btnEliminar);

    lista.appendChild(li);
  });

  totalElemento.textContent = totalGuardado;
  contador.textContent = carritoGuardado.reduce((acc, item) => acc + item.cantidad, 0);
}

// Eventos del DOM (si existen)
const btnVerCarrito = document.getElementById("ver-carrito");
if (btnVerCarrito) {
  btnVerCarrito.addEventListener("click", () => {
    const carritoSection = document.getElementById("carrito");
    if (carritoSection) carritoSection.classList.toggle("oculto");
  });
}

const btnVaciar = document.getElementById("vaciar-carrito");
if (btnVaciar) {
  btnVaciar.addEventListener("click", () => {
    carrito = [];
    total = 0;
    guardarCarrito();
    actualizarCarrito();
  });
}

const btnFinalizar = document.getElementById("finalizar-compra");
if (btnFinalizar) {
  btnFinalizar.addEventListener("click", () => {
    alert("¡Gracias por tu compra! Serás redirigido al inicio.");
    carrito = [];
    total = 0;
    guardarCarrito();
    actualizarCarrito();

    const carritoSection = document.getElementById("carrito");
    if (carritoSection) carritoSection.classList.add("oculto");

    window.location.href = "index.html";
  });
}
