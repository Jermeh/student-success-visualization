window.onload = makeInitialGraphs()

function makeInitialGraphs(){
    getGraphAvgFinalInternet();
    getGraphGradesAndHealth();
    getGraphTravelTime();
}



/******************
 * 
 *      Graph Building Functions
 *      comprised of pairs
 * 
 *      1) Function triggered on button click event
 *              -sends http request
 *      2) Callback function for http request
 *              -inserts graph into DOM
 */

function getGraphAvgFinalInternet(){
    getData({
        G3: {
            condition: false,
        },
        internet: {
            condition: false,
        },
        callback: buildGraphAvgFinalInternet
    });
    cleanLabels();
}
function buildGraphAvgFinalInternet(data){
    data = data.data;
    let averages = getFinalAveragesInternet(data);

    let chartData = [{
        values: [averages[0] / 20, (1 - (averages[0] / 20))],
        domain: {column: 0},
        text: averages[0] + "/" + 20,
        textinfo: 'none',
        name: 'With Internet',
        hoverinfo: 'percent+name',
        hole: .7,
        type: 'pie',
        marker: {
            colors: ['#67e580', '#cecece']
        }
    },{
        values: [averages[1] / 20, (1- (averages[1] / 20))],
        domain: {column: 1},
        text: averages[1] + "/" + 20,
        textinfo: 'none',
        name: "Without Internet",
        hoverinfo: 'percent+name',
        hole: .7,
        type: 'pie',
        marker: {
            colors: ['#e76d62', '#cecece']
        },
        rotation: 169
    }];

    let layout = {
        height: 400,
        width: 650,
        showlegend: false,
        title: 'Final Grade Based On Internet Access',
        grid: {rows: 1, columns: 2},
        annotations: [
            {
                font: {size: 20},
                text: (Math.round(averages[0] * 100) / 100) + "/" + 20,
                x: .14,
                y: .5,
                showarrow: false
            },
            {
                font: {size: 20},
                text: (Math.round(averages[1] * 100) / 100) + "/" + 20,
                x: .85,
                y: .5,
                showarrow: false
            }
        ]
    };

    Plotly.newPlot('average-final', chartData, layout);

    let parentContainer = document.getElementById('average-final');
    if(!document.getElementById('chartLabel')){
        labelTextWith = document.createElement('p');
        labelTextWith.setAttribute('class', 'chartLabel');
        labelTextWith.setAttribute('style', 'position: absolute; left: 610px; top: 350px;');
        labelTextWith.innerHTML = "With Internet";
        labelTextWithout = document.createElement('p');
        labelTextWithout.setAttribute('class', 'chartLabel')
        labelTextWithout.setAttribute('style', 'position: absolute; left: 860px; top: 350px;');
        labelTextWithout.innerHTML = "Without Internet";
        parentContainer.appendChild(labelTextWith);
        parentContainer.appendChild(labelTextWithout);
    }
    //console.log(document.getElementById('chart-label'))
    setFinalGradeButtonStyles(document.getElementById('avg-final-internet'));
}

function getGraphAvgFinalPastFail(){
    getData({
        G3: {
            condition: false,
        },
        failures: {
            condition: false
        },
        callback: buildGraphAvgFinalPastFail
    })
    cleanLabels();
}

function buildGraphAvgFinalPastFail(data){
    data = data.data;
    let averages = getFinalAveragesPastFail(data);

    let trace = {
        x: ['0', '1', '2', '3 or more'],
        y: averages,
        type: 'bar',
    };
    let chartData = [trace]

    let layout = {
        height: 400,
        width: 650,
        showlegend: false,
        title: 'Final Grade vs Past Absences',
        xaxis: {
            title: 'Number of past failures',
            type: 'category',
        },
        yaxis: {
            title: 'Average final grade',
            autorange: 'false',
            range: [0,14]
        }
    }

    Plotly.newPlot('average-final', chartData, layout);
    setFinalGradeButtonStyles(document.getElementById('avg-final-pastfail'))
}

