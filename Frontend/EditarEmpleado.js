    const API_URL ='http://127.0.0.1:3000';

    const item =sessionStorage.getItem("secuencia")

    let url=API_URL+'/empleado'
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



    const urlEmpleado= API_URL+'/empleado/'+item;    
    fetch(urlEmpleado)
    .then(response=>response.json())
    .then(data=>MostrarEmpleado(data))
    .catch(error=>console.log(error))

    const MostrarEmpleado = (data)=>{
  //  console.log("data "+ data);
    
    document.getElementById("NEmpleado").setAttribute("value",data.Nombre_empleado)
    document.getElementById('Apellido').setAttribute("value",data.Apellidos_empleado)
    document.getElementById("Correo").setAttribute("value",data.Correo_empleado)
    document.getElementById("Telefono").setAttribute("value",data.Telefono_empleado)
    }

    window.onload =function(){
        var CancelarVisita = document.getElementById("CancelarVisita");
        var ActualizarVisita = document.getElementById("Guardarvisita");
    
        CancelarVisita.onclick=FCancelarVisita;
        ActualizarVisita.onclick=FActualizarVisita;
    }
    function FCancelarVisita(){
        sessionStorage.removeItem("secuencia");
        document.location.href='AdmEmpleado.html';
    }
    
    function FActualizarVisita(){
        const nombre= document.getElementById("NEmpleado").value;
        const Apellido= document.getElementById("Apellido").value;
        const Correo= document.getElementById("Correo").value;
        const Telefono= document.getElementById("Telefono").value;    
        const Perfil= document.getElementById("Perfil").value;
        const EstadoU= document.getElementById("EstadoU").value;
        const Jefe= document.getElementById("Jefe").value;

        if(nombre.trim()=="" || Apellido.trim()==""||Correo.trim()==""||Telefono.trim()=="")
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

        const transaction = { Nombre_empleado: nombre,Apellidos_empleado:Apellido,Correo_empleado:Correo,
             Telefono_empleado:Telefono,Perfil_idPerfil:Perfil,Estado_idEstado:EstadoU,Empleado_idEmpleado:Jefe};
        const transactionJson = JSON.stringify(transaction);        
        fetch(API_URL+'/empleado/'+item,{
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
                alert("Empleado actualizado correctamente");
                sessionStorage.removeItem("secuencia");
                document.location.href='AdmEmpleado.html';
            }else{
                alert("Se tienen problemas de comunicación");
            }
        })
        .catch(error=>console.log(error))
    }