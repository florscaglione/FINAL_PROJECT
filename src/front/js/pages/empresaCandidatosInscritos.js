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
							<button type="button" className="btn btn-outline-secondary m-1">
								#Skill1
							</button>
							<button type="button" className="btn btn-outline-secondary m-1">
								#Skill2
							</button>
							<button type="button" className="btn btn-outline-secondary m-1">
								#Skill3
							</button>
						</div>
						<div className="card-body">
							<h5 className="card-title">JLK GROUP SPAIN</h5>
							<p className="card-text">
								Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
								laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
								architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
								sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
								voluptatem sequi nesciunt.
							</p>
							<a className="btn btn-primary-wfh">Publicar oferta</a>
							<a className="btn btn-primary-wfh">Editar Oferta</a>
						</div>
					</div>
					<table className="table table-striped-wfh table-hover">
						<thead>
							<tr>
								<th scope="col 3">Nombre</th>
								<th scope="col 3">Afinidad con el puesto</th>
								<th scope="col 3">Ver CV</th>
								<th scope="col 3">Preseleccionado</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Mark</td>
								<td>Si</td>
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
											Checked checkbox
										</label>
									</div>
								</td>
							</tr>
							<tr>
								<td>Jacob</td>
								<td>No</td>
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
											Checked checkbox
										</label>
									</div>
								</td>
							</tr>
							<tr>
								<td>John</td>
								<td>Si</td>
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
											Checked checkbox
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
