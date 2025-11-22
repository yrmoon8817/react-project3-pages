import React from "react";
import OrderableProductItem from "./OrderableProductItem";
import Page from "../../components/Page";
import Title from "../../components/Title";
import Navbar from "../../components/Navbar";
import ErrorDialog from "../../components/ErrorDialog";
import ProductApi from "../../../shared/api/ProductApi";
import * as MyLayout from "../../libs/MyLayout";

const ProductPage = () => {
  const {openDialog} = MyLayout.useDialog();
  const {startLoading, finishLoading} = MyLayout.useLoading();
  const [productList, setProductList] = React.useState([]);
  const fetch = async() =>{
    startLoading("메뉴 목록 로딩중..");
    try {
      const productList = await ProductApi.fetchProductList();
      setProductList(productList);

    }catch (e) {
      openDialog(<ErrorDialog />);
      return;
    }
    finishLoading();
  }
  React.useEffect(()=>{
    fetch();
  },[]);
  
  return  (
      <div className="ProductPage">
        <Page header={<Title>메뉴목록</Title>} footer={<Navbar />}>
          <ul>
            {productList.map((product) => (
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
