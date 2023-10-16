import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    FIND_PRODUCTS_FAILURE,
    FIND_PRODUCTS_REQUEST,
    FIND_PRODUCTS_SUCCESS,
    FIND_PRODUCT_BY_ID_FAILURE,
    FIND_PRODUCT_BY_ID_REQUEST,
    FIND_PRODUCT_BY_ID_SUCCESS,
  } from "./ActionType";
  
  import api, { API_BASE_URL } from "../../config/apiConfig";


  
  export const findProducts = (reqData) => async (dispatch) => {

    
    dispatch({ type: FIND_PRODUCTS_REQUEST });
  
    const {
      color,
      sizes,
      minPrice,
      maxPrice,
      minDiscount,
      category,
      stock,
      sort,
      pageNumber,
      pageSize,
    } = reqData;
  
    try {
      const response = await api.get(
        `/api/products?color=${color}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      console.log("Request URL: ", response.config.url);
      const data = await response.data;
  
      console.log("get product by category - ", data);
      dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
    }
  };
  
  export const findProductsById = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
    const { productId } = reqData;
  
    try {
      const { data } = await api.get(`/api/products/id/${productId}`);
      console.log("products by id : ", data);
      dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
    }
  };
  


  export const createProduct = (product) => async (dispatch) => {
    console.log("create product data",product)
    try {
      dispatch({ type: CREATE_PRODUCT_REQUEST });
  
      
      const { data } = await api.post(`http://localhost:5454/api/admin/products/`, product);
  
      console.log("created product:", data);
  
      dispatch({
        type: CREATE_PRODUCT_SUCCESS,
        payload: product,
      });
    } catch (error) {
      dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
    }
  };
  

  
  export const deleteProduct=(productId)=>async(dispatch)=>{
    console.log("delete product action",productId)
    try{
      dispatch({type:DELETE_PRODUCT_REQUEST})
      const {data} = await api.delete(`${API_BASE_URL}/api/admin/products/${productId}`);
      console.log("delete Product",data)

      dispatch({
        type:DELETE_PRODUCT_SUCCESS,
        payload:productId
      })
    }catch(error){
      dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
    }
  }