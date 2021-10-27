import React, { Component, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const ModalUserExperience = ({ info, icon, id }) => {
	const { store, actions } = useContext(Context);

	const [userExperience, setUserExperience] = useState({
		title: "",
		description: "",
		start_date: "",
		end_date: "",
		in_progress: false
	});

	useEffect(
		() => {
			if (info) {
				setUserExperience(info);
			}
		},
		[info]
	);

	const handleChange = event => {
		setUserExperience({
			...userExperience,
			[event.target.name]: event.target.type == "checkbox" ? event.target.checked : event.target.value // Recoge la información del event junto al checkbox.
		});
		console.log("Prueba del checkbox", userExperience);
	};

	const handleUserUpdate = async event => {
		event.preventDefault();

		if (icon == "edit") {
			const url = `${process.env.BACKEND_URL}api/user-info-experience/${info.id}`; // id de la experiencia

			const response = await fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(userExperience)
			});
			if (response.ok) {
				actions.userGet(store.userInfo.user_basic.id); // añadir un else para mostrar un error en caso de que no funcione
			}
		}
		if (icon == "plus") {
			const url = `${process.env.BACKEND_URL}api/user-info-experience/${store.userInfo.user_basic.id}/create`;

			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(userExperience)
			});
		}
	};

	return (
		<form onChange={handleChange} onSubmit={handleUserUpdate}>
			{/* <button
				type="button"
				className="btn btn-outline-primary"
				data-bs-toggle="modal"
				data-bs-target="#ModalUserExperience">
				<i className="fas fa-edit" />
			</button> */}

			<div className="modal fade" id={id} tabIndex="-1" aria-labelledby="userExperienceLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h2 className="modal-title" id="userExperienceLabel">
								Experiencia profesional
							</h2>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
						</div>
						<div className="modal-body">
							<div className="row">
								<div className="col-8">
									<h4>Editar experiencia laboral</h4>
								</div>

								<div className="row mt-2">
									<div className="col-12">
										<input
											type="text"
											className="mt-2 form-control"
											defaultValue={icon == "edit" ? info.title : userExperience.title}
											name="title"
											placeholder="Título"
											aria-describedby="professionHelp"
										/>
										<input
											type="text"
											className="mt-2 form-control"
											defaultValue={
												icon == "edit" ? info.description : userExperience.description
											}
											name="description"
											placeholder="Descripción"
											aria-describedby="professionHelp"
										/>
										<input
											type="date"
											className="mt-2 form-control"
											defaultValue={icon == "edit" ? info.start_date : userExperience.start_date}
											name="start_date"
											placeholder="Fecha de inicio"
											aria-describedby="professionHelp"
										/>
										<input
											type="date"
											className="mt-2 form-control"
											defaultValue={icon == "edit" ? info.end_date : userExperience.end_date}
											name="end_date"
											placeholder="Fecha de fin"
											aria-describedby="professionHelp"
										/>
										<div className="form-check mt-2">
											<input
												className="form-check-input"
												defaultValue={userExperience.in_progress}
												name="in_progress"
												type="checkbox"
												checked={userExperience.in_progress}
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
							<button type="submit" className="btn btn-primary">
								Guardar
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

ModalUserExperience.propTypes = {
	info: PropTypes.object,
	icon: PropTypes.string,
	id: PropTypes.number
};
