import { useEffect, useState } from "react"
import { useAppStore } from "../../store/useAppStore"
import { deleteResource, fetchResourcesWithFilter, postResource } from "../../services/resources.services"
import Modal from "../../components/Modal";
import CreateResourceForm from "../../components/Resources/CreateResourceForm";
import ResourceCard from "../../components/Resources/ResourceCard"
import { Toast } from "../../utils/toast";
import CategoryFilter from "../../components/Resources/CategoryFilter";
import { LEVELS, RESOURCE_TYPES } from "../../utils/valueLists";
import LevelFilter from "../../components/Resources/LevelFilter";

export default function Resources() {

  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedCat, setSelectedCat] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [title, setTitle] = useState('')
  const [refreshCards, setRefreshCards] = useState(true)
  const [modalStatus, setModalStatus] = useState(false)
  const { user } = useAppStore()

  useEffect(() => {
    if (user) {
      const getResources = async () => {
        try {
          const updateResources = async (filter) => {
            setLoading(true)
            const res = await fetchResourcesWithFilter(user.token, filter)
            setResources(res.data)
            setIsSearch(true)
          }
          if (!selectedLevel){
            setIsSearch(false)
          } else {
            let filter = `level=${selectedLevel}`
            if (selectedCat) filter += `&type=${selectedCat}`
            if (title) filter += `&title=${title}`
            await updateResources(filter)
          }
        } catch (error) {
          console.error('Error al llamar recursos:', error);
          setError(error.message)
        } finally {
          setLoading(false)
        }
      }
      getResources()
    }
  }, [user, refreshCards])

  const handleCreateResource = async () => {
    setModalStatus(true)
  } 

  const handleSubmitCreate = async (data) => {
    const newResource = await postResource(data, user.token)
    if (newResource.isError === false) {
      Toast.fire({
          title: "Recurso agregado",
          icon: "success"
      })
      setRefreshCards(!refreshCards)
      setModalStatus(false)
      setSelectedLevel('')
      setSelectedCat('')
  } else {
      Toast.fire({
          title: `${newResource.message}`,
          icon: "error"
      })
  }
  }

  const handleCancel = () => {
    setModalStatus(false)
  }

  const handleDelete = async (id) => {
    const response = await deleteResource(id, user.token)
    if (response.isError === false) {
      Toast.fire({
          title: "Recurso eliminado",
          icon: "warning"
      })
      setRefreshCards(!refreshCards)  
    }
  }

  const handleFilterLevel = (lvl) => {
    setSelectedLevel(prevLevel => (prevLevel === lvl ? "" : lvl))
    setRefreshCards(prev => !prev)
  }

  const handleFilterCategory = (cat) => {
    setSelectedCat(prevCat => (prevCat === cat ? "" : cat))
    setRefreshCards(prev => !prev)
  };

  const handleSearch = (e) => {
    e.preventDefault()
    setTitle(e.target[0].value)
    setLoading(true)
    setRefreshCards(prev => !prev)
  }

  return (
    <section className="flex justify-around px-10 gap-10">
      <aside className="min-w-96">
        <div className="flex flex-col justify-end">
          <div className="flex w-full justify-between items-center mb-16">
            {
              LEVELS.map((lvl, i) => (
                <LevelFilter
                key={i}
                data={lvl}
                onClick={handleFilterLevel}
                isSelected={selectedLevel === lvl.data}/>
              ))
            }
          </div>
          <div className="flex flex-col justify-end gap-6">
            {
              RESOURCE_TYPES.map((resource, i) => (
                <CategoryFilter 
                  key={i}
                  onClick={handleFilterCategory}
                  resource={resource}
                  isSelected={selectedCat === resource}/>
              ))
            }
            <button onClick={handleCreateResource} className="bg-Yellow py-3 px-6 rounded-md">
            Agregar recurso +
            </button>
          </div>
        </div>
      </aside>
      <div className="flex flex-col w-full">
        <div>
          <form className="flex gap-4 mb-16" onSubmit={handleSearch}>
            <input type="search" name="" id="" />
            <button type="submit" className="rounded-lg py-3 px-4 text-white bg-Purple">Buscar</button>
          </form>
        </div>
        <div className="flex flex-col w-full gap-6">
          { 
            loading ? <p className="text-center text-card">Cargando datos...</p> : 
              (error ? <p className="m-auto text-center text-card">{error}</p> : 
                (!isSearch ?
                <div className="max-w-2xl flex justify-center self-center mt-16">
                  <p className="text-center text-5xl text-card">
                    Selecciona el nivel del recurso que quieres filtrar y después elegí la categoría
                  </p>
                </div>
                :
                ( resources.length === 0 ? 
                  <div className="text-center">
                    <p className="text-center text-lg text-card">
                      No hay elementos que coincidan con tu búsqueda.
                    </p>
                  </div>
                  :
                    resources.map((resource, i) => (
                      <ResourceCard resource={resource} key={i} deleteFunc={handleDelete} />
                )))
              ))
          }
          {
            <Modal onClose={handleCancel} isOpen={modalStatus} title={"Crea un nuevo Recurso"}>  
              <CreateResourceForm onSubmit={handleSubmitCreate} onCancel={handleCancel} />
            </Modal>  
          }
        </div>
      </div>
    </section>
  )
}
