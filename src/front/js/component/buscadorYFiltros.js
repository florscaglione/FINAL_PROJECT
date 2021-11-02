import React, { Component } from "react";

export const BuscadorYFiltros = () => {
	return (
		<div className="container-fluid">
			<form className=" buscador d-flex">
				<input
					className="form-control me-2"
					type="search"
					placeholder="Localizar ofertas"
					aria-label="Buscar"
				/>
				<button className="btn btn-outline" type="submit">
					Buscar
				</button>
			</form>
			<div className="filtros m-1 d-flex flex-row-reverse bd-highlight">
				<button className="btn btn-primary-wfh m-1 btn-sm" type="submit">
					Filtro 1
				</button>
				<button className="btn btn-primary-wfh m-1 btn-sm" type="submit">
					Filtro 2
				</button>
				<button className="btn btn-primary-wfh m-1 btn-sm" type="submit">
					Filtro 3
				</button>
			</div>
		</div>
	);
};
