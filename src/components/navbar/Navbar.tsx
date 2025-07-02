import { ShoppingCart, User } from "@phosphor-icons/react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

	
	return (
		<>
			<div className="flex justify-center w-full py-4 bg-gray-900 text-white">
				<div className="container flex items-center justify-between mx-4 text-lg">
					<Link to="/home">
						<img
							src="https://ik.imagekit.io/dmzx7is6a/Eu/logofarmacia.png?updatedAt=1751456154907"
							alt="Logo"
							className="w-60"
						/>
					</Link>

					<div className="relative flex items-center justify-center w-2/5 text-black">
						<form 
							className="flex items-center justify-center w-full"

						>
							<input
								className="w-10/12 px-4 py-4 bg-white rounded-lg h-9 focus:outline-none"
								type="search"
								placeholder="Pesquisar produto pelo nome"
								id="nome"
								name="nome"
								required				
							/>
							<button
								type="submit"
								className="h-9 w-9 p-2.5 ms-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg border border-teal-700"
							>
								<MagnifyingGlass
									size={14}
									weight="bold"
								/>
							</button>
						</form>
					</div>

					<div className="flex items-center gap-4 py-4 text-base">
						<Link
							to="/produtos"
							className="text-gray-300 hover:text-white"
						>
							PRODUTOS
						</Link>
						<Link
							to="/categorias"
							className="text-gray-300 hover:text-white"
						>
							CATEGORIAS
						</Link>
						<Link
							to="/cadastrarcategoria"
							className="text-gray-300 hover:text-white"
						>
							CADASTRAR CATEGORIA
						</Link>
							<User
								size={32}
								weight="bold"
								className="ml-7"
							/>

							<ShoppingCart
								size={32}
								weight="bold"
							/>
					</div>
				</div>
			</div>
		</>
	)
}

export default Navbar
