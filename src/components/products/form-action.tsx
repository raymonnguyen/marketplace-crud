interface PropType {
    handleSubmit: (event:React.FormEvent<HTMLButtonElement>) => void
    text: string
    disabled: boolean
}
export default function FormAction({
    handleSubmit,
    text,
    disabled
}:PropType){
    return(
        <>
            <button
                type="submit"
                className="disabled:opacity-50 disabled:text-[rgba(141,139,155,0.5)] cursor-pointer relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
                onSubmit={(event:React.FormEvent<HTMLButtonElement>) => handleSubmit(event)}
                disabled={disabled}
            >
                {text}
            </button>
            :
        </>
    )
}