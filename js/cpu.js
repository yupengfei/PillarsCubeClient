var cpuChart = echarts.init(document.getElementById('cpu_chart'));
cpuOption = {
    title : {
        text: 'CPU'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['CPU']
    },
    // toolbox: {
    //     show : true,
    //     feature : {
    //         mark : {show: true},
    //         dataView : {show: true, readOnly: false},
    //         restore : {show: true},
    //         saveAsImage : {show: true}
    //     }
    // },
    dataZoom : {
        show : false,
        start : 0,
        end : 100
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : true,
            data : (function (){
                var now = new Date();
                var res = [];
                var len = 10;
                while (len--) {
                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                    now = new Date(now - 2000);
                }
                return res;
            })()
        }
    ],
    yAxis : [
        {
            type : 'value',
            scale: true,
            name : 'usage',
            boundaryGap: [0.2, 0.2]
        }
    ],
    series : [
        {
            name:'CPU',
            type:'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
            data:(function (){
                var res = [];
                var len = 10;
                while (len--) {
                    res.push(0);
                }
                return res;
            })()
        }
    ]
};

                    
cpuChart.setOption(cpuOption);
function AddCpuData(cpuPercent) {
    var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
    cpuChart.addData([
        [
            0,        // 系列索引
            cpuPercent, // 新增数据
            false,     // 新增数据是否从队列头部插入
            false,     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
            axisData
        ]]);
}
