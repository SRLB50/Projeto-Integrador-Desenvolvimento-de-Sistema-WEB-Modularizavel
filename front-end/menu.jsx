import React from 'react';

// Função para calcular os dias restantes para a menstruação
const diasParaMenstruacao = (dataAtual, dataMenstruacao) => {
  const diffTime = Math.abs(dataMenstruacao - dataAtual);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const Menu = ({ nome, diasRestantes }) => (
  <nav>
    <h1>Seja bem vinda, Marcela!</h1>
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/calendario">Calendário</a></li>
      <li><a href="/dicas">Dicas</a></li>
      <li><a href="/meu-perfil">Meu Perfil</a></li>
    </ul>
    <p>Faltam {9} dias para sua menstruação.</p>
  </nav>
);

const DicasSaude = () => (
  <div>
    <div className="bloco-saude">
      <h2>Vida Saudável</h2>
      <p>Quer uma vida saudavel e sem problemas? Vem conosco e se prepare para uma mudança de vida!.</p>
    </div>
    <div className="bloco-saude">
      <h2>Cuidar-se</h2>
      <p>Se cuidar deve ser um dos primordios femininos. Que tal algumas dicas?.</p>
    </div>
    <div className="bloco-saude">
      <h2>Trabalho Remoto</h2>
      <p>O mercado de trabalho rremoto para as mulheres cresceu exponencialmente? Veja as vagas que mais permitem o trabalho home office.</p>
    </div>
  </div>
);

const CalendarioSemanal = () => {
  const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const hoje = new Date().getDay();

  return (
    <div className="calendario-semanal">
      <h2>Calendário Semanal</h2>
      <ul>
        {diasDaSemana.map((dia, index) => (
          <li key={index} style={{ fontWeight: hoje === index ? 'bold' : 'normal' }}>
            {dia}
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const nome = 'Marcela';
  const dataAtual = new Date();
  const dataMenstruacao = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 27); // Exemplo: próximo ciclo em 27 do mês
  const diasRestantes = diasParaMenstruacao(dataAtual, dataMenstruacao);

  return (
    <div>
      <Menu nome={nome} diasRestantes={diasRestantes} />
      <DicasSaude />
      <CalendarioSemanal />
    </div>
  );
};

export default App;
