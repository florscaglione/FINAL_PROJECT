import React, { Component } from "react";
import PropTypes from "prop-types";

export const ModalUserAcademic = () => {
	return (
		<>
			<button
				type="button"
				className="btn btn-outline-primary"
				data-bs-toggle="modal"
				data-bs-target="#ModalUserAcademic">
				<i className="fas fa-edit" />
			</button>

			<div
				className="modal fade"
				id="ModalUserAcademic"
				tabIndex="-1"
				aria-labelledby="userAcademicLabel"
				aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h2 className="modal-title" id="userAcademicLabel">
								Formación académica
							</h2>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
						</div>
						<div className="modal-body">
							<div className="row">
								<div className="col-8">
									<h4>Editar estudios</h4>
								</div>

								<div className="row mt-2">
									<div className="col-12">
										<input
											type="text"
											className="mt-2 form-control"
											placeholder="Título"
											aria-describedby="professionHelp"
										/>
										<input
											type="text"
											className="mt-2 form-control"
											placeholder="Centro de estudios"
											aria-describedby="professionHelp"
										/>
										<input
											type="text"
											className="mt-2 form-control"
											placeholder="Fecha de inicio"
											aria-describedby="professionHelp"
										/>
										<input
											type="text"
											className="mt-2 form-control"
											placeholder="Fecha de fin"
											aria-describedby="professionHelp"
										/>
										<div className="form-check mt-2">
											<input
												className="form-check-input"
												type="checkbox"
												value=""
												id="flexCheckDefault"
											/>
											<label className="form-check-label " forHTML="flexCheckDefault">
												Formación reglada
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												value=""
												id="flexCheckChecked"
											/>
											<label className="form-check-label" forHTML="flexCheckChecked">
												Actualmente en curso
											</label>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-outline-danger">
								Eliminar
							</button>
							<button type="button" className="btn btn-primary">
								Guardar
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
