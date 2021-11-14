import React, { Component, useState, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { BannerEmpresa } from "../component/BannerEmpresa";

import { ModalCompanyOffer } from "../../js/component/modalCompanyOffer";

export const OfferCard = ({ offer }) => {
	console.log("OFFER", offer);

	const { store, actions } = useContext(Context);

	return (
		<div className="container">
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
						<button type="button" className="btn btn-outline-secondary">
							Eliminar Oferta
						</button>
						<ModalCompanyOffer icon={"edit"} offer={offer} id={`id${offer.id}`} />
					</div>
				</div>
				<div className="card-body-cv">
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
								</div>
								<div className="row pb-2 mx-1 w-100">
									<div className="d-flex justify-content-between">
										<Link
											to="/candidatosInscritos"
											type="button"
											className="btn btn-primary-wfh mt-3">
											Candidatos inscritos
										</Link>
									</div>
								</div>
							</div>
							<div className="col-3 text-center d-none d-md-block mt-4">
								<BannerEmpresa />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

OfferCard.propTypes = {
	offer: PropTypes.object
};
