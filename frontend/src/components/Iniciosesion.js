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
        })
    }
}
export default Inciosesion;