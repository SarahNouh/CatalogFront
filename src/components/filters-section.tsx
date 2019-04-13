import React, { Component } from "react";
import chroma from "chroma-js";
import { filterProps } from "../interfaces/filter-props";
import { filtersState } from "../interfaces/filter-state";
import InputRange from "react-input-range";
import { item } from "../interfaces/item";
import { optionType } from "../interfaces/select-option";
import { ReactComponent as Star } from "../images/star.svg";
import { ReactComponent as FilledStar } from "../images/filled-star.svg";
import { ReactComponent as Clear } from "../images/close.svg";
import { Range } from "../interfaces/range";
import Select from "react-select";

const dot = (color = "#ccc") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10
  }
});

const colourStyles = {
  control: (styles: any) => ({ ...styles, backgroundColor: "white" }),
  option: (
    styles: any,
    {
      data,
      isDisabled,
      isFocused,
      isSelected
    }: {
      data: optionType;
      isDisabled: string;
      isFocused: string;
      isSelected: string;
    }
  ) => {
    const color = (chroma as any).valid(data.value)
      ? chroma(data.value)
      : chroma(data.value.split(" ")[1]);

    return {
      ...styles,
      backgroundColor: isDisabled
        ? ""
        : isSelected
        ? data.value
        : isFocused
        ? color.alpha(0.1).css()
        : "",
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data,
      cursor: isDisabled ? "not-allowed" : "default"
    };
  },
  input: (styles: Object) => ({ ...styles, ...dot() }),
  placeholder: (styles: Object) => ({ ...styles, ...dot() }),
  singleValue: (styles: Object, { data }: { data: optionType }) => ({
    ...styles,
    ...dot(
      (chroma as any).valid(data.value) ? data.value : data.value.split(" ")[1]
    )
  })
};

export default class FiltersSection extends Component<
  filterProps,
  filtersState
