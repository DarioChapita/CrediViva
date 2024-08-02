import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiRequest from "../utils/api";
import { loginSuccess, loginFailure, logout } from "./authSlice";
import { registerSuccess, registerFailure } from './authSlice';
import { clearCart } from "./cartSlice";

/**
 * Registers a user with the provided credentials.
 *
 * @param {Object} credentials - The user's credentials.
 * @param {string} credentials.username - The user's username.
 * @param {string} credentials.password - The user's password.
 * @param {Function} dispatch - The Redux dispatch function.
 * @return {Promise<void>} A promise that resolves when the user is successfully registered.
 * @throws {Error} If there is an error during the registration process.
 */
export const register = (credentials) => async (dispatch) => {
  try {
    const response = await apiRequest("POST", "/api/auth/register", credentials);
    dispatch(registerSuccess(response.data.user));
    toast.success("Successful registration. You can log in now.");
  } catch (error) {
    // dispatch(registerFailure('Registration error. Please verify your details.'));
    toast.error("Registration error. Please verify your details.");
  }
};

/**
 * Logs in a user with the provided credentials.
 *
 * @param {Object} credentials - The user's login credentials.
 * @param {Function} dispatch - The Redux dispatch function.
 * @return {Promise<Object>} A promise that resolves to the user object if login is successful, or an error object if login fails.
 * @throws {Error} If there is an unexpected server response.
 */
export const login = (credentials) => async (dispatch) => {
  try {
    const response = await apiRequest("POST", "/api/auth/login", credentials);

    if (response && response.token) {
      sessionStorage.setItem("token", response.token);
      dispatch(loginSuccess(response.user));
      await dispatch(fetchCart());
      return { user: response.user };
    } else {
      throw new Error("Unexpected server response");
    }
  } catch (error) {
    dispatch(loginFailure('Login error. Please verify your details.'));
    toast.error("Login error. Please verify your details.");
    return { error: 'Login error. Please verify your details.' };
  }
};

/**
 * Logs out the user by dispatching the logout action, clearing the cart,
 * displaying a success toast message, and navigating to the login page.
 *
 * @param {function} dispatch - The Redux dispatch function.
 * @return {void} This function does not return anything.
 */
export const logoutUser = () => (dispatch) => {
  dispatch(logout());
  dispatch(clearCart());
  toast.success("Has cerrado sesión exitosamente!");
  useNavigate()('/login');
};

/**
 * Fetches products from the API.
 *
 * @param {number} [page=1] - The page number to fetch. Defaults to 1.
 * @return {Function} A thunk function that dispatches actions to fetch products.
 */
export const fetchProducts = (page = 1) => async (dispatch) => {
  dispatch({ type: "FETCH_PRODUCTS_REQUEST" });
  try {
    const response = await apiRequest("GET", `/api/products?page=${page}`);
    dispatch({
      type: "FETCH_PRODUCTS_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: "FETCH_PRODUCTS_FAILURE", payload: error.response?.data?.message || error.message });
    toast.error("Error in obtaining products: " + (error.response ? error.response.data.message : error.message));
  }
};

/**
 * Fetches the cart from the API and dispatches actions to update the Redux store.
 *
 * @param {function} dispatch - The Redux dispatch function.
 * @return {Promise} A Promise that resolves when the cart is fetched and the Redux store is updated.
 */
export const fetchCart = () => async (dispatch) => {
  dispatch({ type: "FETCH_CART_REQUEST" });
  try {
    const response = await apiRequest("GET", "/api/cart");
    dispatch({ type: "FETCH_CART_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_CART_FAILURE", payload: error.response?.data?.message || error.message });
  }
};

/**
 * Updates a cart item by making a PUT request to the "/api/cart/update" endpoint.
 *
 * @param {string} productId - The ID of the product to update.
 * @param {number} quantity - The new quantity of the product.
 * @param {function} dispatch - The Redux dispatch function.
 * @return {Promise<void>} A Promise that resolves when the cart item is updated successfully.
 * @throws {Error} If there is an error updating the cart item.
 */
export const updateCartItem = (productId, quantity) => async (dispatch) => {
  try {
    await apiRequest("PUT", "/api/cart/update", { productId, quantity });
    dispatch(fetchCart());
  } catch (error) {
    dispatch({ type: "UPDATE_CART_ITEM_FAILURE", payload: error.response?.data?.message || error.message });
  }
};

/**
 * Executes a checkout process by sending a POST request to the "/api/cart/checkout" endpoint.
 * If the request is successful, it dispatches actions to fetch the cart and clear the cart.
 *
 * @param {function} dispatch - The Redux dispatch function.
 * @return {Promise} A Promise that resolves to the response data if the request is successful,
 *                    or an object with an "error" property if the request fails.
 */
export const checkout = () => async (dispatch) => {
  try {
    const response = await apiRequest("POST", "/api/cart/checkout", {});
    dispatch(fetchCart());
    dispatch(clearCart());
    return response.data;
  } catch (error) {
    dispatch({ type: "CHECKOUT_FAILURE", payload: error.response?.data?.message || error.message });
    return { error: error.message };
  }
};

/**
 * Cleans the cart by dispatching a clearCart action.
 *
 * @param {function} dispatch - The Redux dispatch function.
 * @return {void} This function does not return anything.
 */
export const cleanCart = () => (dispatch) => {
  dispatch(clearCart());
};
