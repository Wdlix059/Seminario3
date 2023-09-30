const API_URL ='http://127.0.0.1:3000';

    let url=API_URL+'/empleado';
    fetch(url)
    .then(response=>response.json())
    .then(data=>MostrarData(data))
    .catch(error=>console.log(error))

    const MostrarData = (data)=>{
     //   console.log(data);
        let body=``;
        for (let i=0; i<data.length; i++){
            body+=`<option value=${data[i].idEmpleado}>${data[i].Nombre_perfil}-${data[i].Nombre_empleado} ${data[i].Apellidos_empleado}</option>`
        }
        document.getElementById('Jefe').innerHTML=body
    }


window.onload =function(){
    var CancelarOperacion = document.getElementById("CancelarOperacion");
    var GuardarEmpleado = document.getElementById("GuardarEmpleado");

    CancelarOperacion.onclick=FCancelarOperacion;
    GuardarEmpleado.onclick=FGuardarEmpleado;
}

function FCancelarOperacion(){
    document.location.href='AdmEmpleado.html';
}

function FGuardarEmpleado(){
    let Nombre = document.getElementById("Nombre").value;
    let Apellido = document.getElementById("Apellido").value;
    let Password= document.getElementById("Password").value;
    let Correo= document.getElementById("Correo").value;
    let Telefono= document.getElementById("Telefono").value;
    let Perfil= document.getElementById("Perfil").value;
    let Estado= document.getElementById("EstadoU").value;
    let Jefe=document.getElementById("Jefe").value;
    if(Nombre.trim()=="" || Apellido.trim()==""||Password.trim()==""
    ||Correo.trim()==""||Telefono.trim()=="")
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

    let transaction = { Nombre_empleado: Nombre,Apellidos_empleado:Apellido,Correo_empleado:Correo,Pass_empleado:Password,
         Telefono_empleado:Telefono,Perfil_idPerfil:Perfil,Estado_idEstado:Estado,Empleado_idEmpleado:Jefe};
    let transactionJson = JSON.stringify(transaction);
    //alert(transactionJson);

    fetch(API_URL+'/empleado',{
    method: 'Post',
    body: transactionJson,
    'mode': 'cors',
    'headers': {
      	'Access-Control-Allow-Origin': '*',
        'Content-type':'application/json; charset=utf-8',
       'X-Powered-By':'Express'
      	}
    })
    //.then(response=>response.json())//con esta linea ya no toma el contenido de abajo y no redirecciona
    .then((response)=>{
    //    console.log(response)
        if(response.ok){            
            //alert("Empleado adicionado correctamente");
            document.location.href='AdmEmpleado.html';
        }else {
            alert("Se tienen problemas de comunicación o el usuario ya existe");
        }
    })
    .catch(error=>console.log(error))
}