function getGraphAvgFinalStudyTime(){
    getData({
        G3: {
            condition: false
        },
        studytime: {
            condition: false
        },
        callback: buildGraphAvgFinalStudyTime
    })
    cleanLabels();
}

function buildGraphAvgFinalStudyTime(data){
    setFinalGradeButtonStyles(document.getElementById('avg-final-studytime'));
    data = data.data;

    let averages = getFinalAveragesStudyTime(data);

    let trace = {
        x: ['1 (<2 Hours)', '2 (2-5 Hours)', '3 (5-10 Hours)', '4 (>10 Hours)'],
        y: averages,
        type: 'bar',
    }

    let chartData = [trace];

    let layout = {
        height: 400,
        width: 650,
        showlegend: false,
        title: 'Final Grade vs Study Time',
        xaxis: {
            title: 'Study time',
            type: 'category',
        },
        yaxis: {
            title: 'Average final grade',
            autorange: 'false',
            range: [0,14]
        }
    }

    Plotly.newPlot('average-final', chartData, layout);
}

function getGraphAvgFinalAbsences(){
    getData({
        G3: {
            condition: false
        },
        absences: {
            condition: false
        },
        callback: buildGraphAvgFinalAbsences
    })
    cleanLabels();
}

function buildGraphAvgFinalAbsences(data){
    setFinalGradeButtonStyles(document.getElementById('avg-final-absences'));
    data = data.data;
    let averages = getFinalAveragesAbsences(data);
    let traceData = {
        x: [],
        y: [],
        counts: []
    };
    for (let i = 0; i < averages.sums.length; i++){
        if(averages.counts[i] != 0){
            traceData.x.push(i);
            traceData.y.push(averages.averages[i]);
            traceData.counts.push("n = " + averages.counts[i]);
        }
    }
    let trace = {
        x: traceData.x,
        y: traceData.y,
        type: 'scatter',
        mode: 'markers',
        text: [traceData.counts],
    };

    let chartData = [trace];
    let layout = {
        height: 400,
        width: 650,
        showlegend: false,
        title: 'Final Grade vs Absences',
        xaxis: {
            title: 'Absences',
        },
        yaxis: {
            title: 'Average final grade',
            autorange: 'false',
            range: [0,14]
        },

    };

    Plotly.newPlot('average-final', chartData, layout);
}

function getGraphGradesAndHealth(){
    getData({
        G1: {
            condition: false
        },
        G2: {
            condition: false
        },
        G3: {
            condition: false
        },
        health: {
            condition: false
        },
        callback: buildGraphGradesAndHealth
    })
}

function buildGraphGradesAndHealth(data){
    data = data.data;
    let averages = getGradeAveragesHealth(data);

    let healthScale = [1,2,3,4,5]
    let trace1 = {
        x: healthScale,
        y: averages.G1.averages,
        name: 'Average G1',
        type: 'bar'
    },
    trace2 = {
        x: healthScale,
        y: averages.G2.averages,
        name: 'Average G2',
        type: 'bar'
    },
    trace3 = {
        x: healthScale,
        y: averages.G3.averages,
        name: 'Average G3',
        type: 'bar'
    };

    let chartData = [trace1, trace2, trace3];
    let layout = {
        barmode: 'group',
        height: 600,
        width: 1000,
        showlegend: true,
        title: 'Average Grades Based on Health',
        xaxis: {
            title: 'Health Rating (1-5)',
        },
        yaxis: {
            title: 'Average Grade',
            autorange: 'false',
            range: [0,14]
        }
    }

    Plotly.newPlot('health-graph', chartData, layout);
}

function getGraphTravelTime(){
    getData({
        traveltime: {
            condition: false,
        },
        G1:{
            condition: false,
        },
        G2: {
            condition: false,
        },
        G3: {
            condition: false,
        },
        callback: buildGraphTravelTime
    });
}

