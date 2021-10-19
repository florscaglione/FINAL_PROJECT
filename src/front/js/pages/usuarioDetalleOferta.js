import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { CardDetalleOferta } from "../component/CardDetalleOferta";
import "../../styles/index.scss";

export const DetalleOferta = () => {
	const { store, actions } = useContext(Context);

	const handleClick = () => {
		<button type="button" className="btn btn-primary">
			Ya inscrito
		</button>; //NO FUNCIONA EL CLICK <CardDetalleOferta />
	};
	return (
		<div className="container">
			<div className="row">
				<div className="col-10">
					<CardDetalleOferta />
				</div>
			</div>
		</div>
	);
};
