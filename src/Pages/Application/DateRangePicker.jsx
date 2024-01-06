import React from 'react';

const DateRangePicker = ({
  selectedStartDate,
  selectedEndDate,
  onStartDateChange,
  onEndDateChange,
  label,
}) => {
  const handleStartDateChange = (event) => {
    onStartDateChange(event.target.value);
  };

  const handleEndDateChange = (event) => {
    const endDate = event.target.value;
    if (selectedStartDate && endDate < selectedStartDate) {
      onEndDateChange('');
    } else {
      onEndDateChange(endDate);
    }
  };


  return (
    <div className="helos">
      <label>{label}</label>
      <div className='from-to-div'>
      <div className="inpout-container">
      <input
        type="date"
        value={selectedStartDate}
        onChange={handleStartDateChange}
      />
      </div>
       <div className="inpout-container">
      <input
        type="date"
        value={selectedEndDate}
        onChange={handleEndDateChange}
      /></div>
      </div>
    </div>
  );
};

export default DateRangePicker;
