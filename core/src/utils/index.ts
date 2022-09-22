import { ReactCalendarWeekType } from '../type';

export interface weekConfigProps {
  cn: string;
  en: ReactCalendarWeekType;
  week: number;
}

export interface dataItemsProps {
  day: string | number;
  type: 'pre' | 'now' | 'next';
  date: string;
  check: boolean;
  now?: boolean;
}

const weekConfig: weekConfigProps[] = [
  { cn: '日', en: 'Sun', week: 0 },
  { cn: '一', en: 'Mon', week: 1 },
  { cn: '二', en: 'Tue', week: 2 },
  { cn: '三', en: 'Wed', week: 3 },
  { cn: '四', en: 'Thu', week: 4 },
  { cn: '五', en: 'Fri', week: 5 },
  { cn: '六', en: 'Sat', week: 6 },
];

const getDefaultWeek = (weekStart: ReactCalendarWeekType, lang: 'cn' | 'en') => {
  const data = [...weekConfig];
  const _index = weekConfig.findIndex((item: weekConfigProps) => item.en === weekStart);
  data.splice(0, _index);
  weekConfig.forEach((item, index) => {
    if (index < _index) {
      data.push(item);
    }
  });
  return {
    date: data,
    week: data.map((item) => item[lang]),
  };
};

// 获取日期
const getDateObj = (date?: string) => {
  const day = date ? date.replace(/-/g, '/') : new Date();
  const d = new Date(day);
  const yy = d.getFullYear();
  const mm = zero(d.getMonth() + 1);
  const dd = zero(d.getDate());
  return {
    day: `${yy}-${mm}-${dd}`,
    year: yy,
    month: Number(mm),
    date: Number(dd),
  };
};

/**
 * 获取一个月有多少天
 */
const getMonthDay = (year: number, month: number) => {
  const d = new Date(year, month, 0);
  return d.getDate();
};

/**
 * 获取当前月第一天是星期几
 */
const getMonthFristDay = (year: number, month: number) => {
  const d = new Date(year, month - 1, 1);
  return d.getDay();
};

/**
 * 获取当前月天数
 */
const getNowDate = (week: weekConfigProps[], dataObj: any) => {
  const { year, month, day } = dataObj;
  const nowFristDay = getMonthFristDay(year, month); // 当月第一天星期几
  const preMonthDay = getMonthDay(year, month - 1); // 获取上月有多少天
  const nowMonthDay = getMonthDay(year, month); // 获取当前月有多少天

  const nowIndex = week.findIndex((item) => item.week === nowFristDay);
  const now = getDateObj();

  const dateList = [];
  if (nowIndex) {
    for (let i = preMonthDay; i > 0; i--) {
      if (dateList.length < nowIndex) {
        const date = `${year}-${zero(month - 1)}-${zero(i)}`;
        let obj: dataItemsProps = {
          day: zero(i, true),
          type: 'pre',
          date: date,
          check: day === date,
        };
        if (now.day === date) {
          obj.now = true;
        }
        dateList.unshift(obj);
      }
    }
  }
  for (let i = 1; i <= nowMonthDay; i++) {
    const date = `${year}-${zero(month)}-${zero(i)}`;
    let obj: dataItemsProps = {
      day: zero(i, true),
      type: 'now',
      date: date,
      check: day === date,
    };
    if (now.day === date) {
      obj.now = true;
    }
    dateList.push(obj);
  }
  const nextDay = 42 - dateList.length;
  for (let i = 1; i <= nextDay; i++) {
    const date = `${year}-${zero(month + 1)}-${zero(i)}`;
    let obj: dataItemsProps = {
      day: zero(i, true),
      type: 'next',
      date: date,
      check: day === date,
    };
    if (now.day === date) {
      obj.now = true;
    }
    dateList.push(obj);
  }
  return dateList;
};

const zero = (num: number, isStr?: boolean) => {
  return num < 10 ? `0${num}` : isStr ? String(num) : num;
};

export { getDateObj, getNowDate, getDefaultWeek, getMonthDay, getMonthFristDay, zero };
