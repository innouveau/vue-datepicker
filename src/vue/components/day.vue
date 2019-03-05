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
                    return isInBetween(this.dayIndex, this.$store.state.start, this.$store.state.tempEnd) && this.isPossible;
                } else {
                    return false;
                }
            },
            isPartOfRangeFull() {
                if (this.$store.state.start !== null && this.$store.state.end !== null) {
                    return isInBetween(this.dayIndex, this.$store.state.start, this.$store.state.end);
                }
            },
            isPossible() {
                return this.$store.getters['isPossible'](this.dayIndex);
            }
        },
        methods: {
            selectDay() {
                if (this.isPossible) {
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
                    console.log('not possible');
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
                     'day--possible': isPossible}"
         class="day">{{day}}
            <div class="tiny">
                {{dayIndex}}
            </div></div>
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