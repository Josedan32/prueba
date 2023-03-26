const navBar = document.querySelector("nav"),
  menuBtns = document.querySelectorAll(".menu-icon"),
  overlay = document.querySelector(".overlay");

menuBtns.forEach((menuBtn) => {
  menuBtn.addEventListener("click", () => {
    navBar.classList.toggle("open");
  });
});

overlay.addEventListener("click", () => {
  navBar.classList.remove("open");
});

const peticion = () => {
  fetch('http://localhost:2020/user/')
    .then(response => response.json())
    .then(data => imprimir(data));
}


function imprimir(data) {


  data.User.forEach(element => {
    let datosTabla = `
        <tr>
            <td>${element.nombre}</td>
            <td>${element.edad}</td>
            <td>${element.rol}</td>            
            <td>${element.ciudadResidencia}</td>            
            <td><a><button type="button" id="buttonDetalle" onclick="detalle('${element._id}')" class="btn btn-outline-info btn-sm mr-2 mb-1">Detalle</button></a><button type="button" id="button" onclick="editUser('${element._id}')" class="btn btn-outline-success btn-sm mr-2 mb-1">Editar</button><button type="button" id="button" onclick="deleteUser('${element._id}')" class="btn btn-outline-danger btn-sm mb-1">Eliminar</button></td>
        </tr>
        `
    $("#tableUsuarios tbody").append(datosTabla)

  });



}


function detalle(id) {

  var cambiarNada = document.getElementById('BoxModal')
  cambiarNada.innerHTML = "";

  const getUserbyId = () => {
    fetch('http://localhost:2020/user/' + id)
      .then(response => response.json())
      .then(data => imprimir(data))

    function imprimir(data) {

      user = data.User
      console.log(user);

      let datosModalDetalle = `
            <table class="table">
            <h1>Detalle de ${user.nombre}</h1>

                <tbody>
                <tr>
                <td><strong>Edad:  </strong> ${user.edad}</td>
                </tr>
                <tr>
                <td><strong>Ciudad de residencia:  </strong> ${user.ciudadResidencia}</td>
                </tr>
                <tr>
                <td><strong>Nombre de usuario:  </strong> ${user.nombreUsuario}</td>
                </tr>
                <tr>
                <td><strong>Contraseña: </strong> ${user.password}</td>
                </tr>
                <tr>
                <td><strong>Rol:  </strong> ${user.rol}</td>
                </tr>
                </tbody>
            </table>
                
            
                
        
                `
      $("#BoxModal").append(datosModalDetalle)
    }
  }

  const modal = document.querySelector('.model');
  const closeModal = document.querySelector('#modal__close');

  modal.classList.add('model--show');

  closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('model--show');
  });


  getUserbyId()


}

function deleteUser(id) {

  var cambiarNada = document.getElementById('BoxModal2')
  cambiarNada.innerHTML = "";

  const getUserbyId = () => {
    fetch('http://localhost:2020/user/' + id)
      .then(response => response.json())
      .then(data => imprimir(data))

    function imprimir(data) {

      user = data.User
      console.log(user);

      let datosModalDetalle = `
                <div class="text-center img-fluid">
                <img src="../public/img/cuidado-removebg-preview.png" width="60">
                </div>
                <tr>
                <td><h5>¿Estas seguro que quieres eliminar al usuario ${user.nombre}?</h5></td>
                </tr>
                `
      $("#BoxModal2").append(datosModalDetalle)

      const botonEliminar = document.getElementById('deleteConfirm');
      botonEliminar.addEventListener('click', (e) => {
        fetch('http://localhost:2020/user/' + id, {
            method: "DELETE"
          })
          .then(response => response.json())
          .then(data => eliminar(data))


        function eliminar(data) {
          var user = data.userDelete
          Swal.fire({
            icon: 'success',
            title: 'Eliminado con exito',
            text: `El usuario ${user.nombre} fue eliminado`,
            confirmButtonColor: '#198754',
            confirmButtonText: `<button class="btn btn-success" onclick="locationf()">Ok</button>`
          })
        }
        const modal = document.querySelector('.model2');
        e.preventDefault();
        modal.classList.remove('model--show2');
      })
    }
  }



  const modal = document.querySelector('.model2');
  const closeModal = document.querySelector('#modal__close2');

  modal.classList.add('model--show2');

  closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('model--show2');
  });


  getUserbyId()
}

