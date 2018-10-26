import mysql.connector
import json


def handleGet(parm={}):
    httpResponse = {}
    if(not("query" in parm)):
        httpResponse["error"] = "invalid request"
    else:
        httpResponse["result"] = ""
        query = buildQuery(parm)
        #cursor = getCursor()
        database = mysql.connector.connect(
            host="localhost",
            user="user",
            password="password",
            database="gmt"
            )   
        cursor = database.cursor()
        cursor.execute(query)

        row_headers=[x[0] for x in cursor.description]
        rv = cursor.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))
        httpResponse = "{\"data\": " + json.dumps(json_data) + "}"             
        
    return httpResponse





def getCursor():
    database = mysql.connector.connect(
        host="localhost",
        user="user",
        password="password",
        database="gmt"
        )   
    cursor = database.cursor()
    return cursor

def buildQuery(parm):
    print(parm)
    query = "SELECT "
    queryPostfix = "FROM Students"
    conditions = " WHERE "

    if("school" in parm):
        query += "school, "
        if(len(parm['school']) > 0):
            conditions += ("school=\'" + parm['school'] + "\' AND ")
    if("sex" in parm):
        query += "sex, "
        if(len(parm['sex']) > 0):
            conditions += ("sex=\'" + parm['sex'] + "\' AND ")
    if("age" in parm):
        query += "age, "
        if(len(parm['age']) > 0):
            conditions += ("age=" + parm['age'] + " AND ")
    if("address" in parm):
        query += "address, "
        if(len(parm['address']) > 0):
            conditions += ("address=\'" + parm['address'] + "\' AND ")
    if("famsize" in parm):
        query += "famsize, "
        if(len(parm['famsize']) > 0):
            conditions += ("famsize=\'" + parm['famsize'] + "\' AND ")
    if("Pstatus" in parm):
        query += "Pstatus, "
        if(len(parm['Pstatus']) > 0):
            conditions += ("Pstatus=\'" + parm['Pstatus'] + "\' AND ")
    if("Medu" in parm):
        query += "Medu, "
        if(len(parm['Medu']) > 0):
            conditions += ("Medu=" + parm['Medu'] + " AND ")
    if("Fedu" in parm):
        query += "Fedu, "
        if(len(parm['Fedu']) > 0):
            conditions += ("Fedu=" + parm['Fedu'] + " AND ")
    if("Mjob" in parm):
        query += "Mjob, "
        if(len(parm['Mjob']) > 0):
            conditions += ("Mjob=\'" + parm['Mjob'] + "\' AND ")
    if("Fjob" in parm):
        query += "Fjob, "
        if(len(parm['Fjob']) > 0):
            conditions += ("Fjob=\'" + parm['Fjob'] + "\' AND ")
    if("reason" in parm):
        query += "reason, "
        if(len(parm['reason']) > 0):
            conditions += ("reason=\'" + parm['reason'] + "\' AND ")
    if("guardian" in parm):
        query += "guardian, "
        if(len(parm['guardian']) > 0):
            conditions += ("guardian=\'" + parm['guardian'] + "\' AND ")
    if("traveltime" in parm):
        query += "traveltime, "
        if(len(parm['traveltime']) > 0):
            conditions += ("traveltime=" + parm['traveltime'] + " AND ")
    if("studytime" in parm):
        query += "studytime, "
        if(len(parm['studytime']) > 0):
            conditions += ("studytime=" + parm['studytime'] + " AND ")
    if("failures" in parm):
        query += "failures, "
        if(len(parm['failures']) > 0):
            conditions += ("failures=" + parm['failures'] + " AND ")
    if("schoolsup" in parm):
        query += "schoolsup, "
        if(len(parm['schoolsup']) > 0):
            conditions += ("schoolsup=\'" + parm['schoolsup'] + "\' AND ")
    if("famsup" in parm):
        query += "famsup, "
        if(len(parm['famsup']) > 0):
            conditions += ("famsup=\'" + parm['famsup'] + "\' AND ")
    if("paid" in parm):
        query += "paid, "
        if(len(parm['paid']) > 0):
            conditions += ("paid=\'" + parm['paid'] + "\' AND ")
    if("activities" in parm):
        query += "activities, "
        if(len(parm['activities']) > 0):
            conditions += ("activities=\'" + parm['activities'] + "\' AND ")
    if("nursery" in parm):
        query += "nursery, "
        if(len(parm['nursery']) > 0):
            conditions += ("nursery=\'" + parm['nursery'] + "\' AND ")
    if("higher" in parm):
        query += "higher, "
        if(len(parm['higher']) > 0):
            conditions += ("higher=\'" + parm['higher'] + "\' AND ")
    if("internet" in parm):
        query += "internet, "
        if(len(parm['internet']) > 0):
            conditions += ("internet=\'" + parm['internet'] + "\' AND ")
    if("romantic" in parm):
        query += "romantic, "
        if(len(parm['romantic']) > 0):
            conditions += ("romantic=\'" + parm['romantic'] + "\' AND ")
    if("famrel" in parm):
        query += "famrel, "
        if(len(parm['famrel']) > 0):
            conditions += ("famrel=" + parm['famrel'] + " AND ")
    if("freetime" in parm):
        query += "freetime, "
        if(len(parm['freetime']) > 0):
            conditions += ("freetime=" + parm['freetime'] + " AND ")
    if("goout" in parm):
        query += "goout, "
        if(len(parm['goout']) > 0):
            conditions += ("goout=" + parm['goout'] + " AND ")
    if("Dalc" in parm):
        query += "Dalc, "
        if(len(parm['Dalc']) > 0):
            conditions += ("Dalc=" + parm['Dalc'] + " AND ")
    if("Walc" in parm):
        query += "Walc, "
        if(len(parm['Walc']) > 0):
            conditions += ("Walc=" + parm['Walc'] + " AND ")
    if("health" in parm):
        query += "health, "
        if(len(parm['health']) > 0):
            conditions += ("health=" + parm['health'] + " AND ")
    if("absences" in parm):
        query += "absences, "
        if(len(parm['absences']) > 0):
            conditions += ("absences=" + parm['absences'] + " AND ")
    if("G1" in parm):
        query += "G1, "
        if(len(parm['G1']) > 0):
            conditions += ("G1=" + parm['G1'] + " AND ")
    if("G2" in parm):
        query += "G2, "
        if(len(parm['G2']) > 0):
            conditions += ("G2=" + parm['G2'] + " AND ")
    if("G3" in parm):
        query += "G3, "
        if(len(parm['G3']) > 0):
            conditions += ("=" + parm['G3'] + " AND ")

    query = query.rpartition(",")[0]
    query += " " + queryPostfix
    if(len(conditions) > 7):
         query += conditions.rpartition(' AND')[0] + ';'
    print(query)

    return query
