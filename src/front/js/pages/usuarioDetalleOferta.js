import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { SidebarUsuario } from "../component/SidebarUsuario";
import "../../styles/home.scss";

export const DetalleOferta = () => {
	const { store, actions } = useContext(Context);

	const handleClick = () => {
		<button type="button" className="btn btn-primary-wfh">
			Ya inscrito
		</button>; //NO FUNCIONA EL CLICK
	};
	return (
		<div className="container">
			<div className="row">
				<div className="card-detalleOferta col-9">
					<div className="card-header detalle">
						<h3 className="tituloCardDetalle">FULL STACK DEVELOPER TELETRABAJO</h3>
						<button type="button" className="btn btn-outline-secondary m-1">
							#NodeJS
						</button>
						<button type="button" className="btn btn-outline-secondary m-1">
							#WebAPIs
						</button>
						<button type="button" className="btn btn-outline-secondary m-1">
							#SQL
						</button>
					</div>
					<div className="card-body-detalleOferta">
						<h5 className="card-title">JLK GROUP SPAIN</h5>
						<p className="card-text">
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
							laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
							architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
							aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
							voluptatem sequi nesciunt.
						</p>
						<h5 className="card-title">Descripción</h5>
						<p className="card-text">
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
							laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
							architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
							aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
							voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
							consectetur, adipisci velit, sed quia non numqua consequatur? Quis autem vel eum iure
							reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui
							dolorem eum fugiat quo voluptas nulla pariatur?
						</p>
						<button onClick={handleClick} type="button" className="btn btn-primary-wfh">
							Inscribirse
						</button>
					</div>
				</div>
				<div className="col-3 text-center mt-4">
					<SidebarUsuario />
				</div>
			</div>
		</div>
	);
};
