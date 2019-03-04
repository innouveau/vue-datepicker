import Vue from 'vue';
import Vuex from 'vuex';
import {isEqual} from 'date-fns';

Vue.use(Vuex);

let today = new Date();


const getters = {
    monthName: (state) => (m) => {
        const monthsDutch = ['Januari','Februari','Maart','April','Mei','Juni','Juli','Augustus','September','Oktober','November','December'];
        return monthsDutch[m];
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
    isBlocked: (state) => (date) => {
        for (let day of state.blockedDates) {
            if (isEqual(date, day)) {
                return true;
            }
        }
        return false;
    },
};

const state = {
    blockedDates: [],
    availableMonths: 24,
    displayedFrame: 0,
    today: today,
    thisMonth: today.getMonth(),
    thisYear: today.getFullYear(),
    start: null,
    end: null,
    tempEnd: null,
    lastClicked: null
};

const actions = {

};

const mutations = {
    prevMonth(state) {
        state.thisMonth--;
        if (state.thisMonth === -1) {
            state.thisMonth = 11;
            state.thisYear--;
        }
    },
    nextMonth(state) {
        state.thisMonth++;
        if (state.thisMonth === 12) {
            state.thisMonth = 0;
            state.thisYear++;
        }
    },
    setStart(state, start) {
        state.start = start;
        state.lastClicked = 'start';
    },
    setEnd(state, end) {
        state.end = end;
        state.lastClicked = 'end';
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
    addBlockedDate(state, date) {
        state.blockedDates.push(date);
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

