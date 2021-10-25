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
					<BuscadorYFiltros />
					<CardResumenOferta />
					<CardResumenOferta />
					<CardResumenOferta />
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
