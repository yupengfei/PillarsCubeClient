var diskChart = echarts.init(document.getElementById('disk_chart'));
diskOption = {
    title : {
        text: 'Disk',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'left',
        data:['Unused','Used']
    },
    // toolbox: {
    //     show : true,
    //     feature : {
    //         mark : {show: true},
    //         dataView : {show: true, readOnly: false},
    //         magicType : {
    //             show: true, 
    //             type: ['pie', 'funnel'],
    //             option: {
    //                 funnel: {
    //                     x: '25%',
    //                     width: '50%',
    //                     funnelAlign: 'left',
    //                     max: 1548
    //                 }
    //             }
    //         },
    //         restore : {show: true},
    //         saveAsImage : {show: true}
    //     }
    // },
    calculable : true,
    series : [
        {
            name:'disk',
            type:'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'Unused'},
                {value:310, name:'Used'}
            ]
        }
    ]
};
                    
                    
diskChart.setOption(diskOption);

function SetDiskUsage(unused, used) {
    diskOption.series[0].data[0].value = unused;
    diskOption.series[0].data[1].value = used;
    diskChart.setOption(diskOption, true);
}

// SetDiskUsage(100000, 100);