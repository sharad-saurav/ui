#Rule 12 - In location, contact, timing, virtual entity names should not be of the form "Location of Admission Building", "Contact of Bursar's Office", "Timings of Registrar's Office".
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

regex = re.compile('[,-/()]')

data=[]

for file in files:
	df = pd.read_excel(file_directory+'/'+file)
	df.index = range(2,df.shape[0]+2)

	string=file[:file.find('_')]
	for index,row in df.iterrows():
		column_value=row['ENTITY_NAME']
		if(type(column_value)!=float):
			if(column_value.startswith(string)):
				entry=[index,file,column_name+' has '+string+' in its entity_name']
				print('The row '+str(index)+' in the file '+file+' entity_name starts with '+string+' of"')
				data.append(entry)
				
df1 = pd.DataFrame(data, columns = ['ROW_NO', 'FILE_NAME', 'COMMENTS'])
with ExcelWriter(target,engine='openpyxl',mode='a') as writer:
	df1.to_excel(writer,sheet_name=rule,index=False)