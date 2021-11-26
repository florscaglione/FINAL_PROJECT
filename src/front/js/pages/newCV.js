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
	const [files, setFiles] = useState(null);

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

	const save = async () => {
		console.log("This are the files", files);

		const data = new FormData(); // FormData envia los datos con el formato clave valor
		data.append("file", files[0]);
		console.log("FILE CLOUDINARY", data);
		const token = localStorage.getItem("token"); // Almacenar el token en una variable desde el localStorage
		if (token && token != "" && token != undefined) {
			const response = await fetch(`${process.env.BACKEND_URL}api/upload-file`, {
				method: "POST",
				headers: {
					Authorization: "Bearer " + token // Autorización para enviar el token, importante no quitar el espacio del "Bearer "
				},
				body: data
			});
			if (response.ok) {
				actions.userGet();
			} else {
				alert("Formato de la imagen no válida");
			}
		}
	};

	return (
		<>
			{store.userInfo ? (
				<div className="container">
					<div className="row mt-3">
						<div className="col-9 p-0 mt-5">
							<div className="card">
								<div className="card-header d-flex justify-content-between card-header-cv titulocard">
									<h5 className="infocv">Datos personales</h5>
									<ModalUserData info={store.userInfo.user_basic} />
								</div>
								<div className="card-body-cv p-4">
									<div className="row">
										<div className="col-8">
											<div className="row">
												<div className="col-4 d-flex align-items-center mt-3">
													<h5 className="infocv ">Nombre: </h5>
												</div>
												<div className="card-header-det col-8 mt-3 d-flex align-items-center">
													{store.userInfo.user_basic.name}
												</div>
											</div>
											<div className="row">
												<div className="col-4 d-flex align-items-center mt-3">
													<h5 className="infocv">Apellidos: </h5>
												</div>
												<div className="card-header-det col-8 mt-3 d-flex align-items-center">
													{store.userInfo.user_basic.lastname}
												</div>
											</div>
											<div className="row">
												<div className="col-4 d-flex align-items-center mt-3">
													<h5 className="infocv">Fecha nacimiento: </h5>
												</div>
												<div className="card-header-det col-8 mt-3 d-flex align-items-center">
													{" "}
													{store.userInfo.user_basic.birth_date}
												</div>
											</div>
											<div className="row">
												<div className="col-4 d-flex align-items-center mt-3">
													<h5 className="infocv">Email: </h5>
												</div>
												<div className="card-header-det col-8 mt-3 d-flex align-items-center">
													{" "}
													{store.userInfo.user_basic.email}
												</div>
											</div>
											<div className="row">
												<div className="col-4 align-items-right mt-3">
													<h5 className="infocv">Teléfono: </h5>
												</div>
												<div className="card-header-det col-8 mt-3 d-flex align-items-center">
													{" "}
													{store.userInfo.user_basic.phone}
												</div>
											</div>
										</div>
										<div className="col-4">
											<div className="jumbotron jumbotron-fluid">
												<img
													className="profile m-2 rounded-start border border-secondary"
													src={
														store.userInfo.user_basic.image_url
															? store.userInfo.user_basic.image_url
															: profile
													}
													width="100"
													alt="profile"
												/>
												<input
													className="fotoperfil"
													type="file"
													onChange={e => setFiles(e.target.files)}
												/>
												<button
													type="button"
													onClick={save}
													className="btn btn-outline-primary-wfh p-3">
													<i className="fas fa-plus-square"> Añadir foto</i>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="card mt-5">
								<div className="card-body-cv ">
									<div className="card-header d-flex justify-content-between ml-5 titulocard">
										<h5 className="infocv mt-2">Perfil profesional</h5>
										<div className="d-flex justify-content-end">
											<button type="button" className="btn btn-outline-primary-wfh">
												<i className="fas fa-caret-down" />
											</button>
											<button type="button" className="btn btn-outline-primary-wfh">
												<i className="fas fa-plus" />
											</button>
											<button type="button" className="btn btn-outline-primary-wfh ">
												<i className="far fa-trash-alt" />
											</button>
										</div>
									</div>
									<div className="card-body-cv m-4">
										<div>
											<h5 className="card-title infocv pl-3">Seleccione perfil:</h5>
											<div className="row">
												<div className="d-flex justify-content-start">
													<div className="btn-group w-100 btn-sm">
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
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="card mt-5">
								<div className="card-header d-flex justify-content-between card-header-cv titulocard">
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
										<div className="col-12 m-4">
											{store.userInfo.trainings && store.userInfo.trainings.length > 0
												? store.userInfo.trainings.map((training, index) => {
														console.log("+++++++", training);
														return (
															<div key={index} className="row">
																<div className="col-10">
																	<div className="row">
																		<div className="col-4 d-flex align-items-center mt-3">
																			<h5 className="infocv">Titulación: </h5>
																		</div>
																		<div className="card-header-det col-8 mt-3 d-flex align-items-center ">
																			{" "}
																			{training.academic_degree}
																		</div>
																	</div>
																	<div className="row">
																		<div className="col-4 d-flex align-items-center mt-3">
																			<h5 className="infocv">
																				Centro de estudios:{" "}
																			</h5>
																		</div>
																		<div className="card-header-det col-8 mt-3 d-flex align-items-center">
																			{" "}
																			{training.study_center}{" "}
																		</div>
																	</div>
																	<div className="row">
																		<div className="col-4 d-flex align-items-center mt-3">
																			<h5 className="infocv">
																				Estudios reglados:{" "}
																			</h5>
																		</div>
																		<div className="card-header-det col-8 mt-3 d-flex align-items-center">
																			{" "}
																			{training.is_academic ? "Sí" : "No"}{" "}
																		</div>
																	</div>
																	<div className="row">
																		<div className="col-4 d-flex align-items-center mt-3">
																			<h5 className="infocv">Fecha inicio: </h5>
																		</div>
																		<div className="card-header-det col-8 mt-3 d-flex align-items-center">
																			{" "}
																			{training.start_date}{" "}
																		</div>
																	</div>
																	<div className="row">
																		<div className="col-4 d-flex align-items-center mt-3">
																			<h5 className="infocv">Fecha fin: </h5>
																		</div>
																		<div className="card-header-det col-8 mt-3 d-flex align-items-center">
																			{" "}
																			{training.end_date}{" "}
																		</div>
																	</div>
																	<div className="row">
																		<div className="col-4 d-flex align-items-center mt-3">
																			<h5 className="infocv"> En curso: </h5>
																		</div>
																		<div className="card-header-det col-8 mt-3 d-flex align-items-center">
																			{" "}
																			{training.in_progress ? "Sí" : "No"}{" "}
																		</div>
																	</div>
																</div>
																<div className="col-2 d-flex justify-content-end">
																	<button
																		type="button"
																		className="btn btn-outline-primary-wfh m-5"
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
							<div className="card mt-5">
								<div className="card-header d-flex justify-content-between card-header-cv titulocard">
									<h5>Experiencia</h5>
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
								<div className="card-body-cv p-4">
									{store.userInfo.experiences && store.userInfo.experiences.length > 0
										? store.userInfo.experiences.map((experience, index) => {
												return (
													<div key={index} className="row">
														<div className="col-10">
															<div className="row">
																<div className="col-4 d-flex align-items-center mt-3">
																	<h5 className="infocv">Titulación: </h5>
																</div>
																<div className="card-header-det col-8 mt-3 d-flex align-items-center">
																	{" "}
																	{experience.title}
																</div>
															</div>
															<div className="row">
																<div className="col-4 d-flex align-items-center mt-3">
																	<h5 className="infocv">Descripción: </h5>
																</div>
																<div className="card-header-det col-8 mt-3 d-flex align-items-center">
																	{" "}
																	{experience.description}
																</div>
															</div>
															<div className="row">
																<div className="col-4 d-flex align-items-center mt-3">
																	<h5 className="infocv"> Fecha inicio: </h5>
																</div>
																<div className="card-header-det col-8 mt-3 d-flex align-items-center">
																	{" "}
																	{experience.start_date}
																</div>
															</div>
															<div className="row">
																<div className="col-4 d-flex align-items-center mt-3">
																	<h5 className="infocv">Fecha fin: </h5>
																</div>
																<div className="card-header-det col-8 mt-3 d-flex align-items-center">
																	{" "}
																	{experience.end_date}
																</div>
															</div>
															<div className="row">
																<div className="col-4 d-flex align-items-center mt-3">
																	<h5 className="infocv">En curso: </h5>
																</div>
																<div className="card-header-det col-8 mt-1 d-flex align-items-center">
																	{" "}
																	{experience.in_progress ? "Sí" : "No"}
																</div>
															</div>
														</div>
														<div className="col-2 d-flex justify-content-end">
															<button
																type="button"
																className="btn btn-outline-primary-wfh "
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
