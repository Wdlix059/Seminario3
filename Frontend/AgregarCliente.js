const API_URL ='http://127.0.0.1:3000';


window.onload =function(){
    var administrador = document.getElementById("CancelarOperacion");
    var AgregarCliente = document.getElementById("GuardarCliente");
    //alert("aqui adsa");
    administrador.onclick=Fadministrador;

    AgregarCliente.onclick=FAgregarCliente;
}

function Fadministrador(){
    document.location.href='AdmClientes.html';
}

function FAgregarCliente(){
    let NIT = document.getElementById("NIT").value;
    let Nombre = document.getElementById("Nombre").value;
    let Apellido = document.getElementById("Apellido").value;
    let Telefono= document.getElementById("Telefono").value;
    let Correo= document.getElementById("Correo").value;
    let Password= document.getElementById("Password").value;
    let Direccion= document.getElementById("Direccion").value;
    let Latitud= document.getElementById("Latitud").value;
    let Longitud= document.getElementById("Longitud").value;    
    let Estado= document.getElementById("EstadoU").value;
    

    if(Nombre.trim()=="" ||Correo.trim()==""||Telefono.trim()==""||NIT.trim()==""
    ||Correo.trim()==""|| Direccion.trim()==""||Latitud.trim()==""||Longitud.trim()==""||Password.trim()==""
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
        Pass_cliente:Password,
        Direccion_cliente:Direccion,
        Coord1:Latitud,
        Coord2:Longitud,
        Estado_idEstado:Estado};
    let transactionJson = JSON.stringify(transaction);
    //alert(transactionJson);

    fetch(API_URL+'/Cliente',{
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
     //   console.log(response)
        if(response.ok){            
            //alert("Empleado adicionado correctamente");
            document.location.href='AdmClientes.html';
        }else {
            alert("Se tienen problemas de comunicación o el cliente ya existe");
        }
    })
    .catch(error=>console.log(error))

}