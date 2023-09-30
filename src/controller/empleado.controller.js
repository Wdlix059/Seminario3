import { json } from "express";
import { pool } from "../db.js"

import bcrypt from 'bcryptjs';
import PDF from 'pdfkit'
import fs from 'fs'

import jwt from 'jsonwebtoken';

//import { encrypt, compare} from '../Helper/handleBcrypt'


export const getEmpleado = async(req,res)=>{
    try{        
        const [rows] = await pool.query('SELECT e.idEmpleado, e.Nombre_empleado, e.Apellidos_empleado,e.Correo_empleado, e.Telefono_empleado,p.Nombre_perfil,es.Nombre_estado,e.Empleado_idEmpleado FROM Empleado e,Perfil p, Estado es where e.Perfil_idPerfil =p.idPerfil and e.Estado_idEstado =es.idEstado order by e.idEmpleado asc ')
        res.json(rows)
    }
    catch(error){
        return res.status(500).json({
            message: 'Se tienen problemas de comunicación'
        })
    }
}

export const getEmpleadoID = async (req,res)=>{
    try {
        const [rows] = await pool.query('SELECT e.idEmpleado, e.Nombre_empleado, e.Apellidos_empleado,e.Correo_empleado, e.Telefono_empleado,p.Nombre_perfil,es.Nombre_estado,e.Empleado_idEmpleado FROM Empleado e,Perfil p, estado es where e.Perfil_idPerfil =p.idPerfil and e.Estado_idEstado =es.idEstado and e.idEmpleado=?',[req.params.id])
        if(rows.length<=0) return res.status(404).json({
            message:'No existe el empleado con ese código'
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Se tienen problemas de comunicación'
        })
    }    
}

export const CrearEmpleado = async (req,res)=>  {
    try {
        const {Nombre_empleado, Apellidos_empleado, Correo_empleado, Pass_empleado, Telefono_empleado, Perfil_idPerfil,Estado_idEstado}=req.body
       // console.log(req.body)
       // console.log(Nombre_empleado, Apellidos_empleado, Correo_empleado, Pass_empleado, Telefono_empleado, Perfil_idPerfil,Estado_idEstado)

        const [variable] = await pool.query('select 1 from Empleado where Correo_empleado=?',[Correo_empleado])
        //console.log(variable.length ,' +variable ',Correo_empleado)
        if(variable.length=='1') return res.status(500).json({
            message:'El usuario ya existe'
        })
        console.log('hash_pass')
        const hash_pass=bcrypt.hashSync(Pass_empleado,10);
        console.log(hash_pass)
        //Pass_empleado=hash_pass;
        //console.log(Pass_empleado);
       await pool.query('INSERT INTO Empleado (Nombre_empleado, Apellidos_empleado, Correo_empleado, Pass_empleado, Telefono_empleado, Perfil_idPerfil, Estado_idEstado, Empleado_idEmpleado) VALUES (?,?,?,?,?,?,?,?)'
       ,[Nombre_empleado, Apellidos_empleado, Correo_empleado, hash_pass, Telefono_empleado, Perfil_idPerfil,Estado_idEstado,1])
        console.log(req.body)
        //return res.status(200)
        res.send('Satisfactorio') 
    } catch (error) {
        return res.status(500).json({
            message: 'Se tienen problemas de comunicación'
        })
    }
}
export const ActualizarEmpleado =async (req,res)=>{
    try {
        const idEmpleado = req.params.id
        const {Nombre_empleado, Apellidos_empleado, Correo_empleado, Pass_empleado, Telefono_empleado, Perfil_idPerfil,Estado_idEstado,Empleado_idEmpleado}=req.body
        console.log('id_cliente'+ idEmpleado)            
        const [result]=await pool.query('UPDATE Empleado SET Nombre_empleado=IFNULL(?,Nombre_empleado),Apellidos_empleado=IFNULL(?,Apellidos_empleado),Correo_empleado=IFNULL(?,Correo_empleado),Pass_empleado=IFNULL(?,Pass_empleado),Telefono_empleado=IFNULL(?,Telefono_empleado),Perfil_idPerfil=IFNULL(?,Perfil_idPerfil),Estado_idEstado=IFNULL(?,Estado_idEstado),Empleado_idEmpleado=IFNULL(?,Empleado_idEmpleado) WHERE idEmpleado=?',
        [Nombre_empleado, Apellidos_empleado, Correo_empleado, Pass_empleado, Telefono_empleado, Perfil_idPerfil,Estado_idEstado,Empleado_idEmpleado,idEmpleado])
        console.log(result)
        if(result.affectedRows===0) return res.status(404).json({
            message:'No se actualizo el cliente'
        })
        const [rows]= await pool.query('SELECT e.idEmpleado, e.Nombre_empleado, e.Apellidos_empleado,e.Correo_empleado, e.Telefono_empleado,p.Nombre_perfil,es.Nombre_estado,e.Empleado_idEmpleado FROM Empleado e,Perfil p, Estado es where e.Perfil_idPerfil =p.idPerfil and e.Estado_idEstado =es.idEstado and e.idEmpleado=?',[idEmpleado])
        res.json(rows[0])        
    } catch (error) {
        return res.status(500).json({
            message: 'Se tienen problemas de comunicación'
        })
    }
}

