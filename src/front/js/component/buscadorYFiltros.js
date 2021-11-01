import React, { Component, useEffect, useState } from "react";

export const BuscadorYFiltros = () => {
	const [remotes, setRemotes] = useState();
	const [contracts, setContracts] = useState();
	const [salaries, setSalaries] = useState();

	/* useEffect(() => {
		loadRemotes();
		loadContracts();
		loadSalaries();
	}, []); */

	/* async function loadRemotes() {
		const url = `${process.env.BACKEND_URL}api/user-info/${id}/get`; // Revisar url con Flor
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		const data = await response.json();
		setRemotes(data);
	}

	async function loadContracts() {
		const url = `${process.env.BACKEND_URL}api/user-info/${id}/get`; // Revisar url con Flor
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		const data = await response.json();
		setContracts(data);
	}

	async function loadSalaries() {
		const url = `${process.env.BACKEND_URL}api/user-info/${id}/get`; // Revisar url con Flor
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		const data = await response.json();
		setSalaries(data);
	} */

	return (
		<div className="container">
			<form className="d-flex">
				<input
					className="form-control me-2"
					type="search"
					placeholder="Localizar ofertas"
					aria-label="Search"
				/>
				<button className="" type="submit">
					Buscar
				</button>
			</form>
			<div className="m-1 d-flex flex-row-reverse bd-highlight">
				<select className="form-select form-select-sm" aria-label="Default select example" type="submit">
					<option selected>Trabajo Remoto</option>
					{/* {remotes.map(remote => (
						<option key={index}> {remote} </option>
					))} */}
				</select>
				<select className="form-select form-select-sm" aria-label="Default select example" type="submit">
					<option selected>Tipo Contrato</option>
					{}
				</select>
				<select className="form-select form-select-sm" aria-label="Default select example" type="submit">
					<option selected>Rango Salarial</option>
					{}
				</select>
			</div>
		</div>
	);
};
