'''
Rule 18 - Start Date and End Date, below is the date format
YYYY-MM-DD
'''
import re
import os
import sys
import json
import openpyxl
import pandas as pd
from pandas import ExcelWriter
from pandas import ExcelFile

file_name=sys.argv[0]
rule=file_name[:file_name.find('.py')]
file_directory=sys.argv[1]
config_file=sys.argv[2]
target=sys.argv[3]
all_files=os.listdir(file_directory)
files=[]

config=pd.read_excel(config_file)
newdf=config[config['RULE']==rule]
to_check=''
for index,row in newdf.iterrows():
	to_check=row['TO_CHECK']
to_check=json.loads(to_check)
files_to_apply=to_check['files_to_apply']
columns_to_apply=to_check['columns_to_apply']

if(to_check['files_to_apply']=='ALL'):
	files = all_files
else:
	for f in files_to_apply:
		for file in all_files:
			if(file.startswith(f)):
				files.append(file)

data=[]

for file in files:
	df = pd.read_excel(file_directory+'/'+file)
	df.index = range(2,df.shape[0]+2)
	
	for index,row in df.iterrows():
		start_date=row['START_DATE']
		end_date=row['END_DATE']
		if(type(start_date)!=float):
			if(not re.match(r"([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))",start_date)):
				entry=[index,file,column_value+' is not in YYYY-MM-DD fprmat']
				print('The row '+str(index)+' in the file '+file+' does not have start date in YYYY-MM-DD format')
				data.append(entry)
		if(type(end_date)!=float):
			if(not re.match(r"([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))",end_date)):
				entry=[index,file,column_value+' is not in YYYY-MM-DD format']
				print('The row '+str(index)+' in the file '+file+' does not have end date in YYYY-MM-DD format')
				data.append(entry)
			
df1 = pd.DataFrame(data, columns = ['ROW_NO', 'FILE_NAME', 'COMMENTS'])
with ExcelWriter(target,engine='openpyxl',mode='a') as writer:
	df1.to_excel(writer,sheet_name=rule,index=False)