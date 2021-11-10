import React, { Component, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const ModalCompanyOffer = ({ offer, icon, id }) => {
	console.log("OFFER MODAL", offer);

	const { store, actions } = useContext(Context);

	const [editOffer, setEditOffer] = useState({
		title: "",
		remote_work: "",
		contract_type: "",
		salary_range: "",
		requirement: "",
		offer_description: "",
		social_benefit: ""
	});

	const handleChange = event => {
		setEditOffer({ ...editOffer, [event.target.name]: event.target.value });
	};

	const handleEditOffer = async event => {
		event.preventDefault();

		if (icon == "edit") {
			console.log("editOffer", editOffer);
			await actions.offerUpdate(event, offer.id, editOffer); // se añade el await para que no comience la siguiente función hasta terminar de ejecutarse la primera
			actions.companyOffersGet(); // Pretendemos que tras editar se actualice el listado de ofertas (no funciona)
		}
		if (icon == "plus") {
			const url = `${process.env.BACKEND_URL}api/company/offer`;
			console.log("estoy en crear oferta", editOffer);
			const token = localStorage.getItem("token"); // Almacenar el token en una variable desde el localStorage
			if (token && token != "" && token != undefined) {
				const response = await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token // Autorización para enviar el token, importante no quitar el espacio del "Bearer "
					},
					body: JSON.stringify(editOffer)
				});
				console.log("¢¢¢¢¢¢¢¢¢¢¢¢¢");
				if (response.ok) {
					console.log("%%%%%%%%%%%%%%");
					actions.companyOffersGet(); // añadir un else para mostrar un error en caso de que no funcione
				}
			} // Faltaría un else para cuando no hay token para que salte el modal del login
		}
	};
	/* console.log("00000000", offer.id); */
	return (
		<form onChange={handleChange} onSubmit={handleEditOffer}>
			<div className="modal fade" id={id} tabIndex="-1" aria-labelledby="userDataLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h2 className="modal-title" id="userDataLabel">
								{icon == "plus" ? "Crear oferta de trabajo" : "Editar oferta de trabajo"}
							</h2>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
						</div>
						<div className="modal-body">
							<div className="row">
								<div className="row mt-2">
									<div className="col m-0">
										<input
											type="text"
											className="mt-2 form-control"
											defaultValue={offer.title}
											placeholder="Título"
											name="title"
											aria-describedby="professionHelp"
										/>
										<input
											type="text"
											className="mt-2 form-control"
											defaultValue={offer.remote_work}
											placeholder="Trabajo remoto"
											name="remote_work"
											aria-describedby="professionHelp"
										/>
										<input
											type="text"
											className="mt-2 form-control"
											defaultValue={offer.contract_type}
											placeholder="Tipo de contrato"
											name="contract_type"
											aria-describedby="professionHelp"
										/>
										<input
											type="text"
											className="mt-2 form-control"
											defaultValue={offer.salary_range}
											placeholder="Rango salarial"
											name="salary_range"
											aria-describedby="professionHelp"
										/>
										<input
											type="text"
											className="mt-2 form-control"
											defaultValue={offer.requirement}
											placeholder="Requisitos"
											name="requirement"
											aria-describedby="professionHelp"
										/>
										<input
											type="text"
											className="mt-2 form-control"
											defaultValue={offer.offer_description}
											placeholder="Descripción de la oferta"
											name="offer_description"
											aria-describedby="professionHelp"
										/>
										<input
											type="text"
											className="mt-2 form-control"
											defaultValue={offer.social_benefit}
											placeholder="Beneficios sociales"
											name="social_benefit"
											aria-describedby="professionHelp"
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button type="submit" className="btn btn-primary-wfh" data-bs-dismiss="modal">
								Guardar
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

ModalCompanyOffer.propTypes = {
	offer: PropTypes.object,
	icon: PropTypes.string,
	id: PropTypes.number
};
