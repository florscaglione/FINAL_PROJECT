import React, { useState } from "react";
import logoWfh from "../../img/logo_wfh.png";
import { UserRegister } from "../../js/component/userRegister";
import { UserLogin } from "../../js/component/userLogin";
import { UserRegisterConfirmation } from "../../js/component/userRegisterConfirmation";
import { UserLogin } from "../../js/component/userLogin";
import { CompanyRegister } from "../../js/component/companyRegister";

export const Navbar = () => {
	//const isLoggedIn = state.store.isLoggedIn;

	return (
		<nav className="navbar mb-3">
			<div className="container d-flex justify-content-between">
				<a className="navbar-brand" href="/">
					<img src={logoWfh} width="300" alt="starwars logo" />
				</a>
				<div className="d-flex justify-content-end">
					<button
						type="button"
						className="btn btn-primary mx-1"
						data-bs-toggle="modal"
						data-bs-target="#userLoginModal">
						Login Usuario
					</button>
					<UserLogin id={"userLoginModal"} />
					<UserRegister />
					<CompanyRegister />
				</div>
			</div>
		</nav>
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
