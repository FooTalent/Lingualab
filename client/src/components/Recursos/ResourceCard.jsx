import { Link } from "react-router-dom"
import { LEVELS_MAP } from "../../utils/valueLists"

export default function ResourceCard({resource, deleteFunc}) {
    
    const {_id} = resource

    return (
        <article className="flex max-w-3xl border shadow-md p-4 mb-4 bg-white rounded-lg ">
            <div className="flex-1">
                <div className="flex items-center mb-2">
                    <span className="text-white text-sm font-bold py-1 px-2 rounded" style={{backgroundColor: LEVELS_MAP[resource.level]}}>{resource.level}</span>
                    <h2 className="ml-4 text-lg font-semibold text-gray-800">{resource.title}</h2>
                </div>
                <div>
                    <p className="text-sm text-gray-600">
                        <Link to={resource.url} className="text-[#444444] hover:underline">
                            {resource.url}
                        </Link>
                    </p>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <button onClick={() => deleteFunc(_id)} className="text-gray-500 hover:text-red-500">
                    <svg width="26px" height="26px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.663 1.5h-1.326c-1.069 0-1.49.09-1.921.27-.432.181-.792.453-1.084.82-.292.365-.493.746-.784 1.774L7.368 5H5a1 1 0 0 0 0 2h.563l.703 11.25c.082 1.32.123 1.98.407 2.481a2.5 2.5 0 0 0 1.083 1.017C8.273 22 8.935 22 10.258 22h3.484c1.323 0 1.985 0 2.502-.252a2.5 2.5 0 0 0 1.083-1.017c.284-.5.325-1.16.407-2.482L18.437 7H19a1 1 0 1 0 0-2h-2.367l-.18-.636c-.292-1.028-.493-1.409-.785-1.775a2.694 2.694 0 0 0-1.084-.819c-.431-.18-.852-.27-1.92-.27zm1.89 3.5-.025-.09c-.203-.717-.29-.905-.424-1.074a.696.696 0 0 0-.292-.221c-.2-.084-.404-.115-1.149-.115h-1.326c-.745 0-.95.031-1.149.115a.696.696 0 0 0-.292.221c-.135.169-.221.357-.424 1.074L9.446 5h5.108zM9.61 8.506a.75.75 0 0 0-.724.776l.297 8.495a.75.75 0 0 0 1.499-.053l-.297-8.494a.75.75 0 0 0-.775-.724zm4.008.724a.75.75 0 0 1 1.499.052l-.297 8.495a.75.75 0 0 1-1.499-.053l.297-8.494z" fill="currentColor"/></svg>
                </button>
                <button className="text-gray-500 hover:text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="currentColor"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/></svg>
                </button>
            </div>
        </article>
    )
}
