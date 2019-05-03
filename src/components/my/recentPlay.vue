<template>
	<div class="localmusic">
		
		<div class="localmusic-header">
			<div>
				
				<img @click="gostate" src="../../assets/icon/back.png"/>
				<p>最近播放</p>
			</div>
		</div>
		
		<div v-for="(item,index) in recentHistroy" class="localmusic-content">
			<div><img src="../../assets/icon/加.png"/></div>
			<div @click="toggleson(item)">
				<p>{{item.title}}</p>
				<p>{{item.author}}</p>
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
		name:"rencentPlay",
		props: [ "songinfochild"],
		data(){
			return{
				recentHistroy:null
			}
		},
		created(){
			this.recentHistroy = JSON.parse(localStorage.getItem("recentHistroy"))
		},
		methods:{
			gostate(){
				this.$router.go(-1)
			},
			gopath(path){
					this.$router.push(path)
			},
			
			toggleson(val){
				
				var kk = JSON.parse(localStorage.getItem("currentPlaylist")).findIndex(x => x.url === val.url);
				//拦截
				if(kk == -1){
					this.$toast("该歌曲不在当前播放列表中")
					return
				}
				this.gopath({name:"PlayView"}) 
				
				var childparams = {
										changeindex:kk
									}
				return this.$emit('changeinfo',childparams)
			}
			
		}
	}
	
</script>

<style lang="less" scoped>

	.localmusic{
		padding-bottom: 80px;
		
		.localmusic-header{
			height: 60px;
			background-color: #5FAAFF;
			position: sticky;
			top: 0;
			left: 0;
			
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