//import { json } from "express";

//import { response } from "express";


const API_URL ='http://127.0.0.1:3000';



const forElement = document.getElementById("saveTransaction");
forElement.addEventListener("submit",(event)=>{
    event.preventDefault();

    let Correo_empleado = document.getElementById("Correo_empleado").value;
    let Pass_empleado = document.getElementById("Pass_empleado").value;
    let transaction = { Correo_empleado: Correo_empleado,Pass_empleado:Pass_empleado };
    let transactionJson = JSON.stringify(transaction);
    //console.log(transaction);
    //console.log(transactionJson);
    //mandar los datos al backend
   fetch('http://localhost:3000/login',{
    method: 'Post',
    body: transactionJson,
    'mode': 'cors',
    'headers': {
      	'Access-Control-Allow-Origin': '*',
        'Content-type':'application/json; charset=utf-8',
       'X-Powered-By':'Express'
      	}
    })
    //.then ((response)=>response.json() )
    .then ((response)=>{
        if(response.ok){
            return response.json();
        }else{
            alert("Ha ingresado mal sus credenciales")
            //document.location.href='login2.html'
            //return console.log("error de credenciales")
        }
    })
    .then(function(response) {
        console.log(response.Correo_empleado);//[0].pefil);
        console.log(response.perfil);
        const perfilValidado=response.perfil;
        sessionStorage.setItem("correo",response.Correo_empleado);
        sessionStorage.setItem("Pefil",response.perfil);

        window.open("Frontend/administrador.html")
        this.close();

        /*    
        if (perfilValidado==1)//es administrador
        {
            //direccionar a la pagina de admin
            console.log("administrador");
            //location.href="administrador.html";
            //location.assign("administrador.html");
            window.open("administrador.html")
            this.close();
            //document.location.href="administrador.html";
        }
        else if (perfilValidado==2)//es supervisor
        {
            window.open("administrador.html")
            this.close();
            console.log("supervisor");
        }
        else if (perfilValidado==3)//es usuario
        {
            window.open("administrador.html")
            this.close();
            console.log("usuario");
        }
        else{
           // document.location.href='login.html'
        }*/
        //console.log(response.ok);
        /*if(response.ok) {
            return "hola";//response.text()
        } else {
            throw "Error en la llamada Ajax";
        }*/
     
     })     
     .catch(function(err) {
        console.log(err);
     });
});


/*
fetch('http://127.0.0.1:3000/empleado')
.then((response)=>response.json())
.then((empleado)=>{
    //const tpl= empleado.map(emp=>'<li>${emp.Nombre_empleado}  ${emp.Apellidos_empleado}</li>')
    console.log(empleado);
});
*/
//.then(console.log(empleado))
//.then(x=>x.json())
//console.log(x);
//.then(console.log)
