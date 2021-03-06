import React, { Component, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import logoWfh from "../../img/logo_wfh.png";
import { UserRegisterConfirmation } from "../../js/component/userRegisterConfirmation";

export const UserRegister = ({ id }) => {
	console.log("Registrando usuario");
	const history = useHistory();

	const [registerCV, setRegisterCV] = useState(false);

	const [user, setUser] = useState({
		email: "",
		password: "",
		passwordConfirm: "",
		name: "",
		lastname: "",
		phone: "",
		birthDate: ""
	});

	const handleChange = event => {
		setUser({ ...user, [event.target.name]: event.target.value }); //Duda revisar como
		console.log(user);
	};
	const handleRegister = async event => {
		event.preventDefault();
		if (user.password !== user.passwordConfirm) {
			alert("Las contraseñas no coinciden");
			return;
		}
		/* console.log("USER", user); */
		const url = `${process.env.BACKEND_URL}api/signup-user`;
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: user.email,
				password: user.password,
				passwordConfirm: user.passwordConfirm,
				name: user.name,
				lastname: user.lastname,
				phone: user.phone,
				birth_date: user.birth_date
			})
		});
		/* const responseJson = await response.json(); //Función asíncrona que al recibir el json lo guarda en la variable responseJson para poder realizar posteriormente verificaciones sobre los datos devueltos en el body, por ejemplo en token de seguridad devuelto. */
		/* if (responseJson.access_token) {
			//Si el POST devuelve un accessToken el formulario accede a la siguiente página.
			localStorage.setItem("access_token", responseJson.access_token);
		} */
		if (response.ok) {
			setRegisterCV(true);
		}
	};

	return (
		<form onChange={handleChange} onSubmit={handleRegister}>
			<div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
				{!registerCV ? (
					<div className="modal-dialog  modal-dialog-centered modal-lg">
						<div className="modal-content">
							<div className="modal-header">
								<img className="logoformulario" src={logoWfh} width="150" alt="logo Wfh" />
								<h2 className="modal-title" id="exampleModalLabel">
									Registro Usuario
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
									<h5>Información usuario</h5>
									<div className="col">
										<div className="mb-3">
											<label forHTML="exampleInputEmail1" className="form-label">
												Email
											</label>
											<input
												type="email"
												className="form-control"
												placeholder="example@domain.com"
												aria-describedby="emailHelp"
												name="email"
												required
												//value={user.email}
											/>
										</div>
										<div className="mb-3">
											<label forHTML="exampleInputPassword1" className="form-label">
												Contraseña
											</label>
											<input
												type="password"
												className="form-control"
												placeholder="8 - 16 carácteres"
												id="exampleInputPassword1"
												name="password"
												required
												//value={user.password}
											/>
										</div>
										<div className="mb-3">
											<label forHTML="exampleInputPassword1" className="form-label">
												Confirme contraseña
											</label>
											<input
												type="password"
												className="form-control"
												placeholder="Repetir password"
												id="exampleInputPassword1"
												name="passwordConfirm"
												required
												//value={user.passwordConfirm}
											/>
										</div>
									</div>
									<div className="col">
										<div className="mb-3">
											<label forHTML="inputName" className="form-label">
												Nombre
											</label>
											<input
												type="text"
												className="form-control"
												placeholder="Nombre"
												aria-describedby="textName"
												required
												name="name"
												//value={user.name}
											/>
										</div>
										<div className="mb-3">
											<label forHTML="inputLastname" className="form-label">
												Apellidos
											</label>
											<input
												type="text"
												className="form-control"
												placeholder="Apellidos"
												aria-describedby="textLastname"
												required
												name="lastname"
												//value={user.lastname}
											/>
										</div>
										<div className="mb-3">
											<label forHTML="inputPhone" className="form-label">
												Teléfono
											</label>
											<input
												type="tel"
												className="form-control"
												placeholder="34 123 456 789"
												aria-describedby="textPhone"
												required
												name="phone"
												//value={user.phone}
											/>
										</div>
										<div className="mb-3">
											<label forHTML="inputBirthDate" className="form-label">
												Fecha nacimiento
											</label>
											<input
												type="date"
												className="form-control"
												placeholder="DD / MM / YYYY"
												aria-describedby="textBirthDate"
												name="birth_date"
												required
												//value={user.birthdate}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary-wfh" data-bs-dismiss="modal">
									Cerrar
								</button>
								<button type="submit" className="btn btn-primary-wfh">
									Siguiente
								</button>
							</div>
						</div>
					</div>
				) : (
					<UserRegisterConfirmation />
				)}
			</div>
		</form>
	);
};

UserRegister.propTypes = {
	id: PropTypes.string
};
