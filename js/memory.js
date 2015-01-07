var memoryChart = echarts.init(document.getElementById('memory_chart'));
memoryOption = {
    title : {
        text: 'Memory'
    },
    tooltip : {
        trigger: 'axis'
    },
    // totalVirtualMemory = returnMessage[key]['totalvirtualmemory'];
    //         usedVirtualMemory = returnMessage[key]['usedvirtualmemory'];
    //         availableVirtualMemory = returnMessage[key]['availablevirtualmemory'];

    //         totalSwapMemory = returnMessage[key]['totalswapmemory'];
    //         freeSwapMemory = returnMessage[key]['freeswapmemory'];
    //         usedSwapMemory = returnMessage[key]['usedswapmemory'];
    legend: {
        data:['totalvirtualmemory', 'usedvirtualmemory', 'availablevirtualmemory', 'totalswapmemory', 'freeswapmemory', 'usedswapmemory']
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
            name : 'memory',
            boundaryGap: [0.2, 0.2]
        }
    ],
    series : [
        {
            name:'totalvirtualmemory',
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
        },
        {
            name:'usedvirtualmemory',
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
        },
        {
            name:'availablevirtualmemory',
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
        },
        {
            name:'totalswapmemory',
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
        },
        {
            name:'freeswapmemory',
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
        },
        {
            name:'usedswapmemory',
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

                    
memoryChart.setOption(memoryOption);
//'totalvirtualmemory', 'usedvirtualmemory', 'availablevirtualmemory', 'totalswapmemory', 'freeswapmemory', 'usedswapmemory'
function AddMemoryData(totalVirtualMemory, usedVirtualMemory, availableVirtualMemory, totalSwapMemory, freeSwapMemory, usedSwapMemory) {
    var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');

    memoryChart.addData([
        [
            0,        // 系列索引
            totalVirtualMemory, // 新增数据
            false,     // 新增数据是否从队列头部插入
            false,     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
            axisData
        ],
        [
            1,        // 系列索引
            usedVirtualMemory, // 新增数据
            false,     // 新增数据是否从队列头部插入
            false     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
        ],
        [
            2,        // 系列索引
            availableVirtualMemory, // 新增数据
            false,     // 新增数据是否从队列头部插入
            false     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
        ],
        [
            3,        // 系列索引
            totalSwapMemory, // 新增数据
            false,     // 新增数据是否从队列头部插入
            false     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
        ],
        [
            4,        // 系列索引
            freeSwapMemory, // 新增数据
            false,     // 新增数据是否从队列头部插入
            false     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
        ],
        [
            5,        // 系列索引
            usedSwapMemory, // 新增数据
            false,     // 新增数据是否从队列头部插入
            false     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
        ]
        ]);
}

//AddMemoryData(50, 50, 50, 50, 50, 50);
//AddMemoryData(50, 50, 50, 50, 50, 50);