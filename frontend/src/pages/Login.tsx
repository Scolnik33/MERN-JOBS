import React, { useEffect } from "react";
import "../../public/css/style.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { fetchUserLogin, selectIsAuth } from "../redux/slices/auth";
import { FormLoginValues } from "../types/FormType";

type PayloadToken = {
  token: string
}

const Login: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginValues>({
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<FormLoginValues> = async (values) => {
    const data = await dispatch(fetchUserLogin(values));
    const payload = data.payload as PayloadToken;

    if (!data.payload) {
      return alert('Не удалось авторизоваться.');
    }

    if ('token' in payload) {
      window.localStorage.setItem('token', payload.token);
    }

    window.localStorage.setItem('toast', 'signIn');
    
  };
  
  if (isAuth) {
    navigate('/');
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text">
                <h3>Login</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="contact-section section_padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="contact-title">Login</h2>
            </div>
            <div className="col-lg-12">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="form-contact contact_form"
                id="contactForm"
              >
                <div className="row">
                  <div className="col-12">
                    <div
                      className="form-group"
                      style={errors.email && { marginBottom: "10px" }}
                    >
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter email"
                        {...register("email", {
                          required: "Введите email",
                        })}
                      />
                    </div>
                    {errors.email && (
                      <div className="w-100">
                        <ul className="alert alert-danger">
                          <li>{errors.email.message}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="col-sm-12">
                    <div
                      className="form-group"
                      style={errors.password && { marginBottom: "10px" }}
                    >
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Enter password"
                        {...register("password", {
                          required: "Введите пароль",
                          minLength: {
                            value: 4,
                            message:
                              "Пароль должен содержать не менее 4 символов",
                          },
                        })}
                      />
                    </div>
                    {errors.password && (
                      <div className="w-100">
                        <ul className="alert alert-danger">
                          <li>{errors.password.message}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-group mt-3">
                    <button
                      type="submit"
                      className="button button-contactForm btn_4 boxed-btn"
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="form-group mt-3" style={{ textAlign: 'end' }}>
                    <p>
                      <Link
                        to={"/register"}
                        className="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                      >
                        don't have an account?
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
