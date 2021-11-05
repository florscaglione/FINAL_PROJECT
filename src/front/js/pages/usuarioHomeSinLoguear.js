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
					<h1>Ofertas disponible</h1>
					<BuscadorYFiltros />
					<div className="row">
						<div className="col-9 text-center mt-4">
							<h2>No hay ofertas</h2>
						</div>
						<div className="col-3 text-center d-none d-md-block mt-4">
							<SidebarUsuario />
						</div>
					</div>
				</div>
			) : (
				<div className="container">
					<h2 className="mt-5 ms-4">Últimas ofertas</h2>
					<div className="row">
						<div className="col-9 text-center">
							<BuscadorYFiltros />
							{/* {store.allOffersList.map((offer, index) => {
								return (
									<div key={index}>
										<CardResumenOferta offer={offer} />
									</div>
								);
							})} */}
						</div>
						<div className="col-3 text-center d-none d-md-block">
							<SidebarUsuario />
						</div>
					</div>
				</div>
			)}
		</>
	);
};
