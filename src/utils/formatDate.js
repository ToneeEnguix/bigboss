export const formatDate = (string) => {
  const array = string.split("-");
  console.log(array);
  const monthNumber = array[1];
  const month = monthName(monthNumber);
  const dayString = dayName(array[2].substring(0, 2));
  array[2] = dayString;
  array[1] = month;
  return array;
};

const monthName = (numberString) => {
  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  return months[Number(numberString) - 1];
};

const dayName = (numberString) => {
  const dayDenominations = [
    "FIRST",
    "SECOND",
    "THIRD",
    "4TH",
    "5TH",
    "6TH",
    "7TH",
    "8TH",
    "9TH",
    "10TH",
    "11TH",
    "12TH",
    "13TH",
    "14TH",
    "15TH",
    "16TH",
    "17TH",
    "18TH",
    "19TH",
    "20TH",
    "21ST",
    "22SND",
    "23ST",
    "24TH",
    "25TH",
    "26TH",
    "27TH",
    "28TH",
    "29TH",
    "30TH",
    "31TH",
  ];
  let number = Number(numberString - 1);

  return dayDenominations[number];
};
