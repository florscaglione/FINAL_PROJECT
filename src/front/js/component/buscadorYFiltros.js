import React, { Component, useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const BuscadorYFiltros = () => {
	const { store, actions } = useContext(Context);
	const [offers, setOffers] = useState([]);
	const [textSelected, setTextSelected] = useState("");

	useEffect(() => {
		loadOffers();
	}, []);

	async function loadOffers() {
		//NO ESTOY SEGURA DE SI ME SIRVE O SI ME SOBRA !!
		const response = await fetch(`${process.env.BACKEND_URL}api/offers`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		const data = await response.json();
		setOffers(data);
	}

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
					onChange={event => setTextSelected(event.target.value)}
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
		</div>
	);
};
