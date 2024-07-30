import { useEffect, useState } from "react"
import { useAppStore } from "../../store/useAppStore"
import { deleteResource, fetchResources, postResource } from "../../services/resources.services"
import CreateResourceForm from "../../components/Resources/CreateResourceForm";
import ResourceCard from "../../components/Resources/ResourceCard"
import { Toast } from "../../utils/toast";

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

  return (
    <div>
      <button onClick={handleCreateResource} className="bg-Yellow px-4 py-2 rounded-md">
        Agregar recurso +
      </button>
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
  )
}
