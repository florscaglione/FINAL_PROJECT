import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { BuscadorYFiltros } from "../component/buscadorYFiltros";
import { CardResumenOferta } from "../component/cardResumenOferta";
import "../../styles/home.scss";

export const HomeUsuarioSinLoguear = () => {
	const { store, actions } = useContext(Context);

	//const [info, setInfo] = useState(); Guardar en el store la variable "info" y en el "actions" la función companyGet(),
	useEffect(() => {
		actions.allOffersGet();
	}, []);
	console.log("----------", store.allOffersList); // Funciona trae todas la ofertas publicadas

	return (
		<div className="container">
			<div className="row">
				<div className="col-8 text-center mt-4">
					<BuscadorYFiltros />
					<CardResumenOferta />
				</div>
				<div className="col-4 text-center mt-4">
					<p>Sidebar</p>
				</div>
			</div>
		</div>
	);
};
