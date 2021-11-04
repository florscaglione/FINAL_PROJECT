import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { CompanyRegisterConfirmation } from "../../js/component/companyRegisterConfirmation";

export const CompanyRegister = ({ id }) => {
	const [registerCompany, setRegisterCompany] = useState(false);

	const [company, setCompany] = useState({
		email: "",
		password: "",
		passwordConfirm: "",
		name: "",
		contact: "",
		phone: "",
		cif: ""
	});

	const handleChange = event => {
		setCompany({ ...company, [event.target.name]: event.target.value });
		console.log(company);
	};
	const handleRegister = async event => {
		event.preventDefault();
		if (company.password !== company.passwordConfirm) {
			alert("Las contraseñas no coinciden");
			return;
		}
		/* console.log("COMPANY", company); */
		const url = `${process.env.BACKEND_URL}api/signup-company`;
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: company.email,
				password: company.password,
				passwordConfirm: company.passwordConfirm,
				name: company.name,
				contact: company.contact,
				phone: company.phone,
				cif: company.cif
			})
		});
		/* const responseJson = await response.json(); //Función asíncrona que al recibir el json lo guarda en la variable responseJson para poder realizar posteriormente verificaciones sobre los datos devueltos en el body, por ejemplo en token de seguridad devuelto. */
		/* if (responseJson.access_token) {
			//Si el POST devuelve un accessToken el formulario accede a la siguiente página.
			localStorage.setItem("access_token", responseJson.access_token);
		} */
		if (response.ok) {
			setRegisterCompany(true);
		}
	};

	return (
		<form onChange={handleChange} onSubmit={handleRegister}>
			{/* <button
				type="button"
				className="btn btn-primary mx-1"
				data-bs-toggle="modal"
				data-bs-target="#companyRegisterModal">
				Registro Empresa
			</button> */}

			<div
				className="modal fade"
				id={id}
				tabIndex="-1"
				aria-labelledby="companyRegisterModalLabel"
				aria-hidden="true">
				{!registerCompany ? (
					<div className="modal-dialog modal-lg">
						<div className="modal-content">
							<div className="modal-header">
								<h2 className="modal-title" id="companyRegisterModalLabel">
									Registro - paso 1
								</h2>
								<button
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
								/>
							</div>
							<div className="modal-body">
								<div className="row">
									<div className="col" />
								</div>
								<div className="row">
									<h5>Información Empresa</h5>
									<div className="col">
										<div className="mb-3">
											<label forHTML="InputCompanyEmail" className="form-label">
												Email
											</label>
											<input
												type="email"
												className="form-control"
												placeholder="example@empresa.com"
												aria-describedby="InputCompanyEmail"
												name="email"
												//value={user.email}
											/>
										</div>
										<div className="mb-3">
											<label forHTML="companyInputPassword" className="form-label">
												Contraseña
											</label>
											<input
												type="password"
												className="form-control"
												placeholder="8 - 16 carácteres"
												id="companyInputPassword"
												name="password"
												//value={user.password}
											/>
										</div>
										<div className="mb-3">
											<label forHTML="confirmCompanyInputPassword" className="form-label">
												Confirme contraseña
											</label>
											<input
												type="password"
												className="form-control"
												placeholder="Repetir password"
												id="confirmCompanyInputPassword"
												name="passwordConfirm"
												//value={user.passwordConfirm}
											/>
										</div>
									</div>
									<div className="col">
										<div className="mb-3">
											<label forHTML="inputCompanyName" className="form-label">
												Nombre de la empresa
											</label>
											<input
												type="text"
												className="form-control"
												placeholder="Nombre empresa"
												aria-describedby="inputCompanyName"
												required
												name="name"
												//value={user.name}
											/>
										</div>
										<div className="mb-3">
											<label forHTML="inputContact" className="form-label">
												Persona de contacto
											</label>
											<input
												type="text"
												className="form-control"
												placeholder="Persona de contacto"
												aria-describedby="inputContact"
												required
												name="contact"
												//value={user.lastname}
											/>
										</div>
										<div className="mb-3">
											<label forHTML="inputPhone" className="form-label">
												Teléfono
											</label>
											<input
												type="text"
												className="form-control"
												placeholder="34 123 456 789"
												aria-describedby="textPhone"
												required
												name="phone"
												//value={user.phone}
											/>
										</div>
										<div className="mb-3">
											<label forHTML="inputCif" className="form-label">
												Identificación fiscal (Cif / Nif)
											</label>
											<input
												type="text"
												className="form-control"
												placeholder="B 12345678"
												aria-describedby="inputCif"
												name="cif"
												//value={user.birthdate}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
									Cerrar
								</button>
								<button type="submit" className="btn btn-primary">
									Siguiente
								</button>
							</div>
						</div>
					</div>
				) : (
					<CompanyRegisterConfirmation />
				)}
			</div>
		</form>
	);
};

CompanyRegister.propTypes = {
	id: PropTypes.string
};
