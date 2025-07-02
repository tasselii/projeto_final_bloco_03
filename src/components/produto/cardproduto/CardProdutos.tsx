import { Pencil, Trash } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import type Produto from "../../../models/Produto"

interface CardProdutoProps {
	produto: Produto
}

function CardProdutos({ produto }: CardProdutoProps) {
	return (
		<div className="flex flex-col justify-between my-10 overflow-hidden bg-white rounded-lg">
			<div className="flex items-end justify-end pt-2 pr-2">
				<Link to={`/editarproduto/${produto.id}`}>
					<Pencil
						size={24}
						className="mr-1 hover:fill-teal-800"
					/>
				</Link>

				<Link to={`/deletarproduto/${produto.id}`}>
					<Trash
						size={24}
						className="mr-1 hover:fill-red-700"
					/>
				</Link>
			</div>

			<div className="py-4">
				<img
					src={produto.foto}
					className="mx-auto mt-1 h-44 max-w-75 transform hover:scale-110 transition-transform duration-300"
					alt={produto.nome}
				/>

				<div className="p-4">
					<p className="text-sm text-center uppercase">
						{produto.nome}
					</p>
					<h3 className="text-xl font-bold text-center uppercase">
						{Intl.NumberFormat('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						}).format(produto.preco)}
					</h3>
				</div>
			</div>
			<div className="flex flex-wrap">
				<button
					className="flex items-center justify-center w-full py-2 text-white bg-blue-700 hover:bg-blue-500"
				>
					Comprar
				</button>
			</div>
		</div>
	)
}

export default CardProdutos
