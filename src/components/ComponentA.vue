<template>
  <div class="bg-gray-300 p-10">
    <p class="text-xl">Load time by momentJS: {{ loadTime }}.</p>
    <p>Fill array by lodash: {{ filledArray }}</p>
  </div>
</template>

<script>
import moment from 'moment'
import fill from 'lodash/fill'

const array = [1, 2, 3]

export default {
  data: function () {
    return {
      loadTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
      filledArray: fill(array, 'a')
    }
  }
}
</script>