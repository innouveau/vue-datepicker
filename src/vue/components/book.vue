<script>
    export default {
        name: 'book',
        computed: {
            rangeString() {
                let string, start, end;
                string = '';
                start = this.$store.state.start;
                end = this.$store.state.end;
                if (start) {
                    string += this.$store.state.language === 'nl' ? 'Van ' : 'Von ';
                    string += this.$store.getters['fullName'](start);
                }
                if (end) {
                    string += this.$store.state.language === 'nl' ? ' t/m ' : ' bis einschließlich ';
                    string += this.$store.getters['fullName'](end);
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