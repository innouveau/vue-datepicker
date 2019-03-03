import Vue from 'vue';
import Vuex from 'vuex';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'


Vue.use(Vuex);

let today, thisMonth;
today = new Date();


const getters = {
    monthName: (state) => (m) => {
        const monthsDutch = ['Januari','Februari','Maart','April','Mei','Juni','Juli','Augustus','September','Oktober','November','December'];
        return monthsDutch[m];
    },
    getMontshSet: (state) => () => {
        let set, m, y;
        set = [];
        m = state.thisMonth;
        y = state.thisYear;
        m = m - 2;
        if (m < 0) {
            m = m + 12;
            y--;
        }
        for (let i = 0; i < 5; i++) {
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
    }
};

const state = {
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

