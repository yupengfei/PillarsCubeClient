function GetDetail() {
	$.get("/charts_all",
      function(data,status){
        var returnMessage = JSON.parse(data);
        var machineCount = 0;
// #{'percentvirtualmemory': '8.9', 'sysname': 'Linux', 'freedisk': '1384227291136', 
// #'release': '3.13.0-43-generic', 'usedswapmemory': '0', 'totalswapmemory': '12999192576', 
// #'freeswapmemory': '12999192576', 'useddisk': '5218631680', 'availablevirtualmemory': '11470888960', 
// #'totalvirtualmemory': '12595580928', 'percentmemory': '0.0', 
// #'machine': '%2372-Ubuntu+SMP+Mon+Dec+8+19%3A35%3A06+UTC+2014', 
// #'percentdisk': '0.4', 'cpupercent': '3.0', 'magicnumber': '728746028', 
// #'nodename': 'skynet', 'cpucount': '4', 'totaldisk': '1463827709952', 
// #'usedvirtualmemory': '1861038080', 'freevirtualmemory': '10734542848'}
        var totalVirtualMemory = 0;
        var usedVirtualMemory = 0;
        var availableVirtualMemory = 0;

        var totalSwapMemory = 0;
        var freeSwapMemory = 0;
        var usedSwapMemory = 0;

        var totalDisk = 0;
        var usedDisk = 0;

        var cpuPercent = 0.0;
        for (var key in returnMessage) {
        	machineCount++;

        	totalVirtualMemory = returnMessage[key]['totalvirtualmemory'];
        	usedVirtualMemory = returnMessage[key]['usedvirtualmemory'];
        	availableVirtualMemory = returnMessage[key]['availablevirtualmemory'];

        	totalSwapMemory = returnMessage[key]['totalswapmemory'];
        	freeSwapMemory = returnMessage[key]['freeswapmemory'];
        	usedSwapMemory = returnMessage[key]['usedswapmemory'];

        	totalDisk = returnMessage[key]['totaldisk'];
        	usedDisk = returnMessage[key]['useddisk'];

        	cpuPercent = returnMessage[key]['cpupercent'];
        }
        //alert(machineCount);
        DrawMachine(machineCount);
        var cpuPercentShow = cpuPercent * 100 / machineCount;
        AddCpuData(cpuPercentShow);
        AddMemoryData(totalVirtualMemory, usedVirtualMemory, availableVirtualMemory, totalSwapMemory, freeSwapMemory, usedSwapMemory);
        SetMachinePressure(machineCount * 100 / 5000);
        SetDiskUsage(totalDisk - usedDisk, usedDisk);
     });
}
setInterval(GetDetail, 5000);