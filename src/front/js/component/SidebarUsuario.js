import React, { Component, useState } from "react";
import logoWfh from "../../img/logo_wfh.png";
export const SidebarUsuario = () => {
	//const isLoggedIn = state.store.isLoggedIn;
	return (
		<div className="jumbotron jumbotron-fluid-text-center-usuario rounded">
			<div className="container-jumbotron">
				<h4 className="display-4-titulo-fluid">¿TRABAJAR PARA VIVIR?</h4>
				<p className="lead-subtitulo">Encuentra el trabajo en remoto que mejor se ajuste a tus necesidades</p>
				<a className="logobanner" href="/">
					<img src={logoWfh} width="200" alt="starwars logo" />
				</a>
			</div>
		</div>
	);
};
