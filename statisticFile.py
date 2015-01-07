def GetStatisticFileMap():
	statisticFileMap = {}
	fileList = ['index.html', 'details.html', 'js/echarts-all.js', 'js/bootstrap.js', 
	'js/bootstrap.min.js', 'js/cpu.js', 'js/machine_count.js',
	'js/disk.js', 'js/jquery-2.1.3.min.js', 'js/machine.js', 'js/memory.js', 'js/npm.js',
	'css/bootstrap.css', 'css/bootstrap.css.map', 'css/bootstrap.min.css', 'css/bootstrap-theme.css',
	'css/bootstrap-theme.css.map', 'css/bootstrap-theme.min.css', 'css/client.css',
	'js/detail.js', 'js/single_machine.js']
	for inputFile in fileList:
		with open(inputFile) as inp:
			tempString = inp.read()
			statisticFileMap[inputFile] = tempString
	return statisticFileMap

if __name__ == '__main__':
	statisticFileMap = GetStatisticFileMap()
	print(statisticFileMap)