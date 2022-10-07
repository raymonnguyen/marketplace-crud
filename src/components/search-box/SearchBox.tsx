interface PropType {
    searchValue: string,
    handleOnChangeSearch: (e:React.ChangeEvent<HTMLInputElement>) => void
    handleOnSearchClick: ()=> void
}
export default function SearchBox({searchValue,handleOnChangeSearch,handleOnSearchClick}:PropType) {
    const handleOnSearch  = () => {
        handleOnSearchClick()
    }
    return (
        <div className="flex items-center">
            <div className="flex border border-purple-200 rounded">
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e)=>handleOnChangeSearch(e)}
                />
                <button onClick={handleOnSearch} className="px-4 text-white bg-purple-600 border-l rounded ">
                    Search
                </button>
            </div>
        </div>
    );
}