function editUser(id) {
  const getUserbyId = () => {
    fetch('http://localhost:2020/user/' + id)
      .then(response => response.json())
      .then(data => imprimir(data))

    function imprimir(data) {

      user = data.User
      console.log(user);

      $("#idEditar").val(user._id)
      $("#nombreEditar").val(user.nombre)
      $("#edadEditar").val(user.edad)
      $("#ciudadResidenciaEditar").val(user.ciudadResidencia)
      $("#nombreUsuarioEditar").val(user.nombreUsuario)
      $("#rolEditar").val(user.rol)
    }

  }
  const modal = document.querySelector('.model3');
  const closeModal = document.querySelector('#modal__close3');

  modal.classList.add('model--show3');

  closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('model--show3');
    location.reload()
  });

  const inputs = document.querySelectorAll('#formularioEditar input');

  const expresiones = {
    nombreUsuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  }
  const camposEditar = {
    nombreUsuario: false,
    nombre: false,
    ciudadResidencia: false,
    edad: false,
  }

  const validarFormulario = (e) => {
    switch (e.target.name) {
      case "nombreUsuarioEditar":
        validarCampo(expresiones.nombreUsuario, e.target, 'nombreUsuario');
        break;
      case "nombreEditar":
        validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
      case "ciudadResidenciaEditar":
        validarCampo(expresiones.nombre, e.target, 'ciudadResidencia');
        break;
      case "edadEditar":
        let edad = document.getElementById("edadEditar").value;
        if (edad > 0) {
          document.getElementById(`grupo__edad`).classList.remove('formulario__grupo-incorrecto');
          document.getElementById(`grupo__edad`).classList.add('formulario__grupo-correcto');
          document.querySelector(`#grupo__edad i`).classList.add('fa-check-circle');
          document.querySelector(`#grupo__edad i`).classList.remove('fa-times-circle');
          document.querySelector(`#grupo__edad .formulario__input-error`).classList.remove('formulario__input-error-activo');
          camposEditar['edad'] = true;
        } else {
          document.getElementById(`grupo__edad`).classList.add('formulario__grupo-incorrecto');
          document.getElementById(`grupo__edad`).classList.remove('formulario__grupo-correcto');
          document.querySelector(`#grupo__edad i`).classList.add('fa-times-circle');
          document.querySelector(`#grupo__edad i`).classList.remove('fa-check-circle');
          document.querySelector(`#grupo__edad .formulario__input-error`).classList.add('formulario__input-error-activo');
          camposEditar['edad'] = false;
        };
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
      camposEditar[campo] = true;
    } else {
      document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
      document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
      document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
      document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
      document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
      camposEditar[campo] = false;
    }
  }


  inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
  });

  const peticion = () => {
    fetch('http://localhost:2020/user/')
      .then(response => response.json())
      .then(data => checkUser(data));

    function checkUser(data) {
      var Valid = document.getElementById('idEditar').value;
      var Valnombre = document.getElementById('nombreEditar').value;
      var ValEdad = document.getElementById('edadEditar').value;
      var ValciudadResidencia = document.getElementById('ciudadResidenciaEditar').value;
      var ValnombreUsuario = document.getElementById('nombreUsuarioEditar').value;
      var rol = document.getElementById('rolEditar').value;

      var bandera = true;
      data.User.forEach(element => {
        if (element.nombreUsuario == ValnombreUsuario) {
          if (element._id == Valid) {
            bandera = true
          } else {
            bandera = false
            return Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Los lamento pero no se puede repetir usuario',
            });
          }

        }
      });
      if(bandera){
        objeto = {
          "nombre": Valnombre,
          "edad": ValEdad,
          "ciudadResidencia": ValciudadResidencia,
          "nombreUsuario": ValnombreUsuario,
          "password": user.password,
          "rol": rol
        }
        fetch('http://localhost:2020/user/' + id, {
          method: "PUT",
          body: JSON.stringify(objeto),
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(response => response.json())
        .then(data => editar(data))
        function editar(data) {
          var user = data.userEdit
          console.log(user);
          Swal.fire({
            icon: 'success',
            title: 'Editado con exito',
            text: `El usuario ${user.nombre} fue editado`,
            confirmButtonColor: '#198754',
            confirmButtonText: `<button class="btn btn-succes" onclick="locationf()">Ok</button>`
          })
          
          const modal = document.querySelector('.model3');
          modal.classList.remove('model--show3');
        }
      }


    }
  }
  const botonEditar = document.getElementById('editConfirm');
  botonEditar.addEventListener('click', (e) => {
    var Valnombre = document.getElementById('nombreEditar').value;
    var ValEdad = document.getElementById('edadEditar').value;
    var ValciudadResidencia = document.getElementById('ciudadResidenciaEditar').value;
    var ValnombreUsuario = document.getElementById('nombreUsuarioEditar').value;
    var rol = document.getElementById('rolEditar').value;
    if (!Valnombre || !ValEdad || !ValciudadResidencia || !ValnombreUsuario || !rol) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Tienes que ingresar todos los campos'
      })
     } else {
      peticion()
    }



  })
  getUserbyId()

}

