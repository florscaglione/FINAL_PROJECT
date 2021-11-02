import React, { Component, useState } from "react";
import logoWfh from "../../img/logo_wfh.png";
export const BannerEmpresa = () => {
	//const isLoggedIn = state.store.isLoggedIn;
	return (
		<div className="jumbotron jumbotron-fluid-text-center-empresa rounded">
			<div className="container-jumbotron">
				<h4 className="display-4-titulo-fluid">¿BUSCAS TALENTO?</h4>
				<p className="lead-subtitulo">Encuentra el personal que necesitas para llevar a cabo tus proyectos</p>
				<a className="logobanner" href="/">
					<img src={logoWfh} width="250" alt="Logo WFH" />
				</a>
			</div>
		</div>
	);
};
