import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { ModalUserData } from "../../js/component/modalUserData";
import { ModalUserAcademic } from "../../js/component/modalUserAcademic";
import { ModalUserExperience } from "../../js/component/modalUserExperience";

export const NewCV = () => {
	// viene del componente userRegister al pulsar sobre siguiente
	const { store, actions } = useContext(Context);

	//const [info, setInfo] = useState(); Guardar en el store la variable "info" y en el "actions" la función getAllUserInfo(),
	useEffect(() => {
		actions.userGet(15);
	}, []); // cada vez que "info" se actualiza se vuelve a lanzar el useEffect
	console.log("store", store.userInfo.name);

	/* const getAllUserInfo = async id => {
		const url = "https://3001-beige-galliform-xo392btg.ws-eu17.gitpod.io/api/user-info/" + id + "/get";
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		const data = await response.json();
		setInfo(data); 
	}; */

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
									<ModalUserData info={store.userInfo} />
								</div>
								<div className="card-body">
									<h5 className="card-title">Nombre: {store.userInfo.name}</h5>
									<h5 className="">
										Apellidos:
										{store.userInfo.lastname}
									</h5>
									<h5 className="">
										Fecha nacimiento:
										{store.userInfo.birth_date}
									</h5>
									<h5 className="">
										Email:
										{store.userInfo.email}
									</h5>
									<h5 className="">
										Teléfono:
										{store.userInfo.phone}
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
										<h4 className="card-title">Seleccione perfil:</h4>
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
										<h4 className="card-title">Nuevo perfil:</h4>
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
										<button type="button" className="btn btn-outline-primary mx-1">
											<i className="fas fa-plus" />
										</button>
									</div>
								</div>
								<div className="card-body">
									<div className="row pb-2 mx-1 w-100 border-2 border-bottom">
										<div className="d-flex justify-content-between">
											<div className="d-flex justify-content-start">
												<h4>Título educativo</h4>
											</div>
											<div className="d-flex justify-content-end">
												<ModalUserAcademic info={store.userInfo} />
											</div>
										</div>
									</div>
									<div className="row p-2 mb-4">
										<div className="col">
											<h5 className="card-title">Centro de estudios:</h5>
											<h5 className="card-title">Fecha inicio:</h5>
											<h5 className="card-title">Fecha fin:</h5>
											<h5 className="card-title">Estudios reglados:</h5>
											<h5 className="card-title">En curso:</h5>
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
										<button type="button" className="btn btn-outline-primary mx-1">
											<i className="fas fa-plus" />
										</button>
									</div>
								</div>
								<div className="card-body">
									<div className="row pb-2 mx-1 w-100 border-2 border-bottom">
										<div className="d-flex justify-content-between">
											<div className="d-flex justify-content-start">
												<h4>Título experiencia</h4>
											</div>
											<div className="d-flex justify-content-end">
												<ModalUserExperience />
											</div>
										</div>
									</div>
									<div className="row p-2 mb-4">
										<div className="col">
											<h5 className="card-title">Título:</h5>
											<h5 className="card-title">Descripción</h5>
											<h5 className="card-title">Fecha inicio:</h5>
											<h5 className="card-title">Fecha fin:</h5>
											<h5 className="card-title">En curso:</h5>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				"" // Poner dentro de las comillas el spiner de carga.
			)}
		</>
	);
};
