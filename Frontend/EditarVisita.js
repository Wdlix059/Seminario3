const API_URL ='http://127.0.0.1:3000';

    const item =sessionStorage.getItem("secuencia")
    
    let url=API_URL+'/visita/'+item;
    //console.log(url)
    fetch(url)
    .then(response=>response.json())
   // .then(data=>console.log(data))
    .then(data=>MostrarData(data))
    .catch(error=>console.log(error))

    const MostrarData = (data)=>{
    //console.log(data);
    
    document.getElementById("NEmpleado").setAttribute("value",data.Empleado)
    document.getElementById('NClientes').setAttribute("value",data.Cliente)
    document.getElementById("calendario").setAttribute("value",data.Fecha_visita)
    document.getElementById("DescVisita").setAttribute("value",data.Descripcion_visita)
    document.getElementById("ResVisita").setAttribute("value",data.Resultado_visita)
    }


window.onload =function(){
    var CancelarVisita = document.getElementById("CancelarVisita");
    var ActualizarVisita = document.getElementById("Guardarvisita");

    CancelarVisita.onclick=FCancelarVisita;
    ActualizarVisita.onclick=FActualizarVisita;
}
function FCancelarVisita(){
    sessionStorage.removeItem("secuencia");
    document.location.href='AdmVisitas.html';
}

function FActualizarVisita(){
    let EstadoVisita = document.getElementById("EVisita").value;    
    let Fecha= document.getElementById("calendario").value;
    let Descripcion= document.getElementById("DescVisita").value;
    let Resultado= document.getElementById("ResVisita").value;
    if(Descripcion.length==0)
    {
        return alert("Debe de ingresar una descripción de visita");
    }
    if(Fecha.length==0)
    {
        return alert("Debe de ingresar una fecha válida");
    }
    ///convirtiendo a JSON
    let transaction = { idEstado_Visita:EstadoVisita, Descripcion_visita:Descripcion, Resultado_visita:Resultado, Fecha_visita:Fecha};
    let transactionJson = JSON.stringify(transaction);
    //console.log(transactionJson);

    fetch(API_URL+'/visita/'+item,{
    method: 'PATCH',
    body: transactionJson,
    //'mode': 'cors',
    'headers': {
      	'Access-Control-Allow-Origin': '*',
        'Content-type':'application/json; charset=utf-8',
       'X-Powered-By':'Express'
      	}
    })
    //.then(response=>response.json())
    .then((response)=>{
        if(response.ok){            
            alert("Visita actualizada correctamente");
            sessionStorage.removeItem("secuencia");
            document.location.href='AdmVisitas.html';
        }else{
            alert("Se tienen problemas de comunicación");
        }
    })
    .catch(error=>console.log(error))
}