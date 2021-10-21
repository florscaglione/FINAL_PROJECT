import React, { Component, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const ModalUserAcademic = ({ info }) => {
	const { store, actions } = useContext(Context);

	const [userAcademic, setUserAcademic] = useState({
		academic_degree: "",
		study_center: "",
		start_date: "",
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
		setUserAcademic({ ...userAcademic, [event.target.name]: event.target.value });
		console.log(userAcademic);
	};

	const handleUserUpdate = async event => {
		event.preventDefault(); // Para evitar que se lance el evento del submit al cargar la página
		console.log("*********", userAcademic);
		/* console.log("USER", user); */
		const url = `${process.env.BACKEND_URL}api/user-info-training/${store.userInfo.user_basic.id}/create`;

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(userAcademic)
		});
	};

	return (
		<form onChange={handleChange} onSubmit={handleUserUpdate}>
			<button // Revisar con mari el botón para seleccionar la formación y que sea editable para cada una de las formaciones
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
											defaultValue={userAcademic.academic_degree}
											name="academic_degree"
											placeholder="Título"
											aria-describedby="professionHelp"
										/>
										<input
											type="text"
											className="mt-2 form-control"
											defaultValue={userAcademic.study_center}
											name="study_center"
											placeholder="Centro de estudios"
											aria-describedby="professionHelp"
										/>
										<input
											type="date"
											className="mt-2 form-control"
											defaultValue={userAcademic.start_date}
											name="start_date"
											placeholder="Fecha de inicio"
											aria-describedby="professionHelp"
										/>
										<input
											type="date"
											className="mt-2 form-control"
											defaultValue={userAcademic.end_date}
											name="end_date"
											placeholder="Fecha de fin"
											aria-describedby="professionHelp"
										/>
										<div className="form-check mt-2">
											<input
												className="form-check-input"
												defaultChecked={userAcademic.in_progress}
												name="in_progress"
												type="checkbox"
												value={true}
												id="flexCheckDefault"
											/>
											<label className="form-check-label " forHTML="flexCheckDefault">
												Formación reglada
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												defaultChecked={userAcademic.is_academic}
												name="is_academic"
												type="checkbox"
												value={true}
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

ModalUserAcademic.propTypes = {
	info: PropTypes.object
};
