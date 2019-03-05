<script>
    import navigator from './components/navigator';
    import month from './components/month';
    import book from './components/book';

    export default {
        name: 'app',
        components: {
            navigator, month, book
        },
        methods: {

        },
        computed: {
            set() {
                return this.$store.getters['getMontshSet']();
            },
            left() {
                return -this.$store.state.displayedFrame * 300;
            },
            visibleMonths() {
                return this.$store.state.visibleMonths;
            },
            feedback() {
                return this.$store.state.feedback;
            }
        }
    }
</script>


<template>
    <div class="date-picker">
        <div
            :style="{'width': (visibleMonths * 300) + 'px'}"
            class="date-picker__container">
            <navigator></navigator>
            <div class="month__container">
                <div
                        :style="{'left': left + 'px'}"
                        class="months__slider">
                    <month
                        v-for="(my, index) in set"
                        :my="my"
                        :key="index"
                        :month-key="index"></month>
                </div>
            </div>
            <div class="feedback">
                {{feedback}}
            </div>
        </div>
        <book/>
    </div>
</template>


<style lang="scss">
    @import '@styles/index.scss';
    @import '@styles/variables.scss';

    .date-picker {
        font-family: 'Montserrat';

        .date-picker__container {
            border: 1px solid #ddd;
            width: 600px;
            height: 405px;

            .month__container {
                position: relative;
                height: 320px;
                overflow: hidden;

                .months__slider {
                    display: flex;
                    position: absolute;
                    top: 0;
                    transition: left 0.3s ease;

                }

            }

            .feedback {
                padding: 10px;
                color: #888;
            }
        }
    }
</style>