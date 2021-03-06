import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Context } from "../js/store/appContext";

import { Home } from "./pages/home";
import { HomeUsuarioSinLoguear } from "./pages/usuarioHomeSinLoguear";
import { NewCV } from "./pages/newCV";
import { DetalleOferta } from "./pages/usuarioDetalleOferta";
import { CandidatosInscritos } from "./pages/empresaCandidatosInscritos";

import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { VistaHomeEmp } from "./pages/vista_home_emp";
import { VistaOfertasPubli } from "./pages/vista_ofertas_publi";
import { OfertasInscritasUsuario } from "./pages/vista_ofertas_inscritas";

import { Navbar } from "./component/navbar";
import { NavbarUser } from "./component/navbarUser";
import { NavbarCompany } from "./component/navbarCompany";
import { Footer } from "./component/footer";
import { PerfilEmpresa } from "./pages/perfilEmpresa";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";
	const { store, actions } = useContext(Context);

	useEffect(() => {}, [store.role]);
	console.log("Navbar role", store.role);

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					{/* {store.role == "user" ? <NavbarUser /> : store.role == "company" ? <NavbarCompany /> : <Navbar />} */}
					{localStorage.getItem("role") == "user" ? (
						<NavbarUser />
					) : localStorage.getItem("role") == "company" ? (
						<NavbarCompany />
					) : (
						<Navbar />
					)}
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/vista_home_emp">
							<VistaHomeEmp />
						</Route>
						<Route exact path="/usuarioHomeSinLoguear">
							<HomeUsuarioSinLoguear />
						</Route>
						<Route exact path="/new-CV">
							<NewCV />
						</Route>
						<Route exact path="/perfil-empresa">
							<PerfilEmpresa />
						</Route>
						<Route exact path="/vista_ofertas_publi">
							<VistaOfertasPubli />
						</Route>
						<Route exact path="/vista_ofertas_inscritas">
							<OfertasInscritasUsuario />
						</Route>
						<Route exact path="/detalleOferta/:id">
							<DetalleOferta />
						</Route>
						<Route exact path="/candidatosInscritos/:id">
							<CandidatosInscritos />
						</Route>
						<Route exact path="/demo">
							<Demo />
						</Route>
						<Route exact path="/single/:theid">
							<Single />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
