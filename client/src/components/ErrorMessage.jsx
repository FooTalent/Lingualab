import { IoAlertCircleOutline } from "react-icons/io5";

export default function ErrorMessage({ children }) {
    return (
        <div className="flex items-center gap-[10px] w-full px-4 py-2 font-normal text-redError text-sm">
            {children}
            <IoAlertCircleOutline className="h-5 w-5" />
        </div>
    )
}