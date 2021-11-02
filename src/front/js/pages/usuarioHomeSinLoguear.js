import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { BuscadorYFiltros } from "../component/buscadorYFiltros";
import { CardResumenOferta } from "../component/cardResumenOferta";
import { SidebarUsuario } from "../component/SidebarUsuario";
import "../../styles/home.scss";

export const HomeUsuarioSinLoguear = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div className="row">
				<div className="col-9 text-center mt-4">
					<BuscadorYFiltros />
					<CardResumenOferta />
					<CardResumenOferta />
					<CardResumenOferta />
					<CardResumenOferta />
				</div>
				<div className="col-3 text-center d-none d-md-block mt-4">
					<SidebarUsuario />
				</div>
			</div>
		</div>
	);
};
