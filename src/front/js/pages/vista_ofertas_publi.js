import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const VistaOfertasPubli = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div className="container-fluid ">
				<div className="row">
					<a className="navbar sticky-top navbar-expand-lg-brand bg-light col-md-6">Working from Home</a>
					<div className="btn-group justify-content-end col-md-6" role="group">
						<button data-toggle="modal" data-target="#exampleModal" className="btn btn-success">
							LOGIN
						</button>
						<button data-toggle="modal" data-target="#exampleModal" className="btn btn-success">
							REGISTRO
						</button>
					</div>
				</div>
			</div>
			<div className="card mb-3">
				<div className="card-body">
					<h5 className="card-title text-center">H1</h5>
				</div>
			</div>
			<div className="btn-group btn-primary btn-lg justify-content-end col-md-2 lg" role="group">
				<button data-toggle="modal" data-target="#exampleModal" className="btn btn-success">
					Nueva Oferta
				</button>
			</div>
			<div className="row row-cols-1 row-cols-md-2 g-4">
				<div className="col">
					<div className="card">
						<div className="card-body">
							<h5 className="card-title">Titulo Oferta de Trabajo</h5>
							<p className="card-text">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
								exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
								dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
								Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
								mollit anim id est laborum.
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
				<div />
				<div className="col">
					<div className="card">
						<div className="card-body">
							<h5 className="card-title">Titulo Oferta de Trabajo</h5>
							<p className="card-text">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
								exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
								dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
								Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
								mollit anim id est laborum.
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
								incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
								exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
								dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
								Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
								mollit anim id est laborum.
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
								incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
								exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
								dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
								Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
								mollit anim id est laborum.
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
			<div className="container">
				<footer className="row row-cols-5 py-5 my-5 border-top">
					<div className="col">
						<a href="/" className="d-flex align-items-center mb-3 link-dark text-decoration-none">
							<svg className="bi me-2" width="40" height="32" />
						</a>
						<p className="text-muted">© 2021</p>
					</div>
					<div className="col" />
					<div className="col">
						<h5>Section</h5>
						<ul className="nav flex-column">
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									Home
								</a>
							</li>
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									Features
								</a>
							</li>
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									Pricing
								</a>
							</li>
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									FAQs
								</a>
							</li>
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									About
								</a>
							</li>
						</ul>
					</div>

					<div className="col">
						<h5>Section</h5>
						<ul className="nav flex-column">
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									Home
								</a>
							</li>
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									Features
								</a>
							</li>
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									Pricing
								</a>
							</li>
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									FAQs
								</a>
							</li>
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									About
								</a>
							</li>
						</ul>
					</div>

					<div className="col">
						<h5>Section</h5>
						<ul className="nav flex-column">
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									Home
								</a>
							</li>
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									Features
								</a>
							</li>
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									Pricing
								</a>
							</li>
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									FAQs
								</a>
							</li>
							<li className="nav-item mb-2">
								<a href="#" className="nav-link p-0 text-muted">
									About
								</a>
							</li>
						</ul>
					</div>
				</footer>
			</div>
		</div>
	);
};
