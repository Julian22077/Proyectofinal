import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css'
import mazebank from "./Maze_Bank_Logo.png"

function UserList() {
const [users, setUsers] = useState([]);
const [nombre,setNombre]=useState("");
const [email,setEmail]=useState("");
const [telefono,setNumero]=useState("");
const [contraseña,setContraseña]=useState("");
const [id,setID]=useState(0);
const navigate=useNavigate();

useEffect(() => {
axios.get('http://localhost:5001/api/usuarios')
.then(res => setUsers(res.data))
.catch(err => console.error(err));
},);

const editarusuarios=(u)=>{
    setNombre(u.nombre);
    setEmail(u.email);
    setNumero(u.telefono);
    setContraseña(u.contraseña);
    setID(u.id);

}
const vaciar=()=>{
    setNombre("");
    setEmail("");
    setNumero("");
    setContraseña("");
    setID(0);
}

const actualizar=()=>{   
    const confirmar = window.confirm(`¿Seguro que deseas actualizar los datos de ${nombre}?`);
    if(confirmar){
    axios.put(`http://localhost:5001/api/usuarios/actualizar/${id}`,{
    telefono:telefono,
    nombre:nombre,
    email:email,
    contraseña:contraseña      
    })
    .then(res=>{
        console.log(res);
        alert(`informacion de ${nombre} actualizada`);
        vaciar();
    })
    .catch(err=>{
        const status=err.response.status;
        if(status==400){
            alert("No se encontraron datos, seleccione el usuario a actualizar");
        }
    })    
    }else{
        vaciar();
    }
    }
    const eliminar= (u)=>{     
    const confirmar = window.confirm(`¿Seguro que deseas eliminar a ${u.nombre}?`);
    if(confirmar){
        axios.delete(`http://localhost:5001/api/usuarios/eliminar/${u.id}`)
    .then(res=>{
        console.log(res);
        alert(`${u.nombre} eliminado correctamente`);
        
    })
    .catch(err=>{
        console.log(err);
    })      
    }
    }
    


return (
<div style={{ padding: "20px" }}>
<div className="Contenedor-Logoo">
<img  className="Logoo" src={mazebank}/>
</div>
<button type="button" className="btn" style={{color:"white"}} onClick={()=>{
const confirmar=window.confirm("¿Estas seguro que quieres cerra la sesión?")
if(confirmar){
    navigate("/login");
}
 }}>Cerrar Cesion</button>       
<h2 style={{color:"white", justifyContent: "center"}}>Lista de usuarios</h2>
<table className="table table-dark table-hover">
<thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Email</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    
   

{users.map(u => (
<tr key={u.id}>
<th scope="row">{u.id}</th>
<td>{u.nombre}</td>
<td>{u.email}</td>
<td>
<button onClick={()=>editarusuarios(u)} type="button" className="btn btn-outline-primary">Editar</button>
<button onClick={()=>eliminar(u)} type="button" className="btn btn-outline-danger">Eliminar</button>
</td>
</tr>
))}
</tbody>
</table>
  <div className="usuarioss">
       <div className="card text-bg-dark">
  <h5 className="card-header">Gestión de usuarios</h5>
  <div className="card-body">
    <div className="form-floating mb-3">
        <input  onChange={(e)=>{
                setNombre(e.target.value)
            }} value={nombre} type="text" className="form-control bg-dark text-white" id="floatingNombre"/>
        <label htmlFor="floatingNombre" className="text-white">Nombre</label>
        </div>
         <div className="form-floating mb-3">
        <input  onChange={(e)=>{
                setEmail(e.target.value)
            }} value={email} type="email" className="form-control bg-dark text-white" id="floatingEmail"/>
        <label htmlFor="floatingEmail" className="text-white">Email</label>
        </div>
         <div className="form-floating mb-3">
        <input  onChange={(e)=>{
                setNumero(e.target.value)
            }} value={telefono} type="text" className="form-control bg-dark text-white" id="floatingTelefono"/>
        <label htmlFor="floatingTelefono" className="text-white">Telefono</label>
        </div>
         <div className="form-floating mb-3">
        <input  onChange={(e)=>{
                setContraseña(e.target.value)
            }} value={contraseña} type="password" className="form-control bg-dark text-white" id="floatingpassword"/>
        <label htmlFor="floatingpassword" className="text-white">Contraseña</label>
        </div>
         <button onClick={actualizar} type="button" className="btn btn-outline-secondary">Actualizar</button>
  </div>
</div>
    </div>
</div>
);
}

export default UserList;