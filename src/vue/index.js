import Vue from 'vue';
import store from './store';
import app from './app';

store.commit('addBlockedDate', new Date('2019/3/16'));
store.commit('addBlockedDate', new Date('2019/3/17'));
store.commit('addBlockedDate', new Date('2019/3/18'));
store.commit('addBlockedDate', new Date('2019/3/19'));
store.commit('addBlockedDate', new Date('2019/3/20'));

new Vue({
    el: '#app',
    store,
    components: {
        app
    },
    template: '<app/>'
});