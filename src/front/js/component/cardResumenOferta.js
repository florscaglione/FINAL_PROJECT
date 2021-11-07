import React, { Component, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import JLK from "../../img/JLK.png";
import { Button } from "bootstrap";

export const CardResumenOferta = ({ offer }) => {
	const { store, actions } = useContext(Context);
	/* console.log("çççççççççççç", offer.company.name); */
	return (
		<div className="container p-0">
			<div className="card card-home mb-3">
				<div className="row g-0">
					<div className="col-md-4">
						<img src={JLK} className="img-fluid rounded-start" alt="Acceso empresas" />
					</div>
					<div className="col-md-8">
						<div className="card-body">
							<h4 className="puesto">{offer.title}</h4>
							<h5 className="empresa">{offer.company.name}</h5>
							<p className="detalle">{offer.offer_description}</p>

							<div className="d-flex justify-content-between">
								<div className="d-flex justify-content-start">
									<p>{offer.requirement}</p>
								</div>
								<div className="d-flex justify-content-center">
									{localStorage.getItem("token") ? (
										<Link to={`/detalleOferta/${offer.id}`}>
											<button
												onClick={() => {
													localStorage.setItem("idItem", offer.id);
												}}
												className="btn btn-primary-wfh btn-sm mt-5"
												href="#"
												role="button">
												Ver Oferta
											</button>
										</Link>
									) : (
										<button
											type="button"
											className="btn btn-primary-wfh  mx-1 align-items-right "
											data-bs-toggle="modal"
											data-bs-target="#userLoginModal">
											Ver Oferta
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

CardResumenOferta.propTypes = {
	offer: PropTypes.object
};
