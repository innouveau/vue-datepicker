<script>
    import navigator from './components/navigator';
    import month from './components/month';

    export default {
        name: 'app',
        components: {
            navigator, month
        },
        methods: {

        },
        computed: {
            set() {
                return this.$store.getters['getMontshSet']();
            }
        }
    }
</script>


<template>
    <div class="app">
        <navigator></navigator>
        <div class="month__container">
            <div class="months__slider">
                <month
                        v-for="my in set"
                        :my="my"></month>
            </div>

        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/index.scss';
    @import '@styles/variables.scss';

    .app {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        font-family: 'Montserrat';

        .month__container {
            position: relative;
            height: 290px;
            width: 900px;
            overflow: hidden;

            .months__slider {
                display: flex;
                position: absolute;
                top: 0;
                left: -300px;
                transition: left 0.3s ease;

            }

        }
    }
</style>