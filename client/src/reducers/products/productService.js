import axios from 'axios'

const API_URL = 'http://localhost:5000/products'

const getAllProducts = async () => {
  
    const response = await axios.get(API_URL)
  
    return response.data
  }

const productSlice = {
  getAllProducts,
  }
  
export default productSlice
  