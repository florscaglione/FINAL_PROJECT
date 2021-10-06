import React, { Component } from "react";

export const BuscadorYFiltros = () => {
	return (
		<div className="container">
			<form className="d-flex">
				<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
				<button className="btn btn-outline-success" type="submit">
					Search
				</button>
			</form>
			<div className="m-1 d-flex flex-row-reverse bd-highlight">
				<button className="btn btn-primary m-1 btn-sm" type="submit">
					Filtro 1
				</button>
				<button className="btn btn-primary m-1 btn-sm" type="submit">
					Filtro 2
				</button>
				<button className="btn btn-primary m-1 btn-sm" type="submit">
					Filtro 3
				</button>
			</div>
		</div>
	);
};