import {getDate, getMonth, getYear} from "date-fns";

const dateToKey = (date) => {
    let d, m, y;
    d = getDate(date);
    m = getMonth(date);
    y = getYear(date);
    return y + '-' + m + '-' + d;
};

export {dateToKey}