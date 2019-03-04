import Vue from 'vue';
import store from './store';
import app from './app';




new Vue({
    el: '#app',
    store,
    components: {
        app
    },
    template: '<app/>',
    beforeMount: function () {
        let lang, days, visibleMonths;
        lang = this.$el.attributes['lang'].value;
        days = Number(this.$el.attributes['days'].value);
        visibleMonths = Number(this.$el.attributes['visible-months'].value);
        store.commit('setLanguage', lang);
        store.commit('setDays', days);
        store.commit('setVisibleMonths', visibleMonths);

        store.commit('init');

        for (let date of window.datePickerBlockedDates) {
            store.commit('addBlockedDate', new Date(date));
        }
    }
});