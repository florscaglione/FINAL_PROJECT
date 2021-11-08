import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import logoWfh from "../../img/logo_wfh.png";
import { Link } from "react-router-dom";

export const NavbarCompany = () => {
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
								<i className="fas fa-building fa-lg iconopersona" /> Menu Empresa
							</button>
							<ul className="dropdown-menu p-0" aria-labelledby="dropdownMenu2">
								<li>
									<Link
										to="/vista_ofertas_publi"
										className="dropdown-item dropsuario pr-3"
										type="button">
										<i className="far fa-file fa-lg pr-2" /> Mis ofertas publicadas
									</Link>
								</li>
								<li>
									<button className="dropdown-item dropsuario pr-3" type="button">
										{" "}
										{/* No tiene funcionalidad, se accede a través de cada ofertas */}
										<i className="fas fa-users fa-lg pr-2" /> Candidatos preselecionados
									</button>
								</li>
								<li>
									<button
										onClick={() => actions.logout()}
										className="dropdown-item dropsuario pr-3"
										type="button">
										<i className="fas fa-sign-out-alt fa-lg pr-2" />
										Cerrar sesión
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
