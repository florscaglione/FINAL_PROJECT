import React, { useState } from "react";
import logoWfh from "../../img/logo_wfh.png";
import { UserLogin } from "../../js/component/userLogin";
import { CompanyLogin } from "../../js/component/companyLogin";

export const Navbar = () => {
	//const isLoggedIn = state.store.isLoggedIn;

	return (
		<div className="container">
			<div className="navbar-wfh mb-3 fixed-top">
				<div className="container d-flex justify-content-between">
					<a className="navbar-brand" href="/">
						<img src={logoWfh} width="250" alt="starwars logo" />
					</a>
					<div className="d-flex justify-content-end" />
					<button
						type="button"
						className="btn btn-primary-wfh  mx-1"
						data-bs-toggle="modal"
						data-bs-target="#userRegisterModal">
						Registro Usuario
					</button>
					<UserLogin id={"userLoginModal"} />
					<button
						type="button"
						className="btn btn-primary mx-1"
						data-bs-toggle="modal"
						data-bs-target="#companyLoginModal">
						Login Empresa
					</button>
					<CompanyLogin id={"companyLoginModal"} />
				</div>
			</div>
		</div>
	);
};

/* return (
	<>
		{isLoggedIn ? (
			<nav className="navbar sticky-top navbar-light bg-light mb-3">
				<div className="container d-flex justify-content-between">
					<a className="navbar-brand" href="/">
						<img src={logoWfh} width="180" alt="starwars logo" />
					</a>
					<div className="d-flex justify-content-end">
						<button type="button" className="btn btn-outline-primary m-2">
							<i className="far fa-bookmark" />
							Bookmark
						</button>
						<button type="button" className="btn btn-primary m-2">
							<i className="fas fa-user-circle" />
							Perfil
						</button>
					</div>
				</div>
			</nav>
		) : (
			<nav className="navbar sticky-top navbar-light bg-light mb-3">
				<div className="container d-flex justify-content-between">
					<a className="navbar-brand" href="/">
						<img src={logoWfh} width="180" alt="starwars logo" />
					</a>
					<div className="d-flex justify-content-end">
						<button type="button" className="btn btn-outline-primary m-2">
							Login
						</button>
						<button type="button" className="btn btn-primary m-2">
							Registro
						</button>
					</div>
				</div>
			</nav>
		)}
	</>
);
 */
