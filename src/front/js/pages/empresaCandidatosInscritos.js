import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

import { BannerEmpresa } from "../component/BannerEmpresa";
import { TableUserInscribed } from "../component/tableUserInscribed";

export const CandidatosInscritos = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.companyGet(1); // trae la información de la empresa
		actions.offerGet(2);

		// trae la información de la oferta
	}, []);

	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-9">
						<div className="card card-home">
							<div className="card-header">{store.offerInfo.title}</div>
							<div className="card-body">
								<h5 className="card-title">{store.offerInfo.remote_work}</h5>
								<p className="card-text">{store.offerInfo.offer_description}</p>
								<a className="btn btn-primary-wfh">Publicar oferta</a>
								<a className="btn btn-primary-wfh">Editar Oferta</a>
							</div>
						</div>
						<TableUserInscribed />
					</div>
					<div className="col-3 text-center mt-4">
						<BannerEmpresa />
					</div>
				</div>
			</div>
		</>
	);
};
