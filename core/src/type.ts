export type ReactCalendarWeekType = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

export interface ReactCalendarProps {
  value?: string;
  lang?: 'cn' | 'en';
  weekStart?: ReactCalendarWeekType;
  weeks?: string[];
}
