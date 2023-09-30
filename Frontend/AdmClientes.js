const API_URL ='http://127.0.0.1:3000';

    let url=API_URL+'/cliente';
    fetch(url)
    .then(response=>response.json())
    .then(data=>MostrarData(data))
    .catch(error=>console.log(error))

    const MostrarData = (data)=>{
        //console.log(data);
        let body=``;
        for (let i=0; i<data.length; i++){
            body+=`<tr><td>${data[i].idCliente}</td><td>${data[i].NIT}</td><td>${data[i].nombres_cliente}</td>
                <td>${data[i].apellido_cliente}</td>
                <td>${data[i].Telefono_cliente}</td>
                <td>${data[i].Correo_cliente}</td>
                <td>${data[i].direccion_cliente}</td>
                <td>${data[i].coord1}</td>
                <td>${data[i].coord2}</td>
                <td>${data[i].nombre_estado}</td>
                <td>
                <a class="btn btn-warning" onclick ="FuncionEditar(${data[i].idCliente})">Editar</a>
                <a class="btn btn-danger"  onclick ="funcionborrar(${data[i].idCliente})">Eliminar</a>
                </td>	
                <tr>`
        }
        document.getElementById('data').innerHTML=body
    }

window.onload =function(){

    if(sessionStorage.getItem("correo")==null){
        document.location.href='login.html';
    }
    var administrador = document.getElementById("administrador");
    var AgregarCliente = document.getElementById("AgregarCliente");
    var Reporte = document.getElementById("Reporte");
    administrador.onclick=Fadministrador;
    AgregarCliente.onclick=FAgregarCliente;
    Reporte.onclick=FReporte;
}

function Fadministrador(){
    document.location.href='administrador.html';
}

function FAgregarCliente(){
    document.location.href='AgregarCliente.html';
}

function FuncionEditar(numero)
{
    sessionStorage.setItem("secuencia",numero);
    document.location.href="EditarCliente.html"
}

function funcionborrar(numero){        
    let urlDelete=API_URL+'/cliente/'+numero;
    fetch(urlDelete, {
        method: 'Delete'           
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
    document.location.href='AdmClientes.html';
}

function FReporte(){
//    alert("Reporte")
let url=API_URL+'/clienteReporte';
    fetch(url)    
    .then((response)=>{
        if(response.ok)
        {
            alert('Se ha generado con éxito el reporte de clientes')
        }else{
            alert('Se tienen problemas no se ha generado el reporte')
        }   
        
    })
    .then(data=>data)
    .catch(error=>console.log(error))    
}