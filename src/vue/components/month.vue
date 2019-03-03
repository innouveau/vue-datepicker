<script>
    import {isEqual, isBefore, isAfter, getDaysInMonth} from 'date-fns';

    export default {
        name: 'month',
        props: {
            my: {
                type: Object,
                required: true
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
            // label
            month() {
                return this.$store.getters['monthName'](this.my.m);
            }
        },
        methods: {
            _getDate(day) {
                return new Date(this.my.y + '/' + (this.my.m + 1) + '/' + day);
            },
            selectDay(day) {
                if (!this.$store.state.lastClicked || this.$store.state.lastClicked === 'end') {
                    this.$store.commit('setStart', this._getDate(day));
                } else {
                    this.$store.commit('setEnd', this._getDate(day));
                }
            },
            hoverDay(day) {
                if (!this.$store.state.end) {
                    this.$store.commit('setTempEnd', this._getDate(day));
                }
            },
            isStart(day) {
                return isEqual(this.$store.state.start, this._getDate(day))
            },
            isEnd(day) {
                return isEqual(this.$store.state.end, this._getDate(day))
            },
            isPartOfRange(day) {
                let thisDay = this._getDate(day);
                if (this.$store.state.start) {
                    if (this.$store.state.end) {
                        return isAfter(thisDay, this.$store.state.start) && isBefore(thisDay, this.$store.state.end);
                    } else {
                        return isAfter(thisDay, this.$store.state.start) && isBefore(thisDay, this.$store.state.tempEnd);
                    }
                }
            }
        }
    }
</script>


<template>
    <div class="month">
        <div class="month__label">
            {{month}} {{my.y}}
        </div>
        <div class="month__days">
            <div
                    v-for="(day, index) in days"
                    @click="selectDay(day)"
                    @mouseover="hoverDay(day)"
                    :class="{'day--start': isStart(day),
                     'day--end': isEnd(day),
                     'day--in-range': isPartOfRange(day)}"
                    :key="index"
                    class="day">{{day}}</div>
        </div>
    </div>
</template>


<style lang="scss">
    .month {
        width: 300px;
        padding: 10px;

        .month__label {
            margin-bottom: 4px;
        }

        .month__days {
            display: flex;
            flex-wrap: wrap;

            .day {
                width: 38px;
                height: 38px;
                background: #ddd;
                margin: 1px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;

                &.day--start {
                    background: red;
                    color: #fff;
                }

                &.day--end {
                    background: red;
                    color: #fff;
                }

                &.day--in-range {
                    background: rgba(255,0,0,0.5);
                }

                &:hover {
                    background: red;
                    color: #fff;
                }
            }
        }
    }
</style>