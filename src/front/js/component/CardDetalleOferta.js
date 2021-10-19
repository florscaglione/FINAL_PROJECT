import React, { Component } from "react";

export const CardDetalleOferta = () => {
	const isSignedIn = true;
	return (
		<div className="container">
			<div className="row">
				<div className="col-10">
					<div className="card">
						<div className="card-header">
							FULL STACK DEVELOPER TELETRABAJO
							<button type="button" className="btn btn-outline-secondary m-1">
								#Javascript
							</button>
							<button type="button" className="btn btn-outline-secondary m-1">
								#NodeJS
							</button>
							<button type="button" className="btn btn-outline-secondary m-1">
								#WebAPIs
							</button>
						</div>
						<div className="card-body">
							<h5 className="card-title">JLK GROUP SPAIN</h5>
							<p className="card-text">
								JLK Group es una empresa dinámica con una fuerte cultura empresarial. Durante más de 20
								años, JLK Group ha acompañado a sus clientes en la implementación de sus proyectos en
								todo el mundo. Valorizamos y movilizamos nuestro capital humano y aportamos una
								combinación de habilidades esenciales en el contexto económico actual:
								<ul>Know-how</ul>
								<ul>Reactividad</ul>
								<ul>Agilidad</ul>
							</p>
							<h5 className="card-title">Descripción vacante ofertada</h5>
							<p className="card-text">
								JLK Group Spain, consultoría experta en implementación de proyectos y gestión de
								equipos, busca para su equipo un Full Stack Developer.
								<b>Necesario/Obligatorio:</b>
								<ul>Javascript (Angular y React con uso de Redux)</ul>
								<ul>Bases de datos (SQL y MongoDB)</ul>
								<ul>NodeJS (implementación del backend)</ul>
								<ul>Experiencia con WebAPIs API Rest</ul>
								<ul>Conocimientos y experiencia en 3D (WebGL)</ul>
								<b>Deseable/Valorable:</b>
								<ul>Experiencia con Bootstrap (para el desarrollo del frontend)</ul>
								<ul>Conocimientos de SOAP (Integración con Navision)</ul>
								<ul>Experiencia con Blender (Generación de modelos integrados en la app)</ul>
								<ul>Experiencia con algún framework de tests unitarios (Jest, Jasmine, etc)</ul>
								<ul>Conocimientos de python</ul>
							</p>
							<h5 className="card-title">Condiciones</h5>
							<ul> Salario de 36000K </ul>
							<ul> Contrato indefinido - 6 meses de prueba </ul>
							<ul> Jornada completa </ul>
							<button type="button" className="btn btn-primary">
								Inscribirse
							</button>
							<div>
								{isSignedIn ? (
									<button type="button" className="btn btn-primary">
										Inscrito
									</button>
								) : (
									<button type="button" className="btn btn-primary">
										Inscribirse
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
