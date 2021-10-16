import React, { Component } from "react";
import PropTypes from "prop-types";

export const ModalUserProfile = () => {
	return (
		<>
			<button
				type="button"
				className="btn btn-primary mx-1"
				data-bs-toggle="modal"
				data-bs-target="#ModalUserProfile">
				Editar perfil
			</button>

			<div
				className="modal fade"
				id="ModalUserProfile"
				tabIndex="-1"
				aria-labelledby="userProfileLabel"
				aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h2 className="modal-title" id="userProfileLabel">
								Perfil profesional
							</h2>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
						</div>
						<div className="modal-body">
							<div className="row">
								<div className="col-8">
									<h4>Añadir / editar perfil</h4>
								</div>
								<div className="col-4 d-flex justify-content-end">
									<button type="button" className="btn btn-outline-primary mx-1">
										<i className="fas fa-plus" />
									</button>
								</div>
								<div className="row mt-2">
									<div className="col-10">
										<input
											type="text"
											className="form-control"
											placeholder="Perfil profesional"
											aria-describedby="professionHelp"
										/>
									</div>
									<div className="col-2 d-flex justify-content-end">
										<button type="button" className="btn btn-outline-primary">
											<i className="far fa-trash-alt" />
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="modal-footer">
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