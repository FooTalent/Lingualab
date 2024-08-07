import { useEffect, useState } from "react"
import { useAppStore } from "../../store/useAppStore"
import { deleteResource, fetchResourcesWithFilter, postResource, fetchResourceById, editResource } from "../../services/resources.services"
import ResourceForm from "../../components/Resources/ResourceForm";
import ResourceCard from "./ResourceCard"
import { Toast } from "../../utils/toast";
import CategoryFilter from "../../components/Resources/CategoryFilter";
import { LEVELS, RESOURCE_TYPES } from "../../utils/valueLists";
import LevelFilter from "../../components/Resources/LevelFilter";
import Modal from "../../components/Modal";
import imgEliminarRecurso from "/EliminarRecurso.png"
import RecursoNoEncontrado from "/RecursoNoEncontrado.png"

export default function Resources({ onSelect, selected}) {

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
  const [deleteModal, setDeleteModal] = useState(false)
  const [idCard, setIdCard] = useState('')
  const [editModal, setEditModal] = useState(false)

  // Elementos usado para las classes + onSelect
  const [selectedResources, setSelectedResources] = useState([]);

  //Llamado de Recursos
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

  useEffect(() => {
    const fetchSelectedResources = async () => {
      if (selected && selected.length > 0) {
        try {
          const fetchedResources = await Promise.all(
            selected.map((id) => fetchResourceById(user.token, id))
          );
          setSelectedResources(fetchedResources.map((res) => res.data));
        } catch (error) {
          console.error('Error fetching selected resources:', error);
        }
      }
    };

    fetchSelectedResources();
  }, [selected]);

  // Funciones para crear un nuevo recurso
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

  // Funciones para editar un recurso
  const handleSubmitEdit = async (id, data) => {
    const editedResource = await editResource(id, data, user.token)
    if(editedResource.isError === false) {
      Toast.fire({
        title: "Recurso editado",
        icon: "success"
      })
      setEditModal(false)
      setRefreshCards(!refreshCards)
    }
  }

  const handleEdit = (id) => {
    setEditModal(true)
    setIdCard(id)
  }

  // Funciones para eliminar un recurso
  const handleDelete = (id) => {
    setDeleteModal(true)
    setIdCard(id)
  }

  const handleConfirmDelete = async () => {
    const response = await deleteResource(idCard, user.token)
    if (response.isError === false) {
      Toast.fire({
          title: "Recurso eliminado",
          icon: "warning"
      })
      setRefreshCards(!refreshCards)
      setDeleteModal(false)  
    }
  }

  // Funciones de filtrado
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

  // Funciones usadas para las classes
  const handleSelect = (resource) => {
    setSelectedResources((prevSelected) =>
      prevSelected.includes(resource)
        ? prevSelected.filter((r) => r !== resource)
        : [...prevSelected, resource]
    );
  };
  const handleConfirmSelection = () => {
    onSelect(selectedResources);
    setSelectedResources([])
  };

  // los priemros 2 div son usadas para las classes
  return (
    <div className={onSelect ? "fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50" : ""}>
      <div className={onSelect ? "bg-white flex flex-col gap-4 shadow-modal w-11/12 p-10 rounded-3xl" : ""}>
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
              { onSelect &&
                <button onClick={handleConfirmSelection} className="bg-Yellow py-3 px-6 rounded-md">
                  Insertar
                </button>
              }
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
              loading ? <p className="text-center text-card">Cargando datos...</p> : (
                error ? <p className="m-auto text-center text-card">{error}</p> : 
                  ( !isSearch ? (
                  <div className="max-w-2xl flex justify-center self-center mt-16">
                    <p className="text-center text-5xl text-card">
                      Selecciona el nivel del recurso que quieres filtrar y después elegí la categoría
                    </p>
                  </div>
                  ) : (
                    resources.length === 0 ? (
                    <div className="flex justify-center">
                      <img src={RecursoNoEncontrado} alt="imagen de recurso no encontrado" className="max-w-[400px]"/>
                    </div>
                    ) : ( 
                      resources.map((resource, i) => (
                        <div key={i} className={ onSelect && "flex items-center"}>
                          { onSelect &&
                            <input
                              type="checkbox"
                              onChange={() => handleSelect(resource)}
                              checked={selectedResources.includes(resource)}
                              className="w-1/12"
                            />
                          }
                          <ResourceCard
                            resource={resource}
                            key={i}
                            deleteFunc={handleDelete}
                            editFunc={handleEdit} />
                        </div>
                      ))
                    )
                  )
                )
            )}
            {
              <Modal title={"Edita un Recurso"} onClose={() => setEditModal(false)} isOpen={editModal}>
                <ResourceForm 
                  onSubmit={handleSubmitEdit} 
                  onCancel={() => setEditModal(false)} 
                  data={resources.find(r => r._id === idCard)}/>
              </Modal>
            }
            {
              <Modal title={"Crea un nuevo Recurso"} onClose={(() => setModalStatus(false))} isOpen={modalStatus}>
                <ResourceForm 
                  onSubmit={handleSubmitCreate} 
                  onCancel={() => setModalStatus(false)} />
              </Modal>
            }
            {
              <Modal isOpen={deleteModal} modalSize={"small"}>
                <div className="flex justify-center ">
                  <img src={imgEliminarRecurso} alt="quieres eliminar un recurso?" />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setDeleteModal(false)}
                    className="w-full px-4 py-2 border border-Purple text-Purple  rounded-md hover:bg-Purple hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-Purple text-white rounded-md hover:bg-PurpleHover"
                    onClick={handleConfirmDelete}
                  >
                    Eliminar Recurso
                  </button>
                </div>
              </Modal>
            }
          </div>
        </div>
        </section>
      </div>
    </div>

  )
}
