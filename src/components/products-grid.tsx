import React, { Component } from "react";
import { item } from "../interfaces/item";
import { GridProps } from "../interfaces/grid-props";
import { GridState } from "../interfaces/grid-state";
import { ReactComponent as Star } from "../images/star.svg";
import { ReactComponent as FilledStar } from "../images/filled-star.svg";

export default class ProductsGrid extends Component<GridProps, GridState> {
  constructor(props: GridProps) {
    super(props);
    this.state = {
      items: [],
      active: []
    };
  }

  /**
   * A function invoked to handle fetching the data from the given URL
   *
   *
   * @public
   */
  fetchData = () => {
    console.log(this.props.fetchUrl);
    fetch(this.props.fetchUrl)
      .then(items => {
        return items.json();
      })
      .then(data => {
        this.setState({
          items: data
        });
      });
  };

  /**
   * A function invoked after component is mounted
   *
   *
   * @public
   */
  componentDidMount() {
    this.fetchData();
  }

  /**
   * A function invoked after component is mounted as well as when it receives new props
   *
   * @public
   */
  static getDerivedStateFromProps(nextProps: GridProps, prevState: GridState) {
    if (nextProps.fetchUrl !== prevState.fetchUrl) {
      //if we receive new props -> return new state object to update state else return null
      return { fetchUrl: nextProps.fetchUrl };
    } else return null;
  }

  /**
   * A function invoked after component is updated
   *
   * @public
   */
  componentDidUpdate(prevProps: GridProps, prevState: GridState) {
    //if the props have changed
    if (prevProps.fetchUrl !== this.props.fetchUrl) {
      //refetch data
      this.fetchData();
    }
  }

  /**
   *  a function to retreive the rating stars view based on the rating value
   *
   * @param {number} ratingCount
   * @public
   */
  calculateRating = (productRating: number) => {
    let ratingArr = [];
    for (let i = 0; i < productRating; i++) {
      ratingArr.push(
        <FilledStar className="star filled-star" key={"star" + i} />
      );
    }
    for (let i = 0; i < 5 - productRating; i++) {
      ratingArr.push(<Star className="star" key={"star" + (5 - i)} />);
    }
    return ratingArr;
  };
  render() {
    return (
      <React.Fragment>
        <h2 className="col-8 offset-2 products-title">
          {this.props.categoryName}
        </h2>
        {this.state.items.map((item, index) => {
          return (
            <div className={"col-6 col-lg-" + this.props.itemWidth} key={index}>
              <div className="product-item">
                <img src={item.image} alt="" />
                <h5 className="title">{item.name}</h5>
                {item.rating ? (
                  <div className="item-rating">
                    {this.calculateRating(item.rating)}
                  </div>
                ) : null}
                {item.price ? (
                  <p className="price">
                    <span>&#36;</span>
                    {item.price}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
