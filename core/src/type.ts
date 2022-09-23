export type ReactCalendarWeekType = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

export interface ReactCalendarDateProps {
  year?: number;
  month?: number;
  day?: number;
  date?: string;
}

export interface ReactCalendarProps {
  value?: string;
  lang?: 'cn' | 'en';
  weekStart?: ReactCalendarWeekType;
  weeks?: string[];
  checkColor?: string;
  onChange?: ({ date }: ReactCalendarDateProps) => void;
}
