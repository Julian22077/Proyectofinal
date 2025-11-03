import React from 'react';
import UserList from './components/UserList';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Registro from './components/Registro';
import Inciosesion from './components/Iniciosesion';
import Usuario from './components/Usuario';
function App() {
return (
<Router>
      <Routes>
        <Route path="/"element={<Registro/>}/>
        <Route path="/usuarios"element={<UserList/>}/>
        <Route path="/login"element={<Inciosesion/>}/>
        <Route path="/usuario/:id"element={<Usuario/>}/>
      </Routes>
    </Router>
);
}

export default App;
