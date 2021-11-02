import React, { Component, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import JLK from "../../img/JLK.png";

export const CardResumenOferta = ({ offer }) => {
	const { store, actions } = useContext(Context);
	/* console.log("çççççççççççç", offer.company.name); */
	return (
		<div className="container">
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
									<Link to={`/detalleOferta$/${offer.id}`}>
										<span className="btn btn-primary-wfh" href="#" role="button">
											Ver Oferta
										</span>
									</Link>
								</div>
								<div className="d-flex justify-content-end">
									<i className="far fa-bookmark mx-2" />
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
