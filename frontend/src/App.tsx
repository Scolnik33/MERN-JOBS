import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store.ts";
import Home from "./pages/Home.tsx";
import Jobs from "./pages/Jobs.tsx";
import JobDetail from "./pages/JobDetail.tsx";
import Create from "./pages/Create.tsx";
import Contact from "./pages/Contact.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import { Routes, Route } from "react-router-dom";
import { fetchGetMe } from "./redux/slices/auth.ts";
import Edit from "./pages/Edit.tsx";
import Profile from "./pages/Profile.tsx";
import MyVacancies from "./pages/MyVacancies.tsx";
import MyFavorities from "./pages/MyFavorities.tsx";
import Companies from "./pages/Companies.tsx";
import CompanyDetail from "./pages/CompanyDetail.tsx";
import Layout from "./Layout/Layout.tsx";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGetMe());
  }, []);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="myvacancies/:id" element={<MyVacancies />} />
          <Route path="myfavorities/:id" element={<MyFavorities />} />
          <Route path="companies" element={<Companies />} />
          <Route path="/companies/:id" element={<CompanyDetail />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>

      <Toaster position="bottom-right" />
    </>
  );
};

export default App;
