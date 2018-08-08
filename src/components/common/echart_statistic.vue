<template>
	<div id='charts' style='height:400px;padding-bottom:20px;'></div>
</template>

<script>
import echarts from 'echarts'
export default({
	data() {
		return {
			InnerWidth: window.innerWidth-290,
			myChart: ''
		}
	},
	props: ['options'],
	mounted() {
		this.InitChart()
		this.myChart.resize()
	},
	methods: {
		InitChart () {
			this.myChart=echarts.init(document.getElementById('charts'));
		    this.myChart._dom.style.width = this.InnerWidth + 'px'
		    this.myChart.setOption(this.options)
		}
	}
	
})
</script>

<style>
</style>