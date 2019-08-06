import os
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from flask import jsonify
import morning
import Allowed_intents_in_Unstructured
import Check_for_capitalization
# import Check_for_duplicates
# import Check_for_missing_Keyword
# import Check_for_capitalization
# import Correctness_of_MAP_URL
# import Correctness_of_Short_Ref_URL
# # import Date_in_YYYY-MM-DD_format
# import Description_text_not_same
# import Duplicate_in_Entity_Interactn
# import Email_id_validity
# import Exact_dates_available
# import Exceeding_500_characters
# import Latitude_Longitude
# import Multiple_Spaces_in_txt
# import No_content_in_brackets
# import No_AcadEvents_in_Timing
# import No_date_special_characters
# import No_phone_url_in_voice
# import No_preceeding_0_in_room_no
# import No_Ref_URL_in_text
# import No_sentence_in_virtual_entity
# import No_sentence_in_voice_column
# import No_timing_for_acad_events
# import No_timings_values_in_txt
# import Numbering_bullet_points
# import Perfect_Excel_format
# import Process_ID
# import Special_Char_in_Entity_Name
# import Start_date_less_than_end_date
# import Start_time_less_than_end_time
# import Summary
# import Time_in_HH-MM-SS_format



UPLOAD_FOLDER = '/uploads'
ALLOWED_EXTENSIONS = set([ 'xls', 'xlsx'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

api = Api(app)

CORS(app)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/parse_table', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    # print('request.files-------------------',request.files)
    uploaded_files = request.files.getlist("file")
    print('uploaded_files',uploaded_files)
    nfile = request.files['file']
    print('nfile------------------',nfile)
    for file in uploaded_files:
        # print('fil-------------',fil)
        # file = fil['file']
        print('file---------',file)
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            print(filename)
            morning.morning_func()
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            Allowed_intents_in_Unstructured.rule_unstructured()
            Check_for_capitalization.rule_capitalization()
    return jsonify(result={"status": 200})


@app.route("/")
def hello():
    return jsonify({'text':'Hello World!'})

class Employees(Resource):
    def get(self):
        return {'employees': [{'id':1, 'name':'Balram'},{'id':2, 'name':'Tom'}]} 

class Employees_Name(Resource):
    def get(self, employee_id):
        print('Employee id:' + employee_id)
        result = {'data': {'id':1, 'name':'Balram'}}
        return jsonify(result)       

api.add_resource(Employees, '/employees') # Route_1
api.add_resource(Employees_Name, '/employees/<employee_id>') # Route_3

if __name__ == '__main__':
     app.run(port=5002)