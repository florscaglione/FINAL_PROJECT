import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { BannerEmpresa } from "../component/BannerEmpresa";

export const CandidatosInscritos = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div className="row">
				<div className="col-9">
					<div className="card card-home">
						<div className="card-header">
							FULL STACK DEVELOPER TELETRABAJO
							{/* <button type="button" className="btn btn-outline-secondary m-1">
								#Skill1
							</button>
							<button type="button" className="btn btn-outline-secondary m-1">
								#Skill2
							</button>
							<button type="button" className="btn btn-outline-secondary m-1">
								#Skill3
							</button> */}
						</div>
						<div className="card-body">
							<h5 className="card-title">JLK GROUP SPAIN</h5>
							<h1 className="card-text">PROGRAMADOR FRONTEND</h1>

							<li className="m-1">100% remoto</li>
							<li className="m-1">Horarios flexibles</li>
							<li className="m-1">Contrato por obra y servicio</li>
							<li className="m-1">24.000€/año</li>
							<li className="m-1">
								Programador con experiencia en HTML/CSS, lenguajes javascript/typescript y frameworks
								angular o react. Formación bonificada
							</li>
							{/* <a className="btn btn-primary-wfh">Publicar oferta</a>
							<a className="btn btn-primary-wfh">Editar Oferta</a> */}
						</div>
					</div>
					<table className="table table-striped-wfh table-hover">
						<thead>
							<tr>
								<th scope="col 3">Nombre</th>
								<th scope="col 3">Apellidos</th>
								<th scope="col 3">Ver CV</th>
								<th scope="col 3">Preseleccionado</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Marta</td>
								<td>García Gil</td>
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
										<label className="form-check-label" htmlFor="flexCheckChecked">
											Preseleccionado
										</label>
									</div>
								</td>
							</tr>
							<tr>
								<td>Jacobo</td>
								<td>Noriega López</td>
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
										<label className="form-check-label" htmlFor="flexCheckChecked">
											Preseleccionado
										</label>
									</div>
								</td>
							</tr>
							<tr>
								<td>Jonathan</td>
								<td>Sierra Pérez</td>
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
										<label className="form-check-label" htmlFor="flexCheckChecked">
											Preseleccionado
										</label>
									</div>
								</td>
							</tr>
							<tr>
								<td>Marcos</td>
								<td>López Pérez</td>
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
										<label className="form-check-label" htmlFor="flexCheckChecked">
											Preseleccionado
										</label>
									</div>
								</td>
							</tr>
							<tr>
								<td>Natalia</td>
								<td>Campaña García</td>
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
										<label className="form-check-label" htmlFor="flexCheckChecked">
											Preseleccionado
										</label>
									</div>
								</td>
							</tr>
							<tr>
								<td>Mara</td>
								<td>Soriano Ríos</td>
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
										<label className="form-check-label" htmlFor="flexCheckChecked">
											Preseleccionado
										</label>
									</div>
								</td>
							</tr>
							<tr>
								<td>Paloma</td>
								<td>Téllez Pérez</td>
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
										<label className="form-check-label" htmlFor="flexCheckChecked">
											Preseleccionado
										</label>
									</div>
								</td>
							</tr>
							<tr>
								<td>Carlos</td>
								<td>Martín Pérez</td>
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
										<label className="form-check-label" htmlFor="flexCheckChecked">
											Preseleccionado
										</label>
									</div>
								</td>
							</tr>
							<tr>
								<td>Miguel</td>
								<td>Pérez Palomo</td>
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
										<label className="form-check-label" htmlFor="flexCheckChecked">
											Preseleccionado
										</label>
									</div>
								</td>
							</tr>
							<tr>
								<td>Laura</td>
								<td>Moreno Sanz</td>
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
										<label className="form-check-label" htmlFor="flexCheckChecked">
											Preseleccionado
										</label>
									</div>
								</td>
							</tr>
							<tr>
								<td>Alberto</td>
								<td>Delgado Muñoz</td>
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
										<label className="form-check-label" htmlFor="flexCheckChecked">
											Preseleccionado
										</label>
									</div>
								</td>
							</tr>
							<tr>
								<td>Martina</td>
								<td>Padilla Soto</td>
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
										<label className="form-check-label" htmlFor="flexCheckChecked">
											Preseleccionado
										</label>
									</div>
								</td>
							</tr>
							<tr>
								<td>Juan</td>
								<td>Martínez del Río</td>
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
										<label className="form-check-label" htmlFor="flexCheckChecked">
											Preseleccionado
										</label>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="col-3 text-center mt-4">
					<BannerEmpresa />
				</div>
			</div>
		</div>
	);
};
