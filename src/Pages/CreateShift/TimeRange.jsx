import React, { useState } from 'react';

const TimeRangePicker = () => {
  const [startTime, setStartTime] = useState({ hour: '00', minute: '00' });
  const [endTime, setEndTime] = useState({ hour: '00', minute: '00' });

  const handleStartTimeChange = (type, value) => {
    setStartTime({ ...startTime, [type]: value });
  };

  const handleEndTimeChange = (type, value) => {
    setEndTime({ ...endTime, [type]: value });
  };

  return (
    <div>
      <div>
        <label>Start Time:</label>
        <select
          value={startTime.hour}
          onChange={(e) => handleStartTimeChange('hour', e.target.value)}
        >
          {Array.from({ length: 24 }, (_, i) => {
            const hour = i.toString().padStart(2, '0');
            return <option key={hour} value={hour}>{hour}</option>;
          })}
        </select>
        <select
          value={startTime.minute}
          onChange={(e) => handleStartTimeChange('minute', e.target.value)}
        >
          {Array.from({ length: 60 }, (_, i) => {
            const minute = i.toString().padStart(2, '0');
            return <option key={minute} value={minute}>{minute}</option>;
          })}
        </select>
      </div>

      <div>
        <label>End Time:</label>
        <select
          value={endTime.hour}
          onChange={(e) => handleEndTimeChange('hour', e.target.value)}
        >
          {Array.from({ length: 24 }, (_, i) => {
            const hour = i.toString().padStart(2, '0');
            return <option key={hour} value={hour}>{hour}</option>;
          })}
        </select>
        <select
          value={endTime.minute}
          onChange={(e) => handleEndTimeChange('minute', e.target.value)}
        >
          {Array.from({ length: 60 }, (_, i) => {
            const minute = i.toString().padStart(2, '0');
            return <option key={minute} value={minute}>{minute}</option>;
          })}
        </select>
      </div>

      <p>Selected Start Time: {startTime.hour}:{startTime.minute}</p>
      <p>Selected End Time: {endTime.hour}:{endTime.minute}</p>
      {/* You can use startTime and endTime states wherever you need them */}
    </div>
  );
};

export default TimeRangePicker;
