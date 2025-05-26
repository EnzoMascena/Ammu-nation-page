let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  total += precio;
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalElemento = document.getElementById("total");
  const contador = document.getElementById("contador");

  lista.innerHTML = "";
  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`; // <- Corregido
    lista.appendChild(li);
  });

  totalElemento.textContent = total;
  contador.textContent = carrito.length;
}

document.getElementById("ver-carrito").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("carrito").classList.toggle("oculto");
});
