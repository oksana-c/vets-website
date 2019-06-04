/* eslint-disable no-console */
import React from 'react';
import { calculateRating, roundRating } from '../utils/helpers';
import { CalculatedDisabilityRating } from './CalculatedDisabilityRating';
import { RatingRow } from './RatingRow';

export default class DisabilityRatingCalculator extends React.Component {
  constructor() {
    super();
    this.state = {
      ratings: [
        {
          rating: 0,
          description: '',
          canDelete: false,
        },
        {
          rating: 0,
          description: '',
          canDelete: false,
        },
      ],
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleRatingCalculateChange = this.handleRatingCalculateChange.bind(
    //   this,
    // );
    // this.handleAddRating = this.handleAddRating.bind(this);
    // this.handleRemoveRating = this.handleRemoveRating.bind(this);
    this.ratingRef = React.createRef();
  }

  handleClick = () => {
    this.child.ratingInput.focus();
  };

  handleChange = (e, idx) => {
    const curRatings = this.state.ratings;
    curRatings[idx][e.target.name] =
      // eslint-disable-next-line radix
      e.target.name === 'rating' ? parseInt(e.target.value) : e.target.value;
    this.setState({ ratings: curRatings }, () => {
      console.log(this.state);
    });
  };

  handleRatingCalculateChange = idx => evt => {
    const newRatings = this.state.ratings.map((rating, sidx) => {
      if (idx !== sidx) return rating;
      // eslint-disable-next-line radix
      return parseInt(evt.target.value);
    });

    this.setState({ ratings: newRatings });
    console.log('handleRatingCalculateChange ', this.state);
  };

  handleSubmit = evt => {
    // const { ratings } = this.state.ratings;
    console.log(`this.state: ${this.state.ratings}`);
    console.log(
      'Your VA disability rating is ',
      calculateRating(this.state.ratings),
      '%',
    );
    // eslint-disable-next-line no-alert
    // alert(
    //   `Your VA disability rating is ${calculateRating(this.state.ratings)} %`,
    // );
    // return calculateRating(ratings);
  };

  handleAddRating = evt => {
    console.log(this.state.ratings);
    const newRatings = [
      ...this.state.ratings,
      {
        rating: 0,
        description: '',
        canDelete: this.state.ratings.length > 1,
      },
    ];
    this.setState({ ratings: newRatings }, () => console.log(this.state));
  };

  handleRemoveRating = idx => () => {
    this.setState({
      ratings: this.state.ratings.filter((s, sidx) => idx !== sidx),
    });
    console.log('this is remove rating');
  };

  // clearAll = () => {
  //   const newRatings = this.state.ratings.map((rating, idx) => ({
  //     rating: 0,
  //     description: '',
  //     canDelete: idx > 1 ? true : false,
  //   }));
  //   this.setState({ ratings: newRatings });
  // };

  clearAll = () => {
    this.setState({
      ratings: [
        { rating: 0, description: '', canDelete: false },
        { rating: 0, description: '', canDelete: false },
      ],
    });
  };

  render() {
    const ratings = this.state.ratings;

    return (
      <div className="disability-calculator">
        <div className="calc-header vads-u-padding-x--4">
          <h2 className="vads-u-padding-top--4">
            VA combined disability rating calculator
          </h2>
          <p>
            If you have 2 or more disability ratings, use our calculator to
            determine your combined disability rating. Enter each of your
            disability ratings separately below. You can also add a description
            of each for your notes, if you'd like. Then click Calculate to get
            your combined rating.
          </p>
        </div>
        <div className="vads-l-grid-container">
          <div className="vads-l-row">
            <div className="vads-l-col--3 vads-u-padding-right--2">
              Disability rating
            </div>
            <div className="vads-l-col--8">Optional description</div>
          </div>
          {this.state.ratings.map((ratingObj, idx) => (
            <RatingRow
              handleChange={this.handleChange}
              handleRemoveRating={this.handleRemoveRating}
              ratingObj={ratingObj}
              key={idx}
              indx={idx}
            />
          ))}
          {/* <div className="vads-l-grid-container"> */}
          <div className="vads-l-row">
            <div className="vads-l-col--3">
              <button
                className="va-button-link vads-u-text-align--left vads-u-padding-y--1p5"
                type="button"
                onClick={this.handleAddRating}
              >
                <i className="fas fa-plus-circle vads-u-padding-right--0p5" />
                Add rating
              </button>
            </div>
            <div className="vads-l-col--8" />
          </div>
          <div className="vads-l-row">
            <div className="vads-l-col--3 vads-u-padding-right--2">
              <button
                onClick={evt => {
                  this.handleSubmit(evt);
                }}
              >
                Calculate
              </button>
            </div>
            <div className="vads-l-col--8">
              <a onClick={this.clearAll}>Clear all</a>
            </div>
          </div>
        </div>
        <div className="vads-u-padding--4">
          <p className="vads-u-font-weight--bold">
            Your VA disability rating
            <br />
            <span className="vads-u-font-weight--bold vads-u-font-size--2xl">
              {calculateRating(ratings)} %
            </span>
          </p>
          <p>
            The final combined value of your disability ratings is 64%. We round
            this number to the nearest 10% to get your combined rating. We round
            combined values ending in 1 to 4 down, and those ending in 5 to 9
            up. We round down values ending in 1 to 4, and round up values
            ending in 5 to 9.
          </p>
          <br />
          <a href="#">Find your monthly payment amount</a>
        </div>
        {/* </div> */}
      </div>
    );
  }
}
