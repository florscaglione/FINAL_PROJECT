import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { SidebarUsuario } from "../component/SidebarUsuario";
import { useParams } from "react-router-dom";
import "../../styles/home.scss";

export const DetalleOferta = () => {
	const { store, actions } = useContext(Context);
	/* const id = localStorage.getItem("idItem"); */
	const { id } = useParams(); // Sirve para recibir variables por la url desde componente que contiene un enlace "link to"

	const [inscription, setInscription] = useState(false);

	useEffect(() => {
		if (id) {
			actions.offerGet(id);
			getInscriptionUser();
			console.log("obteniendo oferta");
		} else {
			console.log("Sin oferta");
		}
	}, []);

	const getInscriptionUser = async () => {
		const userId = localStorage.getItem("userLoggedIn");
		const url = `${process.env.BACKEND_URL}api/offer/${id}/inscription-user/${userId}`;
		const token = localStorage.getItem("token");
		if (token && token != "" && token != undefined) {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token
				}
			});
			if (response.status == 201 && response.ok) {
				setInscription(false);
				actions.offerGet(id); // añadir un else para mostrar un error en caso de que no funcione
				console.log("0000000000", response.status);
			} else {
				setInscription(true);
				console.log("11111111111", response.status);
			}
		}
	};

	const handleClick = async () => {
		/* console.log("función inscribirse", store.userLoggedIn); */
		const userId = localStorage.getItem("userLoggedIn");
		const url = `${process.env.BACKEND_URL}api/offer/${id}/inscription-user/${userId}`;
		const token = localStorage.getItem("token");
		if (token && token != "" && token != undefined) {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token
				}
			});
			if (response.ok == 201) {
				setInscription(false);
				console.log("2222222222", response.status);
			}
		}
	};

	return (
		<>
			{store.offerInfo ? (
				<div className="container">
					<div className="row">
						<div className="card col-8">
							<div className="card-header">
								<h1>El título es: {store.offerInfo.title}</h1>
							</div>
							<div className="card-body">
								<h5 className="card-title">Empresa: {store.offerInfo.company.name}</h5>
								<h5 className="card-title">Descripción: {store.offerInfo.offer_description}</h5>
								<h5 className="card-title">Requisitos: {store.offerInfo.requirement}</h5>
								<h5 className="card-title">Tipo de teletrabajo: {store.offerInfo.remote_work}</h5>
								<h5 className="card-title">Salario: {store.offerInfo.salary_range}</h5>
								<h5 className="card-title">Beneficios sociales: {store.offerInfo.social_benefit}</h5>
								{!inscription ? (
									<button onClick={handleClick} type="submit" className="btn btn-primary">
										Inscribirse
									</button>
								) : (
									<button onClick={handleClick} type="button" className="btn btn-primary" disabled>
										Ya inscrito/a
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			) : (
				""
			)}
		</>
	);
};
