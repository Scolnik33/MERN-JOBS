import React, { useEffect, useState } from "react";
import "../../public/css/style.css";
import { Link, useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRegister, selectIsAuth } from "../redux/slices/auth";
import { AppDispatch } from "../redux/store";
import { OptionsType } from "../types/OptionsType";
import ReactSelect from "react-select";
import { optionsCategory } from "../Options/Options";
import axios from "../axios";
import { fetchCreateCompany } from "../redux/slices/company";
import { FormRegisterValues } from "../types/FormType";

type PayloadToken = {
  token: string
}

const options: OptionsType[] = [
  {
    value: "Employee",
    label: "Employee",
  },
  {
    value: "Employer",
    label: "Employer",
  },
];

const Register: React.FC = () => {
  const [avatarImg, setAvatarImg] = useState("");
  const [companyImg, setCompanyImg] = useState("");
  const [isEmployee, setIsEmployee] = useState(false);
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormRegisterValues>({
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<FormRegisterValues> = async (values) => {
    values.avatar = avatarImg;
    values.companyImage = companyImg;

    const data = await dispatch(fetchUserRegister(values));
    const payload = data.payload as PayloadToken;

    handleCreateCompany(values);

    if (!payload) {
      return alert("Не удалось зарегистрироваться.");
    }

    if ("token" in payload) {
      window.localStorage.setItem("token", payload.token);
    }

    window.localStorage.setItem('toast', 'signUp');
  };

  const handleCreateCompany = async (values: FormRegisterValues) => {
    const { companyName, companyDescription } = values;

    await dispatch(
      fetchCreateCompany({
        name: companyName,
        description: companyDescription,
        image: companyImg,
      })
    );
  }

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>, image: string) => {
    try {
      if (e.target.files) {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append("image", file);
        const { data } = await axios.post<{url: string}>("upload", formData);
        image == 'avatar' ? setAvatarImg(data.url) : setCompanyImg(data.url);
      }
    } catch (err) {
      console.log(err);
      alert("Ошибка при загрузке файла");
    }
  };

  if (isAuth) {
    navigate('/');
  }

  const getValue = (value: string) => {
    setIsEmployee(value == "Employee");
    return value ? options.find((item) => item.value == value) : "";
  };

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
                <h3>Register</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="contact-section section_padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="contact-title">Register</h2>
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
                          required: "Укажите email",
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
                  <div className="col-sm-6">
                    <div
                      className="form-group"
                      style={errors.name && { marginBottom: "10px" }}
                    >
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter name"
                        {...register("name", {
                          required: "Укажите имя",
                        })}
                      />
                    </div>
                    {errors.name && (
                      <div className="w-100">
                        <ul className="alert alert-danger">
                          <li>{errors.name.message}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="col-sm-6">
                    <div
                      className="form-group"
                      style={errors.password && { marginBottom: "10px" }}
                    >
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Enter password"
                        {...register("password", {
                          required: "Укажите пароль",
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
                  <div className="col-sm-12">
                    <div
                      className="form-group"
                      style={errors.about && { marginBottom: "10px" }}
                    >
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter about yourself"
                        {...register("about", {
                          required: "Расскажите что-нибудь о себе",
                          minLength: {
                            value: 20,
                            message:
                              "О себе должно содержать минимум 20 символов",
                          },
                        })}
                      />
                    </div>
                    {errors.about && (
                      <div className="w-100">
                        <ul className="alert alert-danger">
                          <li>{errors.about.message}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                  {isEmployee ? (
                    <div className="col-md-12">
                      <div
                        className="form-group"
                        style={errors.companyName && { marginBottom: "10px" }}
                      >
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter company name"
                          {...register("companyName", {
                            required: "Укажите название компании",
                          })}
                        />
                      </div>
                      {errors.companyName && (
                        <div className="w-100">
                          <ul className="alert alert-danger">
                            <li>{errors.companyName.message}</li>
                          </ul>
                        </div>
                      )}
                      <div
                        className="form-group"
                        style={
                          errors.companyDescription && { marginBottom: "10px" }
                        }
                      >
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter company description"
                          {...register("companyDescription", {
                            required: "Укажите описание компании",
                            minLength: {
                              value: 20,
                              message:
                                "Описание должно содержать минимум 20 символов",
                            },
                          })}
                        />
                      </div>
                      {errors.companyDescription && (
                        <div className="w-100">
                          <ul className="alert alert-danger">
                            <li>{errors.companyDescription.message}</li>
                          </ul>
                        </div>
                      )}
                      <div
                        className="form-group"
                        style={errors.companyImage && { marginBottom: "10px" }}
                      >
                        <div
                          className="input-group"
                          style={{ marginBottom: "25px" }}
                        >
                          <div className="input-group-prepend">
                            <button type="button" id="inputGroupFileAddon03">
                              <i
                                className="fa fa-cloud-upload"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </div>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="inputGroupFile03"
                              aria-describedby="inputGroupFileAddon03"
                              {...register("companyImage")}
                              onChange={(e) => handleChangeFile(e, 'companyImage')}
                            />
                            <label className="custom-file-label">
                              Company image
                            </label>
                          </div>
                        </div>
                        {companyImg && (
                          <img
                            className="w-50 h-50"
                            src={`http://localhost:3000${companyImg}`}
                            alt=""
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="col-md-12">
                      <div className="form-group">
                        <Controller
                          control={control}
                          name="speciality"
                          rules={{
                            required: "Укажите специальность",
                          }}
                          render={({
                            field: { onChange, value },
                            fieldState: { error },
                          }) => (
                            <>
                              <ReactSelect
                                placeholder="Enter speciality"
                                options={optionsCategory}
                                value={getValue(value)}
                                onChange={(newValue) => {
                                  onChange((newValue as OptionsType).value);
                                }}
                                isSearchable={false}
                              />
                              {error && (
                                <ul className="alert alert-danger mt-2 mb-3">
                                  <li>{error.message}</li>
                                </ul>
                              )}
                            </>
                          )}
                        />
                      </div>
                    </div>
                  )}
                  <div className="col-md-12" style={{ marginBottom: "15px" }}>
                    <Controller
                      control={control}
                      name="role"
                      rules={{
                        required: "Выберите роль",
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <ReactSelect
                            placeholder={"Role"}
                            options={options}
                            value={getValue(value)}
                            onChange={(newValue) =>
                              onChange((newValue as OptionsType).value)
                            }
                            isSearchable={false}
                          />
                          {error && (
                            <ul className="alert alert-danger mt-2 mb-1">
                              <li>{error.message}</li>
                            </ul>
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>
                <div className="col-md-12" style={{ padding: 0 }}>
                  <div className="input-group" style={{ marginBottom: "25px" }}>
                    <div className="input-group-prepend">
                      <button type="button" id="inputGroupFileAddon03">
                        <i
                          className="fa fa-cloud-upload"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </div>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="inputGroupFile03"
                        aria-describedby="inputGroupFileAddon03"
                        {...register("avatar")}
                        onChange={(e) => handleChangeFile(e, 'avatar')}
                      />
                      <label className="custom-file-label">Avatar</label>
                    </div>
                  </div>
                </div>
                <div className="col-12" style={{ marginLeft: "-15px" }}>
                  {avatarImg && (
                    <img
                      className="w-25 h-25"
                      src={`http://localhost:3000${avatarImg}`}
                      alt=""
                    />
                  )}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-group mt-3">
                    <button
                      type="submit"
                      className="button button-contactForm btn_4 boxed-btn"
                    >
                      Sign Up
                    </button>
                  </div>
                  <div className="form-group mt-3" style={{ textAlign: 'end' }}>
                    <p>
                      <Link
                        to={"/login"}
                        className="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                      >
                        already have an account?
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

export default Register;
