const API_URL ='http://127.0.0.1:3000';

let url=API_URL+'/empleado';
fetch(url)
.then(response=>response.json())
.then(data=>MostrarData(data))
.catch(error=>console.log(error))

const MostrarData = (data)=>{
    //console.log(data);
    let body=``;
    for (let i=0; i<data.length; i++){
        //body+=`<option id="${data[i].idEmpleado}">${data[i].Nombre_empleado}</option>`
        body+=`<option value="${data[i].idEmpleado}">${data[i].Nombre_empleado}</option>`
    }
    document.getElementById('SEmpleados').innerHTML=body
}

let urlCliente=API_URL+'/cliente';
fetch(urlCliente)
.then(response=>response.json())
.then(data=>MostrarCliente(data))
.catch(error=>console.log(error))

const MostrarCliente = (data)=>{
 //   console.log(data);
    let cliente=``;
    for (let i=0; i<data.length; i++){
        cliente+=`<option value="${data[i].idCliente}">${data[i].nombres_cliente} ${data[i].apellido_cliente} </option>`
        
    }
    document.getElementById('SClientes').innerHTML=cliente
}


window.onload =function(){
    var CancelarVisita = document.getElementById("CancelarVisita");
    var Guardarvisita = document.getElementById("Guardarvisita");

    CancelarVisita.onclick=FCancelarVisita;
    Guardarvisita.onclick=FGuardarvisita;
}

function FCancelarVisita(){
    document.location.href='AdmVisitas.html';
}

function FGuardarvisita(){
    let Empleado = document.getElementById("SEmpleados").value;
    let Cliente = document.getElementById("SClientes").value;
    let Fecha= document.getElementById("calendario").value;
    let Descripcion= document.getElementById("DescVisita").value;
    if(Descripcion.length==0)
    {
        return alert("Debe de ingresar una descripción de visita");
    }
    if(Fecha.length==0)
    {
        return alert("Debe de ingresar una fecha válida");
    }
    ///convirtiendo a JSON
    let transaction = { idEmpleado: Empleado,idEstado_Visita:'1',idCliente:Cliente, Descripcion_visita:Descripcion, Resultado_visita:'Pendiente', Fecha_visita:Fecha};
    let transactionJson = JSON.stringify(transaction);
   // alert('Guardando dato '+Empleado+" cliente "+Cliente+" fecha "+Fecha+ " descripcion "+Descripcion);
    //alert(transactionJson);

    fetch(API_URL+'/visita',{
    method: 'Post',
    body: transactionJson,
    'mode': 'cors',
    'headers': {
      	'Access-Control-Allow-Origin': '*',
        'Content-type':'application/json; charset=utf-8',
       'X-Powered-By':'Express'
      	}
    })
    //.then(response=>response.json())
    .then((response)=>{
        if(response.ok){            
            alert("Visita ingresada correctamente");
            document.location.href='AdmVisitas.html';
        }else{
            alert("Se tienen problemas de comunicación");
        }
    })
    .catch(error=>console.log(error))



}

