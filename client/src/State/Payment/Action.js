import api , {API_BASE_URL} from '../../config/apiConfig';
import {
    CREATE_PAYMENT_REQUEST,
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_FAILURE,
    UPDATE_PAYMENT_REQUEST,
    UPDATE_PAYMENT_SUCCESS,
    UPDATE_PAYMENT_FAILURE,
  } from './ActionType';
  
  import axios from 'axios';
  import {useHistory} from 'react'
  
  export const createPayment = (orderId )=> async (dispatch) => {
   dispatch({type:CREATE_PAYMENT_REQUEST});
  try{
      const { data } = await api.post(
        `api/payments/${orderId}`,
        {}
      )
  
  if(data.payment_link_url){
    window.location.href=data.payment_link_url;
  }
    
    } catch (error) {
      dispatch({
        type: CREATE_PAYMENT_FAILURE,
        payload:error.message,
      });
    }
  };
  
  export const updatePayment = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_PAYMENT_REQUEST });
  
    try {
      // Make the request to update the payment
      const { data } = await api.get(
        `api/payments?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`,
        {}
      );
  
      // Check if the payment update was successful
      if (data.success) {
        // Get the history object
        const history = useHistory();
  
        // Redirect to the Payment Success page
        history.push(`/payments/${reqData.orderId}`);
      }
  
      // Dispatch a success action or handle any other logic here
      dispatch({
        type: UPDATE_PAYMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PAYMENT_FAILURE,
        payload: error.message,
      });
    }
  };
  


