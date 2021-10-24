import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const VistaOfertasPubli = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div className="container-fluid ">
				<a className="btn btn-primary">Nueva Oferta</a>
				<div className="row row-cols-1 row-cols-md-2 g-4">
					<div className="col">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title">Titulo Oferta de Trabajo</h5>
								<p className="card-text">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
									exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
									irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
									pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
									deserunt mollit anim id est laborum.
								</p>
								<button type="button" className="btn btn-warning">
									#TAG
								</button>
								<button type="button" className="btn btn-warning">
									#TAG
								</button>
								<button type="button" className="btn btn-warning">
									#TAG
								</button>
								<button type="button" className="btn btn-warning">
									#TAG
								</button>
							</div>
						</div>
						<div />
						<div className="col">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Titulo Oferta de Trabajo</h5>
									<p className="card-text">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
										incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
										nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
										Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
										fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
										culpa qui officia deserunt mollit anim id est laborum.
									</p>
									<button type="button" className="btn btn-warning">
										#TAG
									</button>
									<button type="button" className="btn btn-warning">
										#TAG
									</button>
									<button type="button" className="btn btn-warning">
										#TAG
									</button>
									<button type="button" className="btn btn-warning">
										#TAG
									</button>
								</div>
							</div>
						</div>
						<div className="col">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Titulo Oferta de Trabajo</h5>
									<p className="card-text">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
										incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
										nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
										Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
										fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
										culpa qui officia deserunt mollit anim id est laborum.
									</p>
									<button type="button" className="btn btn-warning">
										#TAG
									</button>
									<button type="button" className="btn btn-warning">
										#TAG
									</button>
									<button type="button" className="btn btn-warning">
										#TAG
									</button>
									<button type="button" className="btn btn-warning">
										#TAG
									</button>
								</div>
							</div>
						</div>
						<div className="col">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Titulo Oferta de Trabajo</h5>
									<p className="card-text">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
										incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
										nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
										Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
										fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
										culpa qui officia deserunt mollit anim id est laborum.
									</p>
									<button type="button" className="btn btn-warning">
										#TAG
									</button>
									<button type="button" className="btn btn-warning">
										#TAG
									</button>
									<button type="button" className="btn btn-warning">
										#TAG
									</button>
									<button type="button" className="btn btn-warning">
										#TAG
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
