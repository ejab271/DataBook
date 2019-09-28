$.get("https://prodapi.metweb.ie/observations/phoenix-park/today"

//for stock url
// $.get("http://feed2.conygre.com/API/StockFeed/GetStockPricesForSymbol/acn?HowManyValues=50"
,function(data,status,jqxhr){
var fullList= "";
var title = "";
//var theJsonObject = JSON.parse(data)
/*fullList += `<table style="width: 100%;">
              <tr> <th> Time</th> <th> Date</th> <th> Temperature </th>`;*/
var dataSet = [];
var dataAct = [];
var i =0;
//for weather
for(let {reportTime,date,temperature} of data)
{


fullList += `<tr>`;
fullList += `<td> ${reportTime} </td> <td> ${date} </td> <td> ${temperature} </td> `;
fullList += `</tr>`;
title = date;
dataSet[i] = reportTime ;
dataAct[i] = temperature;
i++;

}

//for stock
/*for(let {tradeTime,Price,CompanyName} of data)
{
// fullList += SymbolID + " - " + Symbol + " - " + CompanyName + "<br/>";

/* title = CompanyName;
dataSet[i] = tradeTime ;
dataAct[i] = Price;
i++;

}*/
var ctx = document.getElementById('myChart1').getContext('2d');
var chart = new Chart(ctx, {
// The type of chart we want to create
type: 'line',

// The data for our dataset
data: {
    labels: dataSet,
    datasets: [{
        label: title,
        //backgroundColor: 'rgb(0, 0, 255)',
        borderColor: 'rgb(0, 0, 255)',
        pointBackgroundColor:'black',
        data: dataAct
      
    }]
},

// Configuration options go here
options: {
  scales: {
    xAxes: [ {
        scaleLabel: {
        display: true,
        labelString: 'Time'
      }
      
    } ],
    yAxes: [ {
        scaleLabel: {
        display: true,
        labelString: 'Value'
      }
      
    } ]
  }
   
}
});
//fullList += `</table>`;
//$("#output2").append(fullList);
});