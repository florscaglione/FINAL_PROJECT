import React from "react";
import { Link } from "react-router-dom";

export const NavegacionDev = () => {
	//const isLoggedIn = state.store.isLoggedIn;

	return (
		<nav className="navbar-light bg-light mb-3">
			<div className="container d-flex justify-content-center">
				<div className="d-flex justify-content-center">
					<Link to="/">
						<button className="btn btn-primary-wfh  mx-2">P. Inicio</button>
					</Link>
					<Link to="/usuarioHomeSinLoguear">
						<button className="btn btn-primary-wfh  mx-2">Usuario Home</button>
					</Link>
					<Link to="/detalleOferta">
						<button className="btn btn-primary-wfh  mx-2">Usuario oferta</button>
					</Link>
					<Link to="/new-CV">
						<button className="btn btn-primary-wfh  mx-2">NuevoCV</button>
					</Link>
					<Link to="/new-Offer">
						<button className="btn btn-primary mx-2">Nueva Oferta</button>
					</Link>
					<Link to="/vista_home_emp">
						<button className="btn btn-primary-wfh  mx-2">Empresa Home</button>
					</Link>
					<Link to="/vista_ofertas_publi">
						<button className="btn btn-primary-wfh  mx-2">Empresa Ofertas</button>
					</Link>
					<Link to="/candidatosInscritos">
						<button className="btn btn-primary-wfh  mx-2">Empresa Candidatos</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
