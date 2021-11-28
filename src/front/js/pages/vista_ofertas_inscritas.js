import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { BuscadorYFiltros } from "../component/buscadorYFiltros";
import { CardResumenOferta } from "../component/cardResumenOferta";
import { SidebarUsuario } from "../component/SidebarUsuario";
import "../../styles/home.scss";

export const OfertasInscritasUsuario = () => {
	const { store, actions } = useContext(Context);

	//const [info, setInfo] = useState(); Guardar en el store la variable "info" y en el "actions" la función companyGet(),
	useEffect(() => {
		actions.offersByUserId();
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			{store.offersByUserId && store.offersByUserId.length == 0 ? (
				<div className="container">
					<div className="row mt-5">
						<div className="col-9 text-center mt-5">
							<p className="text-align-center sinofertas">Aún no te has inscrito a ninguna oferta.</p>
						</div>
						<div className="col-3 text-center d-none d-md-block mt-4">
							<SidebarUsuario />
						</div>
					</div>
				</div>
			) : (
				<div className="container">
					<div className="row mt-5">
						<div className="col-9">
							<div>
								<table className="table table-striped-wfh table-hover font">
									<thead className="titulotabla p-5">
										<tr>
											<th scope="col 6">Título</th>
											<th scope="col 3">Empresa</th>
											<th scope="col 3">Ver Oferta</th>
										</tr>
									</thead>
									<tbody>
										<>
											{store.offersByUserId.map((offerByUserId, index) => {
												return (
													<tr key={index}>
														<td className="m-3 pt-4 align-items-center">
															{offerByUserId.title}
														</td>
														<td className="m-3 pt-4 align-items-center">
															{offerByUserId.company.name}
														</td>
														<td className="pt-3 align-items-center">
															<button type="button" className="btn border border-3">
																Ver Oferta
															</button>
														</td>
													</tr>
												);
											})}
										</>
									</tbody>
								</table>
							</div>{" "}
						</div>
						<div className="col-3 text-center d-none d-md-block mt-4">
							<SidebarUsuario />
						</div>
					</div>
				</div>
			)}
		</>
	);
};
