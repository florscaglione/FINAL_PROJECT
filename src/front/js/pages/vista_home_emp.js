import React, { useContext } from "react";
import { Context } from "../store/appContext";
import vistaEmpresa from "../../img/vistaEmpresa.jpg";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { BannerEmpresa } from "../component/BannerEmpresa";

export const VistaHomeEmp = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div className="row row-cols-2">
				<div className="col-9">
					<div className="imagenEmp">
						<img src={vistaEmpresa} className="card-img-top" alt="..." width="300" />
						<a className="btn btn-primary-wfh">Publicar oferta</a>
					</div>
					<div>
						<h1 className="titulo text-center">
							¿Estás listo para contratar? Puedes contar con nosotros.{" "}
						</h1>
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
								Sabemos que cada puesto tiene sus particularidades, por eso te aconsejaremos sobre como
								captar la atención del candidato perfecto para tu empresa.
							</p>
						</div>
					</div>
				</div>
				<div className="col-3 text-center mt-6">
					<BannerEmpresa />
				</div>
			</div>
		</div>
	);
};
