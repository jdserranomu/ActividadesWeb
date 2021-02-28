const url = "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";


const table = document.getElementById("main-table");

const tableCorrelation = document.getElementById("correlation-table");

fetch(url).then(res=>res.json()).then(handleResponse);


function handleResponse(eventsList){
    let eventsInfo = {};
    eventsList.forEach((element,i) => {

        let row = document.createElement("tr")
        let col = document.createElement("th");
        col.textContent = i+1;
        row.appendChild(col);
        Object.values(element).forEach((val)=>{
            col = document.createElement("th");
            col.textContent = val;
            row.appendChild(col);
            
        });
        if(element.squirrel){
            row.style.backgroundColor = "#FFBFCB";
        }
        table.appendChild(row);

        let eventsInList = element.events;
        eventsInList.forEach(event => {
            if(eventsInfo[event]==undefined){
                let eventInfo = {};
                eventInfo["event"]=event
                eventInfo.TP = eventsList.filter(el=>el.events.includes(event) && el.squirrel).length;
                eventInfo.FP = eventsList.filter(el=>!el.events.includes(event) && el.squirrel).length;
                eventInfo.TN = eventsList.filter(el=>!el.events.includes(event) && !el.squirrel).length;
                eventInfo.FN = eventsList.filter(el=>el.events.includes(event) && !el.squirrel).length;
                eventInfo.MCC = (eventInfo.TP*eventInfo.TN-eventInfo.FP*eventInfo.FN)/(Math.sqrt((eventInfo.TP+eventInfo.FP)*(eventInfo.TP+eventInfo.FN)*(eventInfo.TN+eventInfo.FP)*(eventInfo.TN+eventInfo.FN)));
                eventsInfo[event] = eventInfo;
            }
        });
    });
    eventsInfo = Object.values(eventsInfo)
    eventsInfo.sort((a,b)=>b.MCC-a.MCC);
    eventsInfo.forEach((element, i)=>{
        let row = document.createElement("tr")
        let col = document.createElement("th");
        col.textContent = i+1;
        row.appendChild(col);
        col = document.createElement("th");
        col.textContent = element.event;
        row.appendChild(col);
        table.appendChild(row);
        col = document.createElement("th");
        col.textContent = element.MCC;
        row.appendChild(col);
        tableCorrelation.appendChild(row);
    });
}
