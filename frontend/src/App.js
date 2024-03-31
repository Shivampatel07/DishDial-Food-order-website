import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./containers/Home";
import Footer from "./components/Footer";
import Offers from "./containers/Offers";
import Help from "./containers/Help";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./authentication/Authcontext";
import Profile from "./containers/Profile";
import ErrorPage from "./containers/ErrorPage";
import RestaurantPage from "./containers/RestaurantPage";
import Loading from "./components/Loading";

function AppContent() {
  let { isLoggedIn, isLoading } = useAuth();
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={!isLoading ? <Home /> : <Loading/>} />
        <Route path="/offers" element={!isLoading ? <Offers /> : <Loading/>} />
        <Route path="/help" element={!isLoading ? <Help /> : <Loading/>} />
        <Route path="/restaurant/:id" element={!isLoading ? <RestaurantPage /> : <Loading/>} />
        {isLoggedIn ? (
          <Route path="/profile" element={!isLoading ? <Profile /> : <Loading/>} />
        ) : (
          <Route path="/*" element={<ErrorPage />} />
        )}
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
      <Toaster position="bottom-right" reverseOrder={false} />
    </AuthProvider>
  );
}

export default App;
