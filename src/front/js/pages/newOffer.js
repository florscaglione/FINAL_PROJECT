import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { ModalUserProfile } from "../../js/component/modalUserProfile";
import { ModalUserData } from "../../js/component/modalUserData";
import { ModalUserAcademic } from "../../js/component/modalUserAcademic";
import { ModalUserExperience } from "../../js/component/modalUserExperience";

export const NewOffer = () => {
	const { store, actions } = useContext(Context);
	
    const [info, setInfo] = useState(); //Guardar en el store la variable "info" y en el "actions" la función getAllUserInfo(),
	useEffect(() => {
		getAllUserInfo(15);
	}, []); // cada vez que "info" se actualiza se vuelve a lanzar el useEffect
	console.log(info);
	
    const getAllUserInfo = async id => {
		const url = "https://3001-beige-galliform-xo392btg.ws-eu17.gitpod.io/api/user-info/" + id + "/get";
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		const data = await response.json();
		setInfo(data); //setStore ({userInfo: data}) ,después del PUT volver a llamar la función getAllUserInfo para que recargue los datos
	};

	return (
		<>
			{info ? (
				<div className="container">
					<h1>Introduce los datos de tu currículum CV</h1>
					<div className="row">
						<div className="card col-8">
							<div className="card-header d-flex justify-content-between">
								<h2>Datos personales</h2>
								<ModalUserData info={info.user_basic} />
							</div>
							<div className="card-body">
								<h4 className="card-title">Nombre: {info.user_basic.name}</h4>
								<h5 className="">
									Apellidos:
									{info.user_basic.lastname}
								</h5>
								<h5 className="">
									Fecha nacimiento:
									{info.user_basic.birth_date}
								</h5>
								<h5 className="">
									Email:
									{info.user_basic.email}
								</h5>
								<h5 className="">
									Teléfono:
									{info.user_basic.phone}
								</h5>
							</div>
						</div>
						<div className="card col-8">
							<div className="card-header d-flex justify-content-between">
								<h2>Perfil profesional</h2>
								<ModalUserProfile />
							</div>
							<div className="card-body">
								<h4 className="card-title">Perfil:</h4>
							</div>
						</div>
						<div className="card col-8">
							<div className="card-header d-flex justify-content-between">
								<h2>Formación</h2>
								<ModalUserAcademic />
							</div>
							<div className="card-body">
								<h4 className="card-title">Formación:</h4>
								<h4 className="card-title">Centro de estudios:</h4>
								<h4 className="card-title">Descripción:</h4>
								<h4 className="card-title">Fecha inicio:</h4>
								<h4 className="card-title">Fecha fin:</h4>
								<h4 className="card-title">Estudios reglados:</h4>
								<h4 className="card-title">En curso:</h4>
							</div>
						</div>
						<div className="card col-8">
							<div className="card-header d-flex justify-content-between">
								<h2>Experiencia</h2>
								<ModalUserExperience />
							</div>
							<div className="card-body">
								<h4 className="card-title">Título:</h4>
								<h4 className="card-title">Descripción</h4>
								<h4 className="card-title">Fecha inicio:</h4>
								<h4 className="card-title">Fecha fin:</h4>
								<h4 className="card-title">En curso:</h4>
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