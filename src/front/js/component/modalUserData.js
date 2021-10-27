import React, { Component, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const ModalUserData = ({ info }) => {
	const { store, actions } = useContext(Context);

	const [userUpdate, setUserUpdate] = useState({
		name: "",
		lastname: "",
		birth_date: "",
		email: "",
		phone: ""
	});

	const handleChange = event => {
		setUserUpdate({ ...userUpdate, [event.target.name]: event.target.value });
		console.log(userUpdate);
	};

	const handleUserUpdate = event => {
		actions.userUpdate(event, info.id, userUpdate);
	};

	/* const handleUserUpdate = async event => {
		event.preventDefault();

		const url = `${process.env.BACKEND_URL}api/user-info/${info.id}/edit`;

		const response = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(userUpdate)
		}).catch(error => {
			console.log(error);
		});
	};  */

	return (
		<form onChange={handleChange} onSubmit={handleUserUpdate}>
			<button
				type="button"
				className="btn btn-outline-primary mx-1"
				data-bs-toggle="modal"
				data-bs-target="#ModalUserData">
				<i className="fas fa-edit" />
			</button>

			<div
				className="modal fade"
				id="ModalUserData"
				tabIndex="-1"
				aria-labelledby="userDataLabel"
				aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h2 className="modal-title" id="userDataLabel">
								Información usuario
							</h2>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
						</div>
						<div className="modal-body">
							<div className="row">
								<div className="col">
									<h4>Editar perfil de usuario</h4>
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
											defaultValue={info.lastname}
											name="lastname"
											aria-describedby="professionHelp"
										/>
										<input
											type="date"
											className="mt-2 form-control"
											defaultValue={info.birth_date}
											name="birth_date"
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
							<button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
								Guardar
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

ModalUserData.propTypes = {
	info: PropTypes.object
};
