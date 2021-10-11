import React, { Component } from "react";
import PropTypes from "prop-types";
import { UserRegister } from "../../js/component/userRegister";

export const UserLogin = () => {
	return (
		<>
			<button
				type="button"
				className="btn btn-primary mx-1"
				data-bs-toggle="modal"
				data-bs-target="#userLoginModal">
				Login Usuario
			</button>

			<div
				className="modal fade"
				id="userLoginModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h2 className="modal-title" id="exampleModalLabel">
								Aceeso a Usuarios
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
										data-bs-target="#userRegisterModal">
										Registro de usuarios
									</button>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
								Cerrar
							</button>
							<button
								type="button"
								className="btn btn-primary"
								data-bs-toggle="modal"
								data-bs-target="#userRegisterCV">
								Entrar
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
