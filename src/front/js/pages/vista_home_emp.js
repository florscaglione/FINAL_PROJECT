import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import vistaEmpresa from "../../img/vistaEmpresa.jpg";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { BannerEmpresa } from "../component/BannerEmpresa";
import { ModalAccessDenied } from "../component/ModalAccessDenied";

export const VistaHomeEmp = () => {
	const { store, actions } = useContext(Context);
	const [alertModal, setAlertModal] = useState(false);

	return (
		<div className="container">
			<div className="row row-cols-2 mt-5">
				<div className="col-9 mt-5">
					<div className="imagenEmp">
						<img src={vistaEmpresa} className="card-img-top" id="cardempresa" alt="..." width="300" />
						{localStorage.getItem("token") && localStorage.getItem("role") === "company" ? (
							<Link to="/vista_ofertas_publi" className="btn btn-primary-wfh">
								Publicar oferta
							</Link>
						) : localStorage.getItem("token") && localStorage.getItem("role") === "user" ? (
							<Link
								onClick={() => {
									/* alertModal ? (
										<ModalAccessDenied close={() => setAlertModal(false)} />
									) : (
										<button className="btn btn-primary-wfh" change={() => setAlertModal(true)}>
											Publicar Oferta
										</button>
									); */
									alert("Acceso denegado a usuarios");
								}}
								className="btn btn-primary-wfh">
								Publicar Oferta
							</Link>
						) : (
							<Link
								className="btn btn-primary-wfh"
								data-bs-toggle="modal"
								data-bs-target="#companyLoginModal">
								Publicar Ofertas
							</Link>
						)}
					</div>
					<div>
						<h2 className="text-center publihomeEmp">
							¿Estás listo para contratar? Puedes contar con nosotros.{" "}
						</h2>
					</div>
					<div className="row d-flex justify-content-center">
						<div className="card-home card-block col">
							<h3 className="tituloCardEmp">Te ayudamos a formar tu equipo ideal</h3>
							<p className="infoEmp">
								Cuando un equipo tiene sus roles cubiertos, su productividad aumenta. Nosotros
								buscaremos todos esos perfiles que necesitas para llevarlo a cabo.
							</p>
						</div>
						<div className="card-home card-block col">
							<h3 className="tituloCardEmp">Avisamos rápidamente a los candidatos</h3>
							<p className="infoEmp">
								Enviamos inmediatamente tu oferta a los teléfonos móviles de los candidatos que cumplen
								con los requisitos demandados, reduciendo al máximo tu tiempo de búsqueda.
							</p>
						</div>
						<div className="card-home card-block col">
							<h3 className="tituloCardEmp">Asesoramiento y orientación personalizados</h3>
							<p className="infoEmp">
								Sabemos que cada puesto tiene sus particularidades, por eso te aconsejaremos sobre cómo
								captar la atención del candidato perfecto para tu empresa.
							</p>
						</div>
					</div>
				</div>
				<div className="col-3 text-center d-none d-md-block mt-4">
					<BannerEmpresa />
				</div>
			</div>
		</div>
	);
};
