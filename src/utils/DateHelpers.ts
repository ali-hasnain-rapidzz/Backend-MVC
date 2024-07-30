import moment from "moment";

class DateServiceClass {
  getDateTime = (startDate?: Date | moment.Moment) => {
    return moment(startDate);
  };

  getDateFromMoment = (date: moment.Moment) => new Date(date.valueOf());

  min = <T extends Date | moment.Moment>(date1: T, date2: T): T => {
    const momentDate1 = moment(date1);
    const momentDate2 = moment(date2);

    return momentDate1.isBefore(momentDate2) ? date1 : date2;
  };
}

export const DateService = new DateServiceClass();
