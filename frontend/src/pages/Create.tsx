import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../redux/slices/auth";
import { AppDispatch } from "../redux/store";
import { fetchCreate } from "../redux/slices/jobs";
import axios from "../axios";
import { OptionsType } from "../types/OptionsType";
import ReactSelect from "react-select";
import { optionsEmployment, optionsExperience, optionsCategory } from "../Options/Options";
import { FormCreateValues } from "../types/FormType";

const Create: React.FC = () => {
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormCreateValues>({
    mode: "onSubmit",
  });

  const onSumbit: SubmitHandler<FormCreateValues> = (values) => {
    values.image = imageUrl;
    dispatch(fetchCreate(values));
    window.localStorage.setItem('toast', 'create');
    navigate("/");
  };

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append("image", file);
        const { data } = await axios.post<{url: string}>("upload", formData);
        setImageUrl(data.url);
      }
    } catch (err) {
      console.log(err);
      alert("Ошибка при загрузке файла");
    }
  };

  const getValue = (value: string) =>
    value ? optionsEmployment.find((item) => item.value == value) : "";

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to={"/"} />;
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
                <h3>Create</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="contact-section section_padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="contact-title">Create</h2>
            </div>
            <div className="col-lg-12">
              <form
                className="form-contact contact_form"
                onSubmit={handleSubmit(onSumbit)}
                id="contactForm"
              >
                <div className="row">
                  <div className="col-12">
                    <div
                      className="form-group"
                      style={errors.vacancy && { marginBottom: "10px" }}
                    >
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter vacancy"
                        {...register("vacancy", {
                          required: "Укажите вакансию",
                        })}
                      />
                    </div>
                    {errors.vacancy && (
                      <div className="w-100">
                        <ul className="alert alert-danger">
                          <li>{errors.vacancy.message}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="col-sm-12">
                    <div
                      className="form-group des"
                      style={errors.description && { marginBottom: "10px" }}
                    >
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter description"
                        {...register("description", {
                          required: "Укажите описание",
                          minLength: {
                            value: 20,
                            message:
                              "Описание должно содержать не менее 20 символов",
                          },
                        })}
                      />
                    </div>
                    {errors.description && (
                      <div className="w-100">
                        <ul className="alert alert-danger">
                          <li>{errors.description.message}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="col-sm-6">
                    <Controller
                      control={control}
                      name="employment"
                      rules={{
                        required: "Укажите занятость",
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <ReactSelect
                            placeholder="Employment"
                            options={optionsEmployment}
                            value={getValue(value)}
                            onChange={(newValue) =>
                              onChange((newValue as OptionsType).value)
                            }
                            isSearchable={false}
                          />
                          {error && (
                            <ul className="alert alert-danger mt-1 mb-3">
                              <li>{error.message}</li>
                            </ul>
                          )}
                        </>
                      )}
                    />
                  </div>
                  <div className="col-sm-6">
                    <Controller
                      control={control}
                      name="experience"
                      rules={{
                        required: "Укажите опыт работы",
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error }
                      }) => (
                        <>
                          <ReactSelect
                            placeholder="Experience"
                            options={optionsExperience}
                            value={getValue(value)}
                            onChange={(newValue) => {
                              onChange((newValue as OptionsType).value)
                            }}
                            isSearchable={false}
                          />
                          {error && (
                            <ul className="alert alert-danger mt-1 mb-3">
                              <li>{error.message}</li>
                            </ul>
                          )}
                        </>
                      )}
                    />
                  </div>
                  <div className="col-sm-12">
                    <Controller 
                      control={control}
                      name="category"
                      rules={{
                        required: 'Укажите категорию'
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error }
                      }) => (
                        <>
                          <ReactSelect 
                            placeholder="Category"
                            options={optionsCategory}
                            value={getValue(value)}
                            onChange={(newValue) => {
                              onChange((newValue as OptionsType).value)
                            }}
                            isSearchable={false}
                          />
                          {error && (
                            <ul className="alert alert-danger mt-1 mb-3">
                              <li>{error.message}</li>
                            </ul>
                          )}
                        </>
                      )}
                    />
                  </div>
                  <div className="col-sm-12">
                    <div
                      className="form-group"
                      style={errors.salary && { marginBottom: "10px" }}
                    >
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Enter salary"
                        {...register("salary", {
                          required: "Укажите зарплату",
                        })}
                      />
                    </div>
                    {errors.salary && (
                      <div className="w-100">
                        <ul className="alert alert-danger">
                          <li>{errors.salary.message}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="col-sm-12">
                    <div
                      className="form-group"
                      style={errors.location && { marginBottom: "10px" }}
                    >
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter location"
                        {...register("location", {
                          required: "Укажите место",
                        })}
                      />
                    </div>
                    {errors.location && (
                      <div className="w-100">
                        <ul className="alert alert-danger">
                          <li>{errors.location.message}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="col-md-12">
                    <div className="input-group">
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
                          {...register("image")}
                          type="file"
                          className="custom-file-input"
                          id="inputGroupFile03"
                          aria-describedby="inputGroupFileAddon03"
                          onChange={handleChangeFile}
                        />
                        <label className="custom-file-label">Image</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12" style={{ marginLeft: "-15px" }}>
                  {imageUrl && (
                    <img
                      className="w-50 h-50"
                      src={`http://localhost:3000${imageUrl}`}
                      alt=""
                    />
                  )}
                </div>
                <div className="form-group mt-3">
                  <button
                    type="submit"
                    className="button button-contactForm btn_4 boxed-btn"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Create;
