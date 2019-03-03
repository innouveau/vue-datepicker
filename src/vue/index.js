import Vue from 'vue';
import store from './store';
import app from './app';

new Vue({
    el: '#app',
    store,
    components: {
        app
    },
    template: '<app/>'
});