import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { BannerEmpresa } from "../component/BannerEmpresa";

export const TableUserInscribed = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
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
						<td>Marks</td>
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
		</>
	);
};
