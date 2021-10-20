const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			userInfo: null,
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

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
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
