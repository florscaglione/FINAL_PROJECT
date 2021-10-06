import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const DetalleOferta = () => {
	const { store, actions } = useContext(Context);

	const handleClick = () => {
		<button type="button" className="btn btn-primary">
			Ya inscrito
		</button>; //NO FUNCIONA EL CLICK
	};
	return (
		<div className="container">
			<div className="row">
				<div className="card col-8">
					<div className="card-header">
						TÍTULO OFERTA DE TRABAJO
						<button type="button" className="btn btn-outline-secondary m-1">
							#Skill1
						</button>
						<button type="button" className="btn btn-outline-secondary m-1">
							#Skill2
						</button>
						<button type="button" className="btn btn-outline-secondary m-1">
							#Skill3
						</button>
					</div>
					<div className="card-body">
						<h5 className="card-title">Nombre empresa</h5>
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
						<button onClick={handleClick} type="button" className="btn btn-primary">
							Inscribirse
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
