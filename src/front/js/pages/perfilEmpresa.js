import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { BannerEmpresa } from "../component/BannerEmpresa";

import { ModalCompanyData } from "../../js/component/modalCompanyData";

export const PerfilEmpresa = () => {
	const { store, actions } = useContext(Context);

	//const [info, setInfo] = useState(); Guardar en el store la variable "info" y en el "actions" la función companyGet(),
	useEffect(() => {
		actions.companyGet(localStorage.getItem("companyLoggedIn")); // trae la información de la empresa
	}, []);

	return (
		<>
			{store.companyInfo ? (
				<div className="container">
					<div className="row row-cols-2 mt-5">
						<div className="col-9 mt-5">
							<div className="card m-2">
								<div className="card-header d-flex justify-content-between titulocard">
									<div className="d-flex justify-content-start">
										<h4>Datos empresa</h4>
									</div>
									<div className="d-flex justify-content-end">
										<button
											type="button"
											className="btn btn-outline-primary-wfh"
											data-bs-toggle="modal"
											data-bs-target="#idEditDataCompany">
											<i className="fas fa-edit" />
										</button>
										<ModalCompanyData info={store.companyInfo} id={"idEditDataCompany"} />
									</div>
								</div>
								<div className="card-body">
									<div className="row">
										<div className="col-10">
											<div className="row">
												<div className="col-4 d-flex align-items-center mt-3">
													<h5 className="infocv">Empresa: </h5>
												</div>
												<div className="card-header-det col-8 mt-3 d-flex align-items-center">
													{store.companyInfo.name}
												</div>
											</div>
											<div className="row">
												<div className="col-4 d-flex align-items-center mt-3">
													<h5 className="infocv">Contacto: </h5>
												</div>
												<div className="card-header-det col-8 mt-3 d-flex align-items-center">
													{store.companyInfo.contact}
												</div>
											</div>
											<div className="row">
												<div className="col-4 d-flex align-items-center mt-3">
													<h5 className="infocv"> Cif / Nif: </h5>
												</div>
												<div className="card-header-det col-8 mt-3 d-flex align-items-center">
													{store.companyInfo.cif}
												</div>
											</div>
											<div className="row">
												<div className="col-4 d-flex align-items-center mt-3">
													<h5 className="infocv">Email: </h5>
												</div>
												<div className="card-header-det col-8 mt-3 d-flex align-items-center">
													{store.companyInfo.email}
												</div>
											</div>
											<div className="row">
												<div className="col-4 d-flex align-items-center mt-3">
													<h5 className="infocv">Teléfono: </h5>
												</div>
												<div className="card-header-det col-8 mt-3 d-flex align-items-center">
													{store.companyInfo.phone}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-3 text-center d-none d-md-block mt-4">
							<BannerEmpresa />
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
