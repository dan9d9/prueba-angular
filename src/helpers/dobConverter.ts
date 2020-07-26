export function dobConverter(dob: string): string {
  const leapYearListSince1900 = [
    '1904',
    '1908',
    '1912',
    '1916',
    '1920',
    '1924',
    '1928',
    '1932',
    '1936',
    '1940',
    '1944',
    '1948',
    '1952',
    '1956',
    '1960',
    '1964',
    '1968',
    '1972',
    '1976',
    '1980',
    '1984',
    '1988',
    '1992',
    '1996',
    '2000',
    '2004',
    '2008',
    '2012',
    '2016',
    '2020',
  ];

  const parsedYear = dob.split('-')[0];
  const birthdayMS = Date.parse(dob);
  const elapsedMS = birthdayMS - Date.now();

  const leapDays =
    leapYearListSince1900.length -
    leapYearListSince1900.findIndex((ele) => Number(ele) > Number(parsedYear));

  let elapsedDays =
    Math.floor((elapsedMS / 1000 / 60 / 60 / 24) * -1) - leapDays;

  const years = Math.floor(elapsedDays / 365);
  const days = Math.floor(elapsedDays % 365);

  return `Nació hace ${years} años y ${days} días`;
}
