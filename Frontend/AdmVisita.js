const API_URL ='http://127.0.0.1:3000';

    let url=API_URL+'/visita';
    fetch(url)
    .then(response=>response.json())
    .then(data=>MostrarData(data))
    .catch(error=>console.log(error))

    const MostrarData = (data)=>{
     //   console.log(data);
        let body=``;
        for (let i=0; i<data.length; i++){
            body+=`<tr><td>${data[i].IdVisita}</td><td>${data[i].Empleado}</td><td>${data[i].Estado_Visita}</td>
                <td>${data[i].Cliente}</td>
                <td>${data[i].Descripcion_visita}</td>
                <td>${data[i].Resultado_visita}</td>
                <td>${data[i].Fecha_visita}</td>
                <td>
                <a class="btn btn-warning" onclick ="FuncionEditar(${data[i].IdVisita})">Editar</a>
                <a class="btn btn-danger"  onclick ="funcionborrar(${data[i].IdVisita})">Eliminar</a>
                </td>	
                <tr>`
        }
        document.getElementById('data').innerHTML=body
    }

    window.onload =function(){
        var administrador = document.getElementById("administrador");
        var AgregarVisita = document.getElementById("AgregarVisita2");

        administrador.onclick=Fadministrador;

        AgregarVisita.onclick=AgregarVisitaF;
    }

    function Fadministrador(){
    //alert("visitas ");
    document.location.href='administrador.html';
    //console.log("aca estoy");
    }

    function AgregarVisitaF(){
        document.location.href='AgregarVisita.html';
    }

    function funcionborrar(numero) {
        alert("numero "+numero);
        let urlDelete=API_URL+'/visita/'+numero;
     //   console.log(urlDelete);

        fetch(urlDelete, {
            method: 'Delete'           
        })
        .then(response=>response.json())
        .catch(error=>console.log(error))
        document.location.href='AdmVisitas.html';
      }

      function FuncionEditar(numero){
        sessionStorage.setItem("secuencia",numero);
        document.location.href='EditarVisita.html';
      }
