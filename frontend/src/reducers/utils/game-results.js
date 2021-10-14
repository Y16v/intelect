import moment from 'moment';


export const showPrevResults = (results=[]) => {
  return results.map((resultObject) => {
    let sum = '';
    const {digits, answer, exact} = resultObject;
    for (let i = 0; i < digits.length; i ++) {
      const digit = digits[i];
      sum += `${digit >= 0 ? '+': '-'} ${digit >= 0 ? digit : -digit} `;
    }
    sum = sum.slice(1) + `${parseFloat(answer) === exact ? ' = ' + answer : ' ≠ ' + answer + ' ✗ (' + exact + ')'}`;
    return sum;
  });
};

export const isAnswerEquals = (answer, exact) => {
  const intAnswer = isNaN(parseFloat(answer)) ? null : parseFloat(answer);
  return intAnswer === exact;
};


export const getDisplayDateRange = (startDate, endDate) => {
  let year1; let year2 = '';
  let month1; let month2 = '';

  if (startDate.getFullYear() !== endDate.getFullYear()) {
    year1 = startDate.getFullYear();
    year2 = endDate.getFullYear();
  }

  if (startDate.getMonth() !== endDate.getMonth()) {
    month1 = moment(startDate).format('MMM');
  }
  month2 = moment(endDate).format('MMM');

  const final = `${startDate.getDate()}${month1 ? ' ' + month1 : ''}${year1 ? ' ' + year1 : ''} - ${endDate.getDate()} ${month2}${year2 ? ' ' + year2 : ''}`;

  return final;
};


export const getResultsDateRangeOptions = ({from, to}) => {
  const dateRanges = [];
  let firstDate = new Date(from);
  const toDate = new Date(to);

  while (firstDate <= toDate) {
    const startDate = new Date(firstDate);
    let endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + (7 - startDate.getDay()));

    if (endDate >= toDate) {
      endDate = toDate;
    }
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setSeconds(59);
    endDate.setMilliseconds(999);

    const momentStartDate = moment.utc(startDate).format('YYYY-MM-DDTHH:mm:ss');
    const momentEndDate = moment.utc(endDate).format('YYYY-MM-DDTHH:mm:ss');

    const display = getDisplayDateRange(startDate, endDate);
    dateRanges.push({
      startDate: momentStartDate,
      endDate: momentEndDate,
      display,
    });

    firstDate = new Date(endDate);
    firstDate.setMilliseconds(firstDate.getMilliseconds() + 1);
  }

  return dateRanges;
};
