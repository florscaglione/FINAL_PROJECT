import React, { Component, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const ModalCompanyOffer = ({ info, icon, id }) => {
	const { store, actions } = useContext(Context);

	const [editOffer, setEditOffer] = useState({
		title: "",
		remote_work: "",
		contract_type: "",
		salary_range: "",
		requirement: "",
		offer_description: "",
		social_benefit: ""
	});

	const handleChange = event => {
		setEditOffer({ ...editOffer, [event.target.name]: event.target.value });
		console.log(editOffer);
	};

	const handleEditOffer = event => {
		event.preventDefault();
		console.log("a");
		actions.offerUpdate(event, info.id, editOffer);
	};

	return (
		<form onChange={handleChange} onSubmit={handleEditOffer}>
			<div
				className="modal fade"
				id={"idEditOfferCompany"}
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
									<h4>Editar oferta de trabajo</h4>
								</div>

								<div className="row mt-2">
									<div className="col">
										<input
											type="text"
											className="mt-2 form-control"
											defaultValue={info.title}
											name="title"
											aria-describedby="professionHelp"
										/>
										<input
											type="text"
											className="mt-2 form-control"
											defaultValue={info.remote_work}
											name="remote_work"
											aria-describedby="professionHelp"
										/>
										<input
											type="text"
											className="mt-2 form-control"
											defaultValue={info.contract_type}
											name="contact_type"
											aria-describedby="professionHelp"
										/>
										<input
											type="text"
											className="mt-2 form-control"
											defaultValue={info.salary_range}
											name="salary_range"
											aria-describedby="professionHelp"
										/>
										<input
											type="text"
											className="mt-2 form-control"
											defaultValue={info.requirement}
											name="requeriment"
											aria-describedby="professionHelp"
										/>
										<input
											type="text"
											className="mt-2 form-control"
											defaultValue={info.offer_description}
											name="offer_description"
											aria-describedby="professionHelp"
										/>
										<input
											type="text"
											className="mt-2 form-control"
											defaultValue={info.social_benefit}
											name="social_benefit"
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

ModalCompanyOffer.propTypes = {
	info: PropTypes.object,
	icon: PropTypes.string,
	id: PropTypes.number
};