function crearUsuario() {
  const modal = document.querySelector('.model4');
  const closeModal = document.querySelector('#modal__close4');

  modal.classList.add('model--show4');

  closeModal.addEventListener('click', (e) => {
    document.getElementById('nombreCrear').value = "";
    document.getElementById('edadCrear').value = "";
    document.getElementById('ciudadResidenciaCrear').value = "";
    document.getElementById('nombreUsuarioCrear').value = "";
    document.getElementById('passwordCrear').value = "";
    document.getElementById('rolCrear').value = "";
    document.getElementById('password2').value = "";
    e.preventDefault();
    modal.classList.remove('model--show4');
    location.reload()

  });

  const inputs = document.querySelectorAll('#formularioCrear input');

  const expresiones = {
    nombreUsuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  }
  const campos = {
    nombreUsuario: false,
    nombre: false,
    ciudadResidencia: false,
    edad: false,
    password: false
  }

  const validarFormulario = (e) => {
    switch (e.target.name) {
      case "nombreUsuarioCrear":
        validarCampo(expresiones.nombreUsuario, e.target, 'nombreUsuario');
        break;
      case "nombreCrear":
        validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
      case "ciudadResidenciaCrear":
        validarCampo(expresiones.nombre, e.target, 'ciudadResidencia');
        break;
      case "edadCrear":
        let edad = document.getElementById("edadCrear").value;
        if (edad > 0) {
          document.getElementById(`grupo__edad`).classList.remove('formulario__grupo-incorrecto');
          document.getElementById(`grupo__edad`).classList.add('formulario__grupo-correcto');
          document.querySelector(`#grupo__edad i`).classList.add('fa-check-circle');
          document.querySelector(`#grupo__edad i`).classList.remove('fa-times-circle');
          document.querySelector(`#grupo__edad .formulario__input-error`).classList.remove('formulario__input-error-activo');
          campos['edad'] = true;
        } else {
          document.getElementById(`grupo__edad`).classList.add('formulario__grupo-incorrecto');
          document.getElementById(`grupo__edad`).classList.remove('formulario__grupo-correcto');
          document.querySelector(`#grupo__edad i`).classList.add('fa-times-circle');
          document.querySelector(`#grupo__edad i`).classList.remove('fa-check-circle');
          document.querySelector(`#grupo__edad .formulario__input-error`).classList.add('formulario__input-error-activo');
          campos['edad'] = false;
        };
        break;
      case "passwordCrear":
        validarCampo(expresiones.password, e.target, 'password');
        validarPassword2();
        break;
      case "password2Crear":
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
      campos[campo] = true;
    } else {
      document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
      document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
      document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
      document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
      document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
      campos[campo] = false;
    }
  }

  const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('passwordCrear');
    const inputPassword2 = document.getElementById('password2');

    if (inputPassword1.value !== inputPassword2.value) {
      document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
      document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
      document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
      document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
      document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
      campos['password'] = false;
    } else {
      document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
      document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
      document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
      document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
      document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
      campos['password'] = true;
    }
  }

  inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
  });



  const button = document.getElementById("createConfirm");
  button.addEventListener('click', () => {


    function validarFormulario() {
      //////////////////TODOS LOS CAMPOS VACIOS//////////////////////
      if (!campos['nombreUsuario'] || !campos['nombre'] || !campos['ciudadResidencia'] || !campos['edad'] || !campos['password'] || !document.getElementById('rolCrear')) {
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
        var Valnombre = document.getElementById('nombreCrear').value;
        var ValEdad = document.getElementById('edadCrear').value;
        var ValciudadResidencia = document.getElementById('ciudadResidenciaCrear').value;
        var ValnombreUsuario = document.getElementById('nombreUsuarioCrear').value;
        var Valrol = document.getElementById('rolCrear').value;
        var Valcontraseina = document.getElementById('passwordCrear').value;

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
        if (bandera) {
          objeto = {
            "nombre": Valnombre,
            "edad": ValEdad,
            "ciudadResidencia": ValciudadResidencia,
            "nombreUsuario": ValnombreUsuario,
            "password": Valcontraseina,
            "rol": Valrol
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
              document.getElementById("formularioCrear").reset()
              return Swal.fire({
                icon: 'success',
                title: ':)',
                text: 'Usuarios Creado',
                confirmButtonColor: '#198754',
                confirmButtonText: `<button class="btn btn-succes" onclick="locationf()">Ok</button>`
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




}
peticion();
function locationf(){
  window.location.reload()

}

function salir(){
  Swal.fire({
    icon: 'success',
    title: 'Vuelve pronto ;)',
    text: `bye bye`,
    confirmButtonColor: '#198754',
    confirmButtonText: `<a href="index.html"><button class="btn btn-success">Ok</button></a>`
  })
}