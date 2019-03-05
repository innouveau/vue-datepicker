import {isBefore, isAfter, getDate, getMonth, getYear} from "date-fns";


const dateToKey = (date) => {
    let d, m, y;
    d = getDate(date);
    m = getMonth(date);
    y = getYear(date);
    return y + '-' + m + '-' + d;
};

const isInBetween = (numberToCheck, numberA, numberB) => {
    return (numberToCheck > numberA && numberToCheck < numberB) || (numberToCheck > numberB && numberToCheck < numberA);
};

export {dateToKey, isInBetween}