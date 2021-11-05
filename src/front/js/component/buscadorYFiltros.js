import React, { Component, useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { CardResumenOferta } from "../component/cardResumenOferta";

export const BuscadorYFiltros = () => {
	const { store, actions } = useContext(Context);
	const [offers, setOffers] = useState([]);
	const [textSelected, setTextSelected] = useState("");

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
			<form className=" buscador d-flex">
				<input
					className="form-control me-2"
					type="search"
					placeholder="Localizar ofertas"
					aria-label="Buscar"
					onChange={handleChange}
				/>
				<button className="btn btn-outline" type="button">
					Buscar
				</button>
			</form>

			{filteredResults.length == 0 && textSelected.length != 0 ? (
				<h1 className="text-center text-gray font-weight-bold mt-4 font-italic">
					No hay ofertas para esa profesión
				</h1>
			) : (
				<div className="hostels-Container text-center">
					<div className="row ml-5">
						{filteredResults.map((offer, id) => {
							return (
								<div key={id}>
									<CardResumenOferta offer={offer} />
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};
