import React, {useEffect}from "react";
import ProductApi from "../../../shared/api/ProductApi.js";
import * as MyLayout from "../../libs/MyLayout.jsx";
import Page from "../../components/Page.jsx";
import Title from "../../components/Title.jsx";
import Navbar from "../../components/Navbar.jsx";
import ErrorDialog from "../../components/ErrorDialog.jsx";
import OrderableProductItem from "./OrderableProductItem.jsx";

const ProductPage = () => {
  const {openDialog} = MyLayout.useDialog();
  const {startLoading, finishLoading} = MyLayout.useLoading();
  const [productList, setProductList] = React.useState([]);
  const fetch = async() =>{
    startLoading("메뉴 목록 로딩중..");
    try {
      setTimeout(async()=>{
        const productList = await ProductApi.fetchProductList();
        setProductList(productList);
      },300)
    }catch (e) {
      openDialog(<ErrorDialog />);
      return;
    }
    finishLoading();
  }
  useEffect(()=>{
    fetch();
  },[]);
  
  return  (
      <div className="ProductPage">
        <Page header={<Title>메뉴목록</Title>} footer={<Navbar />}>
          <ul>
            {productList&&productList.map((product) => (
              <li key={product.id}>
                <OrderableProductItem product={product} />
              </li>
            ))}
          </ul>
        </Page>
      </div>
    );

}

export default ProductPage;
