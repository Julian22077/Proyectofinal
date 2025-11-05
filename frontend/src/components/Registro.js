import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './style.css'
import mazebank from "./Maze_Bank_Logo.png"

function Registro(){
const [nombre,setNombre]=useState("");
const [email,setEmail]=useState("");
const [telefono,setNumero]=useState("");
const [contraseña,setContraseña]=useState("");
const[alerta,setAlerta]=useState(false);
const[mensaje,setMensaje]=useState("");
const navigate=useNavigate();

    const registrarse=()=>{
        axios.post('http://localhost:5001/api/usuarios',{
        telefono:telefono,
        nombre:nombre,
        email:email,
        contraseña:contraseña
        })
        .then(res=>{
            console.log(res);
            navigate("/login");
        })
        .catch(err=>{
            const status=err.response.status;
            if(status==400){
                setAlerta(true);
                setMensaje("Todos los campos son obligatorios");
            }else if(status==500){
                 setAlerta(true);
                setMensaje("El correo ingresado ya fue registrado")
            }
        })
        
      
    }
    
     return(
        <div>
         <div className="Contenedor-Logo">
        <img  className="Logo" src={mazebank}/>
        </div>
       <div className="usuarios">
         {alerta&&(
            <div className="alert alert-danger" role="alert">
            {mensaje}
            </div>

                )}
        <div className="titulo">Registro</div>
        <div className="form-floating mb-3">
        <input  onChange={(e)=>{
                setNombre(e.target.value)
            }}type="text" className="form-control bg-dark text-white" id="floatingNombre"/>
        <label htmlFor="floatingNombre" className="text-white">Nombre</label>
        </div>
         <div className="form-floating mb-3">
        <input  onChange={(e)=>{
                setEmail(e.target.value)
            }}type="email" className="form-control  bg-dark text-white" id="floatingEmail"/>
        <label htmlFor="floatingEmail" className="text-white">Email</label>
        </div>
         <div className="form-floating mb-3">
        <input  onChange={(e)=>{
                setNumero(e.target.value)
            }}type="text" className="form-control  bg-dark text-white" id="floatingTelefono"/>
        <label htmlFor="floatingTelefono" className="text-white">Telefono</label>
        </div>
         <div className="form-floating mb-3">
        <input  onChange={(e)=>{
                setContraseña(e.target.value)
            }}type="password" className="form-control  bg-dark text-white" id="floatingPassword"/>
        <label htmlFor="floatingPassword" className="text-white">Contraseña</label>
        </div>
        <button onClick={registrarse} type="button" className="btn btn-outline-secondary">Registrarse</button>
            <p>¿Ya estás registrado? Inicia Sesion</p>
        <a onClick={()=>navigate("/login")} className="icon-link" href="#">
  Iniciar Sesion
  <svg xmlns="http://www.w3.org/2000/svg" className="bi" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
  </svg>
</a>
        </div>
        </div>
    );
}
export default Registro;