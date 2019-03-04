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
        data() {
            return {
                date: new Date(this.my.y + '/' + (this.my.m + 1) + '/' + this.day)
            }
        },
        computed: {
            getEntry() {
                return this.$store.getters['getEntry'](this.date);
            },
            isBlocked() {
                let entry = this.getEntry;
                if (entry) {
                    return entry.blocked;
                } else {
                    //
                }
            },
            isStart() {
                return isEqual(this.$store.state.start, this.date)
            },
            isEnd() {
                return isEqual(this.$store.state.end, this.date)
            },
            isPartOfRangeSemi() {
                let thisDay = this.date;
                if (this.$store.state.start) {
                    return isAfter(thisDay, this.$store.state.start) && isBefore(thisDay, this.$store.state.tempEnd) && this.isPossible;
                } else {
                    return false;
                }
            },
            isPartOfRangeFull() {
                let thisDay = this.date;
                if (this.$store.state.start) {
                    return isAfter(thisDay, this.$store.state.start) && isBefore(thisDay, this.$store.state.end);
                }
            },
            isPossible() {
                return this.$store.getters['isPossible'](this.date);
            }

        },
        methods: {
            selectDay() {
                if (this.isPossible) {
                    if (!this.$store.state.lastClicked || this.$store.state.lastClicked === 'end') {
                        if (this.$store.state.end && isAfter(this.date, this.$store.state.end)) {
                            this.$store.commit('setEnd', this.date);
                        } else {
                            this.$store.commit('setStart', this.date);
                        }
                    } else {

                        if (this.$store.state.start && isBefore(this.date, this.$store.state.start)) {
                            this.$store.commit('setEnd', this.$store.state.start);
                            this.$store.commit('setStart', this.date);
                        } else {
                            this.$store.commit('setEnd', this.date);
                        }


                    }
                } else {
                    console.log('not possible');
                }

            },
            hoverDay() {
                if (!this.$store.state.end) {


                    this.$store.commit('setTempEnd', this.date);
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