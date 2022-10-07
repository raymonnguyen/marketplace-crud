import { useQuery } from "react-query";
import { fetchingProducts } from "../services/fetchingProducts";

 function useGetList() {
    const getListQuery = useQuery("list-query", fetchingProducts, {
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    })
    return getListQuery;
}

export default useGetList;