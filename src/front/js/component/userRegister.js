import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { UserRegisterCV } from "../../js/component/userRegisterCV";

export const UserRegister = () => {
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
		setUser({ ...user, [event.target.name]: event.target.value });
		console.log(user);
	};
	const handleRegister = event => {
		event.preventDefault();
		console.log("USER", user);
	};

	return (
		<form onChange={handleChange} onSubmit={handleRegister}>
			<button
				type="button"
				className="btn btn-primary mx-1"
				data-bs-toggle="modal"
				data-bs-target="#userRegisterModal">
				Registro Usuario
			</button>

			<div
				className="modal fade"
				id="userRegisterModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h2 className="modal-title" id="exampleModalLabel">
								Registro - paso 1
							</h2>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
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
										<label forHTML="inputBirthDate" className="form-label">
											Fecha nacimiento
										</label>
										<input
											type="text"
											className="form-control"
											placeholder="DD / MM / YYYY"
											aria-describedby="textBirthDate"
											name="birthdate"
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
			</div>
		</form>
	);
};
