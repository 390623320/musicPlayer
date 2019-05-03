<template>
	<div class="localmusic">
		
		<div class="localmusic-header">
			<div>
				
				<img @click="gostate" src="../../assets/icon/back.png"/>
				<p>下载管理</p>
			</div>
		</div>
		
		<div class="localmusic-content">
			<div><img src="../../assets/icon/加.png"/></div>
			<div>
				<p>你把我灌醉</p>
				<p>冯提莫</p>
			</div>
			<div>
				<img src="../../assets/icon/cc-heart-o.png" alt="" />
				<img src="../../assets/icon/ellipsis.png" alt="" />
			</div>
		</div>
		
		<div class="localmusic-content">
			<div><img src="../../assets/icon/加.png"/></div>
			<div>
				<p>你把我灌醉</p>
				<p>冯提莫</p>
			</div>
			<div>
				<img src="../../assets/icon/cc-heart-o.png" alt="" />
				<img src="../../assets/icon/ellipsis.png" alt="" />
			</div>
		</div>
		
	</div>
</template>

<script>
	export default{
		name:"download",
		data(){
			return{
				
			}
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
			overflow: hidden;
			border-bottom: 1px solid darkgray;
			margin:0 10px 10px;
			
			>div{
				float: left;
				
				img{
					padding: 13px;
					height: 20px;
				}
			}
			p{
				width: 200px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			p:nth-of-type(1){
				font-size: 16px;
				font-weight: 500;
			}
			p:nth-of-type(2){
				font-size: 8px;
				color: darkgray;
			}
			>div:nth-of-type(3){
				float: right;
			}
		}
			
	}
	
</style>