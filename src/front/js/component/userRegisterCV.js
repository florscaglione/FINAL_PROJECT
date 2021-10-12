import React, { Component } from "react";
import PropTypes from "prop-types";

export const UserRegisterCV = () => {
	return (
		<>
			<div
				className="modal fade"
				id="userRegisterCV"
				tabIndex="-1"
				aria-labelledby="secondModalLabel"
				aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h2 className="modal-title" id="secondModalLabel">
								Alta currículum - paso 2
							</h2>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
						</div>
						<div className="modal-body">
							<h5>Rellene su curriculum</h5>
							<div className="mb-3">
								<label forHTML="professionInput" className="form-label">
									Perfil profesional
								</label>
								<input
									type="text"
									className="form-control"
									placeholder="Perfil profesional"
									aria-describedby="professionHelp"
								/>
							</div>
							<div className="mb-3">
								<label forHTML="academicTrainingInput" className="form-label">
									Formación académica
								</label>
								<input
									type="text"
									className="form-control"
									placeholder="Formación académica"
									aria-describedby="academicTrainingHelp"
								/>
							</div>
							<div className="mb-3">
								<label forHTML="furtherTrainingInput" className="form-label">
									Formación complementaria
								</label>
								<input
									type="text"
									className="form-control"
									placeholder="Formación complementaria"
									aria-describedby="furtherTrainingHelp"
								/>
							</div>
							<label forHTML="basic-url" className="form-label">
								Experiencia
							</label>
							<div className="input-group mb-3">
								<span className="input-group-text">Experiencia laboral</span>
								<textarea className="form-control" aria-label="With textarea" />
							</div>

							<label forHTML="basic-url" className="form-label">
								Habilidades
							</label>
							<div className="input-group mb-3">
								<input
									type="text"
									className="form-control"
									placeholder="Añadir habilidades o skills"
									aria-label="skillsInput"
									aria-describedby="button-addon2"
								/>
								<button className="btn btn-outline-secondary" type="button" id="button-addon2">
									Añadir
								</button>
							</div>
							<div className="justify-content-start mb-3">
								<span className="badge bg-secondary mx-1">
									#skill1
									<span className="badge bg-secondary">X</span>
								</span>
								<span className="badge bg-secondary mx-1">
									#skill2
									<span className="badge bg-secondary">X</span>
								</span>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
								Cerrar
							</button>
							<button type="button" className="btn btn-primary">
								Finalizar
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
