import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { BuscadorYFiltros } from "../component/buscadorYFiltros";
import { CardResumenOferta } from "../component/cardResumenOferta";
import { SidebarUsuario } from "../component/SidebarUsuario";
import "../../styles/home.scss";

export const HomeUsuarioSinLoguear = () => {
	const { store, actions } = useContext(Context);

	//const [info, setInfo] = useState(); Guardar en el store la variable "info" y en el "actions" la función companyGet(),
	useEffect(() => {
		actions.allOffersGet();
		window.scrollTo(0, 0);
	}, []);
	console.log("----------", store.allOffersList); // Funciona trae todas la ofertas publicadas

	return (
		<>
			{store.allOffersList && store.allOffersList.length == 0 ? (
				<div className="container">
					<div className="row">
						<div className="col-9 text-center mt-1">
							<BuscadorYFiltros />
						</div>
						<div className="col-3 text-center d-none d-md-block mt-4">
							<SidebarUsuario />
						</div>
					</div>
				</div>
			) : (
				<div className="container buscadortexto">
					<div className="row">
						<div className="col-9 text-right mt-1">
							<BuscadorYFiltros />
						</div>
						<div className="col-3 text-center d-none d-md-block mt-5">
							<SidebarUsuario />
						</div>
					</div>
				</div>
			)}
		</>
	);
};
