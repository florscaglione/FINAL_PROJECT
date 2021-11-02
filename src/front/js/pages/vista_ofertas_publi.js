import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { BannerEmpresa } from "../component/BannerEmpresa";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const VistaOfertasPubli = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div className="container-fluid ">
				<div className="row rows-cols-2">
					<div className="col-9">
						<div className="vacio">
							<p className="cabecera mb-5">
								<h4>Bienvenido! Las ofertas que has publicado con nosotros son las siguientes:</h4>
							</p>
						</div>
						<div className="card-body-detalleOferta">
							<h5 className="card-title">Titulo Oferta de Trabajo</h5>
							<p className="card-text">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
								exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
								dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
								Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
								mollit anim id est laborum.
							</p>
							<button type="button" className="btn btn-warning Tag">
								#TAG
							</button>
							<button type="button" className="btn btn-warning Tag">
								#TAG
							</button>
							<button type="button" className="btn btn-warning Tag">
								#TAG
							</button>
							<button type="button" className="btn btn-warning Tag">
								#TAG
							</button>
						</div>
						<div className="card-body-detalleOferta">
							<h5 className="card-title">Titulo Oferta de Trabajo</h5>
							<p className="card-text">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
								exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
								dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
								Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
								mollit anim id est laborum.
							</p>
							<button type="button" className="btn btn-warning Tag">
								#TAG
							</button>
							<button type="button" className="btn btn-warning Tag">
								#TAG
							</button>
							<button type="button" className="btn btn-warning Tag">
								#TAG
							</button>
							<button type="button" className="btn btn-warning Tag">
								#TAG
							</button>
						</div>

						<div className="card-body-detalleOferta">
							<h5 className="card-title">Titulo Oferta de Trabajo</h5>
							<p className="card-text">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
								exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
								dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
								Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
								mollit anim id est laborum.
							</p>
							<button type="button" className="btn btn-warning Tag">
								#TAG
							</button>
							<button type="button" className="btn btn-warning Tag">
								#TAG
							</button>
							<button type="button" className="btn btn-warning Tag">
								#TAG
							</button>
							<button type="button" className="btn btn-warning Tag">
								#TAG
							</button>
						</div>
						<a className="btn btn-primary-wfh btn-lg mt-5">Nueva Oferta</a>
					</div>

					<div className="col-3 text-center mt-4">
						<BannerEmpresa />
					</div>
				</div>
			</div>
		</div>
	);
};
