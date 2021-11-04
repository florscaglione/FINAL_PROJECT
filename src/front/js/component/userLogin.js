import React, { Component, useContext, useState } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const UserLogin = ({ id }) => {
	const { store, actions } = useContext(Context);

	const [userLogin, setUserLogin] = useState({
		email: "",
		password: ""
	});

	const handleChange = event => {
		setUserLogin({ ...userLogin, [event.target.name]: event.target.value });
	};
	const handleLogin = async event => {
		event.preventDefault();

		/* console.log("USER", user); */
		actions.login(userLogin.email, userLogin.password);
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
								Acceso a Usuarios
							</h2>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
						</div>
						<div className="modal-body">
							<div className="row">
								<div className="col" />
							</div>
							<div className="row">
								<h5>Introduzca sus datos de usuario</h5>
								<div className="col">
									<div className="mb-3">
										<label forHTML="exampleInputEmail1" className="form-label">
											Email
										</label>
										<input
											type="email"
											className="form-control"
											name="email"
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
											name="password"
											placeholder="Introduzca clave"
											id="exampleInputPassword1"
										/>
									</div>
									<div>
										<button
											type="button"
											className="btn btn-link"
											data-bs-toggle="modal"
											data-bs-target="#userRegisterModal1">
											Registro de usuarios
										</button>
										{/* <UserRegister id={"userRegisterModal1"} /> */}
									</div>
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

UserLogin.propTypes = {
	id: PropTypes.string
};
