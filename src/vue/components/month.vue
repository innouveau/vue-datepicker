<script>
    import {getDaysInMonth, getDay} from 'date-fns';
    import day from './day';

    export default {
        name: 'month',
        components: {
            day
        },
        props: {
            my: {
                type: Object,
                required: true
            },
            monthKey: {
                type: Number
            }
        },
        data() {
            let dayOfTheWeek, weekDays;
            dayOfTheWeek = getDay(new Date(this.my.y + '/' + (this.my.m + 1) + '/1')) - 1;
            weekDays = this.$store.state.language === 'nl' ? ['M', 'D', 'W', 'D', 'V', 'Z', 'Z'] : ['M', 'D', 'M', 'D', 'V', 'S', 'S']
            if (dayOfTheWeek === -1) {
                dayOfTheWeek = 6;
            }
            return {
                dayOfTheWeek: dayOfTheWeek,
                weekDays: weekDays
            }
        },
        computed: {
            days() {
                let date, l, days;
                date = new Date(this.my.y + '/' + (this.my.m + 1) + '/1');
                l = getDaysInMonth(date);
                days = [];
                while (l > 0) {
                    days.unshift(l);
                    l--;
                }
                return days;
            },
            doCalculations() {
                let displayedFrame, visibleMonths;
                displayedFrame = this.$store.state.displayedFrame;
                visibleMonths = this.$store.state.visibleMonths;
                return this.monthKey >= (displayedFrame - 1) && this.monthKey < (displayedFrame + visibleMonths + 1);
            },

            // label
            month() {
                return this.$store.getters['monthName'](this.my.m);
            }
        }
    }
</script>


<template>
    <div class="month">
        <div class="month__label">
            {{month}} {{my.y}}
        </div>
        <div class="week">
            <div
                v-for="d in weekDays"
                class="week__day">{{d}}</div>
        </div>
        <div class="month__days" v-if="doCalculations">
            <div
                :style="{'width': (dayOfTheWeek * 40) + 'px'}"
                class="spacer"></div>
            <day
                v-for="(day, index) in days"
                :key="index"
                :do-calculations="doCalculations"
                :my="my"
                :day="day"/>
        </div>
    </div>
</template>


<style lang="scss">
    .month {
        width: 300px;
        padding: 10px;

        .month__label {
            margin-bottom: 4px;
            text-align: center;
        }

        .week {
            display: flex;

            .week__day {
                width: 38px;
                height: 38px;
                margin: 1px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #555;
                cursor: default;
                font-size: 10px;
            }
        }

        .month__days {
            display: flex;
            flex-wrap: wrap;
        }
    }
</style>