import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductContext from '../../context/ProductContext';
import useGetList from '../../hooks/useGetList';
import Product from '../../models/product';
import LoadingSkeleton from '../loading-skeleton/LoadingSkeleton';
interface PropType {
    handleSelectedProduct: (id: string) => void
    selectedIds: String[]
    isActive: boolean
    isDeletedCompleted: boolean
    searchText: string
    isSearchClicked: boolean
    setIsSearching: Dispatch<SetStateAction<boolean>>
    isSearching: boolean
}

export default function Products({ handleSelectedProduct, selectedIds, isActive, isDeletedCompleted,searchText,isSearchClicked,setIsSearching,isSearching }: PropType) {
    const getListQuery = useGetList()
    const {setIsRequiredRefetchAPI,isRequiredRefetchAPI} = useContext(ProductContext)
        const { data, error, isError, isLoading, refetch } = getListQuery
    const [productList,setProductList] = useState<Array<Product>>(data)
    const [isRefetching,setIsRefetching] = useState(false)
    const [isSearchingWithText,setIsSearchingWithTexted] = useState(false)
    if (isDeletedCompleted) {
        refetch()
    }
    useEffect(()=>{
        const products = data?.filter((data: Product) => data?.isActive === isActive) || []
        const transformedProducts = products.map((product:Product) =>Product.parse(product))
        setProductList(transformedProducts)
    },[data, isActive])

    useEffect(()=>{
        const transformedProducts:Product[] = data?.map((product:Product) =>Product.parse(product))
        if(searchText.length > 0 && isSearchClicked && isSearching && !isSearchingWithText) {
            setIsSearchingWithTexted(true)
            const searchProductList= transformedProducts.filter(product=>product.name.toLowerCase().indexOf(searchText.toLowerCase())>=0)
            setTimeout(()=>{
                setIsSearching(false)
                setIsSearchingWithTexted(false)
            },500)
            setProductList(searchProductList)
        }
        if(searchText.length === 0 && isSearchClicked && isSearching && !isRefetching ) {
            refetch()
            setIsSearching(false)
            setIsRefetching(true)
        }
    },[data, isRefetching, isSearchClicked, isSearching, isSearchingWithText, productList, refetch, searchText, setIsSearching])
    useEffect(()=>{
        if(isRefetching){
            setIsRefetching(false)
            const products = data?.filter((data: Product) => data?.isActive === isActive) || []
            const transformedProducts = products.map((product:Product) =>Product.parse(product))
            setProductList(transformedProducts)
        }
    },[data, isActive, isRefetching])
    useEffect(()=>{
        if(isRequiredRefetchAPI) {
            setIsRequiredRefetchAPI(false)
            refetch()
        }
    },[isRequiredRefetchAPI, refetch, setIsRequiredRefetchAPI])
    const renderProducts = () => {
        if (data.length > 0) {
            if(productList.length > 0) {
            return productList.map((product: Product) => {
                return (
                    <div key={product?.productId} className="w-full p-4 md:w-1/2 lg:w-1/4">
                        <Link to={`/product/${product?.productId}`} className="relative block h-48 overflow-hidden rounded">
                            <img alt="ecommerce" className="block h-full w-full object-cover object-center cursor-pointer" src={product?.imageURL} />
                        </Link>
                        <div className="mt-4 min-h-[160px]">
                            <h3 className="title-font mb-1 text-xs tracking-widest text-gray-500">{product?.name}</h3>
                            <h2 className="title-font text-lg font-medium text-gray-900">${product?.price}</h2>
                            <p className="mt-1">{product?.description}</p>
                        </div>
                        <div className="flex flex-wrap justify-between mt-2 space-x-5">
                        <div className="flex-1">
                            <button onClick={() => handleSelectedProduct(String(product?.productId))} className="w-full bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                {selectedIds.includes(String(product?.productId)) ? "Selected" : "Select"}
                            </button>
                        </div>
                        <div className="flex-1">
                            <Link to={`/edit-product/${product.productId}`}>
                            <button className="bg-purple-500 w-full cursor-pointer hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                                Edit
                            </button>
                            </Link>
                        </div>
                        </div>
                    </div>
                )
            })
          } else if(isSearchClicked)  {
            return (
                <div className="w-full relative mt-4 rounded-lg border border-gray-200 p-8 text-center">
                <h2 className="text-2xl font-medium">There's no search result with this keyword...</h2>
            </div>
            )
          }
          else {
            return (
                <div className="w-full relative mt-4 rounded-lg border border-gray-200 p-8 text-center">
                <h2 className="text-2xl font-medium">Sorry, There's no item for this {isActive ? 'Active' : 'Inactive'} state...</h2>
            </div>
            )

        }
      }
      return (
        <div className="w-full mt-10 relative rounded-lg border border-gray-200 p-8 text-center">
            <h2 className="text-2xl font-medium">There's nothing here...</h2>
            <p className="mt-4 text-sm text-gray-500"> Created posts will appear here, try creating one! </p>
            <Link to="/add-product" className="mt-8 inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-500" >
                Create a post
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="ml-3 h-4 w-4 flex-shrink-0" > <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /> </svg>
            </Link>
        </div>
    )
    }

    return (
        <div className="flex flex-wrap">
            {isLoading || isSearching && <div className="w-full">
                <LoadingSkeleton /> </div>}
            {data && !isSearching && renderProducts()}
        </div>
    )
}
