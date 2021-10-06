import React, { Component } from "react";

export const CardResumenOferta = () => {
	return (
		<div className="container">
			<div className="card mb-3">
				<div className="row g-0">
					<div className="col-md-4">
						<img src="..." className="img-fluid rounded-start" alt="..." />
					</div>
					<div className="col-md-8">
						<div className="card-body">
							<h4 className="card-title">Título oferta de trabajo</h4>
							<h5 className="card-title">Nombre empresa</h5>
							<p className="card-text">
								This is a wider card with supporting text below as a natural lead-in to additional
								content. This content is a little bit longer.
							</p>
							<div className="d-flex justify-content-between">
								<div className="d-flex justify-content-start">
									<button type="button" className="btn btn-outline-primary btn-sm mx-1">
										#skill
									</button>
									<button type="button" className="btn btn-outline-primary btn-sm mx-1">
										#skill
									</button>
									<button type="button" className="btn btn-outline-primary btn-sm mx-1">
										#skill
									</button>
								</div>
								<div className="d-flex justify-content-center">
									<button type="button" className="btn btn-primary btn-sm mx-2">
										Ver oferta
									</button>
								</div>
								<div className="d-flex justify-content-end">
									<i className="far fa-bookmark mx-2" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
