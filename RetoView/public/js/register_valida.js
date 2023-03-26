const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
  nombreUsuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,12}$/, // 4 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}


const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombreUsuario":
      validarCampo(expresiones.nombreUsuario, e.target, 'nombreUsuario');
      break;
    case "nombre":
      validarCampo(expresiones.nombre, e.target, 'nombre');
      break;
    case "ciudadResidencia":
      validarCampo(expresiones.nombre, e.target, 'ciudadResidencia');
      break;
    case "edad":
      let edad = document.getElementById("edad").value;
      if (edad > 0) {
        document.getElementById(`grupo__edad`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__edad`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__edad i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__edad i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__edad .formulario__input-error`).classList.remove('formulario__input-error-activo');
        // campos["edad"] = true;
      } else {
        document.getElementById(`grupo__edad`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__edad`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__edad i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__edad i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__edad .formulario__input-error`).classList.add('formulario__input-error-activo');
        // campos["edad"] = false;
      };
      break;
    case "password":
      validarCampo(expresiones.password, e.target, 'password');
      validarPassword2();
      break;
    case "password2":
      validarPassword2();
      break;
  }
}

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
    document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
    document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
    document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
    document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
    // campos[campo] = true;
  } else {
    document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
    document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
    document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
    document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
    document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
    // campos[campo] = false;
  }
}

const validarPassword2 = () => {
  const inputPassword1 = document.getElementById('password');
  const inputPassword2 = document.getElementById('password2');

  if (inputPassword1.value !== inputPassword2.value) {
    document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
    document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
    document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
    document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
    document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
    // campos['password'] = false;
  } else {
    document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
    document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
    document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
    document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
    document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
    // campos['password'] = true;
  }
}

inputs.forEach((input) => {
  input.addEventListener('keyup', validarFormulario);
  input.addEventListener('blur', validarFormulario);
});



const button = document.getElementById("button");
button.addEventListener('click', () => {



  function validarFormulario() {

    var Valnombre = document.getElementById('nombre').value;
    var ValEdad = document.getElementById('edad').value;
    var ValciudadResidencia = document.getElementById('ciudadResidencia').value;
    var ValnombreUsuario = document.getElementById('nombreUsuario').value;
    var Valcontraseina = document.getElementById('password').value;

    //////////////////TODOS LOS CAMPOS VACIOS//////////////////////
    if (!Valnombre || !ValEdad || !ValciudadResidencia || !ValnombreUsuario || !Valcontraseina) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Tienes que ingresar todos los campos'
      })
    } else {
      peticion()
    }

  }

  const peticion = () => {
    fetch('http://localhost:2020/user/')
      .then(response => response.json())
      .then(data => checkUser(data));

    function checkUser(data) {
      var Valnombre = document.getElementById('nombre').value;
      var ValEdad = document.getElementById('edad').value;
      var ValciudadResidencia = document.getElementById('ciudadResidencia').value;
      var ValnombreUsuario = document.getElementById('nombreUsuario').value;
      var Valcontraseina = document.getElementById('password').value;
    
      var bandera = true;
      data.User.forEach(element => {
        if (element.nombreUsuario == ValnombreUsuario) {
          bandera = false
          return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Los lamento pero no se puede repetir usuario',
          });
        }
      });
      if(bandera){
        objeto = {
          "nombre": Valnombre,
          "edad": ValEdad,
          "ciudadResidencia": ValciudadResidencia,
          "nombreUsuario": ValnombreUsuario,
          "password": Valcontraseina,
          "rol": "user"
        }
        fetch('http://localhost:2020/user', {
          method: 'POST',
          body: JSON.stringify(objeto),
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(response => response.json())
        .then(data => crear(data));

      function crear(data) {

        let band = data.band;

        if (band == true) {
          document.getElementById("formulario").reset()
          return Swal.fire({
            icon: 'success',
            title: ':)',
            text: 'Usuarios Creado',
            confirmButtonColor: '#198754',
            confirmButtonText: '<a href="index.html"><button class="btn btn-success">Ok</button></a>'
          });
        } else {
          return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Los datos no son correctos',
          });
        }
      }
      } 




    }





  }

  validarFormulario()
});