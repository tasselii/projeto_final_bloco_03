import { useEffect, useState, type ChangeEvent } from "react"
import { RotatingLines } from "react-loader-spinner"
import { useNavigate, useParams } from "react-router-dom"
import type Categoria from "../../../models/Categoria"
import type Produto from "../../../models/Produto"
import { listar, atualizar, cadastrar } from "../../../services/Service"

function FormProduto() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [categorias, setCategorias] = useState<Categoria[]>([])


const [categoria, setCategoria] = useState<Categoria>({
  id: 0,
  nome: '',
})
  const [produto, setProduto] = useState<Produto>({} as Produto)

  const { id } = useParams<{ id: string }>()

  async function buscarProdutoPorId(id: string) {
    try {
      await listar(`/produtos/${id}`, setProduto)
    } catch (error: any) {
      alert('Erro ao Buscar Produto')
    }
  }

  async function buscarCategoriaPorId(id: string) {
    try {
      await listar(`/categorias/${id}`, setCategoria)
    } catch (error: any) {
      alert('Erro ao Buscar Categoria')
    }
  }

  async function buscarCategorias() {
    try {
      await listar(`/categorias`, setCategorias)
    } catch (error: any) {
      alert('Erro ao Buscar Categorias')
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

    if (['number', 'range'].includes(type) || (!isNaN(Number(value)) && value !== '')) {
      valor = parseFloat(Number(value).toFixed(2))
    }

    setProduto({
      ...produto,
      [name]: valor,
      categoria: categoria,
    })
  }

  function retornar() {
    navigate('/produtos')
  }

  async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if (id !== undefined) {
      try {
        await atualizar(`/produtos`, produto, setProduto)

        alert('Produto atualizado com sucesso')
      } catch (error: any) {
        alert('Erro ao atualizar o Produto!')
      }
    } else {
      try {
        await cadastrar(`/produtos`, produto, setProduto)

        alert('Produto cadastrado com sucesso')
      } catch (error: any) {
        alert('Erro ao cadastrar o Produto!')
      }
    }

    setIsLoading(false)
    retornar()
  }

  // Mudança: aqui verifica só se categoria.id é zero para considerar "carregando"
  const carregandoCategoria = categoria.id === 0

  return (
    <div className="container flex flex-col items-center mx-auto">
      <h1 className="my-8 text-4xl text-center">
        {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
      </h1>

      <form
        className="flex flex-col w-1/2 gap-4"
        onSubmit={gerarNovoProduto}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">
            Nome do Produto
          </label>
          <input
            value={produto.nome}
            onChange={(
              e: ChangeEvent<HTMLInputElement>
            ) => atualizarEstado(e)}
            type="text"
            placeholder="Insira aqui o nome do Produto"
            name="nome"
            required
            className="p-2 bg-white border-2 rounded border-slate-700"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">
            Preço do Produto
          </label>

          <input
            value={produto.preco}
            onChange={(
              e: ChangeEvent<HTMLInputElement>
            ) => atualizarEstado(e)}
            type="number"
            step=".01"
            placeholder="Adicione aqui o preço do Produto"
            name="preco"
            required
            className="p-2 bg-white border-2 rounded border-slate-700"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">
            Foto do Produto
          </label>

          <input
            value={produto.foto}
            onChange={(
              e: ChangeEvent<HTMLInputElement>
            ) => atualizarEstado(e)}
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
            onChange={(e) =>
              buscarCategoriaPorId(
                e.currentTarget.value
              )
            }
            value={categoria.id.toString()} // para deixar o select controlado
          >
            <option value="" disabled>
              Selecione uma Categoria
            </option>
            {categorias.map((categoria) => (
              <option
                key={categoria.id}
                value={categoria.id.toString()}
              >
                {categoria.id} {/* Aqui coloque o que quiser mostrar como nome */}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={carregandoCategoria}
          className="flex justify-center w-1/2 py-2 mx-auto font-bold text-white rounded disabled:bg-slate-200 bg-slate-400 hover:bg-slate-800"
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
            <span>
              {id !== undefined
                ? 'Atualizar'
                : 'Cadastrar'}
            </span>
          )}
        </button>
      </form>
    </div>
  )
}

export default FormProduto
