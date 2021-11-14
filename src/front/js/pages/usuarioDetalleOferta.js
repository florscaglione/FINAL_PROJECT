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
				setInscription(false); // añadir un else para mostrar un error en caso de que no funcione
				actions.offerGet(id);
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
			if (response.status == 201) {
				setInscription(false);
				console.log("2222222222", response.status);
			}
		}
	};

	return (
		<>
			{store.offerInfo ? (
				<div className="container">
					<div className="row mt-5">
						<div className="col-9 p-0 mt-5">
							<div className="card">
								<div className="card-header ">
									<p className="m-3"> {store.offerInfo.title}</p>
								</div>
								<div className="card-body-cv p-5">
									<div className="row">
										<div className="col-4 d-flex align-items-center">
											<h5 className="infocv">Empresa : </h5>
										</div>
										<div className="card-header-det col-8 mt-1 d-flex align-items-center">
											{store.offerInfo.company.name}
										</div>
										<div className="col-4 mt-4 d-flex align-items-center">
											<h5 className="infocv">Descripción: </h5>
										</div>
										<div className="card-header-det col-8 mt-4 d-flex align-items-center">
											{store.offerInfo.offer_description}
										</div>
										<div className="col-4 mt-4 d-flex align-items-center">
											<h5 className="infocv">Requisitos : </h5>
										</div>
										<div className="card-header-det col-8 mt-4 d-flex align-items-center">
											{store.offerInfo.requirement}
										</div>
										<div className="col-4 mt-4 d-flex align-items-center">
											<h5 className="infocv">Tipo de teletrabajo : </h5>
										</div>
										<div className="card-header-det col-8 mt-4 d-flex align-items-center">
											{store.offerInfo.remote_work}
										</div>
										<div className="col-4 mt-4 d-flex align-items-center">
											<h5 className="infocv">Salario : </h5>
										</div>
										<div className="card-header-det col-8 mt-2 d-flex align-items-center">
											{store.offerInfo.salary_range}
										</div>
										<div className="col-4 mt-4 d-flex align-items-center">
											<h5 className="infocv">Beneficios sociales : </h5>
										</div>
										<div className="card-header-det col-8 mt-2 d-flex align-items-center">
											{store.offerInfo.social_benefit}
										</div>
									</div>
									{!inscription ? (
										<button
											onClick={handleClick}
											type="submit"
											className="btn btn-primary-wfh mt-5 mb-4">
											Inscribirse
										</button>
									) : (
										<button
											onClick={handleClick}
											type="button"
											className="btn btn-primary-wfh mt-5 mb-4"
											disabled>
											Ya inscrito/a
										</button>
									)}
								</div>
							</div>
						</div>
						<div className="col-3 text-center d-none d-md-block mt-4">
							<SidebarUsuario />
						</div>
					</div>
				</div>
			) : (
				""
			)}
		</>
	);
};
