/** @format */

function templateDate(day, month, year, type) {
  switch (type) {
    case "DDMMYY":
      return `${day} ${month} ${year}`;
    case "MMDDYY":
      return `${month} ${day} ${year}`;
    case "YYMMDD":
      return `${year} ${day} ${year}`;
    default:
      return null;
  }
}

export function StringFormat(value = "2000-10-10", type = "DDMMYY") {
  const split = value.split("-");

  const year = split[0];
  const month = split[1];
  const day = split[2].slice(0, 2);

  const month_list = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return templateDate(day, month_list[month - 1], year, type);
}

export function ISOFormat(isoFormat, type = "DDMMYY") {
  // Mendapatkan tanggal dari string ISO
  const date = new Date(isoFormat);

  // Mendapatkan informasi tanggal, bulan, dan tahun
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const month_formatter = month > 10 ? month : "0" + month;
  const day_formatter = day > 10 ? day : "0" + day;

  return templateDate(day_formatter, month_formatter, year, type);
}

export function TimestampFormat(ISO) {
  if (ISO) {
    const T = new Date(ISO);
    const converted = T.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return converted;
  } else {
    return "-";
  }
}

export function TimeDifference(start, end) {
  if (start && end) {
    const T1 = new Date(start);
    const T2 = new Date(end);

    const difference = T2.getTime() - T1.getTime();

    const hour = Math.floor(difference / (1000 * 60 * 60));
    const minute = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const second = Math.floor((difference % (1000 * 60)) / 1000);

    return `${hour} hr, ${minute} m, ${second} s`;
  } else {
    return "-";
  }
}

export function LocalTime(type) {
  const now = new Date();

  if (type === "full") {
    const formatter = new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const formattedDate = formatter.format(now);

    return formattedDate;
  } else {
    const formatter = new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formattedDate = formatter.format(now);

    return formattedDate;
  }
}
