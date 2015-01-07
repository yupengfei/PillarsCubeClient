
def SplitQuery(inputString):
	questionMarkIndex = inputString.find('?')
	if questionMarkIndex == -1:
		print("no parameters, return null")
		return inputString[1 :], None
	command = inputString[1 : questionMarkIndex]
	parametersString = inputString[questionMarkIndex + 1 : ]
	parametersList = parametersString.split('&')
	parametersDict = {}
	for parametersItem in parametersList:
		parametersPair = parametersItem.split('=')
		key = parametersPair[0]
		value = parametersPair[1]
		parametersDict[key] = value

	return command, parametersDict

if __name__ == '__main__':
	inputString = r'/heart?sysname=Linux&machine=%2369-Ubuntu+SMP+Thu+Nov+13+17%3A53%3A56+UTC+2014&nodename=skynet&release=3.13.0-40-generic'
	command, parameters = SplitQuery(inputString)
	print(inputString)
	print('command is: ', command)
	print('parameters is: ', parameters)