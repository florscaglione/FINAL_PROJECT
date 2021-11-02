import React, { component } from "react";
import iconoLn from "../../img/paginaInicio/iconoLn.png";
import iconoFb from "../../img/paginaInicio/iconoFb.png";
import iconoIg from "../../img/paginaInicio/iconoIg.png";
import iconoTw from "../../img/paginaInicio/iconoTw.png";
export const Footer = () => (
	<footer className="footer row row-cols-2 mt-5">
		<div className="col">
			<div className="social d-flex justify-content-center" href="/">
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
			<ul className="list-inline justify-content-center">
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
		<div className="col-12">
			<div className="d-flex justify-content-center" href="/">
				<p className="text-muted-copyright">
					Working From Home Copyright © 2021 Made by Jorge, Flor and Sandra with patience
				</p>
			</div>
		</div>
	</footer>
);
