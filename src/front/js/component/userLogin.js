import React, { Component, useContext, useState } from "react";
import { Context } from "../store/appContext";
import logoWfh from "../../img/logo_wfh.png";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router";

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
		/* actions.login(userLogin.email, userLogin.password); */
		login(userLogin.email, userLogin.password);
	};

	const history = useHistory(); // Importamos el useHistory para poder enviar al usuario a la vista de las ofertas

	const login = async (email, password) => {
		//lo hacemos asíncrono para que sea más fácil de administrar
		console.log("-----", email);
		const options = {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		};

		try {
			const resp = await fetch(`${process.env.BACKEND_URL}api/login-user`, options);
			if (resp.status !== 200) {
				alert("There was been some error");
				return false;
			}
			const data = await resp.json();
			console.log("This came from the backend", data);

			console.log("DATA", data);
			if (data !== null) {
				localStorage.setItem("token", data[0].access_token); //access_token es lo que me respondió el token en Postman (es decir, lo que me llega desde el backend)
				localStorage.setItem("userLoggedIn", data[1].id); // Viene de un array de objetos donde la posición 0 es el token y la 1 la info del usuario (viene del endpoint del login)
				localStorage.setItem("role", "user"); // Definimos el rol de usuario para poder mostrar el componente navbar usuario
				actions.setRole("user");
				history.push("/usuarioHomeSinLoguear");
			} else {
				history.push("/");
			}

			return true;
		} catch (error) {
			console.log("There has been an error login in");
		}
	};

	return (
		<form onChange={handleChange} onSubmit={handleLogin}>
			<div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered modal-lg">
					<div className="modal-content">
						<div className="row">
							<div className="col-6" />
							<div className="col-6" />
						</div>

						<div className="modal-header">
							<img className="logoformulario " src={logoWfh} width="150" alt="logo Wfh" />
							<h2 className="modal-title" id="exampleModalLabel">
								Acceso Usuarios
							</h2>
							<button
								type="button"
								className="btn-close p-2"
								data-bs-dismiss="modal"
								aria-label="Close"
							/>
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
							<button type="button" className="btn btn-secondary-wfh" data-bs-dismiss="modal">
								Cerrar
							</button>
							<button type="submit" className="btn btn-primary-wfh" data-bs-dismiss="modal">
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
