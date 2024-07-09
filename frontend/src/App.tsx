import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store.ts";
import Home from "./pages/Home.tsx";
import Layout from "./Layout/Layout.tsx";
import { Routes, Route } from "react-router-dom";
import { fetchGetMe } from "./redux/slices/auth.ts";
import { Toaster } from "react-hot-toast";

const Jobs = React.lazy(() => import("./pages/Jobs.tsx"));
const JobDetail = React.lazy(() => import("./pages/JobDetail.tsx"));
const Create = React.lazy(() => import("./pages/Create.tsx"));
const Contact = React.lazy(() => import("./pages/Contact.tsx"));
const Login = React.lazy(() => import("./pages/Login.tsx"));
const Register = React.lazy(() => import("./pages/Register.tsx"));
const Edit = React.lazy(() => import("./pages/Edit.tsx"));
const Profile = React.lazy(() => import("./pages/Profile.tsx"));
const MyVacancies = React.lazy(() => import("./pages/MyVacancies.tsx"));
const MyFavorities = React.lazy(() => import("./pages/MyFavorities.tsx"));
const Companies = React.lazy(() => import("./pages/Companies.tsx"));
const CompanyDetail = React.lazy(() => import("./pages/CompanyDetail.tsx"));
const NotFound = React.lazy(() => import("./pages/NotFound.tsx"));

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
          <Route
            path="/profile/:id"
            element={
              <Suspense
                fallback={
                  <div className="suspence_loading">Идет загрузка...</div>
                }
              >
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="/jobs"
            element={
              <Suspense
                fallback={
                  <div className="suspence_loading">Идет загрузка...</div>
                }
              >
                <Jobs />
              </Suspense>
            }
          />
          <Route
            path="myvacancies/:id"
            element={
              <Suspense
                fallback={
                  <div className="suspence_loading">Идет загрузка...</div>
                }
              >
                <MyVacancies />
              </Suspense>
            }
          />
          <Route
            path="myfavorities/:id"
            element={
              <Suspense
                fallback={
                  <div className="suspence_loading">Идет загрузка...</div>
                }
              >
                <MyFavorities />
              </Suspense>
            }
          />
          <Route
            path="companies"
            element={
              <Suspense
                fallback={
                  <div className="suspence_loading">Идет загрузка...</div>
                }
              >
                <Companies />
              </Suspense>
            }
          />
          <Route
            path="/companies/:id"
            element={
              <Suspense
                fallback={
                  <div className="suspence_loading">Идет загрузка...</div>
                }
              >
                <CompanyDetail />
              </Suspense>
            }
          />
          <Route
            path="/jobs/:id"
            element={
              <Suspense
                fallback={
                  <div className="suspence_loading">Идет загрузка...</div>
                }
              >
                <JobDetail />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense
                fallback={
                  <div className="suspence_loading">Идет загрузка...</div>
                }
              >
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="/create"
            element={
              <Suspense
                fallback={
                  <div className="suspence_loading">Идет загрузка...</div>
                }
              >
                <Create />
              </Suspense>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <Suspense
                fallback={
                  <div className="suspence_loading">Идет загрузка...</div>
                }
              >
                <Edit />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense
                fallback={
                  <div className="suspence_loading">Идет загрузка...</div>
                }
              >
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense
                fallback={
                  <div className="suspence_loading">Идет загрузка...</div>
                }
              >
                <Register />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense
                fallback={
                  <div className="suspence_loading">Идет загрузка...</div>
                }
              >
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </Layout>

      <Toaster position="bottom-right" />
    </>
  );
};

export default App;
