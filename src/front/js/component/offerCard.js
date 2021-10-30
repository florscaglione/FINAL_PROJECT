import React, { Component, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

import { ModalCompanyOffer } from "../../js/component/modalCompanyOffer";

export const OfferCard = ({ offer }) => {
	const { store, actions } = useContext(Context);

	return (
		<div className="card m-2">
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
			<div className="card-body">
				<div className="row">
					<div className="col-12">
						<div className="row mb-4">
							<div className="col-10">
								<h5 className="card-title">
									Título:
									{offer.title}
								</h5>
								<h5 className="card-title">
									Teletrabajo:
									{offer.remote_work}
								</h5>
								<h5 className="card-title">Tipo de contrato: {offer.contract_type}</h5>
								<h5 className="card-title">Rango de salario: {offer.salary_range}</h5>
								<h5 className="card-title">Requisitos: {offer.requirement}</h5>
								<h5 className="card-title">Descripción de la oferta: {offer.offer_description}</h5>
								<h5 className="card-title">Beneficios sociales: {offer.social_benefit}</h5>
							</div>

							<div className="col-2 d-flex justify-content-end" />
						</div>
					</div>
				</div>
				<div className="row pb-2 mx-1 w-100 border-2 border-bottom">
					<div className="d-flex justify-content-between" />
				</div>
			</div>
		</div>
	);
};

OfferCard.propTypes = {
	offer: PropTypes.object
};
