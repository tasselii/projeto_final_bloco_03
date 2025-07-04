import { useEffect, useState, type ChangeEvent } from "react"
import { RotatingLines } from "react-loader-spinner"
import { useNavigate, useParams } from "react-router-dom"
import type Categoria from "../../../models/Categoria"
import type Produto from "../../../models/Produto"
import { listar, atualizar, cadastrar } from "../../../services/Service"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function FormProduto() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [categoria, setCategoria] = useState<Categoria>({ id: 0, nome: "" })
  const [produto, setProduto] = useState<Produto>({} as Produto)

  const { id } = useParams<{ id: string }>()

  async function buscarProdutoPorId(id: string) {
    try {
      await listar(`/produtos/${id}`, setProduto)
    } catch (error: any) {
      ToastAlerta("Erro ao Buscar Produto", "erro")
    }
  }

  async function buscarCategorias() {
    try {
      await listar(`/categorias`, setCategorias)
    } catch (error: any) {
      ToastAlerta("Erro ao Buscar Categorias", "erro")
    }
  }

  useEffect(() => {
    buscarCategorias()

    if (id !== undefined) {
      buscarProdutoPorId(id)
    }
  }, [id])

  useEffect(() => {
    setProduto({
      ...produto,
      categoria: categoria,
    })
  }, [categoria])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { type, value, name } = e.target

    let valor: string | number = value

    if (["number", "range"].includes(type) || (!isNaN(Number(value)) && value !== "")) {
      valor = parseFloat(Number(value).toFixed(2))
    }

    setProduto({
      ...produto,
      [name]: valor,
      categoria: categoria,
    })
  }

  function retornar() {
    navigate("/produtos")
  }

  async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if (id !== undefined) {
      try {
        await atualizar(`/produtos`, produto, setProduto)
        ToastAlerta("Produto atualizado com sucesso", "sucesso")
      } catch (error: any) {
        ToastAlerta("Erro ao atualizar o Produto!", "erro")
      }
    } else {
      try {
        await cadastrar(`/produtos`, produto, setProduto)
        ToastAlerta("Produto cadastrado com sucesso", "sucesso")
      } catch (error: any) {
        ToastAlerta("Erro ao cadastrar o Produto!", "erro")
      }
    }

    setIsLoading(false)
    retornar()
  }

  const carregandoCategoria = categoria.id === 0

  return (
    <div className="container flex flex-col items-center mx-auto">
      <h1 className="my-8 text-4xl text-center">
        {id !== undefined ? "Editar Produto" : "Cadastrar Produto"}
      </h1>

      <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovoProduto}>
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome do Produto</label>
          <input
            value={produto.nome}
            onChange={atualizarEstado}
            type="text"
            placeholder="Insira aqui o nome do Produto"
            name="nome"
            required
            className="p-2 bg-white border-2 rounded border-slate-700"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="preco">Preço do Produto</label>
          <input
            value={produto.preco}
            onChange={atualizarEstado}
            type="number"
            step=".01"
            placeholder="Adicione aqui o preço do Produto"
            name="preco"
            required
            className="p-2 bg-white border-2 rounded border-slate-700"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="foto">Foto do Produto</label>
          <input
            value={produto.foto}
            onChange={atualizarEstado}
            type="text"
            placeholder="Adicione aqui a foto do Produto"
            name="foto"
            required
            className="p-2 bg-white border-2 rounded border-slate-700"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p>Categoria do Produto</p>
          <select
            name="categoria"
            id="categoria"
            className="p-2 bg-white border-2 rounded border-slate-700"
            onChange={(e) => {
              const selectedId = +e.currentTarget.value
              const categoriaSelecionada = categorias.find((c) => c.id === selectedId)
              if (categoriaSelecionada) setCategoria(categoriaSelecionada)
            }}
            value={categoria.id || ""}
          >
            <option value="" disabled>
              Selecione uma Categoria
            </option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={carregandoCategoria}
          className="flex justify-center w-1/2 py-2 mx-auto font-bold text-white rounded-sm  bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          ) : (
            <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
          )}
        </button>
      </form>
    </div>
  )
}

export default FormProduto
