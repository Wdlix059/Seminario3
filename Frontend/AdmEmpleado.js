

const API_URL ='http://127.0.0.1:3000';


if(sessionStorage.getItem("correo")!=null){    
    let url=API_URL+'/empleado';
    fetch(url)
    .then(response=>response.json())
    .then(data=>MostrarData(data))
    .catch(error=>console.log(error))

    const MostrarData = (data)=>{
     //   console.log(data);
        let body=``;
        for (let i=0; i<data.length; i++){
            body+=`<tr><td>${data[i].idEmpleado}</td><td>${data[i].Nombre_empleado}</td><td>${data[i].Apellidos_empleado}</td>
                <td>${data[i].Correo_empleado}</td>
                <td>${data[i].Telefono_empleado}</td>
                <td>${data[i].Nombre_perfil}</td>
                <td>${data[i].Nombre_estado}</td>
                <td>${data[i].Empleado_idEmpleado}</td>
                <td>
                <a class="btn btn-warning" onclick ="FuncionEditar(${data[i].idEmpleado})">Editar</a>
                <a class="btn btn-danger"  onclick ="funcionborrar(${data[i].idEmpleado})">Eliminar</a>
                </td>	
                <tr>`
        }
        document.getElementById('data').innerHTML=body
    }
}

    window.onload =function(){
        if(sessionStorage.getItem("correo")==null){
            document.location.href='login.html';
        }
        var administrador = document.getElementById("administrador");
        var AgregarEmpleado = document.getElementById("AgregarEmpleado");
        var Reporte = document.getElementById("Reporte");
        administrador.onclick=Fadministrador;
        AgregarEmpleado.onclick=FAgregarEmpleado;
        Reporte.onclick=FReporte;
    }

    function Fadministrador(){
    //alert("visitas ");
    document.location.href='administrador.html';
    //console.log("aca estoy");
    }

    function FAgregarEmpleado(){
        document.location.href='AgregarEmpleado.html';
    }

    function funcionborrar(numero) {
    //    alert("numero "+numero);
        let urlDelete=API_URL+'/empleado/'+numero;
   //     console.log(urlDelete);

        fetch(urlDelete, {
            method: 'Delete'           
        })
        .then(response=>response.json())
        .catch(error=>console.log(error))
        document.location.href='AdmEmpleado.html';
      }

      function FuncionEditar(numero){
        sessionStorage.setItem("secuencia",numero);
     //   alert("numero "+numero);
        document.location.href='EditarEmpleado.html';
      }

function FReporte(){
//    alert("Reporte")
let url=API_URL+'/EmpleadoReporte';
    fetch(url)
    .then((response)=>{
        if(response.ok)
        {
            alert('Se ha generado con éxito el reporte de empleados')
        }else{
            alert('Se tienen problemas no se ha generado el reporte')
        }   
        
    })
    .then(data=>data)        
    .catch(error=>console.log(error))
    
}
