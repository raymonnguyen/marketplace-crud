
import axios from 'axios'

export async function editProduct( data:any,id: string) {
	const res = await axios({
        method: 'put',
        url: `http://localhost:8000/products/${id}`,
        data
    })
    return res;
}