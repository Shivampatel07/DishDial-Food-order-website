const NODE_ENV = process.env.NODE_ENV
const frontend_url = NODE_ENV === 'production' ? process.env.REACT_APP_CMS_BACKEND_BASE_URL : 'http://localhost:8080'

const configureData = {
  baseUrl: frontend_url,
  restaurantImage: frontend_url + "/images/restaurant",
  productImage: frontend_url + "/images/product",
};

export default configureData;

