<script>
    import {isEqual, isBefore, isAfter} from 'date-fns';
    import {isInBetween} from '@root/vue/tools';

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
            },
            doCalculations: {
                type: Boolean,
                required: true
            }
        },
        data() {
            let date,dayIndex;
            date = new Date(this.my.y + '/' + (this.my.m + 1) + '/' + this.day);
            dayIndex = this.$store.getters['getIndex'](date);
            return {
                date: date,
                dayIndex: dayIndex
            }
        },
        computed: {
            _getEntry() {
                return this.$store.state.dates[this.dayIndex];
            },
            isBlocked() {
                let entry = this._getEntry;
                return entry && entry.blocked;
            },
            isStart() {
                return this.$store.state.start === this.dayIndex;
            },
            isEnd() {
                return this.$store.state.end === this.dayIndex;
            },
            isPartOfRangeSemi() {
                if (this.$store.state.start !== null && this.$store.state.end === null && this.$store.state.tempEnd !== null) {
                    return isInBetween(this.dayIndex, this.$store.state.start, this.$store.state.tempEnd) && this.isPossibleInbetween;
                } else {
                    return false;
                }
            },
            isPartOfRangeFull() {
                if (this.$store.state.start !== null && this.$store.state.end !== null) {
                    return isInBetween(this.dayIndex, this.$store.state.start, this.$store.state.end);
                }
            },
            isPossibleInbetween() {
                return this.$store.getters['isPossibleInbetween'](this.dayIndex);
            },
            isPossibleAsEdge() {
                // not so nice way of returning true OR feedback string...
                let result = this.$store.getters['isPossibleAsEdge'](this.dayIndex);
                if (result === true) {
                    return true;
                } else {
                    return result
                }
            },
        },
        methods: {
            selectDay() {
                let result = this.isPossibleAsEdge;
                if (result === true) {
                    this.$store.commit('setFeedback', '');
                    // nothing set yet
                    if (this.$store.state.start === null) {
                        this.$store.commit('setStart', this.dayIndex);
                    } else {
                        // both set: reset
                        if (this.$store.state.end !== null) {
                            this.$store.commit('setEnd', null);
                            this.$store.commit('setStart', this.dayIndex);
                        } else {
                            // normal end
                            if (this.$store.state.start !== null && this.dayIndex < this.$store.state.start) {
                                this.$store.commit('setEnd', this.$store.state.start);
                                this.$store.commit('setStart', this.dayIndex);
                            } else {
                                this.$store.commit('setEnd', this.dayIndex);
                            }
                        }
                    }
                } else {
                    let dictionary = {
                        nl: {
                            tooShortPeriod: 'Periode te kort',
                            dateBlocked: 'Datum is bezet',
                            dateBlockedInBetween: 'Er is een bezette datum in deze periode'
                        },
                        de: {
                            tooShortPeriod: 'Zeitraum zu kurz',
                            dateBlocked: 'Datum ist bereits belegt',
                            dateBlockedInBetween: 'In der Periode gibt es ein Datum das bereits belegt ist'
                        }
                    };
                    this.$store.commit('setFeedback', dictionary[this.$store.state.language][result]);
                }

            },
            hoverDay() {
                if (!this.$store.state.end) {
                    this.$store.commit('setTempEnd', this.dayIndex);
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
                     'day--in-range--semi': isPartOfRangeSemi,
                     'day--in-range--full': isPartOfRangeFull,
                     'day--blocked': isBlocked,
                     'day--possible': (isPossibleAsEdge === true)}"
         class="day">{{day}}</div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .day {
        width: 38px;
        height: 38px;
        background: #ddd;
        margin: 1px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: not-allowed;
        transition: background-color 0.5s ease;

        .tiny {
            font-size: 8px;
            margin-left: 2px;
        }

        &:hover {
            color: red;
        }

        &.day--start {
            background: $allowedColor;
            color: #fff;
            //border-top-left-radius: 50%;
            //border-bottom-left-radius: 50%;
        }

        &.day--end {
            background: $allowedColor;
            color: #fff;
            //border-top-right-radius: 50%;
            //border-bottom-right-radius: 50%;
        }

        &.day--in-range--semi {
            background: $allowedColorSemi;
        }

        &.day--in-range--full {
            background: $allowedColor;
        }

        &.day--blocked {
            background: #888;
            color: #fff;
            cursor: not-allowed;

            &:hover {
                background: #888;
            }
        }

        &.day--possible {

            &:hover {
                background: $allowedColor;
                color: #fff;
                cursor: pointer;
            }
        }


    }
</style>