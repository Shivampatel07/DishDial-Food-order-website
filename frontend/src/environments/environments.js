const frontend_url = process.env.REACT_APP_CMS_BACKEND_BASE_URL
const configureData = {
  baseUrl: frontend_url,
  restaurantImage: frontend_url + "/images/restaurant",
  productImage: frontend_url + "/images/product",
};

export default configureData;
