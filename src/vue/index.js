import Vue from 'vue';
import store from './store';
import app from './app';




new Vue({
    el: '#datepicker',
    store,
    components: {
        app
    },
    template: '<app/>',
    beforeMount: function () {
        let action, lang, days, visibleMonths, minimalPeriod;
        action = this.$el.attributes['action'].value;
        lang = this.$el.attributes['lang'].value;
        days = Number(this.$el.attributes['days'].value);
        visibleMonths = Number(this.$el.attributes['visible-months'].value);
        minimalPeriod = Number(this.$el.attributes['minimal-period'].value);
        store.commit('setAction', action);
        store.commit('setLanguage', lang);
        store.commit('setDays', days);
        store.commit('setVisibleMonths', visibleMonths);
        store.commit('setMinimalPeriod', minimalPeriod);

        store.commit('init');

        for (let date of window.datePickerBlockedDates) {
            store.commit('addBlockedDate', new Date(date));
        }
    }
});