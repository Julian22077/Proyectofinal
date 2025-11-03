import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Inciosesion(){
    const [email,setEmail]=useState("");
    const [contraseña,setContraseña]=useState("");
    const navigate=useNavigate();
    const[alerta,setAlerta]=useState(false);
    const[mensaje,setMensaje]=useState("");

    const inciarsesion= ()=>{
        setAlerta(false);
        axios.post('http://localhost:5001/api/usuarios/login',{
        email:email,
        contraseña:contraseña
        })
        .then(res=>{
        console.log(res);
        const Usuario = res.data.usuario;
        if (Usuario.tipo === 1) {
                navigate("/usuarios");
            } else {
                navigate(`/usuario/${Usuario.id}`);
            }
        })
        .catch(error=>{
             const status=error.response.status;

            if(status===401){
                setAlerta(true);
                setMensaje("Correo o contraseña incorrectas");
                
            
            }else if(status===400){
                setAlerta(true);
                setMensaje("Todos los campos son obligatorios")
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
        <div className="titulo">Inicio Sesion</div>
        <div class="form-floating mb-3">
        <input  onChange={(e)=>{
                setEmail(e.target.value)
            }}type="emaill" class="form-control bg-dark text-white" id="floatingInput"/>
        <label for="floatingInput" class="text-white">Email</label>
        </div>
            <div class="form-floating mb-3">
        <input  onChange={(e)=>{
                setContraseña(e.target.value)
            }}type="password" class="form-control bg-dark text-white" id="floatingInput"/>
        <label for="floatingInput" class="text-white">Contraseña</label>
        </div>
             <button onClick={inciarsesion} type="button" class="btn btn-outline-secondary">Iniciar Sesión</button>
            <p>¿No tienes cuenta todavia? Registrate</p>
             <a onClick={()=>navigate("/")} class="icon-link" href="#">
            Registrate
            <svg xmlns="http://www.w3.org/2000/svg" class="bi" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
            </a>
        </div>
    );
}
export default Inciosesion;