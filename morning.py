def morning_func():
    print('Good morning')
    import xlrd
    from collections import OrderedDict
    import simplejson as json
    # Open the workbook and select the first worksheet
    wb = xlrd.open_workbook('DataFiles_Rules_Report.xlsx')
    sh = wb.sheet_by_index(6)
    print('sh------', sh.nrows)
    # List to hold dictionaries
    cars_list = []
    # Iterate through each row in worksheet and fetch values into dict
    for rownum in range(1, sh.nrows):
        # print('sh.nrows---------',sh.nrows)
        cars = OrderedDict()
        row_values = sh.row_values(rownum)
        print('row_values',row_values)
        cars['File_Name'] = row_values[0]
        cars['Total_Issues'] = row_values[1]
        cars['Perfect_Excel_Format'] = row_values[2]
        cars['Process_ID'] = row_values[3]
        cars['Special_CHar_In_Entity_Name'] = row_values[4]
        cars['Start_Date_Less_Than_End_Date'] = row_values[5]
        cars['Start_Date_Less_Than_End_Time'] = row_values[6]
        cars['Time_in_hh'] = row_values[7]
        # cars['Comments'] = row_values[2]
        # print('cars----------',cars)
        # cars['miles'] = row_values[3]
        cars_list.append(cars)
        # print('cars_list--------------',cars_list)
    # Serialize the list of dicts to JSON
    j = json.dumps(cars_list)
    return j
    # print('j-------------',j)
    # Write to file
    # with open('data.json', 'w') as f:
    #     f.write(j)