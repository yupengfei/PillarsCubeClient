function GetSingleMachine() {
	$.get("/charts_all",
      function(data,status){
        var returnMessage = JSON.parse(data);
        var machineCount = 0;
        $("#machines").text('');
        for (var key in returnMessage) {
            machineCount++;
            var magicNumber = returnMessage[key]['magicnumber'];

            var sysName = returnMessage[key]['sysname'];
            var nodeName = returnMessage[key]['nodename'];
            var release = returnMessage[key]['release'];
            var machine = returnMessage[key]['machine'];
            var cpuCount = returnMessage[key]['cpucount'];
            var cpuPercent = returnMessage[key]['cpupercent'];
            DrawSingleMachine(magicNumber, sysName, nodeName, release, machine, cpuCount, cpuPercent);
        }
        //alert(machineCount);
        
     });
}
function DrawSingleMachine(magicNumber, sysName, nodeName, release, machine, cpuCount, cpuPercent) {
    $("#machines").append('<div id="' + magicNumber + '" class="single_machine"><div class="single_machine_detail">'
        + '<div class="single_propertity">MagicNumber: ' + magicNumber + '</div>'
        + '<div class="single_propertity">SystemName: ' + sysName + '</div>'
        + '<div class="single_propertity">NodeName: ' + nodeName + '</div>'
        + '<div class="single_propertity">Release: ' + release + '</div>'
        //+ '<div class="single_propertity">Machine: ' + machine + '</div>'
        + '<div class="single_propertity">CPU Count: ' + cpuCount + '</div>'
        + '<div class="single_propertity">CPU Percent: ' + cpuPercent + '</div>'
        + '</div></div>');
    $("#" + magicNumber).click(function(){
        //alert($("#" + magicNumber).attr('id'));
        $("#command").css('display','block');
        $("#command").attr("magicnumber", magicNumber);
        //alert($("#command").attr("magicnumber"));
    });
}
function BondingCloseButton() {
    $("#commandclosebutton").click(function(){
        $("#command").css('display','none');
    });
}
function BondingSendCommandButton() {
    $("#commandbutton").click(function(){
        var stringToSend = "/command?magicnumber=" + $("#command").attr("magicnumber") + "&command=" + $("#commandline").val()
        //alert(stringToSend)
        $.get(stringToSend,
            function(data,status){
            }
        );
    });
}
function GetResult() {
    var stringToSend = "/result?magicnumber=" + $("#command").attr("magicnumber")
    $.get(stringToSend,
            function(data,status){
                if (data != "false") {
                    //alert("result" + data);
                    $("#commandresult").text(data);
                }
                
            }
        );
}
BondingCloseButton();
BondingSendCommandButton();
setInterval(GetSingleMachine, 10000);
//setInterval(SendCommand, 2000);
setInterval(GetResult, 10000);