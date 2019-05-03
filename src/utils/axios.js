	import qs from "qs"
	export default{
			getMusic: function(vue,transcode,songlistid,localStorageName,status) {
			
				var params =  {
					
					"TransCode": transcode,
					"OpenId": "Test",
					"Body": {
						"SongListId": songlistid
					}
					
				};
				

				
				var paramsStr = qs.stringify(params);
				
				vue.axios({
					
					method: 'POST',
					
					url: 'https://api.hibai.cn/api/index/index',
					
					data: paramsStr
					
				}).then(result => {
						if(status){
							localStorage.setItem(localStorageName,JSON.stringify(result.data.Body))
						}else{
							console.log("jiebiniiii")
							
						}

					})
			
			}
		}
	