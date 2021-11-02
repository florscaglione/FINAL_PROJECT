import React, { useContext } from "react";
import { Context } from "../store/appContext";
import homeEmpresa from "../../img/paginaInicio/homeEmpresa.jpg";
import homeUsuario from "../../img/paginaInicio/homeUsuario.jpg";
import infoInicio from "../../img/paginaInicio/info-inicio.jpg";
import iconoBuscandoTrabajo from "../../img/paginaInicio/iconoBuscandoTrabajo.png";
import iconoPuestos from "../../img/paginaInicio/iconoPuestos.jpg";
import iconoContrato from "../../img/paginaInicio/iconoContrato.png";
import iconoEmpresa from "../../img/paginaInicio/iconoEmpresa.png";
import "../../styles/index.scss";
import { NavegacionDev } from "../component/navegacionDev";
import { UserRegister } from "../../js/component/userRegister";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div className="row">
				<div className="col text-center">
					<div className="card-home">
						<img src={homeEmpresa} className="card-img-top" alt="Acceso empresas" />
						<div className="card-body">
							<h2 className="card-title">ACCESO EMPRESAS</h2>
							<p className="card-empresa">
								¿Está buscando candidatos? Regístrese y publique su oferta de trabajo. Encuentre el
								candidato óptimo entre los miles de perfiles de candidatos de los que disponemos.
							</p>
							<a className="btn btn-primary-wfh ">Publicar oferta</a>
						</div>
					</div>
				</div>
				<div className="col text-center">
					<div className="card-home">
						<img src={homeUsuario} className="card-img-top" alt="Acceso usuarios" />
						<div className="card-body">
							<h2 className="card-title">ACCESO USUARIOS</h2>
							<p className="card-usuario">
								¿Estás buscando la oferta de trabajo que mejor se adapte a tus necesidades? Consulta
								todas las ofertas disponibles. Date de alta como usuario y recibe alertas ajustadas a tu
								perfil.
							</p>
							<a className="btn btn-primary-wfh">Ofertas de teletrabajo</a>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col text-center">
					<NavegacionDev />
					<h2 className="home-texto">¿Porque elegirnos?</h2>
				</div>
			</div>
			<div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
				<div className="col text-center">
					<div className="card card-home">
						<img src={iconoPuestos} className="card-img-top" alt="..." />
						<div className="card-body">
							<h3 className="tituloCardEmp text-wrap">Más de 10.000 puestos de trabajo</h3>
						</div>
					</div>
				</div>
				<div className="col text-center">
					<div className="card card-home ">
						<img src={iconoBuscandoTrabajo} className="card-img-top" alt="..." />
						<div className="card-body">
							<h3 className="tituloCardEmp text-wrap">30.000 candidatos registrados</h3>
						</div>
					</div>
				</div>
				<div className="col text-center">
					<div className="card card-home">
						<img src={iconoEmpresa} className="card-img-top" alt="..." />
						<div className="card-body">
							<h3 className="tituloCardEmp text-wrap">25.000 empresas registradas</h3>
						</div>
					</div>
				</div>
				<div className="col text-center">
					<div className="card card-home">
						<img src={iconoContrato} className="card-img-top" alt="..." />
						<div className="card-body">
							<h3 className="tituloCardEmp text-wrap">500 contrataciones al día de media</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
