import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import logoWfh from "../../img/logo_wfh.png";
import { Link } from "react-router-dom";

export const NavbarCompany = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="container">
			<div className="navbar-wfh mb-3 fixed-top">
				<div className="container d-flex justify-content-between">
					<a className="navbar-brand" href="/">
						<img className="logonavbar" src={logoWfh} width="200" alt="starwars logo" />
					</a>
					<div className="list-inline d-flex justify-content-end align-items-center">
						<ul className="list-inline justify-content-center">
							<li className="list-inline-item 1">
								<Link to="/perfil-empresa" className="nav-link linksnavbar pr-4" type="button">
									Mis datos de empresa
								</Link>
							</li>

							<li className="list-inline-item 2">
								<Link to="/vista_ofertas_publi" className="nav-link linksnavbar pr-5" type="button">
									Ofertas publicadas
								</Link>
							</li>
							<li className="list-inline-item 3">
								<Link
									to="/"
									onClick={() => actions.logout()}
									className="nav-link p-0 linksnavbar"
									type="button">
									<i className="fas fa-sign-out-alt fa-lg pr-2" />
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};
