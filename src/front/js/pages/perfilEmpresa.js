import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

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
