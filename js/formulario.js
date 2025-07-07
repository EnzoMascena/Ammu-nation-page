// js/formulario.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contacto");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita recargar

    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        alert("✅ ¡Gracias por contactarte con nosotros!");
        form.reset();
      } else {
        alert("❌ Ocurrió un error al enviar el formulario.");
      }
    })
    .catch(error => {
      console.error("Error al enviar el formulario:", error);
      alert("❌ No se pudo enviar el mensaje. Intentalo más tarde.");
    });
  });
});
