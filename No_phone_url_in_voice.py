#Rule 26 - In contact data file, the VOICE column must not contain any phone number or email ID
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

def find_email(string):
    url = re.findall('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\), ]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', string) 
    return url
	
def find_phone(string):
    phone = re.findall('^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$', string)
    return phone

data=[]

for file in files:
	df = pd.read_excel(file_directory+'/'+file)
	df.index = range(2,df.shape[0]+2)

	for index,row in df.iterrows():
		for column_name in columns_to_apply:
			column_value=row[column_name]
			#print(voice)
			if(type(column_value)!=float):
				#print('t:'+voice)
				if(find_email(column_value)):
					#print(index)
					entry=[index,file,column_name+' has URL in its contents']
					print('The row '+str(index)+' in the file '+file+' has url in the '+column_name+' column')
					data.append(entry)
				if(find_phone(column_value)):
					#print(index)
					entry=[index,file,column_name+' has phone number in its contents']
					print('The row '+str(index)+' in the file '+file+' has phone number in the '+column_name+' column')
					data.append(entry)

df1 = pd.DataFrame(data, columns = ['ROW_NO', 'FILE_NAME', 'COMMENTS'])
with ExcelWriter(target,engine='openpyxl',mode='a') as writer:
	df1.to_excel(writer,sheet_name=rule,index=False)