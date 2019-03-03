<script>
    export default {
        name: 'navigator',
        components: {

        },
        computed: {

        },
        methods: {
            prevMonth() {
                this.$store.commit('prevMonth');
            },
            nextMonth() {
                this.$store.commit('nextMonth');
            }
        }
    }
</script>


<template>
    <div class="navigator">
        <div class="navigator__tools">
            <div
                @click="prevMonth()"
                class="navigator__tool">
                <i class="fas fa-arrow-left"></i>
            </div>
            <div
                @click="nextMonth()"
                class="navigator__tool">
                <i class="fas fa-arrow-right"></i>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    .navigator {
        padding: 10px;

        .navigator__tools {
            display: flex;

            .navigator__tool {
                background: red;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                margin-right: 4px;
                cursor: pointer;
            }
        }
    }
</style>