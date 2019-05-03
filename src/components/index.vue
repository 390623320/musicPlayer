<template>
	
	<div>
		<div class="main-header">
			<van-tabs v-model="active" animated swipeable sticky background="#5FAAFF" color="#e4393c" title-active-color="#fff" title-inactive-color="#D3ECFF">
			  <van-tab class="main-padding-bottom" title="我的" ref="tab"><my></my></van-tab>
			  <van-tab class="main-padding-bottom" title="听歌"><hear></hear></van-tab>
			  <van-tab class="main-padding-bottom" title="排行榜"><rank></rank></van-tab>
			</van-tabs>
		</div>
		
	</div>
	
</template>

<script>
	
	import { Tab, Tabs } from 'vant';
	import My from "./main/my"
	import Hear from "./main/hear"
	import Rank from "./main/Rank"
	
	export default{
		name:'index',
		data(){
			return{
				active:0
			}
		},
		
		components:{
					[Tab.name]:Tab,
					[Tabs.name]:Tabs,
					My,
					Hear,
					Rank
				}
		
	}
	
</script>

<style scoped>
	.main-padding-bottom{
		padding-bottom: 74px;
	}
</style>