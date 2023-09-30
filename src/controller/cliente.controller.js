import { json } from "express";
import { pool } from "../db.js"

import bcrypt from 'bcryptjs';
import PDF from 'pdfkit'
import fs from 'fs'



export const getCliente = async (req,res)=>{
    try{
        const [rows] = await pool.query('select c.idCliente,c.NIT,c.nombres_cliente,c.apellido_cliente,c.Telefono_cliente,c.Correo_cliente,c.direccion_cliente,c.coord1,c.coord2,e.nombre_estado from Cliente c, Estado e where c.estado_idEstado=e.idEstado')
        res.json(rows)
    }
    catch(error){
        return res.status(500).json({
            message: 'Se tienen problemas de comunicación'
        })
    }
}

export const getClienteID = async (req,res)=>{
    try {
        const [rows] = await pool.query('select c.idCliente,c.NIT,c.nombres_cliente,c.apellido_cliente,c.Telefono_cliente,c.Correo_cliente,c.direccion_cliente,c.coord1,c.coord2,e.nombre_estado from Cliente c, Estado e where c.estado_idEstado=e.idEstado and idCliente=?',[req.params.id])
        if(rows.length<=0) return res.status(404).json({
            message:'No existe el usuario'
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Se tienen problemas de comunicación'
        })
    }    
}

export const CrearCliente = async (req,res)=>{
    try {
        const {NIT,Nombres_cliente,Apellido_cliente,Telefono_cliente,Correo_cliente,Pass_cliente,Direccion_cliente,Coord1,Coord2,Estado_idEstado}=req.body        
        //verificando que el usuario no exista en base de datos
        const [variable] = await pool.query('select 1 from Cliente where Correo_cliente=?',[Correo_cliente]);
        
        if(variable.length=='1') return res.status(500).json({
            message:'El cliente ya existe'
        })
        //cifrando la clave
        const hash_pass=bcrypt.hashSync(Pass_cliente,10);        
        //realizando el insert
        await pool.query('INSERT INTO Cliente (NIT,Nombres_cliente,Apellido_cliente,Telefono_cliente,Correo_cliente,Pass_cliente,Direccion_cliente,Coord1,Coord2,Estado_idEstado) VALUES (?,?,?,?,?,?,?,?,?,?)'
        ,[NIT,Nombres_cliente,Apellido_cliente,Telefono_cliente,Correo_cliente,hash_pass,Direccion_cliente,Coord1,Coord2,Estado_idEstado])
        console.log(req.body)
        res.send('Satisfactorio')   
    } catch (error) {
        return res.status(500).json({
            message: 'Se tienen problemas de comunicación'
        })
    }    
}

export const EliminarCliente = async (req,res)=>{
    try {
        const [result] = await pool.query('delete from Cliente where idCliente=?',[req.params.id])
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

export const ActualizarCliente = async (req,res)=>{
    try {
        const idCliente = req.params.id
        const {NIT,Nombres_cliente,Apellido_cliente,Telefono_cliente,Correo_cliente,Pass_cliente,Direccion_cliente,Coord1,Coord2,Estado_idEstado}=req.body
        console.log('id_cliente'+ idCliente)     
        console.log(NIT,Nombres_cliente,Apellido_cliente,Telefono_cliente,Correo_cliente,Pass_cliente,Direccion_cliente,Coord1,Coord2,Estado_idEstado)       
        const [result]=await pool.query('UPDATE Cliente SET NIT=IFNULL(?,NIT),Nombres_cliente=IFNULL(?,Nombres_cliente),Apellido_cliente=IFNULL(?,Apellido_cliente),Telefono_cliente=IFNULL(?,Telefono_cliente),Correo_cliente=IFNULL(?,Correo_cliente),Pass_cliente=IFNULL(?,Pass_cliente),Direccion_cliente=IFNULL(?,Direccion_cliente),Coord1=IFNULL(?,Coord1),Coord2=IFNULL(?,Coord2),Estado_idEstado=IFNULL(?,Estado_idEstado) WHERE IdCliente=?',
        [NIT,Nombres_cliente,Apellido_cliente,Telefono_cliente,Correo_cliente,Pass_cliente,Direccion_cliente,Coord1,Coord2,Estado_idEstado,idCliente])
        console.log(result)
        if(result.affectedRows===0) return res.status(404).json({
            message:'No se actualizo el cliente'
        })
        const [rows]= await pool.query('select c.idCliente,c.NIT,c.Nombres_cliente,c.Apellido_cliente,c.Telefono_cliente,c.Correo_cliente,c.Direccion_cliente,c.Coord1,c.Coord2,e.Nombre_estado from Cliente c, estado e where c.estado_idEstado=e.idEstado and idCliente=?',[idCliente])
        res.json(rows[0])        
    } catch (error) {
        return res.status(500).json({
            message: 'Se tienen problemas de comunicación'
        })
    }
}


export const getClienteReporte = async (req,res)=>{
    try{      
        const [rows] = await pool.query('select c.idCliente,c.NIT,c.nombres_cliente,c.apellido_cliente,c.Telefono_cliente,c.Correo_cliente,c.direccion_cliente,c.coord1,c.coord2,e.nombre_estado from Cliente c, estado e where c.estado_idEstado=e.idEstado')
        const html_={};
        let registro=[];

        var doc=new PDF({size:'A3'});
        doc.pipe(fs.createWriteStream('cliente.pdf'));
        doc.fillColor('red')
        .fontSize(25)
        .text('Listado de clientes',{
            align:'center'
        })
        //.moveDown();

        doc.fillColor('blue')
        .fontSize(12)
        .text('ID',70,100)//,50,0)
        .text('NIT',100,100)        
        .text('NOMBRES',150,100)
        .text('APELLIDOS',250,100)
        .text('TELEFONO',350,100)
        .text('CORREO',450,100)
        .text('DIRECCION',550,100)
        .text('ESTADO',720,100);
        let contador='1'
        for(let i=0; i<rows.length; i++){
            //console.log(rows[i].nombres_cliente)
            html_.id=rows[i].idCliente;
            html_.NIT=rows[i].NIT;
            html_.nombres_cliente=rows[i].nombres_cliente;
            html_.apellido_cliente=rows[i].apellido_cliente

            html_.telefono=rows[i].Telefono_cliente
            html_.correo=rows[i].Correo_cliente
            html_.direccion=rows[i].direccion_cliente
            html_.estado=rows[i].nombre_estado

            registro=[html_.id, html_.NIT,html_.nombres_cliente,html_.apellido_cliente,html_.telefono,html_.correo,html_.direccion,html_.estado];
                        
            doc.fillColor('black')
            .fontSize(10)            
            .text(html_.id,70,120+20*i)            
            .text(html_.NIT,100,120+20*i)
            .text(html_.nombres_cliente,150,120+20*i)
            .text(html_.apellido_cliente,250,120+20*i)
            .text(html_.telefono,350,120+20*i)
            .text(html_.correo,430,120+20*i)
            .text(html_.direccion,550,120+20*i)
            .text(html_.estado,720,120+20*i)
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

