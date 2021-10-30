const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			userInfo: null, //Toda la info del usuario
			companyInfo: null, //Toda la info de la empresa
			companyOffersList: [], //Todas las ofertas de la empresa
			offerInfo: null, //Toda la info de una oferta
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			//Esta función obtiene todos los datos del USUARIO: userData, profession, training, experience.
			userGet: async id => {
				const url = `${process.env.BACKEND_URL}api/user-info/${id}/get`;
				const response = await fetch(url, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				});
				const data = await response.json();
				setStore({ userInfo: data });
			},
			//Esta función actualiza la información del userData.
			userUpdate: async (event, id, userUpdate) => {
				event.preventDefault();

				const url = `${process.env.BACKEND_URL}api/user-info/${id}/edit`;

				const response = await fetch(url, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(userUpdate)
				});
				if (response.ok) {
					getActions().userGet(id); // añadir un else para mostrar un error en caso de que no funcione
				}
			},

			//Esta función obtiene todos los datos de la EMPRESA: companyData
			companyGet: async id => {
				const url = `${process.env.BACKEND_URL}api/companies/${id}`;
				const response = await fetch(url, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				});
				const data = await response.json();
				setStore({ companyInfo: data });
			},

			//Esta función actualiza la información del companyInfo.
			companyUpdate: async (event, id, companyUpdate) => {
				event.preventDefault();

				const url = `${process.env.BACKEND_URL}api/company-info/${id}`; // Revisar con Flor url endpoint editar info empresa

				const response = await fetch(url, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(companyUpdate)
				});
				if (response.ok) {
					getActions().companyGet(id); // añadir un else para mostrar un error en caso de que no funcione
				}
			},

			//Esta función obtiene todos los datos de una Oferta en offerInfo
			offerGet: async id => {
				const url = `${process.env.BACKEND_URL}api/offer/${id}`;
				const response = await fetch(url, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				});
				const data = await response.json();
				console.log("offerGet", data); // Nota: no borrar
				setStore({ offerInfo: data });
			},

			//Esta función actualiza la información de la oferta de trabajo en offerInfo.
			offerUpdate: async (event, id, offerUpdate) => {
				event.preventDefault();

				const url = `${process.env.BACKEND_URL}api/offer/${id}`;

				const response = await fetch(url, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(offerUpdate)
				});
				if (response.ok) {
					getActions().offerGet(id); // añadir un else para mostrar un error en caso de que no funcione
				}
			},

			//Esta función obtiene todas las ofertas de empleo disponibles de la empresa para mostrarlo en la vista de las ofertas disponibles
			companyOffersGet: async id => {
				const url = `${process.env.BACKEND_URL}api/company/${id}/offers`;
				const response = await fetch(url, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				});
				const data = await response.json();
				setStore({ companyOffersList: data });
			},

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			// mis actions:
			syncTokenFromLocalStore: () => {
				//esta funcion obtendrá el token del localStore y lo pondrá en el store (con el setStore)
				const token = localStorage.getItem("token"); //pero siempre y cuando se cumplan estas condiciones del if
				if (token && token != "" && token != undefined) setStore({ token: token });
			},

			logout: () => {
				localStorage.removeItem("token"); //borro el token del localStorage
				console.log("Login out");
				setStore({ token: null }); //y establezco el token del store vacío
			},

			login: async (email, password) => {
				//lo hacemos asíncrono para que sea más fácil de administrar
				const options = {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				};

				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/login-user`, options);
					if (resp.status !== 200) {
						alert("There was been some error");
						return false;
					}
					const data = await resp.json();
					console.log("This came from the backend", data);
					localStorage.setItem("token", data.access_token); //access_token es lo que me respondió el token en Postman (es decir, lo que me llega desde el backend)
					setStore({ token: data.access_token });
					return true;
				} catch (error) {
					console.log("There has been an error login in");
				}
			},

			getMessage: () => {
				const store = getStore(); //con esto accedo al store, que es de donde obtengo el token que voy a utilizar
				const options = {
					headers: {
						Authorization: "Bearer " + store.token
					}
				};

				// fetching data from the backend
				fetch("https://3001-purple-impala-p24iuy49.ws-eu18.gitpod.io/api/hello", options)
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message })) //message es lo que me respondió el token en Postman (es decir, lo que me llega desde el backend)
					.catch(error => console.log("Error loading message from backend", error));
			},

			// funciones de ejemplo, NO SIRVEN (BORRAR)
			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
