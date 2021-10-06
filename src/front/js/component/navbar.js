import React from "react";
import logoWfh from "../../img/logo_wfh.png";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const isLoggedIn = state.store.isLoggedIn;

	return (
		<>
		{isLoggedIn
 			?	(<nav className="navbar sticky-top navbar-light bg-light mb-3">
					<div className="container d-flex justify-content-between">
						<a className="navbar-brand" href="/">
							<img src={logoWfh} width="180" alt="starwars logo" />
						</a>
						<div className="d-flex justify-content-end">
							<button type="button" className="btn btn-outline-primary m-2">
								<i className="far fa-bookmark"></i>Bookmark
							</button>
							<button type="button" className="btn btn-primary m-2">
								<i className="fas fa-user-circle"></i>Perfil
							</button>
						</div>
					</div>
				</nav>)
			
			: 	(<nav className="navbar sticky-top navbar-light bg-light mb-3">
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
				</nav>)
		}
	</>
	);
};


