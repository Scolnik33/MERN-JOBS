import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import {
  optionsCategory,
  optionsEmployment,
  optionsExperience,
} from "../Options/Options";
import axios from "../axios";
import { useNavigate, useParams } from "react-router";
import { OptionsType } from "../types/OptionsType";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { ErrorsType } from "../types/ErrorsType";

const Edit: React.FC = () => {
  const [vacancy, setVacancy] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [employment, setEmployment] = useState("");
  const [experience, setExperience] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append("image", file);
        const { data } = await axios.post("upload", formData);
        setImageUrl(data.url);
      }
    } catch (err) {
      console.log(err);
      alert("Ошибка при загрузке файла");
    }
  };

  const getValue = (value: string) => {
    value ? optionsEmployment.find((item) => item.value == value) : "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const values = {
        vacancy,
        category,
        description,
        salary,
        location,
        employment,
        experience,
        image: imageUrl,
      };
  
      await axios.patch(`/update/${id}`, values);
      window.localStorage.setItem('toast', 'edit');
  
      navigate(`/jobs/${id}`);
    } catch (err: unknown) {
      console.log(err);
      if (err instanceof AxiosError) {
        err.response?.data.map((item: ErrorsType) => {
          toast.error(item.msg);
        })
      }
    }
  };

  const fetchJob = async () => {
    const { data } = await axios.get(`/getone/${id}`);
    setVacancy(data.vacancy);
    setCategory(data.category);
    setDescription(data.description);
    setSalary(data.salary);
    setLocation(data.location);
    setImageUrl(data.image);
    setEmployment(data.employment);
    setExperience(data.experience);
  };

  useEffect(() => {
    fetchJob();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text">
                <h3>Edit</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="contact-section section_padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="contact-title">Edit</h2>
            </div>
            <div className="col-lg-12">
              <form
                onSubmit={handleSubmit}
                className="form-contact contact_form"
                id="contactForm"
              >
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter vacancy"
                        value={vacancy}
                        onChange={(e) => setVacancy(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div
                      className="col-sm-6"
                      style={{ maxWidth: "100%", padding: 0 }}
                    >
                      <div className="form-group">
                        <ReactSelect
                          placeholder="Employment"
                          options={optionsEmployment}
                          value={
                            !employment
                              ? getValue(employment)
                              : { value: employment, label: employment }
                          }
                          onChange={(newValue) => {
                            setEmployment((newValue as OptionsType).value)
                          }}
                          isSearchable={false}
                        />
                      </div>
                    </div>
                    <div
                      className="col-sm-6"
                      style={{ maxWidth: "100%", padding: 0 }}
                    >
                      <div className="form-group">
                        <ReactSelect
                          placeholder="Experience"
                          options={optionsExperience}
                          value={
                            !experience
                              ? getValue(experience)
                              : { value: experience, label: experience }
                          }
                          onChange={(newValue) => {
                            setExperience((newValue as OptionsType).value)
                          }}
                          isSearchable={false}
                        />
                      </div>
                    </div>
                    <div
                      className="col-sm-12"
                      style={{ maxWidth: "100%", padding: 0 }}
                    >
                      <div className="form-group">
                        <ReactSelect
                          placeholder="Category"
                          options={optionsCategory}
                          value={
                            !category
                              ? getValue(category)
                              : { value: category, label: category }
                          }
                          onChange={(newValue) => {
                            setCategory((newValue as OptionsType).value)
                          }}
                          isSearchable={false}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12" style={{ padding: 0 }}>
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="number"
                          placeholder="Enter salary"
                          value={salary}
                          onChange={(e) => setSalary(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12" style={{ padding: 0 }}>
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-12" style={{ padding: 0 }}>
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
                    Edit
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

export default Edit;
