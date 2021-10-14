export function axiosDefaultHeaders() {
  return {
    'Content-Type': 'application/json',
    'Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

export const showNumber = (number) => {
  return number < 10 ? `0${number}` : `${number}`;
};

export const _reformatDate = (date) => {
  return {
    day: showNumber(date.getDate()),
    month: showNumber(date.getMonth() + 1),
    year: date.getFullYear(),
    hours: showNumber(date.getHours()),
    minutes: showNumber(date.getMinutes()),
    seconds: showNumber(date.getSeconds()),
  };
};

export function dateToString(date) {
  return `${date.day}.${date.month}.${date.year} ${date.hours}:${date.minutes}:${date.seconds}`;
}
