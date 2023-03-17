export function validar(input) {
  const tipoInput = input.dataset.tipo;

  if (validadores[tipoInput]) {
    validadores[tipoInput](input);
  }
  console.log(input.validity);
  if (input.validity.valid) {
    input.parentElement.classList.remove('input-container--invalid');
    input.parentElement.querySelector('.input-message-error').innerHTML = '';
  } else {
    input.parentElement.classList.add('input-container--invalid');
    input.parentElement.querySelector('.input-message-error').innerHTML =
      mostrarMensajeError(tipoInput, input);
  }
}

const tipoErrores = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'customError',
];

const mensajesError = {
  nombre: {
    valueMissing: 'El campo nombre no puede estar vacío',
  },
  email: {
    valueMissing: 'El campo correo no puede estar vacío',
    typeMismatch: 'El correo no es válido',
  },
  password: {
    valueMissing: 'El campo contraseña no puede estar vacío',
    patternMismatch:
      'Debe ser de al menos 6 caracteres, máximo 12, contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales',
  },
  nacimiento: {
    valueMissing: 'El campo nacimiento no puede estar vacío',
    customError: 'Debes de tener al menos 18 años',
  },
  numero: {
    valueMissing: 'El campo número no puede estar vacío',
    patternMismatch: 'Debe de tener 9 dígitos',
  },
  direccion: {
    valueMissing: 'El campo dirección no puede estar vacío',
    patternMismatch: 'La dirección debe contener entre 10 a 40 caracteres',
  },
  ciudad: {
    valueMissing: 'El campo ciudad no puede estar vacío',
    patternMismatch: 'Debes de colocar al menos 3 carácteres',
  },
  distrito: {
    valueMissing: 'El campo distrito no puede estar vacío',
    patternMismatch: 'Debes de colocar al menos 3 carácteres',
  },
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeError(tipoInput, input) {
  let mensaje = '';
  tipoErrores.forEach((err) => {
    if (input.validity[err]) {
      console.log(tipoInput, err);
      console.log(input.validity[err]);
      console.log(mensajesError[tipoInput][err]);
      console.log(err);
      mensaje = mensajesError[tipoInput][err];
    }
  });
  return mensaje;
}

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
