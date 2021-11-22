import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { useParams } from "react-router-dom";
import { BannerEmpresa } from "../component/BannerEmpresa";
import { OfferUserInscripted } from "../component/offerUserInscripted";

export const CandidatosInscritos = () => {
	const { store, actions } = useContext(Context);

	const [usersInscripted, setUsersInscripted] = useState([]);

	const params = useParams();

	useEffect(() => {
		getUsersInscripted();
		window.scrollTo(0, 0);
	}, []);

	const getUsersInscripted = async () => {
		const url = `${process.env.BACKEND_URL}api/offer/${params.id}/inscription-user`;
		const token = localStorage.getItem("token"); // Almacenar el token en una variable desde el localStorage
		if (token && token != "" && token != undefined) {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token // Autorización para enviar el token, importante no quitar el espacio del "Bearer "
				}
			});
			const data = await response.json();
			console.log("usersInscripted###########", data); // Nota: no borrar
			if (response.ok) {
				setUsersInscripted(data);
			}
		}
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-9 mt-5">
					<OfferUserInscripted id={params.id} />

					{usersInscripted.length == 0 ? (
						<div>
							<p className="text-align-center sinofertas">No hay usuarios inscritos en esta oferta</p>
						</div>
					) : (
						<div>
							<table className="table table-striped-wfh table-hover font">
								<thead>
									<tr>
										<th scope="col 3">Nombre</th>
										<th scope="col 3">Apellidos</th>
										<th scope="col 3">Ver CV</th>
										<th scope="col 3">Preseleccionado</th>
									</tr>
								</thead>
								<tbody>
									<>
										{usersInscripted.map((userInscripted, index) => {
											return (
												<tr key={index}>
													<td>{userInscripted.name}</td>
													<td>{userInscripted.lastname}</td>
													<td>
														<button type="button" className="btn btn-outline-secondary">
															CV
														</button>
													</td>
													<td>
														<div className="form-check">
															<input
																className="form-check-input"
																type="checkbox"
																value=""
																id="flexCheckChecked"
															/>
															<label
																className="form-check-label"
																htmlFor="flexCheckChecked">
																Preseleccionado
															</label>
														</div>
													</td>
												</tr>
											);
										})}
									</>
								</tbody>
							</table>
						</div>
					)}
				</div>
				<div className="col-3 text-center mt-4">
					<BannerEmpresa />
				</div>
			</div>
		</div>
	);
};
