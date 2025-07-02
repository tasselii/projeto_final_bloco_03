import { Link } from "react-router-dom";
import type Categoria from "../../../models/Categoria";
import { Pencil, Trash } from "@phosphor-icons/react";


interface CardCategoriaProps {
  categoria: Categoria;
}

function CardCategorias({ categoria }: CardCategoriaProps) {
  return (
    <div className="w-full bg-indigo-100 border-e-indigo-50 px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-between mb-2 shadow-sm">
      <span className="text-base text-gray-800 flex-grow">{}</span>

      <div className="flex items-center gap-3">
        <Link to={`/editarcategoria/${categoria.id}`} className="text-teal-600 hover:text-teal-800">
          <button>
            <Pencil size={18} />
          </button>
        </Link>

        <Link to={`/deletarcategoria/${categoria.id}`} className="text-red-600 hover:text-red-800">
          <button>
            <Trash size={18} />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CardCategorias;
