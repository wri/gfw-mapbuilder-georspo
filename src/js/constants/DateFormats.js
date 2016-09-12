// Keys are strings used by esri js api for date formatting.
// Values are objects passed to dojo/date/locale.format.
export default {
  'shortDate': { datePattern: 'M/d/y', selector: 'date'},
  'longMonthDayYear': { datePattern: 'MMMM d, y', selector: 'date'},
  'dayShortMonthYear': { datePattern: 'd MMM y', selector: 'date'},
  'longDate': { datePattern: 'EEEE, MMMM d, y', selector: 'date'},
  'shortDateShortTime': { datePattern: 'M/d/y', timePattern: 'h:mm a', selector: 'date and time'},
  'shortDateShortTime24': { datePattern: 'M/d/y', timePattern: 'H:mm', selector: 'date and time'},
  'shortDateLongTime': { datePattern: 'M/d/y', timePattern: 'h:mm:ss a', selector: 'date and time'},
  'shortDateLongTime24': { datePattern: 'M/d/y', timePattern: 'H:mm:ss', selector: 'date and time'},
  'longMonthYear': { datePattern: 'MMMM y', selector: 'date'},
  'shortMonthYear': { datePattern: 'MMM y', selector: 'date'},
  'year': { datePattern: 'y', selector: 'date'}
};