function buildGraphTravelTime(data){
    data = data.data;
    let averages = getGradeAveragesTravel(data);
    let G1 = averages.G1.averages;
    let G2 = averages.G2.averages;
    let G3 = averages.G3.averages;
    
    let trace1 = {
        x: ['1 (<15 min)', '2 (15-30 min)', '3 (30 min to 1 hour)', '4 (>1 hour)'],
        y: G1,
        type: 'bar',
        name: 'G1',
        text: G1.map((num) => {return Math.round(num * 100) / 100}),
        textposition: 'auto',
        hoverinfo: 'none'
    }

    let trace2 = {
        x: ['1 (<15 min)', '2 (15-30 min)', '3 (30 min to 1 hour)', '4 (>1 hour)'],
        y: G2,
        type: 'bar',
        name: 'G2',
        text: G2.map((num) => {return Math.round(num * 100) / 100}),
        textposition: 'auto',
        hoverinfo: 'none'
    }

    let trace3 = {
        x: ['1 (<15 min)', '2 (15-30 min)', '3 (30 min to 1 hour)', '4 (>1 hour)'],
        y: G3,
        type: 'bar',
        name: 'G3',
        text: G3.map((num) => {return Math.round(num * 100) / 100}),
        textposition: 'auto',
        hoverinfo: 'none'
    }

    let chartData = [trace1, trace2, trace3];

    let layout = {
        height: 500,
        width: 1000,
        showlegend: true,
        title: 'Overall Grades vs Travel Time',
        xaxis: {
            title: 'Travel time',
            type: 'category',
        },
        yaxis: {
            title: 'Average grades',
            autorange: 'false',
            range: [0,40]
        },
        barmode: 'stack'
    }

    Plotly.newPlot('travel-graph', chartData, layout);
}

/****************
*     Average Calculations
*****************/

function getFinalAveragesInternet(data){
    let sumWithInternet = 0,
     sumWithoutInternet = 0,
     countWithInternet = 0,
     countWithoutInternet = 0;

    for(let i = 0; i < data.length; i++){
        student = data[i];
        if(student.internet == "yes"){
            sumWithInternet += student.G3;
            countWithInternet++;
        }
        else if(student.internet == "no"){
            sumWithoutInternet += student.G3;
            countWithoutInternet++;
        }
    }

    let avgWithInternet = sumWithInternet/countWithInternet;
    let avgWithoutInternet = sumWithoutInternet/countWithoutInternet;
    return [avgWithInternet, avgWithoutInternet];
}

function getFinalAveragesPastFail(data){
    let sums = [0, 0, 0, 0];
    let counts = [0, 0, 0, 0];

    for(let i = 0; i < data.length; i++){
        let student = data[i];
        sums[student.failures] += student.G3;
        counts[student.failures]++;
    }

    let averages = [0,0,0,0];
    for(let i = 0; i < 4; i++){
        averages[i] = sums[i]/counts[i]
    }
    return averages;
}

function getFinalAveragesStudyTime(data){
    let sums = [0, 0, 0, 0];
    let counts = [0, 0, 0, 0];

    for(let i = 0; i < data.length; i++){
        let student = data[i];
        sums[student.studytime - 1] += student.G3;
        counts[student.studytime - 1]++;
    }

    let averages = [0,0,0,0];
    for(let i = 0; i < 4; i++){
        averages[i] = sums[i]/counts[i]
    }
    return averages;

}

function getFinalAveragesAbsences(data){
    let sums = new Array(94).fill(0);
    let counts = new Array(94).fill(0);

    for(let i = 0; i < data.length; i++){
        sums[data[i].absences] += data[i].G3;
        counts[data[i].absences]++;
    }

    let averages = new Array(94).fill(0);
    for(let i = 0; i < sums.length; i++){
        averages[i] = sums[i]/counts[i];
    }

    return {
        sums: sums,
        counts: counts,
        averages: averages
    };
}