> {
  /**
   *the currently selected rating to filter the products by
   *@type number
   */
  selectedRating: number;
  /**
   *the currently selected price to filter the products by
   *@type string
   */
  selectedPriceRange: Range | number;
  /**
   *indicates the maximum value for the price range
   *@type string
   */
  maxPriceRange: number;
  constructor(props: filterProps) {
    super(props);

    this.state = {
      coloursArray: [],
      activeRating: ["", "", "", "", ""],
      priceRange: { min: 0, max: 1000 },
      selectedColour: "",
      priceIsSelected: false
    };
    this.maxPriceRange = 1000;
    this.selectedPriceRange = -1;
    this.selectedRating = -1;
  }

  /**
   * A function invoked after the component is mounted
   *
   * @public
   */
  componentDidMount() {
    //fetch the data from the url
    fetch(this.props.fetchUrl)
      .then(items => {
        return items.json();
      })
      .then(data => {
        //create an array of all colours in the items object
        let coloursArr = data.map((item: item) => item.color);
        //filter the colours array to remove duplicates
        let filteredColoursArr = coloursArr.filter(
          (item: item, index: number) => coloursArr.indexOf(item) === index
        );
        //create the array of options for the select
        let selectOptions: optionType[] = [];
        let option: optionType;
        //fill the array with the colours data retreived from fetch
        for (let i = 0; i < filteredColoursArr.length; i++) {
          option = {
            value: filteredColoursArr[i],
            label: filteredColoursArr[i]
          };
          selectOptions.push(option);
        }
        //get the maximum price to set the maximum number for the price range
        let max = data.reduce(function(max: string, current: item) {
          return max > current.price ? max : current.price;
        }, 0);
        //round it up to a number divisible by 10
        max = max + (10 - (max % 10));
        //set state to update the colours
        this.maxPriceRange = max;

        this.setState({
          coloursArray: selectOptions,
          priceRange: { min: 0, max: max }
        });
      });
  }

  /**
   * A function invoked to handle selecting a new colour
   *
   * @param {any} currentColor
   * @public
   */
  handleColourChange = (currentColor: any) => {
    let selectedColour: string = "";
    if (currentColor !== null) selectedColour = currentColor.value;

    this.setState({
      selectedColour: selectedColour
    });
  };

  /**
   * A function invoked on selected a rating filter
   *
   * @param {number} ratingValue
   * @public
   */
  handleRatingChange = (ratingValue: number) => {
    this.selectedRating = ratingValue;
    this.resetActiveStateArray(ratingValue);
  };

  /**
   * A function invoked to handle resetting the currently selected rating filter and setting a new one
   *
   * @param {number} newItemIndex
   * @public
   */
  resetActiveStateArray = (newItemIndex: number) => {
    let tempActiveArr: string[] = [];
    for (let i = 0; i < 5; i++) {
      tempActiveArr[i] = "";
    }
    tempActiveArr[newItemIndex] = "active";
    this.setState({
      activeRating: tempActiveArr
    });
  };

  /**
   *  a function to retreive the rating stars view based on the rating
   *
   * @param {number} ratingCount
   * @public
   */
  renderRating = (ratingCount: number) => {
    let ratingArr = [];
    //push filled stars based on the rating figure
    for (let i = 0; i < ratingCount; i++) {
      ratingArr.push(
        <FilledStar className="star filled-star" key={"star" + i} />
      );
    }
    //push empty stars for the remainder of the 5 stars if any
    for (let i = 0; i < 5 - ratingCount; i++) {
      ratingArr.push(<Star className="star" key={"star" + (5 - i)} />);
    }
    return ratingArr;
  };

  /**
   *  a function invoked on clicking the filter button
   *
   * @public
   */
  handleFilteringData = () => {
    //passing all filters values
    let selectedPriceRange = this.state.priceIsSelected
      ? this.state.priceRange
      : -1;
    this.props.handleFiltersChange(
      this.state.selectedColour,
      this.selectedRating,
      selectedPriceRange
    );
  };

  /**
   *  a function invoked on clicking clear button to clear all previously selected filters
   *
   * @param {}
   * @public
   */
  handleClearFilters = () => {
    console.log("CLEAR");
    this.selectedRating = -1;
    this.selectedPriceRange = -1;
    this.setState(
      {
        activeRating: ["", "", "", "", ""],
        priceRange: { min: 0, max: 1000 },
        priceIsSelected: false,
        selectedColour: ""
      },
      () => {
        //calling the function after clearing filters, to adjust url and refetch items
        this.handleFilteringData();
      }
    );
  };

  /**
   *  a function invoked on clicking x icon on the block that indicates the selected price filter
   *
   * @param {}
   * @public
   */
  handleClearPriceFilter = () => {
    this.setState(
      {
        priceRange: { min: 0, max: 1000 },
        priceIsSelected: false
      },
      () => {
        //calling the function after clearing price filter, to adjust url and refetch items
        this.handleFilteringData();
      }
    );
  };

  /**
   *  a function invoked on clicking x icon on the block that indicates the selected colour filter
   *
   * @param {}
   * @public
   */
  handleClearColourFilter = () => {
    this.setState(
      {
        selectedColour: ""
      },
      () => {
        //calling the function after clearing color filter, to adjust url and refetch items
        this.handleFilteringData();
      }
    );
  };

  /**
   *  a function invoked on clicking x icon on the block that indicates the selected rating filter
   *
   * @param {}
   * @public
   */
  handleClearRatingFilter = () => {
    this.selectedRating = -1;
    this.setState(
      {
        activeRating: ["", "", "", "", ""]
      },
      () => {
        console.log(this.state.priceRange);

        //calling the function after clearing color filter, to adjust url and refetch items
        this.handleFilteringData();
      }
    );
  };

  /**
   *  a function invoked to retreive check the colour for validity and retreiving another colour in case it's not valid
   *
   * @param {}
   * @public
   */
  getValidSelectedColour = (color: string) => {
    if ((chroma as any).valid(color)) {
      //checking if the colour is not white (if it's white we want to return black as white is not visible)
      if (color !== "white") {
        return color;
      }
    } else {
      if (
        //if the colour is not valid try splitting it and checking the validity of the second colour word if any
        color.split(" ")[1] !== undefined &&
        color.split(" ")[1] !== "white" &&
        (chroma as any).valid(color.split(" ")[1])
      ) {
        return color.split(" ")[1];
      }
    }
    //if any of the previous conditions fail return black
    return "black";
  };
  render() {
    return (
      <div className="filters">
        <h4 className="title">Filters</h4>
        <div className="price-range-filter">
          <h6 className="title">By Price</h6>
          <InputRange
            maxValue={this.maxPriceRange}
            minValue={0}
            value={this.state.priceRange}
            step={10}
            onChange={newRange => {
              this.setState({
                priceRange: newRange,
                priceIsSelected: true
              });
            }}
          />
        </div>
        <div className="colour-section">
          <h6 className="title">By Color</h6>
          <Select
            closeMenuOnSelect={false}
            defaultValue={this.state.coloursArray[0]}
            options={this.state.coloursArray}
            styles={colourStyles}
            isClearable={true}
            onChange={this.handleColourChange}
            value={{
              value:
                this.state.selectedColour == ""
                  ? "Select a Color"
                  : this.state.selectedColour,
              label:
                this.state.selectedColour == ""
                  ? "Select a Color"
                  : this.state.selectedColour
            }}
          />
        </div>
        <div className="rating-section">
          <h6 className="title">By Rating</h6>
          {[1, 2, 3, 4, 5].map(number => {
            return (
              <div
                className={"rating-item " + this.state.activeRating[number]}
                key={"rating" + number}
                onClick={() => {
                  this.handleRatingChange(number);
                }}
              >
                {this.renderRating(number)}
              </div>
            );
          })}
        </div>
        <div className="selected-filters-container">
          {this.state.priceIsSelected ? (
            <button
              type="button"
              className="btn selected-filters price"
              onClick={() => {
                {
                  this.handleClearPriceFilter();
                }
              }}
            >
              From: ${(this.state.priceRange as Range).min} To: $
              {(this.state.priceRange as Range).max}
              <Clear />
            </button>
          ) : null}
          {this.state.selectedColour !== "" ? (
            <button
              type="button"
              className="btn selected-filters colour"
              style={{
                color: this.getValidSelectedColour(this.state.selectedColour),
                borderColor: this.getValidSelectedColour(
                  this.state.selectedColour
                )
              }}
              onClick={() => {
                {
                  this.handleClearColourFilter();
                }
              }}
            >
              {this.state.selectedColour}
              <Clear />
            </button>
          ) : null}
          {this.selectedRating !== -1 ? (
            <button
              type="button"
              className="btn selected-filters rating"
              onClick={() => {
                {
                  this.handleClearRatingFilter();
                }
              }}
            >
              Rating: {this.selectedRating}
              <Clear />
            </button>
          ) : null}
          {this.state.selectedColour !== "" ||
          this.selectedRating !== -1 ||
          this.state.priceIsSelected ? (
            <button
              type="button"
              className="btn clear"
              onClick={() => {
                {
                  this.handleClearFilters();
                }
              }}
            >
              Clear All Filters
              <Clear />
            </button>
          ) : null}
        </div>
        <button
          type="button"
          className="btn"
          onClick={() => {
            {
              this.handleFilteringData();
            }
          }}
        >
          Filter Results
        </button>
      </div>
    );
  }
}
