import React, { Component } from "react";
import { item } from "../interfaces/item";
import { GridProps } from "../interfaces/grid-props";
import { GridState } from "../interfaces/grid-state";

export default class CategoryGrid extends Component<GridProps, GridState> {
  constructor(props: GridProps) {
    super(props);
    this.state = {
      items: [],
      active: ["", "", "", "", ""],
      itemsOffsetChange: false
    };
  }
  /**
   * A function invoked after component is mounted
   *
   *
   * @public
   */
  componentDidMount() {
    //fetch the data based on the url
    fetch(this.props.fetchUrl)
      .then(items => {
        return items.json();
      })
      .then(data => {
        this.setState({
          items: data
        });
      });
    //add an event listener on resize to recalculate the categories offset if needed
    window.addEventListener("resize", () => {
      //update state to re-render and re-calculate offset data
      this.setState({
        itemsOffsetChange: !this.state.itemsOffsetChange
      });
    });
  }

  /**
   * a function invoked on mounting and resizing the window
   * used to dynmically calculate the offset value in the columns for the category items if any
   * needed in case the number of categories retreived should change at any time
   * @param {number} ratingCount
   * @public
   */
  calculateOffset = () => {
    let offsetValue: number = 0;
    let itemWithOfffset: number = 0;
    let itemsPerRow: number = 0;
    let maxItemsPerRow: number = 12 / Number(this.props.itemWidth);
    let noOfLines: number = 0;
    if (window.innerWidth < 768) {
      //if window is md or less -> the number of items per row is set to 3; regardless of categories count
      itemsPerRow = 3;
    } else {
      //else check if number of items is less than max items per row
      //set itemsPerRow to itemsCount else set it to maxItemsPerRows
      itemsPerRow =
        this.state.items.length < maxItemsPerRow
          ? this.state.items.length
          : maxItemsPerRow;
    }
    //divide the total items over the number of items per row to get how many rows do our categories span
    noOfLines = Math.ceil(this.state.items.length / itemsPerRow);
    if (noOfLines > 1) {
      //if items span several rows
      //get the items count on the last row
      let remainingItems =
        this.state.items.length - (noOfLines - 1) * itemsPerRow;
      //if items remaining are less than the count of items per rows
      if (remainingItems < itemsPerRow) {
        //get the remaining cols and split over 2 to get the offsetValue
        offsetValue = (12 - remainingItems * (12 / itemsPerRow)) / 2;
        //get index of first remaining item to add offse to it
        itemWithOfffset = this.state.items.length - remainingItems;
      }
    } else {
      //all items span one row only
      //check if they need to be centered
      let remainingCols = 12 - itemsPerRow * Number(this.props.itemWidth);
      //if we have remainging columns in the row split it in two
      //add offset at the begining with that values
      if (remainingCols > 0) {
        offsetValue = remainingCols / 2;
        itemWithOfffset = 0;
      }
    }
    return { indexOfOffset: itemWithOfffset, offsetValue: offsetValue };
  };

  /**
   * A function invoked to handle resetting the currently selected category and setting a new one
   *
   * @param {number} newItemIndex
   * @public
   */
  resetActiveStateArray = (newItemIndex: number) => {
    let tempActiveArr: string[] = [];
    //clear the current itemsCount
    for (let i = 0; i < this.state.items.length; i++) {
      tempActiveArr[i] = "";
    }
    //set the newly active item (by adding an active class)
    tempActiveArr[newItemIndex] = "active";
    //update state to re-render changes
    this.setState({
      active: tempActiveArr
    });
  };
  render() {
    return this.state.items.map((item, index) => {
      //get the offset data before rendering
      let offsetData: {
        indexOfOffset: number;
        offsetValue: number;
      } = this.calculateOffset();
      //add offset to the class if needed
      let containerClassName: string = "col-4 col-md-";
      index == offsetData.indexOfOffset
        ? (containerClassName =
            "col-4 offset-" + offsetData.offsetValue + " col-md-")
        : (containerClassName = "col-4 col-md-");
      return (
        <div className={containerClassName + this.props.itemWidth} key={index}>
          <div
            className={"category-item " + this.state.active[index]}
            onClick={() => {
              this.resetActiveStateArray(index);
              this.props.handleCategoryClick(item.id, item.name);
            }}
          >
            <img src={item.image} alt="" />
            <h5 className="title">{item.name}</h5>
          </div>
        </div>
      );
    });
  }
}
