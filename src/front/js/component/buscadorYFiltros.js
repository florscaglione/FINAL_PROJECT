import React, { Component, useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { CardResumenOferta } from "../component/cardResumenOferta";
import { ModalAccessDenied } from "./ModalAccessDenied";

export const BuscadorYFiltros = () => {
	const { store, actions } = useContext(Context);
	const [offers, setOffers] = useState([]);
	const [textSelected, setTextSelected] = useState("");
	const [alertModal, setAlertModal] = useState(false);

	const handleChange = event => {
		setTextSelected(event.target.value);
	};

	let filteredResults = [];

	if (store.allOffersList != undefined) {
		console.log("store.allOffersList ", store.allOffersList);
		filteredResults = store.allOffersList.filter(offer => {
			if (textSelected == "") {
				return true; // True significa que devuelva allOffersList
			} else if (offer.title.toLowerCase().includes(textSelected.toLowerCase())) {
				return true; // True significa que devuelva SOLO las ofertas que incluyan en su título lo escrito en el buscador
			}
			return false; // False significa que si no se cumple ninguna condición anterior, no devuelva nada
		});
	}

	console.log(store.allOffersList);

	console.log("filteredResults", filteredResults);

	useEffect(() => {
		actions.allOffersGet();
	}, []);

	useEffect(() => {
		search();
	}, []);

	async function search() {
		const response = await fetch(`${process.env.BACKEND_URL}api/search`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				text_selected: textSelected
			})
		});
		const data = await response.json();
		setTextSelected(data);
	}

	return (
		<div className="container-fluid">
			{alertModal ? <ModalAccessDenied close={() => setAlertModal(false)} /> : ""}
			<form className=" buscador d-flex">
				<input
					className="form-control me-2"
					type="search"
					placeholder="Localizar ofertas"
					aria-label="Buscar"
					onChange={handleChange}
				/>
				<button className="btn btn-outline" type="button">
					<i className="fas fa-search" />
				</button>
			</form>
			{filteredResults.length == 0 && textSelected.length != 0 ? (
				<div className="row">
					<div className="col-12">
						<div className="jumbotron jumbotron-fluid mt-5 jumbofertas">
							<div className="container p-0">
								<p className="text-align-center sinofertas">
									Lo sentimos, no hemos localizado ninguna oferta con esa descripción. Ajuste la
									búsqueda con otras palabras clave.
								</p>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="filter-Container text-center">
					<div className="row ml-5">
						{filteredResults.map((offer, id) => {
							return (
								<div key={id}>
									<CardResumenOferta offer={offer} change={() => setAlertModal(true)} />
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};
