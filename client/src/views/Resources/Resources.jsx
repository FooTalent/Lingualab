import { useEffect, useState } from "react"
import { useAppStore } from "../../store/useAppStore"
import { deleteResource, fetchResources, postResource } from "../../services/resources.services"
import CreateResourceForm from "../../components/Resources/CreateResourceForm";
import ResourceCard from "../../components/Resources/ResourceCard"
import { Toast } from "../../utils/toast";
import CategoryFilter from "../../components/Resources/CategoryFilter";
import { LEVELS, RESOURCE_TYPES } from "../../utils/valueLists";
import LevelFilter from "../../components/Resources/LevelFilter";

export default function Resources() {

  const [resources, setResources] = useState([])
  const [refreshCards, setRefreshCards] = useState(true)
  const [modalStatus, setModalStatus] = useState(false)
  const { user } = useAppStore()

  useEffect(() => {
    if(user){
      const getResources = async () => {
          const res = await fetchResources(user.token)
          setResources(res.data)
      }
      getResources()
    }
  }, [user, refreshCards])

  const handleCreateResource = async () => {
    setModalStatus(true)
  } 

  const handleSubmit = async (data) => {
    const newResource = await postResource(data, user.token)
    if (newResource.isError === false) {
      Toast.fire({
          title: "Recurso agregado",
          icon: "success"
      })
      setRefreshCards(!refreshCards)
      setModalStatus(false)
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

  const callFilter = () => {
    //TODO
  };

  return (
    <section className="flex justify-around px-10 gap-10">
      <aside className="min-w-96">
        <div className="flex flex-col justify-end">
          <div className="flex w-full justify-between items-center mb-16">
            {
              LEVELS.map((lvl, i) => (
                <LevelFilter key={i} data={lvl}/>
              ))
            }
          </div>
          <div className="flex flex-col justify-end gap-6">
            {
              RESOURCE_TYPES.map((resource, i) => (
                <CategoryFilter key={i}
                  onClick={callFilter}
                  resource={resource}/>
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
          <form className="flex gap-4 mb-16">
            <input type="search" name="" id="" />
            <button type="submit" className="rounded-lg py-3 px-4 text-white bg-Purple">Buscar</button>
          </form>
        </div>
        <div className="flex flex-col w-full">
          {
            resources.map((resource, i) => (
              <ResourceCard resource={resource} key={i} deleteFunc={handleDelete} />
            ))
          }
          {
            modalStatus &&
            <CreateResourceForm onSubmit={handleSubmit} onCancel={handleCancel} />
          }
        </div>
      </div>
    </section>
  )
}
