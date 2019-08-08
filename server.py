import os
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from flask import jsonify
import requests
import morning
import Allowed_intents_in_Unstructured
import Check_for_capitalization
import Check_for_duplicates
import Check_for_missing_Keyword
import Check_for_capitalization
import Correctness_of_MAP_URL
import Correctness_of_Short_Ref_URL
import Date_in_YYYY_MM_DD_format
import Description_text_not_same
import Duplicate_in_Entity_Interactn
import Email_id_validity
import Exact_dates_available
import Exceeding_500_characters
import Latitude_Longitude
import Multiple_Spaces_in_txt
import No_content_in_brackets
import No_AcadEvents_in_Timing
import No_date_special_characters
import No_phone_url_in_voice
import No_preceeding_0_in_room_no
import No_Ref_URL_in_text
import No_sentence_in_virtual_entity
import No_sentence_in_voice_column
import No_timing_for_acad_events
import No_timings_values_in_txt
import Numbering_bullet_points
import Perfect_Excel_format
import Process_ID
import Special_Char_in_Entity_Name
import Start_date_less_than_end_date
import Start_time_less_than_end_time
import Summary
import Time_in_HH_MM_SS_format

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
    uploaded_files = request.files.getlist("file")
    for file in uploaded_files:
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            Allowed_intents_in_Unstructured.rule_unstructured()
            Check_for_capitalization.rule_capitalization()
            Check_for_duplicates.rule_duplicates()
            Check_for_missing_Keyword.rule_missing_keyword()
            Check_for_capitalization.rule_capitalization()
            Correctness_of_MAP_URL.rule_map_url()
            Correctness_of_Short_Ref_URL.short_ref_url()
            Date_in_YYYY_MM_DD_format.date_format()
            Description_text_not_same.description_text()
            Duplicate_in_Entity_Interactn.duplicate_entity_interaction
            Email_id_validity.email_id_validity()
            Exact_dates_available.exact_dates_available()
            Exceeding_500_characters.exceeding_500_characters()
            Latitude_Longitude.latitide_longitude()
            Multiple_Spaces_in_txt.multiple_spaces_in_txt()
            No_content_in_brackets.no_content_in_brackets()
            No_AcadEvents_in_Timing.no_acadEvents_in_timing()
            No_date_special_characters.No_date_special_characters()
            No_phone_url_in_voice.no_phone_url_in_voice()
            No_preceeding_0_in_room_no.no_preceeding_0_in_room_no()
            No_Ref_URL_in_text.no_ref_url_in_text()
            No_sentence_in_virtual_entity.no_sentence_in_virtual_entity()
            No_timing_for_acad_events.no_timing_for_acad_events()
            No_timings_values_in_txt.no_timings_values_in_txt()
            Numbering_bullet_points.numbering_bullet_points()
            Perfect_Excel_format.perfect_excel_format()
            Process_ID.process_id()
            Special_Char_in_Entity_Name.special_char_in_entity_name()
            Start_date_less_than_end_date.start_date_less_than_end_date()
            Start_time_less_than_end_time.start_time_less_than_end_time()
            Time_in_HH_MM_SS_format.time_in_hh_mm_ss_format()
            Summary.summary()
    return morning.morning_func()


@app.route('/downloadFIle', methods=['GET'])
def download_file():
    url = 'http://deeplearning.net/tutorial/deeplearning.pdf'
    r = requests.get(url)
    fileName = url.split('/')[-1]
    with open(fileName, 'wb') as out_file: 
        out_file.write(r.content)
        print('download complete')
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