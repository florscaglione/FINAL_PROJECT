import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import logoWfh from "../../img/logo_wfh.png";
import { Link } from "react-router-dom";

export const ModalAccessDenied = ({ close }) => {
	return (
		<>
			<div className="modal-dialog modal-dialog-centered modal-lg modal-access-denied">
				<div className="modal-content">
					<div className="modal-header">
						<img className="logoformulario " src={logoWfh} width="150" alt="logo Wfh" />
						<button
							type="button"
							onClick={() => close()}
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						/>
					</div>
					<div className="modal-body">
						<div className="mb-3">
							<div className="mx-1 cuerpoconfirmacion">
								<h6 className="tituloconf"> *** ACCESO DENEGADO PARA ESTE TIPO DE PERFIL ***</h6>
							</div>
						</div>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-primary-wfh  mx-1"
							data-bs-toggle="modal"
							onClick={() => close()}>
							Salir
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

ModalAccessDenied.propTypes = {
	close: PropTypes.func
};
