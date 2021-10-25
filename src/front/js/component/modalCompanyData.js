import React, { Component, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const ModalCompanyData = ({ info }) => {
	const { store, actions } = useContext(Context);

	const [companyUpdate, setCompanyUpdate] = useState({
		name: "",
		contact: "",
		cif: "",
		email: "",
		phone: ""
	});

	const handleChange = event => {
		setCompanyUpdate({ ...companyUpdate, [event.target.name]: event.target.value });
		console.log(companyUpdate);
	};

	const handleCompanyUpdate = event => {
		actions.companyUpdate(event, info.id, companyUpdate);
	};

	return (
		<form onChange={handleChange} onSubmit={handleCompanyUpdate}>
			<button
				type="button"
				className="btn btn-outline-primary mx-1"
				data-bs-toggle="modal"
				data-bs-target="#ModalCompanyData">
				<i className="fas fa-edit" />
			</button>

			<div
				className="modal fade"
				id="ModalCompanyData"
				tabIndex="-1"
				aria-labelledby="companyDataLabel"
				aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h2 className="modal-title" id="companyDataLabel">
								Información Empresa
							</h2>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
						</div>
						<div className="modal-body">
							<div className="row">
								<div className="col">
									<h4>Editar perfil empresa</h4>
								</div>

								<div className="row mt-2">
									<div className="col">
										<input
											type="text"
											className="mt-2 form-control"
											defaultValue={info.name}
											name="name"
											aria-describedby="professionHelp"
										/>
										<input
											type="text"
											className="mt-2 form-control"
											defaultValue={info.contact}
											name="contact"
											aria-describedby="professionHelp"
										/>
										<input
											type="date"
											className="mt-2 form-control"
											defaultValue={info.cif}
											name="cif"
											aria-describedby="professionHelp"
										/>
										<input
											type="email"
											className="mt-2 form-control"
											defaultValue={info.email}
											name="email"
											aria-describedby="professionHelp"
											disabled
										/>
										<input
											type="text"
											className="mt-2 form-control"
											defaultValue={info.phone}
											name="phone"
											aria-describedby="professionHelp"
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button type="submit" className="btn btn-primary">
								Guardar
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

ModalCompanyData.propTypes = {
	info: PropTypes.object
};
