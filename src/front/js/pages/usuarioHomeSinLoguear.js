import React, { useContext } from "react";
import { Context } from "../store/appContext";
import cardSelector from "../../img/paginaInicio/card-selector.png";
import infoInicio from "../../img/paginaInicio/info-inicio.jpg";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div className="row">
				<div className="col text-center mt-4">
					<h1>Work From Home - WFH</h1>
				</div>
			</div>
			<div className="row">
				<div className="col text-center">
					<div className="card">
						<img src={cardSelector} className="card-img-top" alt="..." />
						<div className="card-body">
							<h5 className="card-title">Para empresas</h5>
							<p className="card-text">
								Accede para poder publicar una oferta de teletrabajo y los usuarios puedan aplicar.
							</p>
							<a className="btn btn-primary">Publicar oferta</a>
						</div>
					</div>
				</div>
				<div className="col text-center">
					<div className="card">
						<img src={cardSelector} className="card-img-top" alt="..." />
						<div className="card-body">
							<h5 className="card-title">Para usuarios</h5>
							<p className="card-text">
								¿Estás buscando ofertas de teletrabajo? Consulta las mejores ofertas disponibles.
							</p>
							<a className="btn btn-primary">Ofertas de teletrabajo</a>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col text-center mt-4">
					<h2>Nuestros números</h2>
				</div>
			</div>
			<div className="row">
				<div className="col text-center">
					<div className="card">
						<img src={infoInicio} className="card-img-top" alt="..." />
						<div className="card-body">
							<h5 className="card-title">CV</h5>
						</div>
					</div>
				</div>
				<div className="col text-center">
					<div className="card">
						<img src={infoInicio} className="card-img-top" alt="..." />
						<div className="card-body">
							<h5 className="card-title">Empresas</h5>
						</div>
					</div>
				</div>
				<div className="col text-center">
					<div className="card">
						<img src={infoInicio} className="card-img-top" alt="..." />
						<div className="card-body">
							<h5 className="card-title">Ofertas</h5>
						</div>
					</div>
				</div>
				<div className="col text-center">
					<div className="card">
						<img src={infoInicio} className="card-img-top" alt="..." />
						<div className="card-body">
							<h5 className="card-title">Ventajas</h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
