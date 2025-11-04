import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './style.css'
import mazebank from "./Maze_Bank_Logo.png"
function Usuario(){
const [users, setUsers] = useState("");
const {id}=useParams();
const [nombre,setNombre]=useState("");
const [email,setEmail]=useState("");
const [telefono,setNumero]=useState("");
const [contraseña,setContraseña]=useState("");
const navigate=useNavigate();



useEffect(() => {
axios.get(`http://localhost:5001/api/usuarios/${id}`)
.then(res => setUsers(res.data))
.catch(err => console.error(err));
}, );

const editarusuarios=()=>{
    setNombre(users.nombre);
    setEmail(users.email);
    setNumero(users.telefono);
    setContraseña(users.contraseña);
}
const vaciar=()=>{
    setNombre("");
    setEmail("");
    setNumero("");
    setContraseña("");
}
const actualizar=()=>{   
    const confirmar=window.confirm("¿Está seguro en actuaizar sus datos?");
    if(confirmar){
    axios.put(`http://localhost:5001/api/usuarios/actualizar/${id}`,{
    telefono:telefono,
    nombre:nombre,
    email:email,
    contraseña:contraseña      
    })
    .then(res=>{
        console.log(res);
        alert("informacion actualizada");
        vaciar();
    })
    .catch(err=>{
       const status=err.response.status;
        if(status==400){
            alert("No se encontraron datos");
        }
    })    
    }else{
        vaciar();
    }
    }
    

    const eliminar= ()=>{  
    const confirmar=window.confirm("¿Está seguro que quieres borrar tu cuenta??");
    if(confirmar){
        axios.delete(`http://localhost:5001/api/usuarios/eliminar/${id}`)
    .then(res=>{
        console.log(res);
        alert("Se ha eliminado el usuario correctamente");
        navigate("/login");
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
                    navigate("/login")
                }
            }}>Cerrar Cesion</button>
            <div className="Infousuario">
            <h1>Detalles perfil</h1>
            <h2>Nombre: {users.nombre}</h2>
            <h2>Email: {users.email}</h2>
            <h2>Telefono: {users.telefono}</h2>
            <button onClick={editarusuarios} type="button" className="btn btn-outline-primary">Editar</button>
            <button onClick={eliminar} type="button" className="btn btn-outline-danger">Eliminar</button>
            </div>
             <div className="usuarioss">
                <div className="card text-bg-dark">
  <h5 className="card-header">Edición de Perfil</h5>
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
        
        
    )
}
export default Usuario;