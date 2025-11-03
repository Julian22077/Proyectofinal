import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './style.css'

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
       <div className="usuarios">
         {alerta&&(
            <div class="alert alert-danger" role="alert">
            {mensaje}
            </div>

                )}
        <div className="titulo">Registro</div>
        <div class="form-floating mb-3">
        <input  onChange={(e)=>{
                setNombre(e.target.value)
            }}type="text" class="form-control bg-dark text-white" id="floatingInput"/>
        <label for="floatingInput" class="text-white">Nombre</label>
        </div>
         <div class="form-floating mb-3">
        <input  onChange={(e)=>{
                setEmail(e.target.value)
            }}type="emaill" class="form-control  bg-dark text-white" id="floatingInput"/>
        <label for="floatingInput" class="text-white">Email</label>
        </div>
         <div class="form-floating mb-3">
        <input  onChange={(e)=>{
                setNumero(e.target.value)
            }}type="text" class="form-control  bg-dark text-white" id="floatingInput"/>
        <label for="floatingInput" class="text-white">Telefono</label>
        </div>
         <div class="form-floating mb-3">
        <input  onChange={(e)=>{
                setContraseña(e.target.value)
            }}type="password" class="form-control  bg-dark text-white" id="floatingInput"/>
        <label for="floatingInput" class="text-white">Contraseña</label>
        </div>
        <button onClick={registrarse} type="button" class="btn btn-outline-secondary">Registrarse</button>
            <p>¿Ya estás registrado? Inicia Sesion</p>
        <a onClick={()=>navigate("/login")} class="icon-link" href="#">
  Iniciar Sesion
  <svg xmlns="http://www.w3.org/2000/svg" class="bi" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
  </svg>
</a>
        </div>
    );
}
export default Registro;