import { useEffect, useState } from "react"
import { useAppStore } from "../../store/useAppStore"
import { deleteResource, fetchResourcesWithFilter, postResource, fetchResourceById, editResource } from "../../services/resources.services"
import ResourceForm from "../../components/Resources/ResourceForm";
import ResourceCard from "./ResourceCard"
import CategoryFilter from "../../components/Resources/CategoryFilter";
import { LEVELS, RESOURCE_TYPES } from "../../utils/valueLists";
import LevelFilter from "../../components/Resources/LevelFilter";
import Modal from "../../components/Modal";
import imgEliminarRecurso from "/EliminarRecurso.png"
import RecursoNoEncontrado from "/RecursoNoEncontrado.png"
import RecursoEliminado from "/Popup_RecursosEliminados.png"
import GuardadoExistosamente from "/Popup_SeGuardoExitosamente.png"
import AgregasteRecurso from "/Popup_FelicidadesAgregasteUnRecurso.png"
import ButtonModal from "../../components/Form/ButtonModal";
import BackButton from "../../components/BackButtom";
import Searcher from "./Searcher";
import Spinner from "../../components/Spinner/Spinner"

export default function Resources({ onSelect, selected }) {

  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedCat, setSelectedCat] = useState('')
  const [title, setTitle] = useState('')
  const [refreshCards, setRefreshCards] = useState(true)
  const [modalStatus, setModalStatus] = useState(false)
  const { user } = useAppStore()
  const [deleteModal, setDeleteModal] = useState(false)
  const [itemDeleted, setItemDeleted] = useState(false)
  const [itemEdited, setItemEdited] = useState(false)
  const [resourceCreated, setResourceCreated] = useState(false)
  const [idCard, setIdCard] = useState('')
  const [editModal, setEditModal] = useState(false)
  const [modalSize, setModalSize] = useState({});

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
          }

          let filter = selectedLevel ? `level=${selectedLevel}` : ''
          if (title) filter += `&title=${title}`
          if (selectedCat) filter += `&type=${selectedCat}`
          await updateResources(filter)

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

  useEffect(() => {
    const handleResize = () => {
      let size = {};

      if (window.innerWidth >= 1024) {
        size = { add: 'medium', created: 'small', deleted: 'xsmall' };
      } else if (window.innerWidth >= 768) {
        size = { add: 'full', created: 'small', deleted: 'small' };
      } else {
        size = { add: 'full', created: 'medium' };
      }

      setModalSize(size);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Funciones para crear un nuevo recurso
  const handleCreateResource = async () => {
    setModalStatus(true)
  }

  const handleSubmitCreate = async (data) => {
    const newResource = await postResource(data, user.token)
    if (newResource.isError === false) {
      setRefreshCards(!refreshCards)
      setModalStatus(false)
      setResourceCreated(true)
      setSelectedLevel('')
      setSelectedCat('')
      setTimeout(() => {
        setResourceCreated(false)
      }, 2000)
    }
  }

  // Funciones para editar un recurso
  const handleSubmitEdit = async (id, data) => {
    const editedResource = await editResource(id, data, user.token)
    if (editedResource.isError === false) {
      setRefreshCards(!refreshCards)
      setEditModal(false)
      setItemEdited(true)
      setTimeout(() => {
        setItemEdited(false)
      }, 2000)
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
      setRefreshCards(!refreshCards)
      setDeleteModal(false)
      setItemDeleted(true)
      setTimeout(() => {
        setItemDeleted(false)
      }, 2000)
    }
  }

  // Funciones de filtrado
  const handleFilterLevel = (lvl) => {
    setSelectedLevel(prevLevel => (prevLevel === lvl ? "" : lvl))
    setRefreshCards(prev => !prev)
  }

  const handleFilterCategory = (cat) => {
    setSelectedCat(prevSelectedCats => {
      if (prevSelectedCats.includes(cat)) {
        return prevSelectedCats.filter(selectedCat => selectedCat !== cat)
      } else {
        return [...prevSelectedCats, cat]
      }
    });
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
      <div className={onSelect ? "bg-white max-h-[95%] flex flex-col gap-6 shadow-modal w-full py-5 px-4 rounded-3xl overflow-y-auto scrollbar" : ""}>
        {
          onSelect
            ? <div><BackButton /></div>
            : <></>
        }

        <section className={`flex flex-col ${onSelect ? 'justify-center gap-6' : 'gap-8 lg:gap-16'}`}>
          <div className="flex flex-col gap-8 lg:gap-0 lg:grid grid-cols-12">
            <div className={`order-2 xl:order-1 grid grid-cols-3 col-span-4 items-center ${onSelect ? 'mb-4 lg:mb-0' : ''} justify-between gap-6`}>
              {
                LEVELS.map((lvl, i) => (
                  <LevelFilter
                    key={i}
                    data={lvl}
                    onClick={handleFilterLevel}
                    isSelected={selectedLevel === lvl.data}
                    onSelect={onSelect}
                  />
                ))
              }
            </div>

            <div className="order-1 w-full md:w-3/4 lg:w-full lg:order-2 lg:col-span-7 lg:col-start-6 self-center">
              <Searcher handleSearch={handleSearch} />
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:gap-0 lg:grid grid-cols-12">
            <div className={`flex flex-col col-span-4 ${onSelect ? 'gap-4' : 'gap-6'}`}>
              <div className={`w-full flex lg:flex-col overflow-x-auto scrollbar ${onSelect ? 'gap-4' : 'gap-6'}`}>
                {
                  RESOURCE_TYPES.map((resource, i) => (
                    <CategoryFilter
                      key={i}
                      onClick={handleFilterCategory}
                      resource={resource}
                      selectedCategories={selectedCat}
                      onSelect={onSelect}
                    />
                  ))
                }
              </div>

              <button
                onClick={handleCreateResource}
                className="bg-Yellow hover:bg-card hover:text-Yellow text-xl font-extrabold text-card tracking-wide py-4 px-6 rounded-lg ease-out duration-600"
              >
                Agregar recurso +
              </button>
              {onSelect &&
                <button
                  onClick={handleConfirmSelection}
                  className="bg-card hover:bg-Yellow hover:text-card text-xl font-extrabold text-Yellow tracking-wide py-4 px-6 mt-2 rounded-lg ease-out duration-600"
                >
                  Insertar
                </button>
              }
            </div>

            <div className="flex flex-col col-span-7 col-start-6 p-2 grow w-full gap-6 text-card max-h-[585px] overflow-y-auto scrollbar">
              {
                loading ? <Spinner /> : (
                  error ? <p className="m-auto text-center">{error}</p> :
                    (
                      resources.length === 0 ? (
                        <div className="m-auto">
                          <img src={RecursoNoEncontrado} alt="imagen de recurso no encontrado" className="max-w-[400px]" />
                        </div>
                      ) : (
                        resources.map((resource, i) => (
                          <div key={i} className={onSelect && "flex items-center"}>
                            {onSelect &&
                              <div className="flex items-center me-2">
                                <input
                                  type="checkbox"
                                  onChange={() => handleSelect(resource)}
                                  checked={selectedResources.includes(resource)}
                                  className="appearance-none p-0 w-8 h-8 border-2 rounded-lg bg-white checked:bg-Purple checked:border-Purple hover:bg-Purple hover:border-Purple ease-out duration-600"
                                />
                              </div>
                            }

                            <ResourceCard
                              resource={resource}
                              key={i}
                              deleteFunc={handleDelete}
                              editFunc={handleEdit}
                              onSelect={onSelect} 
                              />
                          </div>
                        ))
                      )
                    )
                )
              }
              <Modal title={"Edita un Recurso"} onClose={() => setEditModal(false)} isOpen={editModal} modalSize={modalSize.add}>
                <ResourceForm
                  onSubmit={handleSubmitEdit}
                  onCancel={() => setEditModal(false)}
                  data={resources.find(r => r._id === idCard)} />
              </Modal>

              <Modal title={"Crea un nuevo Recurso"} onClose={(() => setModalStatus(false))} isOpen={modalStatus} modalSize={modalSize.add}>
                <ResourceForm
                  onSubmit={handleSubmitCreate}
                  onCancel={() => setModalStatus(false)} />
              </Modal>

              <Modal isOpen={deleteModal} modalSize={modalSize.created}>
                <div className="flex justify-center">
                  <img src={imgEliminarRecurso} alt="quieres eliminar un recurso?" />
                </div>
                <div className="flex flex-col xl:grid grid-cols-2 gap-4">
                  <ButtonModal buttonAction={() => setDeleteModal(false)} type='prev' label={'Cancelar'} />
                  <ButtonModal buttonAction={handleConfirmDelete} type={'next'} label={'Eliminar Recurso'} />
                </div>
              </Modal>

              <Modal isOpen={resourceCreated} modalSize={modalSize.deleted}>
                <div className="flex justify-center">
                  <img src={AgregasteRecurso} alt="Agregaste un recurso" />
                </div>
              </Modal>

              <Modal isOpen={itemDeleted} modalSize={modalSize.deleted}>
                <div className="flex justify-center">
                  <img src={RecursoEliminado} alt="Recurso eliminado" />
                </div>
              </Modal>

              <Modal isOpen={itemEdited} modalSize={modalSize.deleted}>
                <div className="flex justify-center">
                  <img src={GuardadoExistosamente} alt="Guardado exitosamente" />
                </div>
              </Modal>
            </div>
          </div>
        </section>
      </div>
    </div>

  )
}
