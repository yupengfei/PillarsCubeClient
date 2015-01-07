var machineChart = echarts.init(document.getElementById('machine_chart'));
machineOption = {
    tooltip : {
        formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    series : [
        {
            name:'Pressure',
            type:'gauge',
            detail : {formatter:'{value}%'},
            data:[{value: 50, name: 'machine'}]
        }
    ]
};

//window.clearInterval(timeTicket);
// timeTicket = window.setInterval(function (){
//     machineOption.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
//     machineChart.setOption(machineOption, true);
// },2000);
                    
machineChart.setOption(machineOption);

function SetMachinePressure(pressure) {
    machineOption.series[0].data[0].value = pressure;
    machineChart.setOption(machineOption, true);
}

// SetMachinePressure(70);