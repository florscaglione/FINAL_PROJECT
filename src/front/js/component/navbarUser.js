import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import logoWfh from "../../img/logo_wfh.png";
import { Link } from "react-router-dom";
import { UserLogin } from "../../js/component/userLogin";
import { CompanyLogin } from "../../js/component/companyLogin";
import { UserRegister } from "../../js/component/userRegister"; // Nota importante: en el navbar se esta pasando el id al modal y se llama en el botón del modal userLogin
import { CompanyRegister } from "./companyRegister"; // Nota importante: en el navbar se esta pasando el id al modal y se llama en el botón del modal companyLogin

export const NavbarUser = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div className="navbar-wfh mb-3 fixed-top">
				<div className="container d-flex justify-content-between">
					<a className="navbar-brand" href="/">
						<img className="logonavbar" src={logoWfh} width="250" alt="starwars logo" />
					</a>
					<div className="d-flex justify-content-end align-items-center">
						<div className="dropdown">
							<button
								className="btn btn-secondary-wfh dropdown-toggle menusuario"
								type="button"
								id="dropdownMenu2"
								data-bs-toggle="dropdown"
								aria-expanded="false">
								<i className="fas fa-user-cog fa-lg iconopersona " /> Menu Usuario
							</button>
							<ul className="dropdown-menu menusuario" aria-labelledby="dropdownMenu2">
								<li>
									<Link to="/new-CV" className="dropdown-item dropsuario pr-3" type="button">
										<i className="far fa-file fa-lg pr-2" /> Datos personales y CV
									</Link>
								</li>
								<li>
									<div className="dropdown-item dropsuario pr-3" type="button">
										<i className="fas fa-heart fa-lg pr-2" /> Mis ofertas
									</div>
									<button
										onClick={() => actions.logout()}
										className="dropdown-item dropsuario pr-3"
										type="button">
										<i className="fas fa-sign-out-alt fa-lg pr-3" /> Cerrar sesión
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
