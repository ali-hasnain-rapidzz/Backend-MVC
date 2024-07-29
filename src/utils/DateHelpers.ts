import { DATE_COMPARE_BY, DATE_DIFFERENCE, UNIT_TIME } from "@Constants/enum.constants";
import moment from "moment";

class DateServiceClass {
  getDateTime = (startDate?: Date | moment.Moment) => {
    return moment(startDate);
  };

  getDateFromMoment = (date: moment.Moment) => new Date(date.valueOf());

  addDateTime = (data: {
    dateTime?: Date | moment.Moment;
    timeToAdd: moment.DurationInputArg1;
    unitOfTime: UNIT_TIME;
  }) => {
    return moment(data.dateTime).add(data.timeToAdd, data.unitOfTime);
  };

  compareDates = (
    compareWith: DATE_COMPARE_BY,
    pastDate: Date | moment.Moment,
    futureDate: Date | moment.Moment,
  ) => {
    const pastMoment = moment(pastDate);
    const futureMoment = moment(futureDate);

    switch (compareWith) {
      case DATE_COMPARE_BY.EQU:
        return pastMoment.isSame(futureMoment, "day");
      case DATE_COMPARE_BY.NEQ:
        return !pastMoment.isSame(futureMoment, "day");
      case DATE_COMPARE_BY.LT:
        return pastMoment.isBefore(futureMoment, "day");
      case DATE_COMPARE_BY.LEQ:
        return pastMoment.isSameOrBefore(futureMoment, "day");
      case DATE_COMPARE_BY.GT:
        return pastMoment.isAfter(futureMoment, "day");
      case DATE_COMPARE_BY.GEQ:
        return pastMoment.isSameOrAfter(futureMoment, "day");
      default:
        return false;
    }
  };

  getDateDifference = (
    endDate: Date | moment.Moment,
    startDate: Date | moment.Moment,
    diff: DATE_DIFFERENCE,
  ) => {
    const endMoment = moment(endDate);
    const startMoment = moment(startDate);
    return endMoment.diff(startMoment, diff);
  };

  min = <T extends Date | moment.Moment>(date1: T, date2: T): T => {
    const momentDate1 = moment(date1);
    const momentDate2 = moment(date2);

    return momentDate1.isBefore(momentDate2) ? date1 : date2;
  };
}

export const DateService = new DateServiceClass();
