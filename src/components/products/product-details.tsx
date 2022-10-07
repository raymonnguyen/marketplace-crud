import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom';
import Product from '../../models/product';
import { fetchingProductBasedOnId } from '../../services/fetchProduct';
import LoadingSkeleton from '../loading-skeleton/LoadingSkeleton';

export default function ProductDetails() {
    let { id } = useParams();
    const queryInfo = useQuery<Product[], Error>(['product', id], () => fetchingProductBasedOnId(String(id)))
    const renderProduct = () => {
        return queryInfo.data?.map((product:Product)=>{
            return (
            <div key={product?.productId} className="w-full text-center p-4">
                <div className="w-full relative block overflow-hidden rounded">
                    <img alt="ecommerce" className="m-auto block h-full object-cover object-center cursor-pointer" src={product?.imageURL} />
                </div>
                <div className="mt-4">
                    <h3 className="title-font mb-1 text-xs tracking-widest text-gray-500">{product?.name}</h3>
                    <h2 className="title-font text-lg font-medium text-gray-900">${product?.price}</h2>
                    <p className="mt-1">{product?.description}</p>
                </div>
                <div>
                    <Link to ="/">
                    <button className="cursor-pointer relative justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10">
                        Go back Homepage
                    </button>
                    </Link>
                </div>
            </div>
            )
        })
    }
    return (
        <div className="container mx-auto px-5 py-10">
            {queryInfo.isLoading && <LoadingSkeleton />}
            {queryInfo.data && renderProduct()}
        </div>
    )
}
