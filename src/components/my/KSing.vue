<template>
	<div class="localmusic">
		
		<div class="localmusic-header">
			<div>
				
				<img @click="gostate" src="../../assets/icon/back.png"/>
				<p>K歌作品</p>
			</div>
		</div>
		
		<div class="localmusic-content">
			<van-tabs v-model="active" animated swipeable sticky background="white" color="#5FAAFF" >
			  <van-tab class="main-padding-bottom" title="作品">
				<p>暂无任何作品，请去K歌录制</p>
			  </van-tab>
			  <van-tab class="main-padding-bottom" title="动态">
				<p>暂无任何动态</p>
			  </van-tab>
			</van-tabs>
			
		</div>
		

	</div>
</template>

<script>
	
	import { Tab, Tabs } from 'vant';
	
	export default{
		name:"KSing",
		data(){
			return{
				active:0
			}
		},
		
		components:{
					[Tab.name]:Tab,
					[Tabs.name]:Tabs
				},
				
		methods:{
			gostate(){
				this.$router.go(-1)
			}
		}
	}
	
</script>

<style lang="less" scoped>

	.localmusic{
		
		.localmusic-header{
			height: 60px;
			background-color: #5FAAFF;
			
			>div{
				padding: 14.5px 10px;
				overflow: hidden;
				>img{
					padding: 3px;
					height: 25px;
				}
				>*{
					float: left;
					font-size: 18px;
				}
			}
		}
		
		.localmusic-content{
			
		}
			
	}
	
</style>