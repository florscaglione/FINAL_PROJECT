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
	}, []);
	console.log("----------", store.allOffersList); // Funciona trae todas la ofertas publicadas

	return (
		<>
			{store.allOffersList && store.allOffersList.length == 0 ? (
				<div className="container">
					<div className="row">
						<div className="col-8">
							<h1>No hay ofertas</h1>
						</div>
					</div>
				</div>
			) : (
				<div className="container">
					<h1>Ofertas publicadas</h1>
					<BuscadorYFiltros />
					{store.allOffersList.map((offer, index) => {
						return (
							<div key={index} className="container">
								<div className="row">
									<div className="col-8">
										<CardResumenOferta offer={offer} />
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</>
	);
};
