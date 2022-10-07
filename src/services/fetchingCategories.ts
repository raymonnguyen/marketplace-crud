
import axios from 'axios'

export async function fetchcCategories() {
	const res = await axios.get('http://localhost:8000/categories')
	return res.data;
}