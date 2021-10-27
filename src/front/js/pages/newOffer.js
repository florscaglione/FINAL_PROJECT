import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import { ModalCompanyData } from "../../js/component/modalCompanyData";
import { ModalCompanyOffer } from "../../js/component/modalCompanyOffer";

export const NewOffer = () => {
	const { store, actions } = useContext(Context);
	console.log("-----", store.offerInfo);

	//const [info, setInfo] = useState(); Guardar en el store la variable "info" y en el "actions" la función companyGet(),
	useEffect(() => {
		actions.companyGet(1); // trae la información de la empresa
		actions.offerGet(1); // trae la información de la oferta
	}, []);

	return (
		<>
			{store.companyInfo ? (
				<div className="container">
					<h1 className="m-4">Introduce los datos de la oferta de trabajo</h1>
					<div className="row">
						<div className="col-8">
							<div className="card m-2">
								<div className="card-header d-flex justify-content-between">
									<div className="d-flex justify-content-start">
										<h4>Datos empresa</h4>
									</div>
									<div className="d-flex justify-content-end">
										<button
											type="button"
											className="btn btn-outline-primary"
											data-bs-toggle="modal"
											data-bs-target="#idEditDataCompany">
											<i className="fas fa-edit" />
										</button>
										<ModalCompanyData info={store.companyInfo} id={"idEditDataCompany"} />
									</div>
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
					{store.offerInfo ? (
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
												data-bs-target="#idEditOfferCompany">
												<i className="fas fa-edit" />
											</button>
											<ModalCompanyOffer
												icon={"edit"}
												info={store.offerInfo}
												id={"idEditOfferCompany"}
											/>
										</div>
									</div>
									<div className="card-body">
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
															Descripción de la oferta:{" "}
															{store.offerInfo.offer_description}
														</h5>
														<h5 className="card-title">
															Beneficios sociales: {store.offerInfo.social_benefit}
														</h5>
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
							</div>
						</div>
					) : (
						<h1>Actualmente no hay ofertas disponibles</h1>
					)}
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