function getGradeAveragesHealth(data){
    let result = {
        G1: {
            sums: new Array(5).fill(0),
            counts: new Array(5).fill(0),
            averages: new Array(5).fill(0),
        },
        G2: {
            sums: new Array(5).fill(0),
            counts: new Array(5).fill(0),
            averages: new Array(5).fill(0),
        },
        G3: {
            sums: new Array(5).fill(0),
            counts: new Array(5).fill(0),
            averages: new Array(5).fill(0),
        }
    }

    for(let i = 0; i < data.length; i++){
        result.G1.sums[data[i].health - 1]+= data[i].G1;
        result.G1.counts[data[i].health - 1]++;
        result.G2.sums[data[i].health - 1]+= data[i].G2;
        result.G2.counts[data[i].health - 1]++;
        result.G3.sums[data[i].health - 1]+= data[i].G3;
        result.G3.counts[data[i].health - 1]++;
    }

    for(let i = 0; i < 5; i++){
        result.G1.averages[i] = result.G1.sums[i]/result.G1.counts[i];
        result.G2.averages[i] = result.G2.sums[i]/result.G2.counts[i];
        result.G3.averages[i] = result.G3.sums[i]/result.G3.counts[i];
    }

    return result;
}

function getGradeAveragesTravel(data){
    let result = {
        G1: {
            sums: new Array(4).fill(0),
            counts: new Array(4).fill(0),
            averages: new Array(4).fill(0),
        },
        G2: {
            sums: new Array(4).fill(0),
            counts: new Array(4).fill(0),
            averages: new Array(4).fill(0),
        },
        G3: {
            sums: new Array(4).fill(0),
            counts: new Array(4).fill(0),
            averages: new Array(4).fill(0),
        }
    }

    for(let i = 0; i < data.length; i++){
        result.G1.sums[data[i].traveltime - 1]+= data[i].G1;
        result.G1.counts[data[i].traveltime - 1]++;
        result.G2.sums[data[i].traveltime - 1]+= data[i].G2;
        result.G2.counts[data[i].traveltime - 1]++;
        result.G3.sums[data[i].traveltime - 1]+= data[i].G3;
        result.G3.counts[data[i].traveltime - 1]++;
    }

    for(let i = 0; i < 5; i++){
        result.G1.averages[i] = result.G1.sums[i]/result.G1.counts[i];
        result.G2.averages[i] = result.G2.sums[i]/result.G2.counts[i];
        result.G3.averages[i] = result.G3.sums[i]/result.G3.counts[i];
    }

    return result;
}

/************************
 * 
 *      Style and DOM Changes
 */
function setFinalGradeButtonStyles(selection){
    let list = document.getElementById('avg-final-buttons');
    let listItems = list.children;
    for(let i= 0; i < listItems.length; i++){
        listItems[i].children[0].setAttribute("style", "background: #ffffff;");
    }

    selection.setAttribute("style", "background: #cecece;")
}

function cleanLabels(){
    let labels = document.getElementsByClassName('chartLabel');
    let parent = document.getElementById('average-final');
    for(let i = 0; i < labels.length; i++){
        parent.removeChild(labels.item(i));
        i--;
    }
}

