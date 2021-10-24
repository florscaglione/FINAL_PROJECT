import React, { component } from "react";
import iconoLn from "../../img/paginaInicio/iconoLn.png";
import iconoFb from "../../img/paginaInicio/iconoFb.png";
import iconoIg from "../../img/paginaInicio/iconoIg.png";
import iconoTw from "../../img/paginaInicio/iconoTw.png";
export const Footer = () => (
	<footer className="container flex">
		<footer className="row row-cols-2 border-top">
			<div className="col">
				<div className="social d-flex align-items-right" href="/">
					<i className="iconoSocial" />
					<img src={iconoIg} alt="Icono Instagram" />
					<i className="iconoSocial" />
					<img src={iconoLn} alt="Icono Linkedin" />
					<i className="iconoSocial" />
					<img src={iconoTw} alt="Icono Twitter" />
					<i className="iconoSocial" />
					<img src={iconoFb} alt="Icono Facebook" />
				</div>
			</div>
			<div className="col">
				<ul className="list-inline">
					<li className="list-inline-item 1">
						<a href="#" className="nav-link p-0">
							Sitemap
						</a>
					</li>
					<li className="list-inline-item 2">
						<a href="#" className="nav-link p-0">
							Quienes Somos
						</a>
					</li>
					<li className="list-inline-item 3">
						<a href="#" className="nav-link p-0">
							Privacidad
						</a>
					</li>
					<li className="list-inline-item 4">
						<a href="#" className="nav-link p-0">
							FAQs
						</a>
					</li>
					<li className="list-inline-item 5">
						<a href="#" className="nav-link p-0">
							Aviso Legal
						</a>
					</li>
				</ul>
			</div>
			<div className="col" />
			<div className="col">
				<div className="social d-flex align-items-center" href="/">
					<p className="text-muted">
						Working From Home Copyright © 2021 Made by Jorge, Flor and Sandra with patience
					</p>
				</div>
			</div>
		</footer>
	</footer>
);
