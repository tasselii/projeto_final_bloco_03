import { useEffect, useState } from "react"
import { PacmanLoader, PulseLoader } from "react-spinners"
import type Produto from "../../../models/Produto"
import { listar } from "../../../services/Service"
import CardProdutos from "../cardproduto/CardProdutos"


function ListarProdutos() {
	const [produtos, setProdutos] = useState<Produto[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function buscarProdutos() {
		setIsLoading(true)

		try {
			await listar('/produtos', setProdutos)
		} catch (error: any) {
			console.log('Erro ao listar todos os Produtos!')
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		buscarProdutos()
	}, [produtos.length])

	return (
		<>
			{isLoading && (
				<PulseLoader color="#0D9488" size={15} margin={6} speedMultiplier={1.5} />
			)}
			<div className="flex justify-center w-full my-4">
				<div className="container flex flex-col mx-4">
					{!isLoading && produtos.length === 0 && (
						<span className="my-8 text-3xl text-center">
							Nenhum produto foi encontrado
						</span>
					)}

					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
						{produtos.map((produto) => (
							<CardProdutos
								key={produto.id}
								produto={produto}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default ListarProdutos
