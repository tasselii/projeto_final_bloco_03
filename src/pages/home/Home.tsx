import ListarProdutos from "../../components/produto/listaprodutos/ListaProdutos"
import ModalProduto from "../../components/produto/modalproduto/ModalProduto"

function Home() {
    return (
        <>
        <div className="flex justify-center bg-gray-100 text-gray-800">
				<div className="container grid grid-cols-2 text-[var(--color-gray-dark)]">
					<div className="flex flex-col items-center justify-center gap-4 py-4">
						<h2 className="text-5xl font-bold">Seja bem vindo!</h2>
						<p className="text-xl">Aqui você encontra Medicamentos e Cosméticos!</p>
						<ModalProduto />

						<div className="flex justify-around gap-4">
							<div className="flex justify-around gap-4">
							</div>
						</div>
					</div>

					<div className="flex justify-center">
						<img
							src="https://ik.imagekit.io/dmzx7is6a/Eu/image.png?updatedAt=1751457934116"
							alt="Imagem Página Home"
							className="w-2/3"
						/>
					</div>
				</div>
			</div>

			<ListarProdutos />
        </>
    )
}

export default Home