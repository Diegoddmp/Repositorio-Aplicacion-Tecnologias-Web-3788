$(document).ready(function () {
    // Interceptar el clic en el enlace "Tabla 1"
    $("#tabla1-link").on("click", function (event) {
        event.preventDefault(); // Prevenir la navegación predeterminada
        $("#tabla1Modal").modal("show"); // Mostrar el modal
    });

    // Manejar el clic en el botón "Sí" del modal
    $("#modal-yes").on("click", function () {
        const url = "tabla1.html"; // URL de la tabla a cargar
        cargarTabla(url, true); // Llama a la función para cargar la tabla

        $("#tabla1Modal").modal("hide"); // Cerrar el modal
    });
});

// Función para cargar una tabla dinámicamente
function cargarTabla(url, mostrarBotonLimpiar = false) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar la tabla");
            }
            return response.text();
        })
        .then(html => {
            const container = document.getElementById("tabla-container");
            container.innerHTML = html;

            // Mostrar el botón "Limpiar" si está habilitado
            if (mostrarBotonLimpiar) {
                const botonLimpiar = document.createElement("button");
                botonLimpiar.textContent = "Limpiar";
                botonLimpiar.className = "btn btn-primary mt-3 d-block mx-auto";
                botonLimpiar.id = "boton-limpiar";

                // Agregar evento al botón "Limpiar"
                botonLimpiar.addEventListener("click", () => {
                    const tabla = container.querySelector("table");
                    if (tabla) {
                        const celdas = tabla.querySelectorAll("tbody td");
                        celdas.forEach(celda => {
                            celda.innerHTML = "&nbsp;";
                        });
                    }
                });

                container.appendChild(botonLimpiar);
            }
        })
        .catch(error => {
            console.error("Hubo un problema al cargar la tabla:", error);
        });
}
