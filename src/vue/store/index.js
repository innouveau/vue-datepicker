import Vue from 'vue';
import Vuex from 'vuex';
import {isEqual, addDays, getDate, getMonth, getYear, differenceInCalendarMonths} from 'date-fns';
import {dateToKey} from '@root/vue/tools';

Vue.use(Vuex);

let today = new Date();



const getters = {
    monthName: (state) => (m) => {
        const monthsDutch = {
            nl: ['Januari','Februari','Maart','April','Mei','Juni','Juli','Augustus','September','Oktober','November','December'],
            de: ['Januar','Februar','März', 'April','Mai','Juni', 'Juli','August','September', 'Oktober','November','Dezember']
    };

        return monthsDutch[state.language][m];
    },
    fullName: (state, getters) => (date) => {
        let d, m;
        d = getDate(date);
        m = getMonth(date);
        return d + ' ' + getters.monthName(m);
    },
    getMontshSet: (state) => () => {
        let n, set, m, y;
        n = state.availableMonths;
        set = [];
        m = state.thisMonth;
        y = state.thisYear;

        for (let i = 0; i < n; i++) {
            let my;
            my = {
                m: m,
                y: y
            };
            m++;
            if (m === 12) {
                m = 0;
                y++;
            }
            set.push(my);
        }
        return set;
    },
    getIndex: (state) => (date) => {
        let key = dateToKey(date);
        return state.datesDict[key];
    },
    getEntry: (state, getters) => (date) => {
        let index = getters.getIndex(date);
        return state.dates[index];
    },
    isPossible: (state) => (dayIndex) => {
        let highest, lowest;
        if (state.start) {
            if (dayIndex > state.start) {
                highest = dayIndex;
                lowest = state.start;
            } else {
                lowest = dayIndex;
                highest = state.start;
            }

            for (let i = lowest; i < (highest + 1); i++) {
                let entry = state.dates[i];
                if (entry.blocked) {
                    return false;
                }
            }
            return true;
        } else {
            return !state.dates[dayIndex].blocked;
        }
    }
};

const state = {
    // configuration
    totalDays: 0,
    availableMonths: 0,
    thisMonth: today.getMonth(),
    thisYear: today.getFullYear(),
    dates: [],
    datesDict: {},
    displayedFrame: 0,
    today: today,
    start: null,
    end: null,
    tempEnd: null,
    language: '',
    visibleMonths: 0
};

const actions = {

};

const mutations = {
    init(state) {
        let firstDayOfFirstMonth, newDate, key;
        firstDayOfFirstMonth = new Date(state.thisYear + '/' + (state.thisMonth + 1) + '/1');



        for (let i = 0; i < state.totalDays; i++) {
            newDate = addDays(firstDayOfFirstMonth, i);
            key = dateToKey(newDate);
            state.dates.push(
                {
                    date: newDate,
                    blocked: false
                }
            );
            state.datesDict[key] = i;
        }

        state.availableMonths = differenceInCalendarMonths(state.dates[state.dates.length - 1].date, state.dates[0].date) + 1;
    },
    addBlockedDate(state, date) {
        let key, index;
        key = dateToKey(date);
        if (state.datesDict[key]) {
            index = state.datesDict[key];
            state.dates[index].blocked = true;
        }
    },

    clear(state) {
        state.start = null;
        state.end = null;
        state.tempEnd = null;
    },
    setStart(state, start) {
        state.start = start;
        state.tempEnd = null;
    },
    setEnd(state, end) {
        state.end = end;
        state.tempEnd = null;
    },
    setTempEnd(state, tempEnd) {
        state.tempEnd = tempEnd;
    },
    slideNext(state) {
        state.displayedFrame++;
    },
    slidePrev(state) {
        state.displayedFrame--;
    },
    setLanguage(state, language) {
        state.language = language;
    },
    setDays(state, days) {
        state.totalDays = days;
    },
    setVisibleMonths(state, visibleMonths) {
        state.visibleMonths = visibleMonths;
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {

    },
    strict: true
})

