function borrar() {
    var productosDiv = document.getElementById('productos');
    while (productosDiv.firstChild) {
      productosDiv.firstChild.remove();
    }
    var resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';
  }
  function calcularTotal() {
    var precios = document.getElementsByName('precio');
    var total = 0;
    for (var i = 0; i < precios.length; i++) {
      var precio = parseFloat(precios[i].value);
      if (!isNaN(precio)) {
        total += precio;
      }
    }
    var operacion = document.getElementById('operaciones').value;
    if (operacion === 'prom1') {
      total *= 0.8; // Aplicar descuento para socios
    } else if (operacion === 'prom2') {
      total *= 0.90; // Aplicar descuento para nuevos clientes
    } else if (operacion === 'prom3') {
      total *= 0.95; // Aplicar descuento general
    }
    var resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `El total a pagar es: $${total.toFixed(2)}`;
  }
  function verificar() {
    var opcion1 = document.getElementById("LOCAL").checked;
    var opcion2 = document.getElementById("DOMICILIO").checked;
    if (opcion1 && opcion2) {
      alert("Seleccionaste ambas opciones");
    }
  }
  function agregarProducto() {
    var productosDiv = document.getElementById('productos');
    var nuevoProductoDiv = document.createElement('div');
    nuevoProductoDiv.innerHTML = `
      <span>Cuánto cuesta el producto que estás adquiriendo?</span>
      <input type="text" name="precio" placeholder="Precio" required /><br /><br />
    `;
    productosDiv.appendChild(nuevoProductoDiv);
  }
  function compararPrecios() {
    var precio1 = parseFloat(document.getElementById('precio1').value);
    var precio2 = parseFloat(document.getElementById('precio2').value);
  
    if (!isNaN(precio1) && !isNaN(precio2)) {
      var mensajeDiv = document.getElementById('mensaje');
      if (precio1 < precio2) {
        mensajeDiv.innerHTML = `La paleta "${document.getElementById('nombre1').value}" es más barata que la paleta "${document.getElementById('nombre2').value}".`;
      } else if (precio1 > precio2) {
        mensajeDiv.innerHTML = `La paleta "${document.getElementById('nombre2').value}" es más barata que la paleta "${document.getElementById('nombre1').value}".`;
      } else {
        mensajeDiv.innerHTML = 'Ambas paletas tienen el mismo precio.';
      }
    }
  }
  
  function borrarCampos() {
    document.getElementById('nombre1').value = '';
    document.getElementById('precio1').value = '';
    document.getElementById('nombre2').value = '';
    document.getElementById('precio2').value = '';
    document.getElementById('mensaje').innerHTML = '';
  }
  function mostrarFormularioTarjeta(mostrar) {
    var formularioTarjeta = document.getElementById('formularioTarjeta');
    formularioTarjeta.style.display = mostrar ? 'block' : 'none';
  }

  function mostrarFormularioTarjeta(mostrar) {
    var formularioTarjeta = document.getElementById('formularioTarjeta');
    formularioTarjeta.style.display = mostrar ? 'block' : 'none';

    var formularioInformacion = document.getElementById('formularioInformacion');
    formularioInformacion.style.display = 'block';
  }

  function realizarCompra() {
    var metodoPago = document.querySelector('input[name="metodoPago"]:checked').value;
    var mensajeCompraDiv = document.getElementById('mensajeCompra');

    if (metodoPago === "efectivo") {
      var mensaje = obtenerMensajeCompra("Compra realizada con éxito en efectivo.");
      mensajeCompraDiv.textContent = mensaje;
    } else if (metodoPago === "tarjeta") {
      var numeroTarjeta = document.getElementById('numeroTarjeta').value;
      var nombreTarjeta = document.getElementById('nombreTarjeta').value;
      var fechaTarjeta = document.getElementById('fechaTarjeta').value;
      var cvvTarjeta = document.getElementById('cvvTarjeta').value;

      if (numeroTarjeta && nombreTarjeta && fechaTarjeta && cvvTarjeta) {
        var mensaje = obtenerMensajeCompra("Compra realizada con éxito con tarjeta.");
        mensajeCompraDiv.textContent = mensaje;
      } else {
        mensajeCompraDiv.textContent = "Por favor, complete todos los campos de la tarjeta.";
      }
    }
  }

  function obtenerMensajeCompra(mensaje) {
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var direccion = document.getElementById('direccion').value;
    var telefono = document.getElementById('telefono').value;
    var envioRetiro = document.querySelector('input[name="envioRetiro"]:checked').value;

    var mensajeCompra = mensaje + "<br><br>";
    mensajeCompra += "Información del Cliente:<br>";
    mensajeCompra += "Nombre: " + nombre + "<br>";
    mensajeCompra += "Apellido: " + apellido + "<br>";
    mensajeCompra += "Dirección: " + direccion + "<br>";
    mensajeCompra += "Teléfono: " + telefono + "<br>";
    mensajeCompra += "Método de Envío/Retiro: " + envioRetiro;

    return mensajeCompra;
  }
  function validarTarjeta() {
    var numeroTarjeta = document.getElementById("numeroTarjeta").value;
    var fechaTarjeta = document.getElementById("fechaTarjeta").value;
    var cvvTarjeta = document.getElementById("cvvTarjeta").value;

    // Validar número de tarjeta (debe tener 16 dígitos)
    if (numeroTarjeta.length !== 16) {
      alert("El número de tarjeta debe tener 16 dígitos");
      return false;
    }

    // Validar fecha de vencimiento (debe tener el formato MM/AA)
    var fechaRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!fechaRegex.test(fechaTarjeta)) {
      alert("El formato de fecha de vencimiento debe ser MM/AA");
      return false;
    }

    // Validar CVV (debe tener 3 dígitos)
    if (cvvTarjeta.length !== 3) {
      alert("El CVV debe tener 3 dígitos");
      return false;
    }

    return true;
  }

  function realizarCompra() {
    var metodoPago = document.querySelector('input[name="metodoPago"]:checked').value;

    if (metodoPago === "tarjeta") {
      var esValido = validarTarjeta();

      if (!esValido) {
        return;
      }
    }

    // Realizar la compra y mostrar mensaje de éxito
    var mensajeCompra = document.getElementById("mensajeCompra");
    mensajeCompra.textContent = "¡Compra realizada con éxito!";
  }