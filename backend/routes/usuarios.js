const express = require('express');
const router = express.Router();
const db = require('../config/database');
router.get('/', (req, res) => {
const query = 'SELECT * FROM usuarios ORDER BY id DESC';

db.query(query, (err, results) => {
if (err) {
console.error('Error al obtener usuarios:', err);
return res.status(500).json({
error: 'Error al obtener usuarios',
details: err.message
});
}
res.json(results);
});
});
router.post('/',(req,res)=>{
    const nombre=req.body.nombre;
    const email=req.body.email;
    const telefono=req.body.telefono;
    const contraseña=req.body.contraseña;
    if(!nombre||!email||!telefono||!contraseña){
        return res.status(400).json({
            error:'Todos los campos son obligatorios'
        });
    }
    const query='INSERT INTO usuarios(nombre,email,telefono,contraseña)VALUES (?,?,?,?)'

    db.query(query,[nombre,email,telefono,contraseña],(err,results) => {
        if(err){
            console.error('Errro al registrarse: ',err);
            return res.status(500).json({
        error: 'Error al registrarse',
        details: err.message
});
        }else{
            console.log('registro con existo')
            res.status(201).json({
            message:'Registro exitoso'
            })
        }
    })
})

router.post('/login',(req,res)=>{
    const email=req.body.email;
    const contraseña=req.body.contraseña;
    if(!contraseña||!email){
        return res.status(400).json({
            error:'Todos los campos son obligatorios'
        })
    }
    const query='SELECT id,nombre, tipo FROM usuarios WHERE email=? AND contraseña=?'
    db.query(query,[email,contraseña],(err,results)=>{
        if(err){
            console.log('Error al inciar sesión',err);
            return res.status(500).json({
            error: 'Error al obtener usuarios',
            details: err.message
        });
        }
        if(results.length===0){
            return res.status(401).json({
                error:'Usuario no registrado'
            })
        }else{
            const usuario = results[0];
            console.log('Inicio de sesión exitoso');
            res.status(201).json({
                message:'inicio de sesion exitoso',
                usuario: {
                tipo:usuario.tipo,
                id:usuario.id

            }
            })
        }

    })

})
router.get('/:id',(req,res)=>{
    const id=req.params.id;
    const query='SELECT nombre, email,telefono,contraseña FROM usuarios WHERE id=?'
    db.query(query,[id],(err, results) => {
    if (err) {
    console.error('Error al obtener usuarios:', err);
    return res.status(500).json({
    error: 'Error al obtener informacion del usuario',
    details: err.message
});
}
res.json(results[0]);
});
})

router.put('/actualizar/:id',(req,res)=>{
    const id=req.params.id;
    const nombre=req.body.nombre;
    const email=req.body.email;
    const telefono=req.body.telefono;
    const contraseña=req.body.contraseña;
    if(!nombre||!email||!telefono||!contraseña){
        return res.status(400).json({
            error:'Todos los campos son obligatorios'
        });
    }
    const query='UPDATE usuarios SET nombre=?,email=?,telefono=?,contraseña=? WHERE id=?'

    db.query(query,[nombre,email,telefono,contraseña,id],(err,results) => {
        if(err){
            console.error('Errro al registrarse: ',err);
            return res.status(500).json({
        error: 'Error al actualizar datos',
        details: err.message
});
        }else{
            res.status(200).json({
                message:'actualizacion exitosa'
            })
        }
    })
})

router.delete('/eliminar/:id',(req,res)=>{
    const id=req.params.id;
    const query='DELETE FROM usuarios WHERE id=?'
    db.query(query,[id],(err, results) => {
if (err) {
console.error('Error al eliminar usuarios:', err);
return res.status(500).json({
error: 'Error al eliminar',
details: err.message
});
}
res.status(200).json({
    message:'Eliminado exitosamente'
})
});
})

module.exports = router;