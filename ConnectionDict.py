import time
# store the connection and last update time
ConnectionTimeDict = {}
ConnectionInfoDict = {}
DiedTime = 6000

# store the connection and computer information
#{'percentvirtualmemory': '8.9', 'sysname': 'Linux', 'freedisk': '1384227291136', 
#'release': '3.13.0-43-generic', 'usedswapmemory': '0', 'totalswapmemory': '12999192576', 
#'freeswapmemory': '12999192576', 'useddisk': '5218631680', 'availablevirtualmemory': '11470888960', 
#'totalvirtualmemory': '12595580928', 'percentmemory': '0.0', 
#'machine': '%2372-Ubuntu+SMP+Mon+Dec+8+19%3A35%3A06+UTC+2014', 
#'percentdisk': '0.4', 'cpupercent': '3.0', 'magicnumber': '728746028', 
#'nodename': 'skynet', 'cpucount': '4', 'totaldisk': '1463827709952', 
#'usedvirtualmemory': '1861038080', 'freevirtualmemory': '10734542848'}
def DealWithHeartMessage(parametersDict):
	magicNumber = parametersDict['magicnumber']
	ConnectionTimeDict[magicNumber] = time.time()
	ConnectionInfoDict[magicNumber] = parametersDict
	CleanDiedClientAddress()

def CleanDiedClientAddress():
	now = time.time()
	keyToDel = set()
	for key in ConnectionTimeDict:
		if now - ConnectionTimeDict[key] > DiedTime:
			keyToDel.add(key)
	for key in keyToDel:
		del ConnectionTimeDict[key]
		del ConnectionInfoDict[key]
if __name__ == '__main__':
	print(time.time())
	DealWithHeartMessage({'a' : 1, 'magicnumber': "123"})
	print(ConnectionTimeDict)
	print(ConnectionInfoDict)
	time.sleep(3)
	DealWithHeartMessage({'a' : 1, 'magicnumber': "124"})
	print(ConnectionTimeDict)
	print(ConnectionInfoDict)
	time.sleep(3)
	DealWithHeartMessage({'b' : 1, 'magicnumber': "123"})
	print(ConnectionTimeDict)
	print(ConnectionInfoDict)