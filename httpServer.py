#! /usr/bin/python3
import http.server
import io, shutil
import json

import QuerySplit
import ConnectionDict
import statisticFile

PORT = 5678

CommandResultDict = {}
CommandDict = {}
class MyHttpHandler(http.server.BaseHTTPRequestHandler):
	def do_GET(self):
		#print('request path' + self.path)
		if '/heart' in self.path:
			#print('heart')
			command, parametersDict = QuerySplit.SplitQuery(self.path)
			#clientAddress = self.client_address[0] + str(self.client_address[1])
			#print('parametersDict: ' + str(parametersDict))
			if command == 'heart':
				if parametersDict['magicnumber'] in CommandDict:
					SendMessage(self, 'command' + CommandDict[parametersDict['magicnumber']])
					del(CommandDict[parametersDict['magicnumber']])
				else:
					SendMessage(self, 'true')
					ConnectionDict.DealWithHeartMessage(parametersDict)
		elif 'commandresult' in self.path:
			#print('commandresult')
			command, parametersDict = QuerySplit.SplitQuery(self.path)
			if command == 'commandresult':
				magicNumber = parametersDict['magicnumber']
				result = parametersDict['result']
				CommandResultDict[magicNumber] = result
				#print("commandresult" + magicNumber + result)
				SendMessage(self, 'true')
		elif '/charts_all' in self.path:
			#print('charts')
			SendMessage(self, json.dumps(ConnectionDict.ConnectionInfoDict))
		elif '/command' in self.path:
			#print('command')
			command, parametersDict = QuerySplit.SplitQuery(self.path)
			if command == 'command':
				magicNumber = parametersDict['magicnumber']
				command = parametersDict['command']
				CommandDict[magicNumber] = command
				#print("CommandDict")
				#print(CommandDict)
				SendMessage(self, 'true')
		elif '/result' in self.path:
			#print('result')
			command, parametersDict = QuerySplit.SplitQuery(self.path)
			if command == 'result':
				if parametersDict['magicnumber'] in CommandResultDict:
					magicNumber = parametersDict['magicnumber']
					SendMessage(self, CommandResultDict[magicNumber])
					del(CommandResultDict[magicNumber])
				else:
					#print("unkonwn")
					SendMessage(self, 'false')
		else:
			#print(self.path)
			if self.path == '/':
				htmlString = statisticFileMap['index.html']
			elif self.path[1:] in statisticFileMap:
				htmlString = statisticFileMap[self.path[1:]]
			else:
				#print("unknow url")
				return
			
			enc = 'UTF-8'
			encoded = htmlString.encode(enc)
			self.send_response(200)  
			#self.send_header("Content-type", "text/html; charset=%s" % enc)  
			self.send_header("Content-Length", str(len(encoded)))  
			self.end_headers()
			self.wfile.write(encoded)

		

			# command, parametersDict = QuerySplit.SplitQuery(self.path)
			# print('parametersDict: ' + str(parametersDict))
			# SendMessage(self, 'true')

		

def SendMessage(requestInstance, message):
	r_str=message  
	enc="UTF-8"
	encoded = r_str.encode(enc)  
	requestInstance.send_response(200)  
	requestInstance.send_header("Content-type", "text/html; charset=%s" % enc)  
	requestInstance.send_header("Content-Length", str(len(encoded)))  
	requestInstance.end_headers()
	requestInstance.wfile.write(encoded)

statisticFileMap = statisticFile.GetStatisticFileMap()

httpd = http.server.HTTPServer(("", PORT), MyHttpHandler)

#print('serving at port', PORT)

httpd.serve_forever()