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
				<div className="container ">
					<div className="row rows-cols-2 mt-5 ">
						<div className="col-9 mt-4 ">
							<div className="vacio ">
								<div className="row">
									<div className="col-12">
										<div className="jumbotron jumbotron-fluid jumbofertas">
											<div className="container p-0">
												<p className="text-align-center sinofertas">
													Lo sentimos, no hemos localizado ninguna oferta.
												</p>
											</div>
										</div>
									</div>
								</div>
								<button
									type="button"
									className="btn btn-primary-wfh btn-sm justify-content-end mt-4 btnoferta"
									data-bs-toggle="modal"
									data-bs-target="#idCreateOfferCompany">
									<i className="fas fa-plus" /> Nueva oferta
								</button>
								<ModalCompanyOffer
									icon={"plus"}
									offer={localStorage.getItem("companyLoggedIn")}
									id={"idCreateOfferCompany"}
								/>
							</div>
						</div>
						<div className="col-3 text-center mt-4">
							<BannerEmpresa />
						</div>
					</div>
				</div>
			) : (
				<div className="container">
					<div className="row rows-cols-2 mt-5">
						<div className="col-9 mt-4">
							<button
								type="button"
								className="btn btn-primary-wfh btn-sm justify-content-end ms-5 btnoferta"
								data-bs-toggle="modal"
								data-bs-target="#idCreateOfferCompany">
								<i className="fas fa-plus me-3 " /> Nueva oferta
							</button>
							<ModalCompanyOffer
								icon={"plus"}
								offer={localStorage.getItem("companyLoggedIn")}
								id={"idCreateOfferCompany"}
							/>
							{store.companyOffersList.map(offer => {
								return (
									<div key={offer.id} className="container">
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
