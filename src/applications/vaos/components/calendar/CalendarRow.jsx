import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CalendarCell from './CalendarCell';
import { isDateInSelectedArray } from './../../utils/calendar';

export default class CalendarRow extends Component {
  static propTypes = {
    availableDates: PropTypes.array,
    cells: PropTypes.array.isRequired,
    currentlySelectedDate: PropTypes.string,
    getSelectedDateOptions: PropTypes.func,
    handleSelectDate: PropTypes.func.isRequired,
    handleSelectOption: PropTypes.func,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    optionsError: PropTypes.string,
    rowNumber: PropTypes.number.isRequired,
    selectedDates: PropTypes.array,
  };

  isCellDisabled = date => {
    const { availableDates, minDate, maxDate } = this.props;
    let disabled = false;

    // If user provides an array of availableDates, disable dates that are not
    // in the array.
    if (
      (Array.isArray(availableDates) && !availableDates.includes(date)) ||
      moment(date).isBefore(moment().format('YYYY-MM-DD'))
    ) {
      disabled = true;
    }

    // If minDate provided, disable dates before minDate
    if (
      minDate &&
      moment(minDate).isValid() &&
      moment(date).isBefore(moment(minDate))
    ) {
      disabled = true;
    }

    // If maxDate provided, disable dates after maxDate
    if (
      maxDate &&
      moment(maxDate).isValid() &&
      moment(date).isAfter(moment(maxDate))
    ) {
      disabled = true;
    }

    return disabled;
  };

  render() {
    const {
      cells,
      currentlySelectedDate,
      handleSelectDate,
      rowNumber,
      selectedDates,
      additionalOptions,
      handleSelectOption,
      optionsError,
    } = this.props;

    return (
      <div>
        <div
          className="vaos-calendar__calendar-week vads-u-display--flex vads-u-justify-content--space-between"
          role="row"
        >
          {cells.map((date, index) => (
            <CalendarCell
              additionalOptions={additionalOptions}
              key={`row-${rowNumber}-cell-${index}`}
              index={index}
              date={date}
              optionsError={optionsError}
              selectedDates={selectedDates}
              handleSelectOption={handleSelectOption}
              currentlySelectedDate={currentlySelectedDate}
              inSelectedArray={isDateInSelectedArray(date, selectedDates)}
              onClick={() => handleSelectDate(date, rowNumber)}
              disabled={this.isCellDisabled(date)}
            />
          ))}
          <div className="break" />
        </div>
      </div>
    );
  }
}
