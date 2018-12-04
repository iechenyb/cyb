VarietyFundDistribution = myapp.controller("VarietyFundDistribution", function(
		$scope, $http, $rootScope) {
	echartdata=[];
	px="rzl";
	
	$http.get(basePath + "cash/getURL.html").success(
			function(socketurl) {
				socketurl=socketurl.replace(/"/g,'');
				socket = io.connect(socketurl);
				socket.on("pushincrandtotal", function(data) {
					var date = new Date();
					$('#x').text("获得数据"+ date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());					
					echartdata=data.filter(function(item){
						return item.name!="";
					});
					drawechart(echartdata);
				});
				socket.on('connect', function() {
					console.log("连接成功");					
					socket.emit('getmsg', "pushincrandtotal");					
				});
				socket.on("connecting", function() {
					console.log("正在连接");
				});
				socket.on('disconnect', function() {
					console.log("断开连接");
				});
				socket.on('connect_failed', function() {
					console.log("连接失败");
				});
				socket.on('error', function(data) {
					console.log("连接错误" + data);
				});
				socket.on('message', function(data) {
					console.log("信息" + data);
				});
				socket.on('anything', function(data) {
					console.log("连接信息" + data);
				});
				socket.on('reconnect_failed', function() {
					console.log("重连失败");
				});
				socket.on('reconnect', function() {
					console.log("成功重连");
				});
				socket.on('reconnecting', function(data) {
					console.log("正在重连" + data);
				});
			}).error(function(data, status, headers, config) {

	});
	option1 = {
		animation : false,
		title : {
			text : '全国期货各品种保证金日增率',
			x : 'center'
		},
		tooltip : {
			trigger : 'axis',
			formatter : '{a} </br>{b} : {c}%'
		},
		grid:{
			y2:120,
		},		
		dataZoom : {
			show : true,
			realtime : true,
			start : 0,
			end : 100
		},
		xAxis : [ {
			type : 'category',
			name : '品种',
			data : [ ],
			axisLabel : {
	                show:true,	               
	                rotate: 45,
	            },
		} ],
		yAxis : [ {
			type : 'value',
			name : '保证金日增率(%)',
			scale : true,
			max:20,
			min:-20,
			axisLabel : {
				formatter : function(value) {
					if (value == 20) {
						return ">" + value;
					}
					else if (value == -20) {
						return "<" + value;
					}
					else{
						return value;
					}
				}
			}
		} ],
		series : [ {
			name : '日增率',
			type : 'bar',
			data : [ ]
		} ]
	};
	option2 = {
		animation : false,
		title : {
			text : '全国期货各品种保证金日增额',
			x : 'center'
		},
		tooltip : {
			trigger : 'axis',	
			formatter : '{a} </br>{b} : {c}'
		},
		grid:{
			y2:120,
		},
		dataZoom : {
			show : true,
			realtime : true,
			start : 0,
			end : 100
		},
		xAxis : [ {
			type : 'category',
			name : '品种',
			data : [ ],
			axisLabel : {
                show:true,	               
                rotate: 45,
            },
		} ],
		yAxis : [ {
			type : 'value',
			scale : true,
			name : '保证金日增额(万元)',
			axisLabel : {
                show:true,	               
                rotate: 45,                
                formatter: '{value}',
            },
		} ],
		series : [{
			name : '日增额',
			type : 'bar',
			data : [ ]
		} ]
	};

	$scope.pxrzl = function() {
		px="rzl";
		drawechart(echartdata);
	}
	$scope.pxrze = function() {
		px="rze";
		drawechart(echartdata);
	}
	drawechart=function(echartdata){
		echartdata.sort(function(a,b){return a.dayChangeRate<b.dayChangeRate?1:-1});
		var pzldata=[];
		var pzedata=[];
		var rzldata=[];
		var rzedata=[];
		for(var i in echartdata) 
		{ 
			pzldata[i]=echartdata[i].name;
			rzldata[i]=echartdata[i].dayChangeRate.toFixed(2);			
		} 
		option1.xAxis[0].data=pzldata;
		option1.series[0].data=rzldata;
		echartdata.sort(function(a,b){return a.dayChangeAmount<b.dayChangeAmount?1:-1});
		for(var i in echartdata) 
		{ 
			pzedata[i]=echartdata[i].name;
			rzedata[i]=(echartdata[i].dayChangeAmount/10000).toFixed(2);			
		} 		
		option2.xAxis[0].data=pzedata;
		option2.series[0].data=rzedata;	
		var Exclude_num=3;
		var max_min=0;
		if(Math.abs(rzedata[Exclude_num])<Math.abs(rzedata[rzedata.length-Exclude_num-1])){
			max_min=Math.abs(Math.floor(rzedata[rzedata.length-Exclude_num-1]/1000)*1000);
		}
		else{
			max_min=Math.abs(Math.ceil(rzedata[Exclude_num]/1000)*1000);
		}
		option2.yAxis[0].max=max_min;
		option2.yAxis[0].min=-max_min;
		option2.yAxis[0].axisLabel.formatter=function(value) {
			if (value >= max_min) {
				return ">" + value;
			}
			else if(value <= -max_min){
				return "<" + value;
			}
			else{
				return value;
			}
		}
		var myChart1 = echarts.init($('#echartdiv1')[0]);
		myChart1.setOption(option1);
		var myChart2 = echarts.init($('#echartdiv2')[0]);
		myChart2.setOption(option2);
		myChart1.on("dataZoom", DATA_ZOOM_change1);	
		myChart2.on("dataZoom", DATA_ZOOM_change2);	
	}
	function DATA_ZOOM_change1(param) {
		option1.dataZoom.start=param.zoom.start;
		option1.dataZoom.end=param.zoom.end;
	}
	function DATA_ZOOM_change2(param) {
		option2.dataZoom.start=param.zoom.start;
		option2.dataZoom.end=param.zoom.end;
	}
});