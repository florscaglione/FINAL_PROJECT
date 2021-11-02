import React, { Component } from "react";
import JLK from "../../img/JLK.png";

export const CardResumenOferta = () => {
	return (
		<div className="container">
			<div className="card card-home mb-3">
				<div className="row g-0">
					<div className="col-md-4">
						<img src={JLK} className="img-fluid rounded-start" alt="Acceso empresas" />
					</div>
					<div className="col-md-8">
						<div className="card-body">
							<h4 className="puesto">FULL STACK DEVELOPER TELETRABAJO</h4>
							<h5 className="empresa">JLK GROUP SPAIN</h5>
							<p className="detalle">
								Se busca Full Stack Developer con experiencia en Javascript ( Angular y React), bases de
								datos, Node JS,WebApis entre otros. El rango salarial que se ofrece ronda los 36.000K
								con contrato indefinido. Para conocer el resto de condiciones consulte el detalle de la
								oferta.
							</p>
							<div className="d-flex justify-content-between">
								<div className="d-flex justify-content-start">
									<button type="button" className="btn btn-outline btn-sm mx-1">
										#NodeJS
									</button>
									<button type="button" className="btn btn-outline btn-sm mx-1">
										#WebAPIs
									</button>
									<button type="button" className="btn btn-outline btn-sm mx-1">
										#Javascript
									</button>
									<button type="button" className="btn btn-outline btn-sm mx-1">
										#SQL
									</button>
								</div>
								<div className="d-flex justify-content-center">
									<a className="btn btn-primary-wfh ">Ver oferta</a>
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
