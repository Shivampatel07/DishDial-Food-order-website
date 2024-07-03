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
    <div className="relative">
      <Navbar />
      {isLoading && <Loading />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/help" element={<Help />} />
        <Route path="/restaurant/:id" element={<RestaurantPage />} />
        {isLoggedIn ? (
          <Route path="/profile" element={<Profile />} />
        ) : (
          <Route path="/*" element={<ErrorPage />} />
        )}
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
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
