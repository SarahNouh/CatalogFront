import React, { Component } from "react";
import "./App.scss";
import { AppState } from "./interfaces/app-state";
import CategoryGrid from "./components/category-grid";
import FiltersSection from "./components/filters-section";
import Header from "./components/header";
import ProductsGrid from "./components/products-grid";
import { Range } from "./interfaces/range";

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      productUrl: "http://test-api.edfa3ly.io/product",
      categoryName: "All Products"
    };
  }

  /**
   * A function to handle changing the products on category click
   *
   * @param {number} categoryId
   * @param {string} categoryName
   * @public
   */
  handleChangeCategory = (categoryId: number, categoryName: string) => {
    let url: string = this.state.productUrl;
    let filters: string = "";
    let splitIndex: number = 0;
    //check if we have other filters in the url
    if (url.indexOf("?") > -1) {
      //split the url to the main url and the filters part
      filters = url.split("?")[1];
      url = url.split("?")[0];

      //if we have any filters
      if (filters) {
        //check if we have a previous category present
        if (filters.indexOf("categoryId=") > -1) {
          //remove previous category and its value
          filters = filters.split("categoryId=")[1];
          splitIndex = filters.indexOf("&");
          if (splitIndex > -1) {
            //retreive the rest of the filters
            filters = filters.substring(splitIndex + 1);
            //append new category and previous filters to url
            url = url + "?" + "categoryId=" + categoryId + "&" + filters;
          } else {
            //no previous fitlers present
            //just append new category
            filters = "";
            url = url + "?" + "categoryId=" + categoryId;
          }
        } else {
          //no previous category present
          //append new category and previous filters
          url += "?" + "categoryId=" + categoryId + "&" + filters;
        }
      }
    } else {
      //we have no previous filters
      //just append new category
      url += "?categoryId=" + categoryId;
    }
    this.setState({
      productUrl: url,
      categoryName: categoryName + " Products"
    });
  };

  /**
   * A function to handle changing the products on side filters click
   *
   * @param {string} colourValue
   * @param {number} ratingNumber
   * @param {Range | number} priceRange
   * @public
   */
  handleFilterData = (
    colourValue: string,
    ratingValue: number,
    priceRange: Range | number
  ) => {
    let currentUrl: string = "";
    let filtersValues: string = "";
    //remove previous filters from URL if any
    if (this.state.productUrl.indexOf("?") > -1) {
      //check if url has a category selected
      if (this.state.productUrl.indexOf("categoryId=") > -1) {
        // maintain category and it's value and trim after it
        currentUrl = this.state.productUrl.split("categoryId=")[0];
        //add the current category and it's value to the current filters
        filtersValues +=
          "categoryId=" +
          this.state.productUrl.split("categoryId=")[1].split("&")[0];
      }
    } else {
      //no previous filters selected
      currentUrl = this.state.productUrl;
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
      //if previous filters are present
      if (filtersValues.length > 0) {
        //add rating filters to them
        filtersValues += "&rating=" + ratingValue;
      } else {
        filtersValues += "rating=" + ratingValue;
      }
    }
    //if a price range is selected
    if (priceRange !== -1) {
      //if previous filters are present
      if (filtersValues.length > 0) {
        //add price filters to them
        filtersValues +=
          "&price_lte=" +
          (priceRange as Range).max +
          "&price_gte=" +
          (priceRange as Range).min;
      } else {
        //add price filters as first filters
        filtersValues +=
          "price_lte=" +
          (priceRange as Range).max +
          "&price_gte=" +
          (priceRange as Range).min;
      }
    }
    if (filtersValues.length > 0) {
      currentUrl = currentUrl.split("?")[0] + "?";
    } else {
      currentUrl = currentUrl.split("?")[0];
    }
    //set state to update url with selected filters
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
