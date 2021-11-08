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
		actions.companyOffersGet(localStorage.getItem("companyLoggedIn")); // trae todas las ofertas publicadas de la empresa
	}, []);
	console.log("----------", store.companyOffersList);

	return (
		<>
			{store.companyOffersList && store.companyOffersList.length == 0 ? (
				<div className="container">
					<div className="row rows-cols-2">
						<div className="col-9">
							<div className="vacio">
								<p className="cabecera mb-5">
									<h4>Bienvenido! Las ofertas que has publicado con nosotros son las siguientes:</h4>
									<h4>No hay ofertas disponibles</h4>
								</p>
							</div>
						</div>
						<div className="col-3 text-center mt-4">
							<BannerEmpresa />
						</div>
					</div>
				</div>
			) : (
				<div className="container">
					<div className="row rows-cols-2">
						<div className="col-9">
							<div className="vacio">
								<p className="cabecera mb-5">
									{/* <h4>Bienvenido! Las ofertas que has publicado con nosotros son las siguientes:</h4>
									<h4>Ofertas publicadas</h4> */}
								</p>
							</div>
							<button
								type="button"
								className="btn btn-outline-primary-wfh"
								data-bs-toggle="modal"
								data-bs-target="#idCreateOfferCompany">
								<i className="fas fa-plus" /> Nueva oferta
							</button>
							<ModalCompanyOffer
								icon={"plus"}
								offer={localStorage.getItem("companyLoggedIn")}
								id={"idCreateOfferCompany"}
							/>
							{store.companyOffersList.map((offer, index) => {
								return (
									<div key={index} className="container">
										<div className="row">
											<div className="col-12">
												<OfferCard offer={offer} />
											</div>
										</div>
									</div>
								);
							})}
						</div>
						<div className="col-3 text-center mt-4">
							<BannerEmpresa />
						</div>
					</div>
				</div>
			)}
		</>
	);
};