export const EliminarEmpleado = async (req,res)=>{
    try {
        const [result] = await pool.query('delete from Empleado where idEmpleado=?',[req.params.id])
        if(result.affectedRows<=0) return res.status(404).json({
            message:'No existe el usuario'
        })
        res.sendStatus(204)    
    } catch (error) {
        return res.status(500).json({
            message: 'Se tienen problemas de comunicación'
        })
    }
}

export const BuscarPerfil = async (req,res)=>  {
    try {
        const {Correo_empleado, Pass_empleado}=req.body   
        console.log(Correo_empleado,'        ',Pass_empleado);
        
        const [variable] = await pool.query('select Pass_empleado,Perfil_idPerfil,Correo_empleado from Empleado where Correo_empleado=? ',[Correo_empleado])
        console.log(variable[0]);
        const perfil = variable[0].Perfil_idPerfil;

        console.log(variable.length ,' +variable ',Correo_empleado,' ** ')
        if(bcrypt.compareSync(Pass_empleado, variable[0].Pass_empleado))
        {            
            return res.status(200).json({perfil,Correo_empleado})
            /*jwt.sign({Correo_empleado},'secreto',(err,token)=>{
                res.json({
                    token
                })
            })*/
        }
        
        return res.status(500).json({
            message:'El usuario y password ingresados de forma incorrecta'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Se tienen problemas de comunicación'
        })
    }
}

export const getEmpleadoReporte = async (req,res)=>{
    try{      
        const [rows] = await pool.query('SELECT e.idEmpleado, e.Nombre_empleado, e.Apellidos_empleado,e.Correo_empleado, e.Telefono_empleado,p.Nombre_perfil,es.Nombre_estado,e.Empleado_idEmpleado FROM Empleado e,Perfil p, Estado es where e.Perfil_idPerfil =p.idPerfil and e.Estado_idEstado =es.idEstado order by e.idEmpleado asc ')
        const html_={};
        let registro=[];

        var doc=new PDF({size:'A3'});
        doc.pipe(fs.createWriteStream('Empleado.pdf'));
        doc.fillColor('red')
        .fontSize(25)
        .text('Listado de empleados',{
            align:'center'
        })
        //.moveDown();

        doc.fillColor('blue')
        .fontSize(12)
        .text('ID',70,100)//,50,0)
        .text('NOMBRES',100,100)        
        .text('APELLIDOS',220,100)
        .text('CORREO',320,100)
        .text('TELEFONO',470,100)
        .text('PERFIL',570,100)
        .text('ESTADO',670,100)
        //.text('JEFE',720,100);
        let contador='1'
        for(let i=0; i<rows.length; i++){
            html_.id=rows[i].idEmpleado;
            html_.Nombre_empleado=rows[i].Nombre_empleado;
            html_.Apellidos_empleado=rows[i].Apellidos_empleado;
            html_.Correo_empleado=rows[i].Correo_empleado
            html_.Telefono_empleado=rows[i].Telefono_empleado
            html_.Nombre_perfil=rows[i].Nombre_perfil
            html_.Nombre_estado=rows[i].Nombre_estado
            doc.fillColor('black')
            .fontSize(10)            
            .text(html_.id,70,120+20*i)            
            .text(html_.Nombre_empleado,100,120+20*i)
            .text(html_.Apellidos_empleado,220,120+20*i)
            .text(html_.Correo_empleado,320,120+20*i)
            .text(html_.Telefono_empleado,470,120+20*i)
            .text(html_.Nombre_perfil,570,120+20*i)
            .text(html_.Nombre_estado,670,120+20*i)
            //.text(html_.estado,720,120+20*i)
            .moveDown();
            contador++;            
        }
        doc.end();
        console.log("pdf_genrado");
        res.send(html_)
    }
    catch(error){
        return res.status(500).json({
            message: 'Se tienen problemas de comunicación'
        })
    }


}
