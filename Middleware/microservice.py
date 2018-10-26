import os
from flask import Flask, request
from flask_cors import CORS
import dbconnector

app = Flask(__name__)
CORS(app)

#-----------------------------------
#  The following code is invoked when the path portion of the URL matches 
#         /rcube
#
#  Parameters are passed as a URL query:
#        /rcube?parm1=value1&parm2=value2
#
@app.route('/gmt')
def server():
    try:
        parm = {}
        for key in request.args:
            parm[key] = str(request.args[key])
        #print(parm)
        result = dbconnector.handleGet(parm)
        return str(result)
    except Exception as e:
        return e
    
    
#-----------------------------------
port = os.getenv('PORT', '5000')
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(port))
