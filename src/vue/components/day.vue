<script>
    import {isEqual, isBefore, isAfter} from 'date-fns';

    export default {
        name: 'day',
        props: {
            my: {
                type: Object,
                required: true
            },
            day: {
                type: Number,
                required: true
            }
        },
        computed: {
            isBlocked() {
                return this.$store.getters['isBlocked'](this._getDate())
            },
            isStart() {
                return isEqual(this.$store.state.start, this._getDate())
            },
            isEnd() {
                return isEqual(this.$store.state.end, this._getDate())
            },
            isPartOfRange() {
                let thisDay = this._getDate();
                if (this.$store.state.start) {
                    if (this.$store.state.end) {
                        return isAfter(thisDay, this.$store.state.start) && isBefore(thisDay, this.$store.state.end);
                    } else {
                        return isAfter(thisDay, this.$store.state.start) && isBefore(thisDay, this.$store.state.tempEnd);
                    }
                }
            }
        },
        methods: {
            _getDate() {
                return new Date(this.my.y + '/' + (this.my.m + 1) + '/' + this.day);
            },
            selectDay() {
                if (!this.$store.state.lastClicked || this.$store.state.lastClicked === 'end') {
                    if (this.$store.state.end && isAfter(this._getDate(), this.$store.state.end)) {
                        this.$store.commit('setEnd', this._getDate());
                    } else {
                        this.$store.commit('setStart', this._getDate());
                    }
                } else {

                    if (this.$store.state.start && isBefore(this._getDate(), this.$store.state.start)) {
                        this.$store.commit('setEnd', this.$store.state.start);
                        this.$store.commit('setStart', this._getDate());
                    } else {
                        this.$store.commit('setEnd', this._getDate());
                    }


                }
            },
            hoverDay() {
                if (!this.$store.state.end) {
                    this.$store.commit('setTempEnd', this._getDate());
                }
            }
        }
    }
</script>


<template>
    <div
        @click="selectDay()"
         @mouseover="hoverDay()"
         :class="{'day--start': isStart,
                     'day--end': isEnd,
                     'day--in-range': isPartOfRange,
                     'day--blocked': isBlocked}"
         class="day">{{day}}</div>
</template>


<style lang="scss">
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
            border-top-left-radius: 50%;
            border-bottom-left-radius: 50%;
        }

        &.day--end {
            background: red;
            color: #fff;
            border-top-right-radius: 50%;
            border-bottom-right-radius: 50%;
        }

        &.day--in-range {
            background: rgba(255,0,0,0.5);
        }

        &.day--blocked {
            background: #888;
            color: #fff;
            cursor: not-allowed;

            &:hover {
                background: #888;
            }
        }

        &:hover {
            background: red;
            color: #fff;
        }
    }
</style>