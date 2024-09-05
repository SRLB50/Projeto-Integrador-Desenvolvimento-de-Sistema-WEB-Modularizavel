/* eslint-disable */
import { react, useState } from "react";
import axios from "axios";
import InputElement from "../../components/FormElements/Input";
import { Card, CardBody } from "reactstrap";
import './index.scss'

const Perfil = () => {
  const [email, setEmail] = useState("");
	const [nome, setNome] = useState("");
	const [sobrenome, setSobrenome] = useState("");
	const [data, setData] = useState("");

  return (
		<div className="perfil-container">
			 <Card className="perfil-card">
				<CardBody className="perfil-card-body">
					<InputElement
						label={"E-mail"}
						type="text"
						id="input-email"
						disabled={true}
						value={email}
						setValue={setEmail}
					/>
					<InputElement
						label={"Nome"}
						type="text"
						id="input-nome"
						disabled={true}
						value={nome}
						setValue={setNome}
					/>
					<InputElement
						label={"Sobrenome"}
						type="text"
						id="input-sobrenome"
						disabled={true}
						value={sobrenome}
						setValue={setSobrenome}
					/>
					<InputElement
						label={"Data de nascimento"}
						type="text"
						id="input-data"
						disabled={true}
						value={data}
						setValue={setData}
					/>
				</CardBody>
			</Card>
		</div>
  );
};

export default Perfil;
