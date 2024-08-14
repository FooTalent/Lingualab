import { Link } from "react-router-dom"
import { LEVELS_MAP } from "../../utils/valueLists"
import IconSvg from "../../utils/SvgWrapper"

export default function ResourceCard({ resource, deleteFunc, editFunc }) {
    const { _id } = resource

    return (
        <article className="flex w-full shadow-home px-8 py-6 gap-6 rounded-lg text-card">
            <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center gap-6">
                    <span
                        className="text-white text-sm py-2 px-4 rounded-lg"
                        style={{ backgroundColor: LEVELS_MAP[resource.level] }}
                    >
                        {resource.level}
                    </span>
                    <h2 className="text-xl leading-6 font-semibold text-[#444]">{resource.title}</h2>
                </div>
                <div>
                    <p className="text-sm leading-4 flex items-center gap-3">
                        <IconSvg category={resource.type} className={'w-6'}/>
                        <Link to={resource.url} className="hover:underline">
                            {resource.url}
                        </Link>
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-6 px-2">
                <button
                    onClick={() => deleteFunc(_id)}
                    className="text-darkGray hover:text-Grey flex items-center ease-out duration-600"
                >
                    <svg width="18px" viewBox="0 0 18 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.25 3H13.5V2.25C13.5 1.65326 13.2629 1.08097 12.841 0.65901C12.419 0.237053 11.8467 0 11.25 0H6.75C6.15326 0 5.58097 0.237053 5.15901 0.65901C4.73705 1.08097 4.5 1.65326 4.5 2.25V3H0.75C0.551088 3 0.360322 3.07902 0.21967 3.21967C0.0790178 3.36032 0 3.55109 0 3.75C0 3.94891 0.0790178 4.13968 0.21967 4.28033C0.360322 4.42098 0.551088 4.5 0.75 4.5H1.5V18C1.5 18.3978 1.65804 18.7794 1.93934 19.0607C2.22064 19.342 2.60218 19.5 3 19.5H15C15.3978 19.5 15.7794 19.342 16.0607 19.0607C16.342 18.7794 16.5 18.3978 16.5 18V4.5H17.25C17.4489 4.5 17.6397 4.42098 17.7803 4.28033C17.921 4.13968 18 3.94891 18 3.75C18 3.55109 17.921 3.36032 17.7803 3.21967C17.6397 3.07902 17.4489 3 17.25 3ZM7.5 14.25C7.5 14.4489 7.42098 14.6397 7.28033 14.7803C7.13968 14.921 6.94891 15 6.75 15C6.55109 15 6.36032 14.921 6.21967 14.7803C6.07902 14.6397 6 14.4489 6 14.25V8.25C6 8.05109 6.07902 7.86032 6.21967 7.71967C6.36032 7.57902 6.55109 7.5 6.75 7.5C6.94891 7.5 7.13968 7.57902 7.28033 7.71967C7.42098 7.86032 7.5 8.05109 7.5 8.25V14.25ZM12 14.25C12 14.4489 11.921 14.6397 11.7803 14.7803C11.6397 14.921 11.4489 15 11.25 15C11.0511 15 10.8603 14.921 10.7197 14.7803C10.579 14.6397 10.5 14.4489 10.5 14.25V8.25C10.5 8.05109 10.579 7.86032 10.7197 7.71967C10.8603 7.57902 11.0511 7.5 11.25 7.5C11.4489 7.5 11.6397 7.57902 11.7803 7.71967C11.921 7.86032 12 8.05109 12 8.25V14.25ZM12 3H6V2.25C6 2.05109 6.07902 1.86032 6.21967 1.71967C6.36032 1.57902 6.55109 1.5 6.75 1.5H11.25C11.4489 1.5 11.6397 1.57902 11.7803 1.71967C11.921 1.86032 12 2.05109 12 2.25V3Z" />
                    </svg>
                </button>
                <button onClick={() => editFunc(_id)} className="text-darkGray hover:text-Grey flex items-center p-1">
                    <svg width="24px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.71 4.54006C18.1 4.15006 18.1 3.50006 17.71 3.13006L15.37 0.790059C15 0.400059 14.35 0.400059 13.96 0.790059L12.12 2.62006L15.87 6.37006M0 14.7501V18.5001H3.75L14.81 7.43006L11.06 3.68006L0 14.7501Z" />
                    </svg>
                </button>
            </div>
        </article>
    )
}
