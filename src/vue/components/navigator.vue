<script>
    export default {
        name: 'navigator',
        components: {

        },
        computed: {
            canSlidePrev() {
                return this.$store.state.displayedFrame > 0;
            },
            canSlideNext() {
                return this.$store.state.displayedFrame < (this.$store.state.availableMonths - 1);
            },
            canClear() {
                return this.$store.state.start || this.$store.state.end;
            },
            eraseLabel() {
                return this.$store.state.language === 'nl' ? 'Wissen' : 'Löschen';
            }
        },
        methods: {
            prevMonth() {
                if (this.canSlidePrev) {
                    this.$store.commit('slidePrev');
                }
            },
            nextMonth() {
                if (this.canSlideNext) {
                    this.$store.commit('slideNext');
                }
            },
            clear() {
                this.$store.commit('clear');
            }
        }
    }
</script>


<template>
    <div class="navigator">
        <div class="navigator__tools">
            <div
                @click="prevMonth()"
                :class="{'navigator__tool--disabled': !canSlidePrev}"
                class="navigator__tool">
                <i class="fas fa-arrow-left"></i>
            </div>
            <div
                @click="nextMonth()"
                :class="{'navigator__tool--disabled': !canSlideNext}"
                class="navigator__tool">
                <i class="fas fa-arrow-right"></i>
            </div>
            <div
                @click="clear()"
                v-if="canClear"
                class="navigator__text-tool">{{eraseLabel}}</div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .navigator {
        padding: 10px;

        .navigator__tools {
            display: flex;
            align-items: center;
            margin-right: 10px;

            .navigator__tool {
                background: $allowedColor;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                margin-right: 4px;
                cursor: pointer;

                &.navigator__tool--disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                i {
                    font-size: 26px;
                    margin-bottom: 3px;

                    &.fa-arrow-left {

                        &:after {
                            content: '←';
                        }
                    }

                    &.fa-arrow-right {

                        &:after {
                            content: '→';
                        }
                    }
                }
            }

            .navigator__text-tool {
                margin-left: auto;
                cursor: pointer;
                color: $allowedColor;
                border-bottom: 1px solid transparent;

                &:hover {
                    border-bottom: 1px solid $allowedColor;
                }
            }
        }
    }
</style>