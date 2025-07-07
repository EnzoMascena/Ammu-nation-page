document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("productos-api");

  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    const productos = data.products;

    productos.forEach(producto => {
      const card = document.createElement("div");
      card.className = "producto-api";
      card.innerHTML = `
        <img src="${producto.thumbnail}" alt="${producto.title}">
        <h3>${producto.title}</h3>
        <p>$${producto.price}</p>
        <button>Agregar al carrito</button>
      `;

      const boton = card.querySelector("button");
      boton.addEventListener("click", () => {
        agregarAlCarrito(producto.title, producto.price);
        alert(`✅ ${producto.title} agregado al carrito.`);
      });

      contenedor.appendChild(card);
    });
  } catch (error) {
    contenedor.innerHTML = "<p>Error al cargar productos.</p>";
    console.error("Error:", error);
  }
});
