<template>
	<div class="search-main">
		<div class="search-header">
			<div class="search-box1"><img @click="gostate" class="search-back" src="../../assets/icon/back (1).png"/></div>
			<div class="search-box2">
				<van-search
				  v-model="value"
				  placeholder="请输入搜索关键词"
				  show-action
				  shape="round"
				  @search="onSearch"
				>
				  <div slot="action" @click="onSearch">搜索</div>
				</van-search>
			</div>
		</div>
		
		<div class="search1" v-show="isshowsearch">
			<div class="search-content1">
				<div> <span >热门搜索</span> </div>
				<div>
					<p @click="getvalue(item.title)" v-for="(item,index) in pvalue">{{item.title}}</p>
				</div>
			</div>
			
			<div class="search-content2"  v-for="(item,index) in searchHistory" :key="index">
				<div class="sc2-img"><img class="img-auto"src="../../assets/icon/time.png"/></div>
				
				<div @click="getvalue(item)">
					<span>{{item}}</span>
				</div>
				
				<div class="sc2-img"><img @click="deleteHistroy(item)" class="img-auto"src="../../assets/icon/x.png"/></div>
			</div>
		</div>
		
		<div class="search2" v-if="!isshowsearch">
			
			<div v-for="(item,index) in searchResult" class="localmusic-content" :key="index">
				<div class="localmusic-div">
					<img class="img-auto" @click="addSong(item)" src="../../assets/icon/加.png"/>
					<img class="selectjump" src="../../assets/icon/plus.png"/>
				</div>
				
				<div @click="toggleson(item)">
					<p>{{item.title}}</p>
					<p>{{item.author}}</p>
				</div>
				<div>
					<img src="../../assets/icon/ellipsis.png" alt="" />
				</div>
			</div>
				
		</div>
		
	</div>
</template>

<script>
	import qs from "qs"
	export default{
		name:"search",
		props: [ "songinfochild"],
		data(){
			return{
				value:null,
				isshowsearch:true,
				searchHistory:[],
				flag:false,
//				jump:{
//					animation:"seacherjump 3s linear infinite"
//				},
				pvalue:[
					
					{title:"独家首发"},
					{title:"影视原声"},
					{title:"儿歌大全"},
					{title:"原创歌曲"},
					{title:"热门综艺"},
					{title:"蘑菇漫展"},
					{title:"古风好歌"},
					{title:"动漫插曲"}
					
				],
				searchResult:[]
			}
		},
		
		created(){
			this.searchHistory = JSON.parse(localStorage.getItem("searchHistroy"))
		},
		watch: {
			searchHistory:function(newvalue){
					localStorage.setItem("searchHistroy",JSON.stringify(newvalue))

				
			}
		},
		
		methods:{
			
			onSearch(){
				
				if(this.searchHistory === null){
					this.searchHistory = [this.value]
				}else{
					

				
				//history
				//拦截相同的搜索
				if(this.searchHistory.length>0){
					for(var i = 0 ; i < this.searchHistory.length; i++){
						this.flag = true
						if(this.value == this.searchHistory[i]){
						this.flag = false
						break;
						}
					}
					
				}
				else{
					this.searchHistory.splice(0,0,this.value)
				}
				if(this.flag){
					this.searchHistory.splice(0,0,this.value)
					this.flag =false
				}
				if(!this.flag){
					var repindex = this.searchHistory.indexOf(this.value)
					this.searchHistory.splice(repindex,1)
					this.searchHistory.splice(0,0,this.value)
				}
				if(this.searchHistory.length>6)
				this.searchHistory.splice(this.searchHistory.length - 1,1)
				}
				
				
				if(this.value === null || this.value === undefined ){
					this.$toast("请输入搜索关键词")
					return
				}
				var params =  {
						
						"TransCode": "020225",
						"OpenId": "123456789",
						"Body": {
							"key": this.value
						}
						
					};
					
					var paramsStr = qs.stringify(params);
					
					this.axios({
						
						method: 'POST',
						
						url: 'https://api.hibai.cn/api/index/index',
						
						data: paramsStr
						
					}).then(result => {
						this.searchResult = result.data.Body
						this.isshowsearch = false
						})
					
					
			},
			
			gostate(){
				this.value = null
				this.isshowsearch = true
				this.$router.go(-1)
			},
			
			gopath(path){
					this.$router.push(path)
				},
			
			addSong(val){
				event.target.nextSibling.style.visibility = "visible"
				
				var cpl = JSON.parse(localStorage.getItem("currentPlaylist"))
				
				if(cpl === null || cpl === undefined){
					var obj = val
					obj.id = new Date().getTime()
					obj.islike = false
//					var arr = [val]
					localStorage.setItem("currentPlaylist",JSON.stringify(obj))
					return
				}
				var obj = val
					obj.id = new Date().getTime()
					obj.islike = false
				cpl.splice(this.songinfochild.index + 1,0,obj)
//				cpl.push(val)
				localStorage.setItem("currentPlaylist",JSON.stringify(cpl))
				
				var paramobj = {dataStatus:true}
				return this.$emit('nextSong',paramobj)

			},
			
			toggleson(val){
				this.gopath({name:"PlayView"})
				var cpl = JSON.parse(localStorage.getItem("currentPlaylist"))
				
				if(cpl === null || cpl === undefined){
					var obj = val
					obj.id = new Date().getTime()
					obj.islike = false
//					var arr = [val]
					localStorage.setItem("currentPlaylist",JSON.stringify(obj))
					return
				}
				var obj = val
					obj.id = new Date().getTime()
					obj.islike = false
				cpl.splice(this.songinfochild.index,0,obj)
//				cpl.push(val)
				
				localStorage.setItem("currentPlaylist",JSON.stringify(cpl))
				
				var childparams = {
										dataStatus:true
									}
				return this.$emit('changeinfo',childparams)
//				var paramobj = {dataStatus:true}
//				return this.$emit('nextSong',paramobj)
			},
			
			getvalue(val){
				this.value = val
				this.onSearch()
			},
			
			deleteHistroy(val){
					var selectindex = this.searchHistory.indexOf(val)
					this.searchHistory.splice(selectindex,1)
			},
			
			jump(){
				
			}
			
			
		}
	
	}
