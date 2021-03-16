import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";

const Main = () => {
  const [data, setData] = useState([]);
  const [filterAZ, setFilterAZ] = useState(false);
  const [filterPrior, setFilterPrior] = useState(1);

  useEffect(() => {
    let products = JSON.parse(localStorage.getItem("products"));
    handleFilterPrior(products);
  }, []);

  const handleChangeStatus = (id) => {
    let newData = [];
    data.map((item) => {
      if (item.id === id) {
        newData.push({ ...item, date: new Date(), status: !item.status });
      } else {
        newData.push({ ...item });
      }
    });
    let jsonData = JSON.stringify(newData);
    localStorage.removeItem("products");
    localStorage.setItem("products", jsonData);
    setData(JSON.parse(jsonData));
  };

  const handleRemove = (id) => {
    let newData = data.filter((item) => item.id !== id);
    localStorage.removeItem("products");
    localStorage.setItem("products", JSON.stringify(newData));
    setData(newData);
  };

  const handleFiltreAlphabet = (dataForFilter) => {
    let newData = [];
    if (!!filterAZ) {
      newData = dataForFilter.sort((prev, next) => {
        if (prev.name < next.name) return -1;
        if (prev.name > next.name) return 1;
        if (prev.name == next.name) return 0;
      });
    } else {
      newData = dataForFilter.sort((prev, next) => {
        if (prev.name > next.name) return -1;
        if (prev.name < next.name) return 1;
        if (prev.name == next.name) return 0;
      });
    }
    let jsonData = JSON.stringify(newData);
    localStorage.removeItem("products");
    localStorage.setItem("products", jsonData);
    setData(JSON.parse(jsonData));
    setFilterAZ(!filterAZ);
  };

  const handleFilterPrior = (dataForFilter) => {
    let newData = [];
    if (!!filterPrior) {
      newData = dataForFilter.sort((prev, next) => prev.prior - next.prior);
    } else {
      newData = dataForFilter.sort((prev, next) => next.prior - prev.prior);
    }
    let jsonData = JSON.stringify(newData);
    localStorage.removeItem("products");
    localStorage.setItem("products", jsonData);
    setData(JSON.parse(jsonData));
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="formik">
          <Formik
            initialValues={{
              text: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              let newData =
                data != null
                  ? [
                      ...data,
                      {
                        name: values.text,
                        date: new Date(),
                        status: false,
                        prior: 1,
                        id: Math.floor(Math.random() * (10000 - 0)) + 0,
                      },
                    ]
                  : [
                      {
                        name: values.text,
                        date: new Date(),
                        status: false,
                        prior: 1,
                        id: Math.floor(Math.random() * (10000 - 0)) + 0,
                      },
                    ];
              let jsonData = JSON.stringify(newData);
              localStorage.removeItem("products");
              localStorage.setItem("products", jsonData);
              setData(JSON.parse(jsonData));
            }}
          >
            {({ resetForm, isSubmitting }) => (
              <Form autoComplete="off">
                <div className="form-group">
                  <Field type="input" id={"text"} name="text" />
                </div>
                <div className="form-button">
                  <button type="reset" className="" onClick={() => resetForm()}>
                    Очистити
                  </button>
                  <button type="submit" disabled={isSubmitting} className="btn">
                    Виконати
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="product__list">
          <div className="product__list_filter">
            <button
              className="product__list_button"
              onClick={() => handleFiltreAlphabet(data)}
            >
              A-Z
            </button>
            <button
              className="product__list_button"
              onClick={() => handleFilterPrior(data)}
            >
              1-5
            </button>
          </div>
          {data != null &&
            data.map((item, index) => (
              <div className="product__item" key={index}>
                <div className="product__item_info">
                  <div className="product__item_info_row">
                    <span className="product__item_info_title">
                      Name:&nbsp;
                    </span>
                    <span className="product__item_info_desc">{item.name}</span>
                  </div>
                  <div className="product__item_info_row">
                    <span className="product__item_info_title">
                      Status:&nbsp;
                    </span>
                    <span className="product__item_info_desc">
                      {item.status ? "active" : "disabled"}
                    </span>
                  </div>
                  <div className="product__item_info_row">
                    <span className="product__item_info_title">
                      Date:&nbsp;
                    </span>
                    <span className="product__item_info_desc">{item.date}</span>
                  </div>
                  <div className="product__item_info_row">
                    <span className="product__item_info_title">
                      Prior:&nbsp;
                    </span>
                    <span className="product__item_info_desc">{item.prior}</span>
                  </div>
                </div>
                <div className="product__item_button">
                  <button
                    className="product__item_status"
                    onClick={() => handleChangeStatus(item.id)}
                  >
                    Status
                  </button>
                  <Link to={`/item/${item.id}`}>Edit</Link>
                  <button
                    className="product__item_remove"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
