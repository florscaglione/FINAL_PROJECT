import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const CandidatosInscritos = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div className="row">
				<div className="card col-8">
					<div className="card-header">
						TÍTULO OFERTA DE TRABAJO
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
						<h5 className="card-title">Nombre empresa</h5>
						<p className="card-text">
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
							laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
							architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
							aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
							voluptatem sequi nesciunt.
						</p>
						<button type="button" className="btn btn-info">
							Editar Oferta
						</button>
					</div>
				</div>
			</div>
			<table className="table table-striped table-hover">
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
								<input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
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
								<input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
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
								<input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
								<label className="form-check-label" htmlFor="flexCheckChecked">
									Checked checkbox
								</label>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
