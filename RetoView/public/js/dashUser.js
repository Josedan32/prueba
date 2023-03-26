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
  function byebye(){
    return window.location.href = 'index.html'
  }