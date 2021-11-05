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
				return true;
			} else if (offer.title.toLowerCase().includes(textSelected.toLowerCase())) {
				return true;
			}
			return false;
		});
	}

	console.log(store.allOffersList);

	console.log("filteredResults", filteredResults);

	useEffect(() => {
		//NO ESTOY SEGURA DE SI ME SIRVE O SI ME SOBRA !! (tanto el useEffect como el loadOffers)
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
				<button className="btn btn-outline" type="submit">
					Buscar
				</button>
			</form>
			{/* 			<div className="filtros m-1 d-flex flex-row-reverse bd-highlight">
				<button className="btn btn-primary-wfh m-1 btn-sm" type="submit">
					Filtro 1
				</button>
				<button className="btn btn-primary-wfh m-1 btn-sm" type="submit">
					Filtro 2
				</button>
				<button className="btn btn-primary-wfh m-1 btn-sm" type="submit">
					Filtro 3
				</button>
			</div> */}

			{filteredResults.length == 0 && textSelected.length != 0 ? (
				<h1 className="text-center text-white font-weight-bold mt-4 font-italic">
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
