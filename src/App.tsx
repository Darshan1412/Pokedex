import React, { useState, useEffect, Suspense } from "react";
import Navbar from "./sections/Navbar";
import Wrapper from "./sections/Wrapper";
import Footer from "./sections/Footer";
import Background from "./components/Background";
import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation } from "react-router-dom";
import "./scss/index.scss";
import Search from "./pages/Search";
import Favorites from "./pages/MyList";
import About from "./pages/About";
import Compare from "./pages/Compare";
import Pokemon from "./pages/Pokemon";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { clearToasts, setUserStatus } from "./app/slices/AppSlice";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./utils/firebaseConfig";
import Loader from "./components/Loader";

function App() {
  const [currentId, setCurrentId] = useState("0");

  const PokemonPage = () => {
    const { id } = useParams();
    const location = useLocation();

    useEffect(() => {
      if (id && location.pathname.startsWith("/pokemon")) {
        setCurrentId(id);
      }
    }, [id, location.pathname]);

    if (id) {
      return <Pokemon />;
    } else {
      return <Navigate to={`/pokemon/${currentId}`} />;
    }
  };

  const { toasts } = useAppSelector(({ app }) => app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        dispatch(setUserStatus({ email: currentUser.email }));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (toasts.length) {
      const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        // type: "success"
      };
      toasts.forEach((message: string) => {
        toast(message, toastOptions);
      });
      dispatch(clearToasts());
    }
  }, [toasts, dispatch]);

  return (
    <div className="main-container">
      <Background />
      <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <ToastContainer />
        <div className="app">
          <Navbar />
          <Routes>
            <Route element={<Search />} path="/search" />
            <Route element={<Favorites />} path="/list" />
            <Route element={<About />} path="/about" />
            <Route element={<Compare />} path="/compare" />
            <Route element={<PokemonPage />} path="/pokemon/:id" />
            <Route element={<PokemonPage />} path="/pokemon" />
            <Route element={<Navigate  to="/search" />} path="*" /> 
            {/* <Route element={<Navigate  to="/pokemon/1" />} path="*" />  */}
          </Routes>
          <Footer />
        </div>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
