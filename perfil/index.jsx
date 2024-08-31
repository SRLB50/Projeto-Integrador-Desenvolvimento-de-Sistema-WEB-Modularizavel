import React from 'react';
import './index.xcss';

function Perfil() {
  return (
    <div className="container">
      <header className="header">
        <h1>CycleSense</h1>
      </header>
        <ul>
          <li>Home</li>
          <li>Calendário</li>
          <li>Dicas</li>
          <li>Meu Perfil</li>
        </ul>
      <main className="main-content">
        <div className="profile-card">
          <form>
            <div className="form-group">
              <label>E-mail</label>
              <input type="email" value="Marcela@gmail.com" readOnly />
            </div>
            <div className="form-group">
              <label>Nome</label>
              <input type="text" value="Marcela" readOnly />
            </div>
            <div className="form-group">
              <label>Sobrenome</label>
              <input type="text" value="Da Silva Lima" readOnly />
            </div>
            <div className="form-group">
              <label>Data de Nascimento</label>
              <input type="text" value="06/03/2000" readOnly />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Perfil;