import React, { useState, useEffect } from "react";

const Home = () => {
	const [tarea, setTarea] = useState("");
	const [lista, setLista] = useState([{ done: false, label: "No hay tareas" }]);
	const [username, setUsername] = useState("");
	const URI = "https://playground.4geeks.com/apis/fake/todos/user/";
	//mi usuario es ashleycr2

	const handleInput = async (e) => {
		if (e.keyCode === 13) {
			const newTaskLabel = e.target.value;
			const newTask = { label: newTaskLabel, done: false };
			const updatedList = [...lista, newTask];

			const response = await fetch(
				URI + username,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(updatedList)
				}
			);

			if (response.ok) {
				setLista(updatedList);
				setTarea(""); // Clear input
			} else {
				alert("Hubo un error al intentar actualizar la lista");
			}
		}
	};

	const deleteTask = async (index) => {

		const updatedList = [...lista];


		updatedList.splice(index, 1);

		try {
			const response = await fetch(
				URI + username,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(updatedList)
				}
			);

			if (response.ok) {
				setLista(updatedList);
			} else {
				alert("Hubo un error al intentar actualizar la lista");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("Hubo un error al intentar actualizar la lista");
		}
	};



	const handleUser = async (e) => {
		if (e.keyCode === 13) {
			const newUsername = e.target.value;

			try {
				const response = await fetch(
					URI + newUsername, // Use the new username as part of the URL
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify([])
					}
				);

				if (response.ok) {
					setUsername(newUsername);
					setLista([{ done: false, label: " " }]); // Setear la lista con una tarea inicial
					setTarea(""); // Limpiar el input
				} else {
					throw new Error("Hubo un error al intentar crear el usuario");
				}
			} catch (error) {
				console.error("Error:", error);
				alert("Hubo un error al intentar crear el usuario");
			}
		}
	};







	useEffect(() => {
		const cargaLista = async () => {
			if (username) {
				try {
					const response = await fetch(URI + username);
					if (response.ok) {
						const objResponse = await response.json();
						setLista(objResponse);
					} else {
						console.log("Error en la respuesta");
					}
				} catch (error) {
					console.error("Error:", error);
					alert("Hubo un error al intentar cargar la lista");
				}
			}
		};

		cargaLista();
	}, [username]);

	return (
		<>
			<div className="container text-center mt-5 caja display-5">
				<p>Todos</p>
			</div>
			<div className="container caja">
				<div className=" justify-content-start contenedor mt-2 shadow mb-5 bg-body">
					<input className=" container inputusuario" placeholder="Usuario"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						onKeyUp={
							(e) => handleUser(e)}
					/>
					<input
						className="container p-3 mb-2"
						placeholder="¿Qué necesitas hacer? Agrega aquí"
						value={tarea}
						onChange={(e) => setTarea(e.target.value)}
						onKeyUp={
							(e) => { handleInput(e) }
						}
					/>

					<div className="paper">
						<ul className="list-group list-group-flush">
							{lista.map((item, index) => (
								<li className="list-group-item border" key={index}>
									{item.label}
									<button
										type="button"
										className="btn btn-outline-light button"
										onClick={() => deleteTask(index)}
									>
										<i className="fa-solid fa-trash-can"></i>
									</button>
								</li>
							))}
							<p className="items bg-bg-dark">
								{lista.length } item left
							</p>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;