const API_URL ='http://127.0.0.1:3000';

const item =sessionStorage.getItem("secuencia")

let url=API_URL+'/cliente/'+item

fetch(url)
.then(response=>response.json())
.then(data=>MostrarCliente(data))
.catch(error=>console.log(error))

const MostrarCliente = (data)=>{
//console.log("data "+ data);

document.getElementById("NIT").setAttribute("value",data.NIT)
document.getElementById("Nombre").setAttribute("value",data.nombres_cliente)
document.getElementById('Apellido').setAttribute("value",data.apellido_cliente)
document.getElementById("Telefono").setAttribute("value",data.Telefono_cliente)
document.getElementById("Correo").setAttribute("value",data.Correo_cliente)
document.getElementById("Direccion").setAttribute("value",data.direccion_cliente)
document.getElementById("Latitud").setAttribute("value",data.coord1)
document.getElementById("Longitud").setAttribute("value",data.coord2)
}

window.onload =function(){
    var CancelarCliente = document.getElementById("CancelarOperacion");
    var ActualizarCliente = document.getElementById("GuardarCliente");

    CancelarCliente.onclick=FCancelarCliente;
    ActualizarCliente.onclick=FActualizarCliente;
}
function FCancelarCliente(){
    sessionStorage.removeItem("secuencia");
    document.location.href='AdmClientes.html';
}

function FActualizarCliente(){
    let NIT = document.getElementById("NIT").value;
    let Nombre = document.getElementById("Nombre").value;
    let Apellido = document.getElementById("Apellido").value;
    let Telefono= document.getElementById("Telefono").value;
    let Correo= document.getElementById("Correo").value;    
    let Direccion= document.getElementById("Direccion").value;
    let Latitud= document.getElementById("Latitud").value;
    let Longitud= document.getElementById("Longitud").value;    
    let Estado= document.getElementById("EstadoU").value;
    
    if(Nombre.trim()=="" ||Correo.trim()==""||Telefono.trim()==""||NIT.trim()==""
    ||Correo.trim()==""|| Direccion.trim()==""||Latitud.trim()==""||Longitud.trim()==""
    )
    {
        return alert("Debe de ingresar todos los datos")
    }
    if(Telefono.length!=8 )
    {
        return alert("Debe de ingresar un número de teléfono válido");
    }
    if(Correo.search("@")==-1)
    {
        return alert("Ingrese un correo válido");
    }

    let transaction = { NIT,
        Nombres_cliente: Nombre,
        Apellido_cliente:Apellido,
        Telefono_cliente:Telefono,
        Correo_cliente:Correo,
        Direccion_cliente:Direccion,
        Coord1:Latitud,
        Coord2:Longitud,
        Estado_idEstado:Estado};
    let transactionJson = JSON.stringify(transaction);
  //  console.log(transactionJson)
   
    fetch(API_URL+'/cliente/'+item,{
    method: 'PATCH',
    body: transactionJson,
    'headers': {
          'Access-Control-Allow-Origin': '*',
        'Content-type':'application/json; charset=utf-8',
       'X-Powered-By':'Express'
          }
    })
    .then((response)=>{
        if(response.ok){
            alert("Cliente actualizado correctamente");
            sessionStorage.removeItem("secuencia");
            document.location.href='AdmClientes.html';
        }else{
            alert("Se tienen problemas de comunicación");
        }
    })
    .catch(error=>console.log(error))
}