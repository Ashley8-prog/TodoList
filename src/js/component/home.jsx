import React, { useState, useEffect } from "react";

//include images into your bundle

//create your first component
const Home = () => {
	const [tarea, setTarea] = useState("")
	const [lista, setLista] = useState(["Make the bed", "Wash my hands"])

	const handleInput = (e) => {
		let texto = e.target.value
		if (e.keyCode == 13) {
			setTarea(texto)
			//Una primera aproximación para agregar a la lista es usando una variable auxiliar
			//let tempArr = lista.slice() //copia de arreglo por valor
			//tempArr.push(texto)
			//setLista(tempArr)

			//Una segunda aproximación es usando el operador spread ...
			setLista([...lista, texto])
		}
	}

	const deleteTask = (index) => {
		let tempArr = lista.slice() //copiar el estado lista en una variable auxiliar
		tempArr = tempArr.filter((item, index2) => { return index2 != index })
		setLista(tempArr)
	}

	return (
		<>
		<div className="container text-center mt-5 caja display-5"> <p>todos</p> </div>
			<div className="container caja"> 
				<div className=" justify-content-start contenedor mt-2 shadow p-3 mb-5 bg-body">
					<input className="container p-2 " placeholder="What needs to be done?"
						onKeyUp={
							(e) => { handleInput(e) }
						} />
					<div>
						<ul className="list-group list-group-flush">
							{
								lista && lista.length > 0 ?
									<>{
										lista.map((item, index) => {
											return <li className="list-group-item border" key={index}>
												{item}
												<button type="button" className="btn btn-outline-light button" onClick={e => { deleteTask(index) }}>
													<i class="fa-solid fa-trash-can"></i>
												</button>
											</li>
										})
									}</>
									
									: "la lista está vacía"
							}

						</ul>
					</div>
				</div>
				
			</div>
		</>

	);
};

export default Home;