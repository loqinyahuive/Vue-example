<template>
  <div id="container-inner">1</div>
</template>

<script>
import Highcharts from 'highcharts/highstock'
export default {
  data () {
    return {
      option: {
        title: {
          text: 'demo'
        },
        chart: {
        },
        plotOptions: {
          candlestick: {
            color: 'red',
            upColor: 'green'
          },
          ohlc: {
            color: 'red',
            upColor: 'green'
          },
          areaspline: {
            color: '#rgba(255, 186, 0, 0.2)',
            lineColor: '#336633',
            fillOpacity: 0.2
          }
        },
        series: [{
          type: 'candlestick',
          data: [[
            1470663000000,
            107.52,
            108.37,
            107.16,
            108.37
          ],
          [
            1470749400000,
            108.23,
            108.94,
            108.01,
            108.81
          ],
          [
            1470835800000,
            108.71,
            108.9,
            107.76,
            108
          ],
          [
            1470922200000,
            108.52,
            108.93,
            107.85,
            107.93
          ],
          [
            1471008600000,
            107.78,
            108.44,
            107.78,
            108.18
          ]]
        }]
      }
    }
  },
  mounted () {
    Highcharts.stockChart('container-inner', Highcharts.extend({}, this.option))
    this.option.series[0].type = 'ohlc'
    console.log('******* this.option.series[0].type ', this.option.series[0].type)
  }
}
</script>
