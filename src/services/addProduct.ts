
import axios from 'axios'

export async function addProducts(data:any) {
	const res = await axios({
        method: 'post',
        url: 'http://localhost:8000/products',
        data
    })
    return res;
}