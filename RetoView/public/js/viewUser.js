


const getUserbyId = (id) => {
  fetch('http://localhost:2020/user/' + id)
    .then(response => response.json())
    .then(data => imprimir(data))

  function imprimir(data) {

    user = data.User
    console.log(user);

    let datosModalDetalle = `
    <td>${user.nombre}</td>
    <td>${user.nombreUsuario}</td>           
    <td><button type="button" id="buttonDetalle" onclick="detalle('${user._id}')" class="btn btn-outline-info btn-sm mr-2 mb-1">Detalle</button><button type="button" id="button" onclick="editUser('${user._id}')" class="btn btn-outline-success btn-sm mr-2 mb-1">Editar</button><button type="button" id="button" onclick="deleteUser('${user._id}')" class="btn btn-outline-danger btn-sm mb-1">Eliminar Cuenta</button></td>
              `
    document.getElementById("cajita").innerHTML = datosModalDetalle
  }
}
function editUser(id){
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

  const peticion1 = () => {
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
      peticion1()
    }



  })
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
                <img src="../public/img/info-removebg-preview.png" width="60">
                </div>
                <tr>
                <td><h5>¿Estas seguro que quieres eliminar tu cuenta?</h5></td>
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
            text: `Tu cuenta fue eliminada con exito, vuelve pronto ;)`,
            confirmButtonColor: '#198754',
            confirmButtonText: '<button class="btn btn-success" onclick="byebye()">Ok</button>'
          })
        }
        const modal = document.querySelector('.model2');
        e.preventDefault();
        modal.classList.remove('model--show2');

      ;
        // location.reload()
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
            <h1>Detalle de tu cuenta</h1>

                <tbody>
                <tr>
                <td><strong>Nombre:  </strong> ${user.nombre}</td>
                </tr>
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

function byebye(){
  return window.location.href = 'index.html'
}

function salir(){
  localStorage.removeItem("usuario")
  Swal.fire({
    icon: 'success',
    title: 'Vuelve pronto ;)',
    text: `bye bye`,
    confirmButtonColor: '#198754',
    confirmButtonText: `<button class="btn btn-success" onclick="byebye()">Ok</button>`
  })
}

console.log();

getUserbyId(localStorage.getItem('usuarioo'))
peticion();
function locationf(){
  window.location.reload()

}
