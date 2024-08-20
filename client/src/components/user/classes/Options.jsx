import { Link } from "react-router-dom";

export default function Options({ state, id, links, positionTop }) {
    return (
        <div
            className={`absolute top-[${positionTop ?? '25%'}] end-0 text-sm border shadow-cardContainer z-10 rounded-lg bg-white p-4 ${state ? 'flex flex-col gap-4' : 'hidden'}`}
        >

            {links.map((link, index) => {
                if (link.path) {
                    return (
                        <Link
                            key={`${index}-${link.id}`}
                            to={link.path}
                            state={link.state}
                            className='cursor-pointer py-1 px-2 rounded-md ease-linear duration-200 flex items-center gap-2 !text-card !no-underline hover:bg-yellowInput'
                        >
                            {link.label}
                        </Link>
                    );
                } else {
                    return (
                        <button
                            key={`${index}-${link.id}`}
                            onClick={() => link.function(id)}
                            className='cursor-pointer py-1 px-2 rounded-md ease-linear duration-200 flex items-center gap-2 !text-card !no-underline hover:bg-yellowInput'
                        >
                            {link.label}
                        </button>
                    );
                }
            })}
        </div>
    )
}
