
import axios from 'axios'
import Product from '../models/product';

export async function fetchingProductBasedOnId(id: string){
	const res = await axios.get(`http://localhost:8000/products/?id=${id}`)
	if(res.data) {
		res.data = res.data.map((product:any) =>Product.parse(product))
		return res.data;
	}
}