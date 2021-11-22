import React, { Component, useState, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

import { ModalCompanyOffer } from "../../js/component/modalCompanyOffer";
import { OfferUserInscripted } from "./offerUserInscripted";

export const OfferCard = ({ offer }) => {
	console.log("OFFER", offer);

	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div className="card my-2">
				<div className="card-header d-flex justify-content-between p-4 titulocard">
					<div className="d-flex justify-content-start pl-3">
						<h4>Oferta de trabajo #{offer.id}</h4>
					</div>
					<div className="d-flex justify-content-end">
						<button
							type="button"
							className="btn btn-outline-primary border-0"
							data-bs-toggle="modal"
							data-bs-target={`#id${offer.id}`}>
							<i className="fas fa-edit" />
						</button>
						<button type="button" className="btn btn-outline-secondary">
							Eliminar Oferta
						</button>
						<ModalCompanyOffer icon={"edit"} offer={offer} id={`id${offer.id}`} />
					</div>
				</div>
				<div className="card-body-cv">
					<div className="row">
						<div className="col-12 p-5 mt-3">
							<div className="row mb-4">
								<div className="col-4 d-flex align-items-center">
									<h5 className="infocv">Título: </h5>
								</div>
								<div className="card-header-det col-8 mt-1 d-flex align-items-center">
									{offer.title}
								</div>
								<div className="col-4 d-flex align-items-center">
									<h5 className="infocv">Teletrabajo: </h5>
								</div>
								<div className="card-header-det col-8 mt-1 d-flex align-items-center">
									{offer.remote_work}
								</div>
								<div className="col-4 d-flex align-items-center">
									<h5 className="infocv">Tipo de contrato: </h5>
								</div>
								<div className="card-header-det col-8 mt-1 d-flex align-items-center">
									{offer.contract_type}
								</div>
								<div className="col-4 d-flex align-items-center">
									<h5 className="infocv">Rango de salario: </h5>
								</div>
								<div className="card-header-det col-8 mt-1 d-flex align-items-center">
									{offer.salary_range}
								</div>
								<div className="col-4 d-flex align-items-center">
									<h5 className="infocv">Requisitos: </h5>
								</div>
								<div className="card-header-det col-8 mt-1 d-flex align-items-center">
									{offer.requirement}
								</div>
								<div className="col-4 d-flex align-items-center">
									<h5 className="infocv">Descripción de la oferta: </h5>
								</div>
								<div className="card-header-det col-8 mt-1 d-flex align-items-center">
									{offer.offer_description}
								</div>
								<div className="col-4 d-flex align-items-center">
									<h5 className="infocv">Beneficios sociales: </h5>
								</div>
								<div className="card-header-det col-8 mt-1 d-flex align-items-center">
									{offer.social_benefit}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row pb-5 w-100">
					<div className="d-flex justify-content-between">
						<Link to={`/candidatosInscritos/${offer.id}`}>
							<button
								onClick={() => {
									localStorage.setItem("idItem", offer.id);
								}}
								className="btn btn-primary-wfh mt-3"
								role="button">
								Candidatos Inscritos
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

OfferCard.propTypes = {
	offer: PropTypes.object
};
