#Rule 28 - Make sure interactions in AcadEvents are not present in Timing file.
import re
import os
import sys
import json
import openpyxl
import pandas as pd
from pandas import ExcelWriter
from pandas import ExcelFile
import validators
print('hit')
file_name=sys.argv[0]
rule=file_name[:file_name.find('.py')]
print('hit')
file_directory=sys.argv[1]
print('hit')
config_file=sys.argv[2]
print('hit')
target=sys.argv[3]
print('hit')
all_files=os.listdir(file_directory)
print('hit')
files=[]
print('hit')
config=pd.read_excel(config_file)
print('hit')
newdf=config[config['RULE']==rule]
print('hit')
to_check=''
print('hit')
for index,row in newdf.iterrows():
	to_check=row['TO_CHECK']
to_check=json.loads(to_check)
print('hit')
files_to_apply=to_check['files_to_apply']
print('hit')
columns_to_apply=to_check['columns_to_apply']
print('hit')

if(to_check['files_to_apply']=='ALL'):
	files = all_files
else:
	for f in files_to_apply:
		for file in all_files:
			if(file.startswith(f)):
				files.append(file)
				print('hit')

data=[]
print('hit')
for file in files:
	df = pd.read_excel(file_directory+'/'+file)
	df.index = range(2,df.shape[0]+2)
for index, row in df.iterrows():
		column_value=row['ENTITY_TYPE']
		if(type(column_value)!=float):
			if(column_value=='AcadEvents'):
				entry=[index,file,column_name+' has entity of type AcadEvents which is not allowed entity type in timing file']
				print('The row '+str(index)+' in the file '+file+' is of type AcadEvents which is not allowed')
				data.append(entry)
print('hit')
df1 = pd.DataFrame(data, columns = ['ROW_NO', 'FILE_NAME', 'COMMENTS'])
with ExcelWriter(target,engine='openpyxl',mode='a') as writer:
	df1.to_excel(writer,sheet_name=rule,index=False)