export default{
	
	formattime:function (time){
		
				var min = parseInt(time/60)
				var sec = time%60
				min = min<10 ? `0${min}` :  `${min}`
				sec = sec<10 ? `0${sec}` : `${sec}`
				return `${min}:${sec}`
				
			}
	
}
