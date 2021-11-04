import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { BannerEmpresa } from "../component/BannerEmpresa";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

import { OfferCard } from "../component/offerCard";
import { ModalCompanyOffer } from "../../js/component/modalCompanyOffer";

export const VistaOfertasPubli = () => {
	const { store, actions } = useContext(Context);

	//const [info, setInfo] = useState(); Guardar en el store la variable "info" y en el "actions" la función companyGet(),
	useEffect(() => {
		actions.companyOffersGet(2); // trae todas las ofertas publicadas de la empresa
	}, []);
	console.log("----------", store.companyOffersList);

	return (
		<>
			{store.companyOffersList && store.companyOffersList.length == 0 ? (
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
					<button
						type="button"
						className="btn btn-outline-primary m-2"
						data-bs-toggle="modal"
						data-bs-target="#idCreateOfferCompany">
						<i className="fas fa-plus" /> Nueva oferta
					</button>
					<ModalCompanyOffer icon={"plus"} offer={{ company_id: 2 }} id={"idCreateOfferCompany"} />
					{store.companyOffersList.map((offer, index) => {
						return (
							<div key={index} className="container">
								<div className="row">
									<div className="col-8">
										<OfferCard offer={offer} />
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
