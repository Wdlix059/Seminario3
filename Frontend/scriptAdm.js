
    let cliente=``;
    if(sessionStorage.getItem("Pefil")==2)
    {
        document.getElementById("AdmEmpleados").style.display = "none";
    }else if(sessionStorage.getItem("Pefil")==3)
    {
        document.getElementById("AdmEmpleados").style.display = "none";
        document.getElementById("AdmClientes").style.display = "none";
    }

function AdmVisita(){    
    document.location.href='AdmVisitas.html';    
}

function AdmEmpleados(){
    //alert("Empleados ");
    //window.location="";
    document.location.href='AdmEmpleado.html';
    
}

function AdmClientes(){
    //alert("clientes ");
    document.location.href='AdmClientes.html';
}

function AdmReportes(){
    //alert("clientes ");
    document.location.href='AdmReportes.html';
}

function CerrarSesion(){
    sessionStorage.removeItem("Pefil");
    sessionStorage.removeItem("correo");    
    //document.location.href='login.html';
    
    //browser.history.deleteAll();
    //console.log(window.onload);
    //console.log(
        //window.open(location,'_self','')
        window.close();
    //window.close();
}

window.onload =function(){    
    var btCerrarSesion=document.getElementById("CerrarSesion");
    var btnVisita = document.getElementById("btnAdmVisita");
    var btnEmpleado = document.getElementById("AdmEmpleados");
    var btnCliente=document.getElementById("AdmClientes");
    //var btnReportes=document.getElementById("AdmReportes");
    

    
    btnVisita.onclick=AdmVisita;
    btnEmpleado.onclick=AdmEmpleados;
    btnCliente.onclick=AdmClientes;
    //btnReportes.onclick=AdmReportes;
    btCerrarSesion.onclick=CerrarSesion;

}
/*AdmVisita.addEventListener("submit",(event)=>{
    event.preventDefault();
    console.log("aqui estoy");
});*/

/*
const AdmEmpleados = document.getElementById("AdmEmpleados");
AdmVisita.addEventListener("submit",(event)=>{
    event.preventDefault();
    console.log("aqui estoy AdmEmpleados");
});
*/


