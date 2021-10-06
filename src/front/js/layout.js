import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { HomeUsuarioSinLoguear } from "./pages/usuarioHomeSinLoguear";
import { DetalleOferta } from "./pages/usuarioDetalleOferta";
import { CandidatosInscritos } from "./pages/empresaCandidatosInscritos";

import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { VistaHomeEmp } from "./pages/vista_home_emp";
import { VistaOfertasPubli } from "./pages/vista_ofertas_publi";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
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
						<Route exact path="/detalleOferta">
							<DetalleOferta />
						</Route>
						<Route exact path="/candidatosInscritos">
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
