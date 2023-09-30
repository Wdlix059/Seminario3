//const bcrypt = require('bcrypjs')
import bcrypt from 'bcryptjs';

export const encrypt = async (Clave)=>{
    const hash = await bcrypt.hash(Clave,10)
    return hash
}

export const compare = async (Clave2, hashClave)=>{
    return await bcrypt.compare(Clave2, hashClave)
}

module.exports = {encrypt, compare}