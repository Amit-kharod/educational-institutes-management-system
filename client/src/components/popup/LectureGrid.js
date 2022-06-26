import React, { useState } from 'react';

const LectureGrid = ({addSubject}) => {
  const [lectureTimeState, setLectureTimeState] = useState({
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
  });
  const hourSelectElement = (
    <select
      name="hour"
      className="hour"
      onChange={(e) => {
        changeLectureTime(e.target);
      }}
    >
      <option value="12">12</option>
      <option value="01">01</option>
      <option value="02">02</option>
      <option value="03">03</option>
      <option value="04">04</option>
      <option value="05">05</option>
      <option value="06">06</option>
      <option value="07">07</option>
      <option value="08">08</option>
      <option value="09">09</option>
      <option value="10">10</option>
      <option value="11">11</option>
    </select>
  );
  const minuteSelectElement = (
    <select
      name="minute"
      className="minute"
      onChange={(e) => {
        changeLectureTime(e.target);
      }}
    >
      <option value="00">00</option>
      <option value="15">15</option>
      <option value="30">30</option>
      <option value="45">45</option>
    </select>
  );
  console.log(lectureTimeState);

  const changeLectureTime = (e) => {
    let hour, minute, isAM, parentElement, parentElementId;
    if (e.name === 'time') {
      parentElement = e.parentNode;
      parentElementId = e.parentNode.parentNode.id;
      isAM = e.value === 'AM' ? true : false;
      hour = parentElement.childNodes[0].childNodes[0].value;
      minute = parentElement.childNodes[1].childNodes[0].value;
    } else {
      parentElement = e.parentNode.parentNode;
      parentElementId = e.parentNode.parentNode.parentNode.id;
      isAM = parentElement.childNodes[2].value === 'AM' ? true : false;
      hour = parentElement.childNodes[0].childNodes[0].value;
      minute = parentElement.childNodes[1].childNodes[0].value;
    }
    switch (parentElementId) {
      case 'monday':
        setLectureTimeState({
          ...lectureTimeState,
          monday: { hour: hour, minute: minute, isAM: isAM },
        });
        break;
      case 'tuesday':
        setLectureTimeState({
          ...lectureTimeState,
          tuesday: { hour: hour, minute: minute, isAM: isAM },
        });
        break;
      case 'wednesday':
        setLectureTimeState({
          ...lectureTimeState,
          wednesday: { hour: hour, minute: minute, isAM: isAM },
        });
        break;
      case 'thursday':
        setLectureTimeState({
          ...lectureTimeState,
          thursday: { hour: hour, minute: minute, isAM: isAM },
        });
        break;
      case 'friday':
        setLectureTimeState({
          ...lectureTimeState,
          friday: { hour: hour, minute: minute, isAM: isAM },
        });
        break;
      case 'saturday':
        setLectureTimeState({
          ...lectureTimeState,
          saturday: { hour: hour, minute: minute, isAM: isAM },
        });
        break;
      default:
        break;
    }
  };

  const lectureToggle = (e) => {
    if (e.target.parentNode.className === 'lecture lecture-not-active') {
      e.target.parentNode.className = 'lecture lecture-active';
      changeLectureTime(
        e.target.parentNode.childNodes[1].childNodes[1].childNodes[0]
      );
      console.log(
        e.target.parentNode.childNodes[1].childNodes[1].childNodes[0]
      );
    } else {
      e.target.parentNode.className = 'lecture lecture-not-active';
      switch (e.target.parentNode.id) {
        case 'monday':
          setLectureTimeState({
            ...lectureTimeState,
            monday: null,
          });
          break;
        case 'tuesday':
          setLectureTimeState({
            ...lectureTimeState,
            tuesday: null,
          });
          break;
        case 'wednesday':
          setLectureTimeState({
            ...lectureTimeState,
            wednesday: null,
          });
          break;
        case 'thursday':
          setLectureTimeState({
            ...lectureTimeState,
            thursday: null,
          });
          break;
        case 'friday':
          setLectureTimeState({
            ...lectureTimeState,
            friday: null,
          });
          break;
        case 'saturday':
          setLectureTimeState({
            ...lectureTimeState,
            saturday: null,
          });
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="lecture-grid">
      <div className="lecture lecture-not-active" id="monday">
        <button className="week" onClick={(e) => lectureToggle(e)}>
          Monday
        </button>
        <div className="time">
          <div className="input-wrapper">
            {hourSelectElement}
            <span>HH</span>
          </div>
          <div className="input-wrapper">
            {minuteSelectElement}
            <span>MM</span>
          </div>
          <select
            name="time"
            className="am-pm"
            onChange={(e) => {
              changeLectureTime(e.target);
            }}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
      <div className="lecture lecture-not-active" id="tuesday">
        <button className="week" onClick={(e) => lectureToggle(e)}>
          Tuesday
        </button>
        <div className="time">
          <div className="input-wrapper">
            {hourSelectElement}
            <span>HH</span>
          </div>
          <div className="input-wrapper">
            {minuteSelectElement}
            <span>MM</span>
          </div>
          <select
            name="time"
            className="am-pm"
            onChange={(e) => {
              changeLectureTime(e.target);
            }}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
      <div className="lecture lecture-not-active" id="wednesday">
        <button className="week" onClick={(e) => lectureToggle(e)}>
          Wednesday
        </button>
        <div className="time">
          <div className="input-wrapper">
            {hourSelectElement}
            <span>HH</span>
          </div>
          <div className="input-wrapper">
            {minuteSelectElement}
            <span>MM</span>
          </div>
          <select
            name="time"
            className="am-pm"
            onChange={(e) => {
              changeLectureTime(e.target);
            }}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
      <div className="lecture lecture-not-active" id="thursday">
        <button className="week" onClick={(e) => lectureToggle(e)}>
          Thursday
        </button>
        <div className="time">
          <div className="input-wrapper">
            {hourSelectElement}
            <span>HH</span>
          </div>
          <div className="input-wrapper">
            {minuteSelectElement}
            <span>MM</span>
          </div>
          <select
            name="time"
            className="am-pm"
            onChange={(e) => {
              changeLectureTime(e.target);
            }}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
      <div className="lecture lecture-not-active" id="friday">
        <button className="week" onClick={(e) => lectureToggle(e)}>
          Friday
        </button>
        <div className="time">
          <div className="input-wrapper">
            {hourSelectElement}
            <span>HH</span>
          </div>
          <div className="input-wrapper">
            {minuteSelectElement}
            <span>MM</span>
          </div>
          <select
            name="time"
            className="am-pm"
            onChange={(e) => {
              changeLectureTime(e.target);
            }}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
      <div className="lecture lecture-not-active" id="saturday">
        <button className="week" onClick={(e) => lectureToggle(e)}>
          Saturday
        </button>
        <div className="time">
          <div className="input-wrapper">
            {hourSelectElement}
            <span>HH</span>
          </div>
          <div className="input-wrapper">
            {minuteSelectElement}
            <span>MM</span>
          </div>
          <select
            name="time"
            className="am-pm"
            onChange={(e) => {
              changeLectureTime(e.target);
            }}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
      <button className="next-popup" onClick={() => addSubject(lectureTimeState)}>
        Add
      </button>
    </div>
  );
};

export default LectureGrid;
