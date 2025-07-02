import { Pencil, Trash } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import type Produto from "../../../models/Produto";

interface CardProdutoProps {
  produto: Produto;
}

function CardProdutos({ produto }: CardProdutoProps) {
  return (
    <div className="flex flex-col justify-between my-10 overflow-hidden bg-white rounded-lg shadow">
      <div className="flex items-end justify-end pt-2 pr-2">
        <Link to={`/editarproduto/${produto.id}`}>
          <Pencil size={24} className="mr-1 hover:fill-teal-800" />
        </Link>

        <Link to={`/deletarproduto/${produto.id}`}>
          <Trash size={24} className="mr-1 hover:fill-red-700" />
        </Link>
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex-none h-44 flex items-center justify-center">
          <img
            src={produto.foto}
            className="max-h-full max-w-full object-contain transform hover:scale-110 transition-transform duration-300"
            alt={produto.nome}
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/176x176/E0E0E0/ADADAD?text=Sem+Imagem'; }}
          />
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <p className="text-sm text-center text-gray-500 min-h-8 flex-none">
            Categoria: <span className="font-semibold">{produto.categoria?.nome}</span>
          </p>
          <p className="mt-1 text-sm text-center uppercase min-h-12 flex-none overflow-hidden text-ellipsis">
            {produto.nome}
          </p>
          <h3 className="text-xl font-bold text-center uppercase flex-none">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(produto.preco)}
          </h3>
        </div>
      </div>

      <div className="flex flex-wrap flex-none">
        <button className="flex items-center justify-center w-full py-2 text-white bg-blue-700 hover:bg-blue-500">
          Comprar
        </button>
      </div>
    </div>
  );
}

export default CardProdutos;
