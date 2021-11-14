import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import profile from "../../img/profile.png";
import { SidebarUsuario } from "../component/SidebarUsuario";
import { ModalUserData } from "../../js/component/modalUserData";
import { ModalUserAcademic } from "../../js/component/modalUserAcademic";
import { ModalUserExperience } from "../../js/component/modalUserExperience";

export const NewCV = () => {
	// viene del componente userRegister al pulsar sobre siguiente
	const { store, actions } = useContext(Context);
	const [professions, setProfessions] = useState([]);
	const [professionSelected, setProfessionSelected] = useState(null);

	console.log("=======", professionSelected);

	useEffect(() => {
		loadProfessions();
	}, []);

	//const [info, setInfo] = useState(); Guardar en el store la variable "info" y en el "actions" la función getAllUserInfo(),
	useEffect(() => {
		actions.userGet(localStorage.getItem("userLoggedIn"));
	}, []); // cada vez que "info" se actualiza se vuelve a lanzar el useEffect

	const [closeModal, setCloseModal] = useState({
		// función para cerrar el modal y validar
		showModal: false
	});

	const handleShow = () => {
		setCloseModal({ showModal: true });
	};

	async function loadProfessions() {
		const response = await fetch(`${process.env.BACKEND_URL}api/professions`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		const data = await response.json();
		setProfessions(data);
	}

	async function selectProfession(event) {
		const professionIdSelected = event.target.value;
		console.log("professionIdSelected", professionIdSelected);
		//const userId = localStorage.getItem("userLoggedIn");
		const token = localStorage.getItem("token");
		if (token && token != "" && token != undefined) {
			const profession = await fetch(
				`${process.env.BACKEND_URL}api/user-info-profession/${professionIdSelected}/create`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token
					},
					body: JSON.stringify({ professionIdSelected })
				}
			);
			const data = await profession.json();
			console.log("DATA", data);
			setProfessionSelected(data.name);
		}
	}

	console.log("userInfo", store.userInfo);

	return (
		<>
			{store.userInfo ? (
				<div className="container">
					<div className="row mt-5">
						<div className="col-9 p-0 mt-5">
							<div className="card card-cv">
								<div className="card-header d-flex justify-content-between ml-5">
									<h5>Datos personales</h5>
									<ModalUserData>
										<p className="m-3">
											{" "}
											info=
											{store.userInfo.user_basic}
										</p>
									</ModalUserData>
								</div>
								<div className="card-body-cv">
									<div className="row">
										<div className="col-9">
											<h6 className="infocv">Nombre: {store.userInfo.user_basic.name}</h6>
											<h6 className="infocv">Apellidos: {store.userInfo.user_basic.lastname}</h6>
											<h6 className="infocv">
												Fecha nacimiento: {store.userInfo.user_basic.birth_date}
											</h6>
											<h6 className="infocv">Email: {store.userInfo.user_basic.email}</h6>
											<h6 className="infocv">Teléfono: {store.userInfo.user_basic.phone}</h6>
										</div>
										<div className="col-3">
											<div className="jumbotron jumbotron-fluid">
												<img className="profile" src={profile} width="100" alt="profile" />
												<button type="button" className="btn btn-outline-primary-wfh p-1">
													<i className="fas fa-plus-square"> Añadir foto</i>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="card card-cv">
								<div className="card-header d-flex justify-content-between card-header-cv">
									<div className="d-flex justify-content-start">
										<h5>Perfil profesional</h5>
									</div>
									<div className="d-flex justify-content-end">
										<button type="button" className="btn btn-outline-primary-wfh">
											<i className="fas fa-caret-down" />
										</button>
										<button type="button" className="btn btn-outline-primary-wfh">
											<i className="fas fa-plus" />
										</button>
									</div>
								</div>

								<div className="card-body-cv">
									<div>
										<h6 className="card-title infocv">Seleccione perfil:</h6>
										<div className="row">
											<div className="d-flex justify-content-start">
												<div className="btn-group w-100 btn-sm mt-4">
													<select onChange={selectProfession}>
														{professions.map(profession => (
															<option key={profession.id} value={profession.id}>
																{profession.name}
															</option>
														))}
														<option selected>ELIGE TU PROFESIÓN</option>
													</select>
													<div>
														<input
															className="imput input-group-lg imputcv"
															value={professionSelected || store.userInfo.professions}
															disabled
														/>
													</div>
													{/* <button
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
													</ul> */}
												</div>
												<button type="button" className="btn btn-outline-primary-wfh ">
													<i className="far fa-trash-alt" />
												</button>
											</div>
										</div>
									</div>
									<div>
										{/* <h5 className="card-title mt-2">Nuevo perfil:</h5>
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
										</div> */}
									</div>
								</div>
							</div>
							<div className="card card-cv">
								<div className="card-header d-flex justify-content-between card-header-cv">
									<h5>Formación</h5>
									<div className="d-flex justify-content-end">
										<button
											type="button"
											className="btn btn-outline-primary-wfh"
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
								<div className="card-body-cv">
									<div className="row">
										<div className="col-12 m-0">
											{store.userInfo.trainings && store.userInfo.trainings.length > 0
												? store.userInfo.trainings.map((training, index) => {
														console.log("+++++++", training);
														return (
															<div key={index} className="row">
																<div className="col-10">
																	<h6 className="infocv">
																		Titulación: {training.academic_degree}
																	</h6>
																	<h6 className="infocv">
																		Centro de estudios: {training.study_center}
																	</h6>
																	<h6 className="infocv">
																		Estudios reglados:{" "}
																		{training.is_academic ? "Sí" : "No"}
																	</h6>
																	<h6 className="infocv">
																		Fecha inicio: {training.start_date}
																	</h6>
																	<h6 className="infocv">
																		Fecha fin: {training.end_date}
																	</h6>
																	<h6 className="infocv">
																		En curso: {training.in_progress ? "Sí" : "No"}
																	</h6>
																</div>
																<div className="col-2 d-flex justify-content-end">
																	<button
																		type="button"
																		className="btn btn-outline-primary-wfh"
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
							<div className="card card-cv">
								<div className="card-header d-flex justify-content-between card-header-cv">
									<div className="d-flex justify-content-start">
										<h5>Experiencia</h5>
									</div>
									<div className="d-flex justify-content-end">
										<button
											type="button"
											className="btn btn-outline-primary-wfh"
											data-bs-toggle="modal"
											data-bs-target={"#idModalExperience"}>
											<i className="fas fa-plus" />
										</button>
										<ModalUserExperience icon={"plus"} info={null} id={"idModalExperience"} />
									</div>
								</div>
								<div className="card-body-cv">
									<div className="row">
										<div className="col-12 m-0">
											{store.userInfo.experiences && store.userInfo.experiences.length > 0
												? store.userInfo.experiences.map((experience, index) => {
														return (
															<div key={index} className="row">
																<div className="col-10">
																	<h6 className="infocv">
																		Titulación: {experience.title}
																	</h6>
																	<h6 className="infocv">
																		Descripción: {experience.description}
																	</h6>
																	<h6 className="infocv">
																		Fecha inicio: {experience.start_date}
																	</h6>
																	<h6 className="infocv">
																		Fecha fin: {experience.end_date}
																	</h6>
																	<h6 className="infocv">
																		En curso: {experience.in_progress ? "Sí" : "No"}
																	</h6>
																</div>

																<div className="col-2 d-flex justify-content-end">
																	<button
																		type="button"
																		className="btn btn-outline-primary-wfh"
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
							<button
								type="button"
								className="btn d-grid d-md-flex btn-primary-wfh btn-sm justify-content-end mt-5 ">
								Dar de baja
							</button>
						</div>
						<div className="col-3 text-center d-none d-md-block">
							<SidebarUsuario />
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