</script>

<style lang="less" scoped>
	.search-main{
		padding-bottom: 72px;
	}
	.search-header{
		overflow: hidden;
		background: #1D82FE;
		position: sticky;
		top: 0;
		left: 0;
		z-index: 20;
		
		>div{
			float: left;
		}
		.search-box1{
			box-sizing: border-box;
			width: 12%;
			height: 54px;
			padding: 10px 0 10px 10px ;
			
			.search-back{
				height: 34px;
			}
		}
		.search-box2{
			width: 85%;
			.van-search{
				background-color: #1D82FE !important;
			}
			.van-search__action{
				/*background-color: #fff !important;*/
				border-radius: 15px;
				color: whitesmoke;
			}
		}
	}
	
	.search-content1{
		border-bottom: 1px solid #E5E5E5;
		>div:nth-of-type(1){
			padding: 5px 10px;
			font-size: 16px;
		}
		>div:nth-of-type(2){
			/*height: 80px;*/
			margin: 5px;
			overflow: hidden;
			line-height: 30px;
			>p{
				box-sizing: border-box;
				margin: 0 5px 10px;
				width: 22%;
				float: left;
				font-size: 14px;
				color: #1D82FE;
				border-radius: 10px;
				height: 30px;
				text-align: center;
				border: 1px #1D82FE solid;
			}
		}
	}
	
	.search-content2{
		overflow: hidden;
		border-bottom: 1px solid #E5E5E5;
		.sc2-img{
			width: 30px;
			height: 30px;
		}
		>div{
			float: left;
			margin: 10px;
			font-size: 16px;
		}
		>div:nth-child(2){
			margin: 14.5px 0;
			width: calc(100% - 110px);
		}
		>div:nth-child(3){
			float: right; 
			padding-right: 10px;
		}
	}
	/*.search2{
		position: relative;
		z-index: 0;
	}*/
	.localmusic-content{
		overflow: hidden;
		border-bottom: 1px solid darkgray;
		margin:0 10px 10px;
		
		
		>div{
			float: left;
		}
		.localmusic-div{
			position: relative;
			height: 20px;
			width: 20px;
			margin: 13px;
			
			.selectjump{
				position: absolute;
				top: 2px;
				left: 2px;
				visibility: hidden;
				
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
			color: #1D82FE;
		}
		p:nth-of-type(2){
			font-size: 8px;
			color: darkgray;
		}
		>div:nth-of-type(3){
			float: right;
		}
	}
	@keyframes jumppp{
		from{
			transform: rotate(0);
		}
		to{
			transform: rotate(360deg);
		}
	}
	
	
</style>