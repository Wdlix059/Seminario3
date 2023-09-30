import { pool } from "../db.js"

export const getVisita =async (req,res)=>{
    try{
        //const [rows] = await pool.query('SELECT * FROM VISITA')
        const l1='SELECT v.IdVisita,concat(E.Nombre_empleado,E.Apellidos_empleado) Empleado,ev.Estado_Visita,'
        const l2='  concat( c.Nombres_cliente,c.Apellido_cliente) Cliente, v.Descripcion_visita,v.Resultado_visita,'
        const l3=' v.Fecha_visita FROM Visita v, Empleado E, Estado_Visita ev, Cliente c where v.idEmpleado =E.idEmpleado  '
        const l4=' and v.idEstado_Visita =ev.idEstado_Visita and v.idCliente =c.idCliente order by v.IdVisita asc'
        
        const [rows] = await pool.query(l1+l2+l3+l4);

        //const [rows] = await pool.query('SELECT V.IdVisita,concat(E.Nombre_empleado,\' \',E.Apellidos_empleado) Empleado,ev.Estado_Visita, concat( c.Nombres_cliente,\' \',c.Apellido_cliente) Cliente, v.Descripcion_visita,v.Resultado_visita,v.Fecha_visita FROM VISITA V, EMPLEADO E, estado_visita ev, cliente c where v.idEmpleado =e.idEmpleado and v.idEstado_Visita =ev.idEstado_Visita and v.idCliente =c.idCliente order by v.IdVisita asc')
        res.json(rows)
    }
    catch(error){
        return res.status(500).json({
            message: 'Se tienen problemas de comunicación'
        })
    }
}

export const getVisitaID = async(req,res)=>{
    try {
        //const [rows] = await pool.query('select * from visita where idVisita=?',[req.params.id])
        const l1='SELECT v.IdVisita,concat(E.Nombre_empleado,E.Apellidos_empleado) Empleado,ev.Estado_Visita,'
        const l2='  concat( c.Nombres_cliente,c.Apellido_cliente) Cliente, v.Descripcion_visita,v.Resultado_visita,'
        const l3=' v.Fecha_visita FROM Visita v, Empleado E, Estado_Visita ev, Cliente c where v.idEmpleado =E.idEmpleado  '
        const l4=' and v.idEstado_Visita =ev.idEstado_Visita and v.idCliente =c.idCliente '
        const l5=' and v.idVisita=? order by v.IdVisita asc'
        
        const [rows] = await pool.query(l1+l2+l3+l4+l5,[req.params.id] );


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

export const CrearVisita = async (req,res)=>{
    try {
        const {idEmpleado, idEstado_Visita, idCliente, Descripcion_visita, Resultado_visita, Fecha_visita}=req.body
        await pool.query('INSERT INTO Visita (idEmpleado,idEstado_Visita,idCliente,Descripcion_visita,Resultado_visita,Fecha_visita) VALUES (?,?,?,?,?,?)'
        ,[idEmpleado, idEstado_Visita, idCliente, Descripcion_visita, Resultado_visita, Fecha_visita])
        console.log(req.body)
        res.send('Satisfactorio')   
    } catch (error) {
        return res.status(500).json({
            message: 'Se tienen problemas de comunicación'
        })
    }
}

export const EliminarVisita = async (req,res)=>{
    try {
        const [result] = await pool.query('delete from Visita where idVisita=?',[req.params.id])
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

export const ActualizarVisita = async (req,res)=>{
    try {
        const idVisita = req.params.id
        const {idEmpleado, idEstado_Visita, idCliente, Descripcion_visita, Resultado_visita, Fecha_visita}=req.body
        console.log('idVisita'+ idVisita)            
        const [result]=await pool.query('UPDATE Visita SET idEmpleado=IFNULL(?,idEmpleado),idEstado_Visita=IFNULL(?,idEstado_Visita),idCliente=IFNULL(?,idCliente),Descripcion_visita=IFNULL(?,Descripcion_visita),Resultado_visita=IFNULL(?,Resultado_visita),Fecha_visita=IFNULL(?,Fecha_visita) WHERE IdVisita=?',
        [idEmpleado, idEstado_Visita, idCliente, Descripcion_visita, Resultado_visita, Fecha_visita,idVisita])
        console.log(result)
        if(result.affectedRows===0) return res.status(404).json({
            message:'No se actualizo el cliente'
        })
        const [rows]= await pool.query('SELECT * FROM Visita WHERE Idvisita=?',[idVisita])
        res.json(rows[0])        
    } catch (error) {
        return res.status(500).json({
            message: 'Se tienen problemas de comunicación'
        })
    }
}