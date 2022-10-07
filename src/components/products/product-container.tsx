import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Products from './products';
import SearchBox from '../search-box/SearchBox';

export default function ProductsContainer() {
    const [selectedIds, setSelectedIds] = useState<Array<String>>([])
    const [isActive, setIsActive] = useState(true);
    const [isDeletedCompleted, setIsDeletedCompleted] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [isSearchClicked, setIsSearchClicked] = useState(false)
    const [isSearching, setIsSearching] = useState(false)

    const handleSelectedProduct = (id: string) => {
        if (selectedIds.indexOf(id) >= 0) {
            setSelectedIds((ids) => ids.filter((item) => item !== id));
            return
        }
        setSelectedIds([...selectedIds, id])
    }
    const handleRemoveItem = async () => {
        let delFetch = selectedIds.map(id => {
            return axios.delete(`http://localhost:8000/products/${id}`)
        })
        setIsDeletedCompleted(true)
        await Promise.all([delFetch]);
        setSelectedIds([])
        setIsDeletedCompleted(false)
        toast.success(`You have successfully remove product id: ${selectedIds.toString()}`);
    }
    const handleOnChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }
    const handleOnSearchClick = () => {
        setIsSearching(true)
        setIsSearchClicked(true)
    }
    return (
        <div className="container mx-auto px-5 py-10 relative">
            <div className="flex justify-between">
                <div>
                    <label className="inline-flex relative mr-5 cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isActive}
                            readOnly
                        />
                        <div
                            onClick={() => {
                                setIsActive(!isActive);
                            }}
                            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                        ></div>
                        <span className="ml-2 text-sm font-medium text-gray-900">
                            {isActive ? "View InActive Product" : "View Active Product"}
                        </span>
                    </label>
                </div>
                <div>
                    <SearchBox searchValue={searchValue} handleOnChangeSearch={handleOnChangeSearch} handleOnSearchClick={handleOnSearchClick} />
                </div>
                {selectedIds.length > 0 &&
                    <div>
                        <button onClick={handleRemoveItem} className="bg-red-500 cursor-pointer hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                    </div>}
            </div>
            <Products selectedIds={selectedIds}
                handleSelectedProduct={handleSelectedProduct}
                isActive={isActive}
                isDeletedCompleted={isDeletedCompleted}
                searchText={searchValue}
                isSearchClicked={isSearchClicked}
                isSearching={isSearching}
                setIsSearching={setIsSearching} />
            <ToastContainer />
        </div>
    )
}
