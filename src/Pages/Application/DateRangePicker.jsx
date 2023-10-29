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
      <h4>{label}</h4>
      <input
        type="date"
        value={selectedStartDate}
        onChange={handleStartDateChange}
      />
      <input
        type="date"
        value={selectedEndDate}
        onChange={handleEndDateChange}
      />
    </div>
  );
};

export default DateRangePicker;
