export function validar(input) {
  const tipoInput = input.dataset.tipo;
  if (validadores[tipoInput]) {
    validadores[tipoInput](input);
  }
}

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = '';
  if (!mayorEdad(fechaCliente)) {
    mensaje = 'Debes de tener al menos 18 años';
  }
  input.setCustomValidity(mensaje);
}

function mayorEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return fechaActual >= diferenciaFechas;
}
