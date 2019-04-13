import React, { Component } from "react";
import "./App.scss";
import ProductsGrid from "./components/products-grid";
import CategoryGrid from "./components/category-grid";
import Header from "./components/header";
import FiltersSection from "./components/filters-section";
import { Range } from "./interfaces/range";

interface AppState {
  productUrl: string;
  categoryName: string;
}
class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      productUrl: "http://test-api.edfa3ly.io/product",
      categoryName: "All Products"
    };
  }

  /*
   * A function to handle changing the products on category click
   * @param {number} categoryId
   * @public
   */
  handleChangeCategory = (categoryId: number, categoryName: string) => {
    this.setState({
      productUrl: "http://test-api.edfa3ly.io/product?categoryId=" + categoryId,
      categoryName: categoryName + " Products"
    });
  };

  handleFilterData = (
    colourValue: string,
    ratingValue: number,
    priceRange: Range | number
  ) => {
    let currentUrl: string = "";
    let filtersValues: string = "";
    //remove previous filters from URL if any
    if (this.state.productUrl.indexOf("?") > -1) {
      currentUrl = this.state.productUrl.split("?")[0] + "?";
    } else {
      currentUrl = this.state.productUrl + "?";
    }
    //if we have a value for filtering by colour add it to URL
    if (colourValue !== "") {
      if (filtersValues.length > 0) {
        //if there was a previous filter add to it colour
        filtersValues += "&color=" + colourValue;
      } else {
        //else add colour as if it was the first filter
        filtersValues += "color=" + colourValue;
      }
    }
    //if we have a value for filtering by rating add it to URL
    if (ratingValue > 0) {
      if (filtersValues.length > 0) {
        filtersValues += "&rating=" + ratingValue;
      } else {
        filtersValues += "rating=" + ratingValue;
      }
    }
    if (priceRange !== -1) {
      if (filtersValues.length > 0) {
        filtersValues +=
          "&price<" +
          (priceRange as Range).max +
          "&price>" +
          (priceRange as Range).min;
      } else {
        filtersValues +=
          "price<" +
          (priceRange as Range).max +
          "&price>" +
          (priceRange as Range).min;
      }
    }
    console.log(currentUrl + filtersValues);
    this.setState({
      productUrl: currentUrl + filtersValues
    });
  };
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container-fluid">
          <div className="row">
            <CategoryGrid
              fetchUrl="http://test-api.edfa3ly.io/category"
              itemWidth="2"
              handleCategoryClick={this.handleChangeCategory}
            />
          </div>
          <div className="row">
            <div className="col-12 col-md-4">
              <FiltersSection
                fetchUrl="http://test-api.edfa3ly.io/product"
                handleFiltersChange={this.handleFilterData}
              />
            </div>
            <div className="col-12 col-md-8">
              <div className="row">
                <ProductsGrid
                  fetchUrl={this.state.productUrl}
                  itemWidth="4"
                  categoryName={this.state.categoryName}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
