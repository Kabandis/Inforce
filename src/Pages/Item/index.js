import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";

const Item = (props) => {
  const [product, setProduct] = useState({});
  const [allProducts, setAllProducts] = useState([]);

  const handleChangeStatus = (id) => {
    let newData = [];
    allProducts.map((item) => {
      if (item.id == id) {
        newData.push({ ...item, date: new Date(), status: !item.status });
      } else {
        newData.push({ ...item });
      }
    });
    let jsonData = JSON.stringify(newData);
    localStorage.removeItem("products");
    localStorage.setItem("products", jsonData);
    setAllProducts(JSON.parse(jsonData));
  };

  const handleRemove = (id) => {
    let newData = allProducts.filter((item) => item.id != id);
    localStorage.removeItem("products");
    localStorage.setItem("products", JSON.stringify(newData));
    setAllProducts(newData);
    props.history.push("/")
    console.log(allProducts)
  };

  useEffect(() => {
    let products = JSON.parse(localStorage.getItem("products"));
    setAllProducts(products);
  }, []);

  useEffect(() => {
    let newData = allProducts.filter((item) => item.id == props.match.params.id);
    setProduct(newData[0]);
  }, [allProducts]);

  return (
    <div>
      <Link to="/">Main</Link>
      <Formik
        initialValues={{
          prior: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          let newData = [];
          allProducts.map((item) => {
            if (item.id == props.match.params.id) {
              newData.push({ ...item, prior: values.prior });
            } else {
              newData.push({ ...item });
            }
        
          });
          console.log(newData)
          let jsonData = JSON.stringify(newData);
          localStorage.removeItem("products");
          localStorage.setItem("products", jsonData);
          setAllProducts(JSON.parse(jsonData));
        }}
      >
        {({ resetForm, isSubmitting }) => (
          <Form autoComplete="off">
            <div className="form-group">
              <Field type="number" id="prior" name="prior" />
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
      
      <div>
        <div className="product__item_info">
          <div className="product__item_info_row">
            <span className="product__item_info_title">Name:&nbsp;</span>
            <span className="product__item_info_desc">{product?.name}</span>
          </div>
          <div className="product__item_info_row">
            <span className="product__item_info_title">Status:&nbsp;</span>
            <span className="product__item_info_desc">
              {product?.status ? "active" : "disabled"}
            </span>
          </div>
          <div className="product__item_info_row">
            <span className="product__item_info_title">Date:&nbsp;</span>
            <span className="product__item_info_desc">{product?.date}</span>
          </div>
          <div className="product__item_info_row">
            <span className="product__item_info_title">Prior:&nbsp;</span>
            <span className="product__item_info_desc">{product?.prior}</span>
          </div>
        </div>
        <div className="product__item_button">
                  <button
                    className="product__item_status"
                    onClick={() => handleChangeStatus(props.match.params.id)}
                  >
                    Status
                  </button>
  
                  <button
                    className="product__item_remove"
                    onClick={() => handleRemove(props.match.params.id)}
                  >
                    Remove
                  </button>
                </div>
      </div>

    </div>
  );
};

export default Item;
