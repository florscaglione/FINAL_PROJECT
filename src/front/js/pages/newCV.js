import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { ModalUserData } from "../../js/component/modalUserData";
import { ModalUserAcademic } from "../../js/component/modalUserAcademic";
import { ModalUserExperience } from "../../js/component/modalUserExperience";

export const NewCV = () => {
	// viene del componente userRegister al pulsar sobre siguiente
	const { store, actions } = useContext(Context);
	console.log(store.userInfo);

	//const [info, setInfo] = useState(); Guardar en el store la variable "info" y en el "actions" la función getAllUserInfo(),
	useEffect(() => {
		actions.userGet(3);
	}, []); // cada vez que "info" se actualiza se vuelve a lanzar el useEffect

	const [closeModal, setCloseModal] = useState({
		// función para cerrar el modal y validar
		showModal: false
	});

	const handleShow = () => {
		setCloseModal({ showModal: true });
	};

	return (
		<>
			{store.userInfo ? (
				<div className="container">
					<h1 className="m-4">Introduce los datos de tu currículum CV</h1>
					<div className="row">
						<div className="col-8">
							<div className="card m-2">
								<div className="card-header d-flex justify-content-between">
									<h4>Datos personales</h4>
									<ModalUserData info={store.userInfo.user_basic} />
								</div>
								<div className="card-body">
									<h5 className="card-title">Nombre: {store.userInfo.user_basic.name}</h5>
									<h5 className="">
										Apellidos:
										{store.userInfo.user_basic.lastname}
									</h5>
									<h5 className="">
										Fecha nacimiento:
										{store.userInfo.user_basic.birth_date}
									</h5>
									<h5 className="">
										Email:
										{store.userInfo.user_basic.email}
									</h5>
									<h5 className="">
										Teléfono:
										{store.userInfo.user_basic.phone}
									</h5>
								</div>
							</div>
							<div className="card m-2">
								<div className="card-header d-flex justify-content-between">
									<div className="d-flex justify-content-start">
										<h4>Perfil profesional</h4>
									</div>
									<div className="d-flex justify-content-end">
										<button type="button" className="btn btn-outline-primary mx-1">
											<i className="fas fa-caret-down" />
										</button>
										<button type="button" className="btn btn-outline-primary mx-1">
											<i className="fas fa-plus" />
										</button>
									</div>
								</div>

								<div className="card-body">
									<div>
										<h5 className="card-title">Seleccione perfil:</h5>
										<div className="row mt-2">
											<div className="d-flex justify-content-start">
												<div className="btn-group w-100">
													<button
														type="button"
														className="btn btn-outline-primary dropdown-toggle w-100"
														data-bs-toggle="dropdown"
														data-bs-display="static"
														aria-expanded="false">
														Seleccione profesión de la lista
													</button>
													<ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start w-90">
														<li>
															<button className="dropdown-item" type="button">
																Perfil 1
															</button>
														</li>
														<li>
															<button className="dropdown-item" type="button">
																Perfil 2
															</button>
														</li>
														<li>
															<button className="dropdown-item" type="button">
																Perfil 3
															</button>
														</li>
													</ul>
												</div>
												<button type="button" className="btn btn-outline-primary mx-1">
													<i className="far fa-trash-alt" />
												</button>
											</div>
										</div>
									</div>
									<div>
										<h5 className="card-title mt-2">Nuevo perfil:</h5>
										<div className="row mt-2">
											<div className="d-flex justify-content-start">
												<input
													type="text"
													className="form-control"
													placeholder="Perfil profesional"
													aria-describedby="professionHelp"
												/>
												<button type="button" className="btn btn-outline-primary mx-1">
													<i className="far fa-trash-alt" />
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="card m-2">
								<div className="card-header d-flex justify-content-between">
									<div className="d-flex justify-content-start">
										<h4>Formación</h4>
									</div>
									<div className="d-flex justify-content-end">
										<button
											type="button"
											className="btn btn-outline-primary"
											data-bs-toggle="modal"
											onClick={() => {
												setCloseModal({ showModal: true });
											}}
											data-bs-target="#idModalAcademic">
											<i className="fas fa-plus" />
										</button>
										<ModalUserAcademic
											icon={"plus"}
											info={null}
											id={"idModalAcademic"}
											show={closeModal.showModal}
											onClose={() => setCloseModal({ showModal: false })}
										/>
										{/*Duda resuelta, esta en el botón de arriba*/}
									</div>
								</div>
								<div className="card-body">
									<div className="row">
										<div className="col-12">
											{store.userInfo.trainings && store.userInfo.trainings.length > 0
												? store.userInfo.trainings.map((training, index) => {
														console.log("+++++++", training);
														return (
															<div
																key={index}
																className="row mb-2 pb-2 mx-1 w-100 border-2 border-bottom">
																<div className="col-10">
																	<h5 className="card-title">
																		Titulación:
																		{training.academic_degree}
																	</h5>
																	<h5 className="card-title">
																		Centro de estudios:
																		{training.study_center}
																	</h5>
																	<h5 className="card-title">
																		Estudios reglados:{" "}
																		{training.is_academic ? "Sí" : "No"}
																	</h5>
																	<h5 className="card-title">
																		Fecha inicio: {training.start_date}
																	</h5>
																	<h5 className="card-title">
																		Fecha fin: {training.end_date}
																	</h5>
																	<h5 className="card-title">
																		En curso: {training.in_progress ? "Sí" : "No"}
																	</h5>
																</div>

																<div className="col-2 d-flex justify-content-end">
																	<button
																		type="button"
																		className="btn btn-outline-primary"
																		data-bs-toggle="modal"
																		data-bs-target={`#id${training.id}`}>
																		<i className="fas fa-edit" />
																	</button>
																	<ModalUserAcademic //No se conoce su relación con el modalUserAcademic, no funciona
																		/* key={index} */ icon={"edit"}
																		info={training} // "training" viene con el get del usuario a través del endpoint, "training" contiene la info académica
																		id={`id${training.id}`}
																	/>
																</div>
															</div>
														);
												  })
												: ""}
										</div>
									</div>
								</div>
							</div>
							<div className="card m-2">
								<div className="card-header d-flex justify-content-between">
									<div className="d-flex justify-content-start">
										<h4>Experiencia</h4>
									</div>
									<div className="d-flex justify-content-end">
										<button
											type="button"
											className="btn btn-outline-primary"
											data-bs-toggle="modal"
											data-bs-target={"#idModalExperience"}>
											<i className="fas fa-plus" />
										</button>
										<ModalUserExperience icon={"plus"} info={null} id={"idModalExperience"} />
									</div>
								</div>
								<div className="card-body">
									<div className="row">
										<div className="col-12">
											{store.userInfo.experiences && store.userInfo.experiences.length > 0
												? store.userInfo.experiences.map((experience, index) => {
														return (
															<div
																key={index}
																className="row mb-2 pb-2 mx-1 w-100 border-2 border-bottom">
																<div className="col-10">
																	<h5 className="card-title">
																		Titulación:
																		{experience.title}
																	</h5>
																	<h5 className="card-title">
																		Descripción:
																		{experience.description}
																	</h5>
																	<h5 className="card-title">
																		Fecha inicio: {experience.start_date}
																	</h5>
																	<h5 className="card-title">
																		Fecha fin: {experience.end_date}
																	</h5>
																	<h5 className="card-title">
																		En curso: {experience.in_progress ? "Sí" : "No"}
																	</h5>
																</div>

																<div className="col-2 d-flex justify-content-end">
																	<button
																		type="button"
																		className="btn btn-outline-primary"
																		data-bs-toggle="modal"
																		data-bs-target={`#idexp${experience.id}`}>
																		<i className="fas fa-edit" />
																	</button>
																	<ModalUserExperience
																		key={index}
																		icon={"edit"}
																		info={experience}
																		id={`idexp${experience.id}`}
																	/>
																</div>
															</div>
														);
												  })
												: ""}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="d-flex justify-content-center">
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div> // Poner dentro de las comillas el spiner de carga.
			)}
		</>
	);
};
