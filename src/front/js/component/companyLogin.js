import React, { Component, useContext, useState } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const CompanyLogin = ({ id }) => {
	const { store, actions } = useContext(Context);

	const [companyLogin, setCompanyLogin] = useState({
		email: "",
		password: ""
	});

	const handleChange = event => {
		setCompanyLogin({ ...companyLogin, [event.target.name]: event.target.value });
	};
	const handleLogin = async event => {
		event.preventDefault();

		/* console.log("USER", user); */
		actions.login(companyLogin.email, companyLogin.password);
	};

	return (
		<form onChange={handleChange} onSubmit={handleLogin}>
			<div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						<div className="row">
							<div className="col-6" />
							<div className="col-6" />
						</div>

						<div className="modal-header">
							<h2 className="modal-title" id="exampleModalLabel">
								Acceso a Empresas
							</h2>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
						</div>
						<div className="modal-body">
							<div className="row">
								<div className="col" />
							</div>
							<div className="row">
								<h5>Introduzca sus datos de empresa</h5>
								<div className="col">
									<div className="mb-3">
										<label forHTML="exampleInputEmail1" className="form-label">
											Email
										</label>
										<input
											type="email"
											className="form-control"
											placeholder="Introduzca su email"
											aria-describedby="emailHelp"
										/>
									</div>
									<div className="mb-3">
										<label forHTML="exampleInputPassword1" className="form-label">
											Contraseña
										</label>
										<input
											type="password"
											className="form-control"
											placeholder="Introduzca clave"
											id="exampleInputPassword1"
										/>
									</div>
									<button
										type="button"
										className="btn btn-link"
										data-bs-toggle="modal"
										data-bs-target="#companyRegisterModal">
										Registro de empresas
									</button>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
								Cerrar
							</button>
							<button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
								Entrar
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

CompanyLogin.propTypes = {
	id: PropTypes.string
};
