import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import { ModalCompanyData } from "../../js/component/modalCompanyData";
import { ModalCompanyOffer } from "../../js/component/modalCompanyOffer";

export const OfferUserInscripted = ({ id }) => {
	const { store, actions } = useContext(Context);
	//const { id } = useParams();

	//const [info, setInfo] = useState(); Guardar en el store la variable "info" y en el "actions" la función companyGet(),
	useEffect(() => {
		actions.offerGet(id);

		// trae la información de la oferta
	}, []);
	console.log("@@@@@@@@@");
	console.log("@@@@@@@@@ID", id);

	console.log("@@@@@@@@@");

	return (
		<>
			{store.offerInfo ? (
				<div className="row">
					<div className="col-12">
						<div className="card m-2">
							<div className="card-header titulocard ">
								<div className="d-flex justify-content-start">
									<h4 className="m-3">Oferta de trabajo #{store.offerInfo.id}</h4>
								</div>
							</div>
							<div className="card-body m-3">
								<div className="row">
									<div className="col-12">
										<div className="row mb-4">
											<div className="col-10">
												{console.log("¡¡¡¡¡¡¡¡¡", store.offerInfo)}
												<h5 className="card-title">
													Título:
													{store.offerInfo.title}
												</h5>
												<h5 className="card-title">
													Teletrabajo:
													{store.offerInfo.remote_work}
												</h5>
												<h5 className="card-title">
													Tipo de contrato: {store.offerInfo.contract_type}
												</h5>
												<h5 className="card-title">
													Rango de salario: {store.offerInfo.salary_range}
												</h5>
												<h5 className="card-title">
													Requisitos: {store.offerInfo.requirement}
												</h5>
												<h5 className="card-title">
													Descripción de la oferta: {store.offerInfo.offer_description}
												</h5>
												<h5 className="card-title">
													Beneficios sociales: {store.offerInfo.social_benefit}
												</h5>
											</div>

											<div className="col-2 d-flex justify-content-end" />
										</div>
									</div>
								</div>
								<div className="row pb-3  w-100 ">
									<div className="d-flex justify-content-between" />
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="d-flex justify-content-center">
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div> // Poner dentro de las comillas el spiner de carga.
			)}
		</>
	);
};

OfferUserInscripted.propTypes = {
	id: PropTypes.number
};