//Build and dispatch http request
function getData(options){
    let baseURL = "http://127.0.0.1:5000/gmt?"
    let query = "query"

    if(options.school){
        query += "&school"
        if(options.school.condition) query += "=" + options.school.criteria;
    }
    if(options.sex){
        query += "&sex"
        if(options.sex.condition) query += "=" + options.sex.criteria;
    }
    if(options.age){
        query += "&age"
        if(options.age.condition) query += "=" + options.age.criteria;
    }
    if(options.address){
        query += "&address"
        if(options.address.condition) query += "=" + options.address.criteria;
    }
    if(options.famsize){
        query += "&famsize"
        if(options.famsize.condition) query += "=" + options.famsize.criteria;
    }
    if(options.Pstatus){
        query += "&Pstatus"
        if(options.Pstatus.condition) query += "=" + options.Pstatus.criteria;
    }
    if(options.Medu){
        query += "&Medu"
        if(options.Medu.condition) query += "=" + options.Medu.criteria;
    }
    if(options.Fedu){
        query += "&Fedu"
        if(options.Fedu.condition) query += "=" + options.Fedu.criteria;
    }
    if(options.Mjob){
        query += "&Mjob"
        if(options.Mjob.condition) query += "=" + options.Mjob.criteria;
    }
    if(options.Fjob){
        query += "&Fjob"
        if(options.Fjob.condition) query += "=" + options.Fjob.criteria;
    }
    if(options.reason){
        query += "&reason"
        if(options.reason.condition) query += "=" + options.reason.criteria;
    }
    if(options.guardian){
        query += "&guardian"
        if(options.guardian.condition) query += "=" + options.guardian.criteria;
    }
    if(options.traveltime){
        query += "&traveltime"
        if(options.traveltime.condition) query += "=" + options.traveltime.criteria;
    }
    if(options.studytime){
        query += "&studytime"
        if(options.studytime.condition) query += "=" + options.studytime.criteria;
    }
    if(options.failures){
        query += "&failures"
        if(options.failures.condition) query += "=" + options.failures.criteria;
    }
    if(options.schoolsup){
        query += "&schoolsup"
        if(options.schoolsup.condition) query += "=" + options.schoolsup.criteria;
    }
    if(options.famsup){
        query += "&famsup"
        if(options.famsup.condition) query += "=" + options.famsup.criteria;
    }
    if(options.paid){
        query += "&paid"
        if(options.paid.condition) query += "=" + options.paid.criteria;
    }
    if(options.activities){
        query += "&activities"
        if(options.activities.condition) query += "=" + options.activities.criteria;
    }
    if(options.nursery){
        query += "&nursery"
        if(options.nusery.condition) query += "=" + options.nusery.criteria;
    }
    if(options.higher){
        query += "&higher"
        if(options.higher.condition) query += "=" + options.higher.criteria;
    }
    if(options.internet){
        query += "&internet"
        if(options.internet.condition) query += "=" + options.internet.criteria;
    }
    if(options.romantic){
        query += "&romantic"
        if(options.romantic.condition) query += "=" + options.romantic.criteria;
    }
    if(options.famrel){
        query += "&famrel"
        if(options.famrel.condition) query += "=" + options.famrel.criteria;
    }
    if(options.freetime){
        query += "&freetime"
        if(options.freetime.condition) query += "=" + options.freetime.criteria;
    }
    if(options.goout){
        query += "&goout"
        if(options.goout.condition) query += "=" + options.goout.criteria;
    }
    if(options.Dalc){
        query += "&Dalc"
        if(options.Dalc.condition) query += "=" + options.Dalc.criteria;
    }
    if(options.Walc){
        query += "&Walc"
        if(options.Walc.condition) query += "=" + options.Walc.criteria;
    }
    if(options.health){
        query += "&health"
        if(options.health.condition) query += "=" + options.health.criteria;
    }
    if(options.absences){
        query += "&absences"
        if(options.absences.condition) query += "=" + options.absences.criteria;
    }
    if(options.G1){
        query += "&G1"
        if(options.G1.condition) query += "=" + options.G1.criteria;
    }
    if(options.G2){
        query += "&G2"
        if(options.G2.condition) query += "=" + options.G2.criteria;
    }
    if(options.G3){
        query += "&G3"
        if(options.G3.condition) query += "=" + options.G3.criteria;
    }

    let request = new XMLHttpRequest();
    request.open("GET", baseURL + query)
    request.send();
    request.onreadystatechange = function(){
    
        if(request.status == "200" && request.readyState == 4) {
            let responseData = request.response;
            let data_json = JSON.parse(responseData);
            options.callback(data_json);
        }  
    }  
} 
