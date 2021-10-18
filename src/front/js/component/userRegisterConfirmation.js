import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const UserRegisterConfirmation = () => {
	return (
		<>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h2 className="modal-title" id="secondModalLabel">
							Alta currículum - paso2
						</h2>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
					</div>
					<div className="modal-body">
						<div className="mb-3">
							<div className="mx-1 ">
								<h1>Muchas gracias por registrarse</h1>
								<h3>
									El siguiente paso consiste en rellenar su currículum para poder aplicar a las
									ofertas de teletrabajo
								</h3>
							</div>
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-primary">
							Dar de alta mi CV
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
