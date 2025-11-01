import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registro(){
const [nombre,setNombre]=useState("");
const [email,setEmail]=useState("");
const [telefono,setNumero]=useState("");
const [contraseña,setContraseña]=useState("")
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
                alert("Por favor complete todos los campos")
            }else if(status==500){
                alert("el correo ingresado ya fue registrado")
            }
        })
        
      
    }
    
     return(
       <div className="usuarios">
            <label>Nombre:<input value={nombre}
            onChange={(e)=>{
                setNombre(e.target.value)
            }}
            type="text"/></label>
            <label>Email:<input value={email}
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            type="text"/></label>
            <label>Numero:<input value={telefono}
            onChange={(e)=>{
                setNumero(e.target.value)
            }}
            type="text"/></label>
            <label>Contraseña:<input value={contraseña}
            onChange={(e)=>{
                setContraseña(e.target.value)
            }}
            type="password"/></label>
            <button onClick={registrarse}>Registrarse</button>
            <p>Ya estas registrado? inicia Sesion</p>
            <button onClick={()=>navigate("/login")}>Iniciar Sesión</button>
        </div>
    );
}
export default Registro;