<script>
    export default {
        name: 'book',
        computed: {
            rangeString() {
                let string, start, end, startDate, endDate;
                string = '';
                start = this.$store.state.start;
                end = this.$store.state.end;
                if (start !== null) {
                    startDate = this.$store.state.dates[start].date;
                    string += this.$store.state.language === 'nl' ? 'Van ' : 'Von ';
                    string += this.$store.getters['fullName'](startDate);
                }
                if (end !== null) {
                    endDate = this.$store.state.dates[end].date;
                    string += this.$store.state.language === 'nl' ? ' t/m ' : ' bis einschließlich ';
                    string += this.$store.getters['fullName'](endDate);
                }
                return string;
            },
            canBook() {
                return this.$store.state.start && this.$store.state.end;
            },
            bookLabel() {
                return this.$store.state.language === 'nl' ? 'Reserveren' : 'Reservieren';
            }
        }
    }
</script>


<template>
    <div class="book">
        <div class="book__range-string">
            {{rangeString}}
        </div>

        <div class="book__tools">
            <div v-if="canBook" class="action-button">
                {{bookLabel}}
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    .book {
        padding: 10px;
        display: flex;
        align-items: center;
        height: 60px;

        .book__range-string {
            margin-right: 10px;

        }

        .book__tools {

            .action-button {
                padding: 8px 12px;
                background: #FF6D33;
                border-radius: 5px;
                color: #fff;
                cursor: pointer;
                text-decoration: none;
                font-size: 16px;
                display: inline-block;

                &:hover {
                    background: #D85425;
                }
            }
        }
    }
</style>