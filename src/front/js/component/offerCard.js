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
		<div className="card my-2">
			<div className="card-header d-flex justify-content-between">
				<div className="d-flex justify-content-start">
					<h4>Oferta de trabajo #{offer.id}</h4>
				</div>
				<div className="d-flex justify-content-end">
					<button
						type="button"
						className="btn btn-outline-primary"
						data-bs-toggle="modal"
						data-bs-target={`#id${offer.id}`}>
						<i className="fas fa-edit" />
					</button>
					<ModalCompanyOffer icon={"edit"} offer={offer} id={`id${offer.id}`} />
				</div>
			</div>
			<div className="card-body-cv">
				<div className="row">
					<div className="col-12">
						<div className="row mb-4">
							<div className="col-10">
								<h5 className="infocv">
									Título:
									{offer.title}
								</h5>
								<h5 className="infocv">
									Teletrabajo:
									{offer.remote_work}
								</h5>
								<h5 className="infocv">Tipo de contrato: {offer.contract_type}</h5>
								<h5 className="infocv">Rango de salario: {offer.salary_range}</h5>
								<h5 className="infocv">Requisitos: {offer.requirement}</h5>
								<h5 className="infocv">Descripción de la oferta: {offer.offer_description}</h5>
								<h5 className="infocv">Beneficios sociales: {offer.social_benefit}</h5>
							</div>

							<div className="col-2 d-flex justify-content-end" />
						</div>
					</div>
				</div>
				<div className="row pb-2 mx-1 w-100 border-2 border-top">
					<div className="d-flex justify-content-between">
						<Link to={`/candidatosInscritos/${offer.id}`}>
							<button
								onClick={() => {
									localStorage.setItem("idItem", offer.id);
								}}
								className="btn btn-primary-wfh btn-sm mt-5"
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
