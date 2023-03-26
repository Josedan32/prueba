
function clickboton(){
    
    function validarFormulario() {
      var usuario = document.getElementById('usuario').value;
      var clave = document.getElementById('clave').value;

      //LOS DOS ESTAN VACIOS
      if(!usuario && !clave){
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Tienes que ingresar los campos'
        });
      }
      //usuario VACIO
      if (!usuario) {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Tienes que ingresar el usuario'
        });
      }
    
      
      //CLAVE NO INGRESADA
      if (!clave) {
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La contraseña es obligatoria'
          });
      }

      
  
    peticion()
      
    }
    const peticion = () =>{
      var usuario = document.getElementById('usuario').value;
      var clave = document.getElementById('clave').value;
      objeto = {"nombreUsuario": usuario,"password": clave}
      fetch('http://localhost:2020/auth',{
        method: 'POST',
        body: JSON.stringify(objeto),
        headers:{
          "Content-type": "application/json"
        }
        })
        .then(response => response.json())
        .then(data => login(data));
    
      
    }
    function login(data) {
      console.log(data.usuario);
      let user = data.usuario;
      let band = data.band
      console.log(band);  

      if (!band){
        return  Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Los datos no son correctos'
        });
      }
      if(user){
        
          if(user.rol.toLowerCase() == "admin"){
            return window.location.href = 'dashboard.html';
          }
          if (user.rol.toLowerCase() == "user" ){
            localStorage.setItem("usuarioo",user._id)
            return window.location.href = 'viewUser.html';
          }
    }
    
}

validarFormulario() 
}

console.log(localStorage.getItem("usuarioo")
);







