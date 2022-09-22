import React, { useRef, useState, useEffect } from 'react';
import { ReactComponent as LeftIcon } from './icons/arrow-left-bold.svg';
import { ReactComponent as RightIcon } from './icons/arrow-right-bold.svg';
import { getDefaultWeek, getDateObj, getNowDate, weekConfigProps, zero } from './utils';
import { ReactCalendarProps } from './type';
import './style.css';
export * from './type';

const count = 42;
const items: number[] = [];
for (let i = 0; i < count; i++) {
  items.push(i + 1);
}

function Page(props: ReactCalendarProps) {
  const { weekStart = 'Tue', lang = 'cn', weeks } = props;

  const calendarRef = useRef<HTMLDivElement>(null);
  const [itemStyle, setItemStyle] = useState<React.CSSProperties>({});
  const [newWeeks, setNewWeeks] = useState<string[]>([]);
  const [ollWeeks, setOllWeeks] = useState<weekConfigProps[]>([]);
  const [dateObj, setDateObj] = useState<any>({});
  const [dates, setDates] = useState<any[]>([]);

  useEffect(() => {
    if (calendarRef?.current) {
      const rect = calendarRef.current.getBoundingClientRect();
      const _width = Number((rect.width / 7).toFixed(2));
      const _week = getDefaultWeek(weekStart, lang);
      const _dateObj = getDateObj();
      setItemStyle({ width: _width, height: _width });
      setNewWeeks(weeks || _week.week);
      setOllWeeks(_week.date);
      setDateObj(_dateObj);
      const data = getNowDate(_week.date, _dateObj.year, _dateObj.month);
      setDates(data);
    }
  }, [calendarRef]);

  const onCheckMonth = (type: string) => {
    const { year, month, date } = dateObj;
    let _year = year;
    let _month = month;
    if (type === 'pre') {
      if (month === 1) {
        _year--;
        _month = 12;
      } else {
        _month--;
      }
    }
    if (type === 'next') {
      if (month === 12) {
        _year++;
        _month = 1;
      } else {
        _month++;
      }
    }
    const d = `${_year}-${zero(_month)}-${zero(date)}`;
    const _dateObj = getDateObj(d);
    setDateObj(_dateObj);
    const data = getNowDate(ollWeeks, _dateObj.year, _dateObj.month);
    setDates(data);
  };

  return (
    <div className="w--calendar" ref={calendarRef}>
      <div className="w--calendar-top">
        <div className="icons" onClick={() => onCheckMonth('pre')}>
          <LeftIcon height="22" width="22" fill="#00000040" />
        </div>
        <div className="title">{dateObj.day}</div>
        <div className="icons" onClick={() => onCheckMonth('next')}>
          <RightIcon height="22" width="22" fill="#00000040" />
        </div>
      </div>
      <div className="w--calendar-week">
        {newWeeks.map((item: string, index: number) => (
          <div className="item" key={index}>
            {item}
          </div>
        ))}
      </div>
      <div className="w--calendar-group">
        {dates.map((item, index) => (
          <div key={index} className="w--calendar-group-item" style={itemStyle}>
            <div className={`w--calendar-group-${item.type}`}>{item.day}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
