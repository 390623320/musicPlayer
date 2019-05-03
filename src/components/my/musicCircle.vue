<template>
	<div class="localmusic">
		
		<div class="localmusic-header">
			<div>
				
				<img @click="gostate" src="../../assets/icon/back.png"/>
				<div>偏好设置</div>
			</div>
			<div>
				<div><img src="../../assets/img/music.png" alt="" /></div>
				
				<div>
					<p>音乐圈</p>
					<p>来自好有的音乐动态</p>
				</div>
				
				<div><p>发动态</p></div>
			</div>
		</div>
		
		<div class="localmusic-content">
			
			<div class="lmc-content1">
				<img class="mc-img" src="../../assets/img/timg.jpg" alt="" />
				<p>斌Bin</p>
			</div>
			<div class="lmc-content2">
				<p>我最近收藏了 《庄心妍 -不安 》</p>
				<div>歌曲</div>
				<div>
					<span>昨天22:11</span>
					<div>
						<div>
							<div><img src="../../assets/my-hear/消息.png"/></div>
							<div>评论</div>
						</div>
						<div>
							<div><img src="../../assets/my-hear/消息.png"/></div>
							<div>点赞</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
		
			<div class="localmusic-content">
			
			<div class="lmc-content1">
				<img class="mc-img" src="../../assets/img/timg.jpg" alt="" />
				<p>斌Bin</p>
			</div>
			<div class="lmc-content2">
				<p>我最近收藏了 《庄心妍 -不安 》</p>
				<div>歌曲</div>
				<div>
					<span>昨天22:11</span>
					<div>
						<div>
							<div><img src="../../assets/my-hear/消息.png"/></div>
							<div>评论</div>
						</div>
						<div>
							<div><img src="../../assets/my-hear/消息.png"/></div>
							<div>点赞</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
		
	</div>
</template>

<script>
	export default{
		name:"musicCircle",
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
			background-image: url(../../assets/img/musiccirclebg.jpeg);
			background-position:center;
			background-size:cover;
			overflow: hidden;
			
			>div{
				padding: 14.5px 10px 0;
				width: 100%;
				float: left;
				overflow: hidden;
				
			}
			>div:nth-of-type(1){
				overflow: hidden;
				>img{
					padding: 3px;
					height: 20px;
				}
				>div{
					float: right;
					padding-right: 20px;
					font-size: 14px;
					color: #F9F9FA;
				}
			}
			>div:nth-of-type(2){
				overflow: hidden;
				padding-bottom: 14.5px;
				
				>div{
					float: left;
				}
				img{
					padding: 0 10px;
				}
				>div:nth-of-type(2){
					>p:nth-of-type(1){
						color: #F9F9FA;
						font-size: 20px;
					}
					>p:nth-of-type(2){
						margin-top: 8px;
						color: #F9F9FA;
					}
				}
				>div:nth-of-type(3){
					float: right;
					color: #F9F9FA;
					margin: 20px;
					padding: 0 10px;
					border: 1px #F9F9FA solid;
					border-radius: 10px 10px 10px 10px;
				}
				
			}
		}
		
		.localmusic-content{
			margin: 15px;
			
			.lmc-content1{
				overflow: hidden;
				
				>img{
					float: left;
					height: 40px;
					border-radius: 50%;
				}
				>p{
					float: left;
					height: 34px;
					line-height: 34px;
					font-size: 16px;
					color: cornflowerblue;
					padding-left: 5px;
				}
			}
			.lmc-content2{
				margin: 10px;
				border-bottom: 1px solid darkgray;
				>p{
					font-size: 16px;
				}
				>div:nth-of-type(1){
					height: 50px;
					background-color: darkgray;
					border-radius: 5px;
					margin: 8px 0;
				}
				>div:nth-of-type(2){
					overflow: hidden;
					
					>*{
						float: left;
						line-height: 19px;
					}
					img{
						height: 19px;
					}
					>div{
						overflow: hidden;
						float: right;
						>div{
							padding:0 8px ;
							float: left;
							overflow: hidden;
							
							>div{
								padding:0 2px ;
								float: left;
							}
						}
					}
					
				}
				
			}

		}

	}
	
</style>