<template>
  <div class="bg-gray-300 p-10">
    <p class="text-xl">Date Picker</p>
    <p><input type="text" :value="this.value" required pattern="\d{4}-\d{2}-\d{2}"></p>

    <div class="flex flex-grow flex-col bg-white border-t border-b sm:rounded sm:border shadow overflow-hidden">
      <div class="border-b">
        <div class="flex justify-between pl-6 -mb-px">
          <div class="flex"></div>
        </div>
      </div>

      <button @click="moveMonthBack()">Back</button>
      <button @click="moveMonthForward()">Forward</button>
      <button @click="moveToToday()">Today</button>

      <div class="w-auto mx-3 my-3 border-solid border-grey-light rounded border shadow-sm" v-if="weeks">
        <div class="bg-grey-lighter px-2 py-2 border-solid border-grey-light border-b text-center">{{ displayMonth.format('MMMM YYYY') }}</div>
        <div class="">
          <table class="w-full">
            <tr class="border-b">
              <th v-for="day in weeks[0].days" class="py-3 px-4">{{ day.date.format('dd')[0] }}</th>
            </tr>
            <tr v-for="week in weeks">
              <td v-for="day in week.days" :class="day.class" @click="setSelection(day.date)">
                {{ day.date.format('D') }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      value: moment().format('YYYY-MM-DD'),
      weekType: 'isoWeek', // 'isoWeek' or 'week'
      displayMonth: null,
      weeks: null,

      // styles
      diffMonthClass: 'py-3 px-4 hover:bg-blue-400 hover:text-white text-gray-400 text-center cursor-pointer',
      thisMonthClass: 'py-3 px-4 hover:bg-blue-400 hover:text-white text-center cursor-pointer',
      todayClass: 'py-3 px-4 hover:bg-blue-400 hover:text-white bg-gray-400 text-center cursor-pointer',
      selectedClass: 'py-3 px-4 hover:text-white bg-red-400 text-center cursor-pointer'
    }
  },

  mounted() {
    this.displayMonth = this.momentDate.clone().startOf('month');
    this.updateWeeks();
  },

  computed: {
    momentDate: function () {
      return moment(this.value);
    }
  },

  methods: {
    moveMonthBack: function(event) {
      this.displayMonth.subtract(1, 'month');
      this.updateWeeks();
    },
    moveMonthForward: function(event) {
      this.displayMonth.add(1, 'month');
      this.updateWeeks();
    },
    moveToToday: function(event) {
      this.displayMonth = moment();
      this.updateWeeks();
    },
    setSelection: function (selectedDate) {
      this.value = selectedDate.format('YYYY-MM-DD');
      this.updateWeeks();
    },
    updateWeeks: function (event) {
      let startOfMonth = this.displayMonth.clone().startOf('month');
      let endOfMonth = this.displayMonth.clone().endOf('month');
      let startOfFirstWeek = startOfMonth.clone().startOf(this.weekType);

      this.weeks = [];

      let day = {
        date: startOfFirstWeek.clone(),
        class: this.thisMonthClass
      }

      let week = 0;

      while (day.date.isBefore(endOfMonth)) {
        let days = [];

        for (let i=0; i<7; i++) {

          day = {
            date: startOfFirstWeek.clone().add((week * 7) + i, 'days'),
            class: this.thisMonthClass
          }

          if (day.date.month() !== this.displayMonth.month()) {
            day.class = this.diffMonthClass
          }

          if (day.date.isSame(moment().startOf('day'))) {
            day.class = this.todayClass
          }

          if (day.date.isSame(this.momentDate)) {
            day.class = this.selectedClass
          }

          days.push(day);
        }

        this.weeks.push({
          days: days
        });

        week++;
      }
    }
  }
}
</script>