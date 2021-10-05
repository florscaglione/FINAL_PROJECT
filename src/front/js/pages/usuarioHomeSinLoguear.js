import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const HomeUsuarioSinLoguear = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div className="row">
				<div className="col text-center mt-4">
					<h1>Home Usuario Sin Loguear</h1>
					<form className="d-flex">
						<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
						<button className="btn btn-outline-success" type="submit">
							Search
						</button>
					</form>
					<div className="">
						<div className="dropdown">
							<button
								className="btn btn-secondary dropdown-toggle"
								type="button"
								id="dropdownMenuButton1"
								data-bs-toggle="dropdown"
								aria-expanded="false">
								Filtro 1
							</button>
							<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
								<li>
									<a className="dropdown-item">Action</a>
								</li>
								<li>
									<a className="dropdown-item">Another action</a>
								</li>
								<li>
									<a className="dropdown-item">Something else here</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="col text-center mt-4">
					<p>Sidebar</p>
				</div>
			</div>
		</div>
	);
};
