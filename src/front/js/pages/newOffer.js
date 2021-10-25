import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import { ModalCompanyData } from "../../js/component/modalCompanyData";
import { ModalCompanyOffer } from "../../js/component/modalCompanyOffer";

export const NewOffer = () => {
	const { store, actions } = useContext(Context);
	console.log(store.companyInfo);

	//const [info, setInfo] = useState(); Guardar en el store la variable "info" y en el "actions" la función companyGet(),
	useEffect(() => {
		actions.companyGet(1);
	}, []); // cada vez que "info" se actualiza se vuelve a lanzar el useEffect

	return (
		<>
			{store.companyInfo ? (
				<div className="container">
					<h1 className="m-4">Introduce los datos de la oferta de trabajo</h1>
					<div className="row">
						<div className="col-8">
							<div className="card m-2">
								<div className="card-header d-flex justify-content-between">
									<h4>Datos empresa</h4>
									{/* <ModalCompanyData info={store.companyInfo} /> */}
								</div>
								<div className="card-body">
									<h5 className="card-title">Empresa: {store.companyInfo.name}</h5>
									<h5 className="">
										Contacto:
										{store.companyInfo.contact}
									</h5>
									<h5 className="">
										Cif / Nif:
										{store.companyInfo.cif}
									</h5>
									<h5 className="">
										Email:
										{store.companyInfo.email}
									</h5>
									<h5 className="">
										Teléfono:
										{store.companyInfo.phone}
									</h5>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-8">
							<div className="card m-2">
								<div className="card-header d-flex justify-content-between">
									<div className="d-flex justify-content-start">
										<h4>Oferta de trabajo</h4>
									</div>
									<div className="d-flex justify-content-end">
										<button
											type="button"
											className="btn btn-outline-primary"
											data-bs-toggle="modal"
											data-bs-target="#idModalCompany">
											<i className="fas fa-plus" />
										</button>
										{/* <ModalCompanyOffer icon={"plus"} info={null} id={"idModalCompany"} /> */}
									</div>
								</div>
								<div className="card-body">
									<div className="row">
										<div className="col-12">
											{store.companyInfo.offers && store.companyInfo.offers.length > 0
												? store.companyInfo.offers.map((offer, index) => {
														console.log("+++++++", offer);
														return (
															<div key={index} className="row mb-4">
																<div className="col-10">
																	<h5 className="card-title">
																		Título:
																		{offer.title}
																	</h5>
																	<h5 className="card-title">
																		Teletrabajo:
																		{offer.remote_work}
																	</h5>
																	<h5 className="card-title">
																		Tipo de contrato: {offer.contract_type}
																	</h5>
																	<h5 className="card-title">
																		Rango de salario: {offer.salary_range}
																	</h5>
																	<h5 className="card-title">
																		Requisitos: {offer.requirement}
																	</h5>
																	<h5 className="card-title">
																		Descripción de la oferta:{" "}
																		{offer.offer_description}
																	</h5>
																	<h5 className="card-title">
																		social_benefit: {offer.social_benefit}
																	</h5>
																</div>

																<div className="col-2 d-flex justify-content-end">
																	<button
																		type="button"
																		className="btn btn-outline-primary"
																		data-bs-toggle="modal"
																		data-bs-target={`#id${offer.id}`}>
																		<i className="fas fa-edit" />
																	</button>
																	{/* <ModalCompanyOffer
																key={index}
																icon={"edit"}
																info={offer}
																id={`id${offer.id}`}
															/> */}
																</div>
															</div>
														);
												  })
												: ""}
										</div>
									</div>
									<div className="row pb-2 mx-1 w-100 border-2 border-bottom">
										<div className="d-flex justify-content-between" />
									</div>
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
