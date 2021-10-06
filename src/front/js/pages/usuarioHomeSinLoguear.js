import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { BuscadorYFiltros } from "../component/buscadorYFiltros";
import { CardResumenOferta } from "../component/cardResumenOferta";
import "../../styles/home.scss";

export const HomeUsuarioSinLoguear = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div className="row">
				<div className="col-8 text-center mt-4">
					<h1>Home Usuario Sin Loguear</h1>
					<BuscadorYFiltros />
					<p>Columna para el componente buscador y el componente cards de las ofertas de trabajo</p>
					<CardResumenOferta />
					<CardResumenOferta />
				</div>
				<div className="col-4 text-center mt-4">
					<p>Sidebar</p>
				</div>
			</div>
		</div>
	);
};
