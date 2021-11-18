import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { BuscadorYFiltros } from "../component/buscadorYFiltros";
import { CardResumenOferta } from "../component/cardResumenOferta";
import { SidebarUsuario } from "../component/SidebarUsuario";
import "../../styles/home.scss";

export const OfertasInscritasUsuario = () => {
	const { store, actions } = useContext(Context);

	//const [info, setInfo] = useState(); Guardar en el store la variable "info" y en el "actions" la función companyGet(),
	useEffect(() => {
		actions.offerByUserId();
	}, []);

	return (
		<>
			{store.offerByUserId && store.offerByUserId.length == 0 ? (
				<div className="container">
					<div className="row">
						<div className="col-9 text-center">
							<BuscadorYFiltros />
						</div>
						<div className="col-3 text-center d-none d-md-block mt-4">
							<SidebarUsuario />
						</div>
					</div>
				</div>
			) : (
				<div className="container buscadortexto">
					<div className="row mt-4">
						<div className="col-9 text-right mt-5">falta EL MAP DE STOR.OFFERBYUSERID</div>
						<div className="col-3 text-center d-none d-md-block">
							<SidebarUsuario />
						</div>
					</div>
				</div>
			)}
		</>
	);
};