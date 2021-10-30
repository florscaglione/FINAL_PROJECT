import React, { Component, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const ModalUserAcademic = ({ info, icon, id, show, onClose }) => {
	const { store, actions } = useContext(Context);

	const [userAcademic, setUserAcademic] = useState({
		academic_degree: "",
		study_center: "",
		start_date: "", // Revisar la fecha y los checkbox para que se puedan editar
		end_date: "",
		in_progress: false,
		is_academic: false
	});

	useEffect(
		() => {
			if (info) {
				setUserAcademic(info);
			}
		},
		[info]
	);

	const handleChange = event => {
		setUserAcademic({
			...userAcademic,
			[event.target.name]: event.target.type == "checkbox" ? event.target.checked : event.target.value // Recoge la información del event junto al checkbox.
		});
		console.log("Prueba del checkbox", event.target.value);
	};

	const handleUserUpdate = async event => {
		event.preventDefault(); // Para evitar que se lance el evento del submit al cargar la página

		/* console.log("*********", userAcademic); */
		/* console.log("USER", user); */
		if (icon == "edit") {
			const url = `${process.env.BACKEND_URL}api/user-info-training/edit/${info.id}`; // id de la formación

			const response = await fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(userAcademic)
			});
			if (response.ok) {
				actions.userGet(store.userInfo.user_basic.id); // actualiza la información en la vista al pulsar sobre el botón de guardar, añadir else en el caso de que haya algún error
			}
		}
		if (icon == "plus") {
			const url = `${process.env.BACKEND_URL}api/user-info-training/${store.userInfo.user_basic.id}/create`;

			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(userAcademic)
			});
			if (response.ok) {
				actions.userGet(store.userInfo.user_basic.id); // actualiza la información en la vista al pulsar sobre el botón de guardar
			}
		}
	};

	const validateInputs = userAcademic => {
		// Validación de los inputs antes de guardar el modal
		if (
			userAcademic.academic_degree.trim() != "" &&
			userAcademic.study_center.trim() != "" &&
			userAcademic.start_date.trim() != ""
		) {
			return validateInputs();
		} else {
		}
	};

	return (
		<form onChange={handleChange} onSubmit={handleUserUpdate}>
			{/* <button 
				type="button"
				className="btn btn-outline-primary"
				data-bs-toggle="modal"
				data-bs-target="#ModalUserAcademic">
				<i className={`fas fa-${icon}`} />
			</button> */}

			<div className="modal fade" id={id} tabIndex="-1" aria-labelledby="userAcademicLabel" aria-hidden="true">
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
											defaultValue={
												icon == "edit" ? info.academic_degree : userAcademic.academic_degree
											}
											name="academic_degree"
											placeholder="Título"
											aria-describedby="professionHelp"
											required
										/>
										<input
											type="text"
											className="mt-2 form-control"
											defaultValue={
												icon == "edit" ? info.study_center : userAcademic.study_center
											}
											name="study_center"
											placeholder="Centro de estudios"
											aria-describedby="professionHelp"
											required
										/>
										<div className="form-check mt-2">
											<input
												className="form-check-input"
												name="in_progress"
												type="checkbox"
												checked={userAcademic.in_progress}
												id="flexCheckDefault"
											/>
											<label className="form-check-label " forHTML="flexCheckDefault">
												Actualmente en curso
											</label>
										</div>
										<input
											type="date"
											className="mt-2 form-control"
											defaultValue={icon == "edit" ? info.start_date : userAcademic.start_date}
											name="start_date"
											placeholder="Fecha de inicio"
											aria-describedby="professionHelp"
											required
										/>
										<input
											type="date"
											className="mt-2 form-control"
											defaultValue={icon == "edit" ? info.end_date : userAcademic.end_date}
											name="end_date"
											placeholder="Fecha de fin"
											aria-describedby="professionHelp"
										/>

										<div className="form-check mt-2">
											<input
												className="form-check-input"
												name="is_academic"
												type="checkbox"
												checked={userAcademic.is_academic}
												id="flexCheckChecked"
											/>
											<label className="form-check-label" forHTML="flexCheckChecked">
												Formación académica reglada
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
							<button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
								Guardar
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

ModalUserAcademic.propTypes = {
	info: PropTypes.object,
	icon: PropTypes.string,
	id: PropTypes.number,
	show: PropTypes.object,
	onClose: PropTypes.func
};
