$.get("https://prodapi.metweb.ie/monthly-data/Shannon%20Airport", function (data, status, jqxhr) {
  var fullList = "";
  var title = "";
  //var rainfall = data.total_rainfall.report;
  var year = "";
  var rainfall = data.mean_temperature.report;
  //var theJsonObject = JSON.parse(data)
  fullList += "<select id='theDL'>";
  var dataSet = [];
  var dataAct = [];
  for (const key of Object.keys(rainfall)) {
    fullList += `<option class="dropdown-item" id="theDL" value='${key}'> ${key}  </option>`;
    
  }
  fullList += "</select>"



  $("#resultsss").append(fullList);
});

$("#generateyear").click(function () {

  var theAPIAddress = `https://prodapi.metweb.ie/monthly-data/Shannon%20Airport`;

  $.get(theAPIAddress, function (data, status, jqxhr) {
    var symbolToGet = $("#theDL").val();
    var year = (symbolToGet);
    var rainfall = data.mean_temperature.report;
    var dataSet = [];
    var dataVal = [];
    var fullList = symbolToGet + " Temperature"

    for (const key of Object.keys(rainfall[year])) {

      dataSet.push(key);
      // console.log(JSON.stringify(key));
      dataVal.push(rainfall[year][key]);

    }

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: dataSet,
        datasets: [{
          label: fullList,
          //backgroundColor: 'rgb(0, 0, 255)',
          borderColor: 'rgb(0, 0, 255)',
          pointBackgroundColor: 'black',
          data: dataVal

        }]
      },

      // Configuration options go here
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Month'
            }

          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: '℃'
            }

          }]
        }
      }
    });
  })
});



//

$.get("https://prodapi.metweb.ie/observations/phoenix-park/today", function (data, status, jqxhr) {
  var title = "";
  var dataSet = []; // array for the Time
  var dataAct = []; // array for the Temperature
  var i = 0; // Used to go through the array
  
  //filling the arrays with the values from the API
  for (let {
      reportTime,
      date,
      temperature
    } of data) {

    title = date;
    dataSet.push(reportTime);
    dataAct.push(temperature);
    
  }

//Creation of the Chart for Weather
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
        pointBackgroundColor: 'black',
        data: dataAct

      }]
    },

    // Configuration options go here
    options: {
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Time/hr'
          }

        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: '℃'
          }

        }]
      }

    }
  });

});


$.get("http://feed2.conygre.com/API/StockFeed/GetSymbolList", function (data, status, jqxhr) {
  var checkBoxList = "";
  var ddl = "<select id='theDDL' multiple class='form-control' data-style='btn-primary'>";
  //ddl+='<option value=353>Ireland</option>' //this was a sanity check!
  for (let {
      Symbol,
      CompanyName
    } of data) // for each {object} in the data
  {
    ddl += `<option class="dropdown-item " id="theDDL" value='${Symbol}'> ${CompanyName} </option>`;
  }
  ddl += "</select>";
  $("#ddlcontainer").append(ddl);
}); //end of the get, aka ajax call
//end button click
//------------------------------------------------------------------------------
//$("#cmdgetstockvalues").click(function(){ ... }); //this is the button code before it gets filled
//flip, I'd forgotten the # sign above.  Not a good sign for a musician... :-(

$("#cmdgetstockvalues").click(function () {
  var symbolToGet = $("#theDDL").val();
  var numberOfValuesToGet = $("#txtnumberofvalues").val();
  var theAPIAddress = `http://feed2.conygre.com/API/StockFeed/` +
    `GetStockPricesForSymbol/${symbolToGet}?HowManyValues=${numberOfValuesToGet}`;
  var dataSet = [];
  var dataVal = [];
  var fullList = "";
  $.get(theAPIAddress, function (data, status, jqxhr) {
    //$("#resultsdiv").append(symbolToGet + "<br/>");
    $("#stockTitle").html("");
    $("#results").html("");
    $("#stockTitle").append(numberOfValuesToGet + " Results for <br/>");
    $("#stockTitle").append(data[0].CompanyName + "<br/>"); //sanity check

    var intNumberOfValuesToGet = parseInt(numberOfValuesToGet);
  
    var thetable = "<table id='thetable' class='table table-bordered' id='dataTable' width='100%' cellspacing='0' border=1>";
    thetable += "<thead><tr><th>Item</th><th>Time</th><th>Price</th></tr></thead>";
    thetable += "<tbody>";
    for (var i = 0; i < intNumberOfValuesToGet; i++) {
      fullList = data[i].CompanyName;
      thetable += `<tr><td>${i +1}</td><td>${data[i].tradeTime}</td><td>${data[i].Price}</td></tr>`;
      dataSet[i] = data[i].tradeTime;
      dataVal[i] = data[i].Price
    }
    thetable += "</tbody></table>";
    $("#results").append(thetable);
    var ctx = document.getElementById('myChart3').getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: dataSet,
        datasets: [{
          label: fullList,
          //backgroundColor: 'rgb(0, 0, 255)',
          borderColor: 'rgb(0, 0, 255)',
          pointBackgroundColor: 'black',
          data: dataVal

        }]
      },

      // Configuration options go here
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Time/s'
            }

          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Value €'
            }

          }]
        }
      }
    });
  })
});
//Products
$.get("http://127.0.0.1:3000/products", function (data, status, jqxhr) {
  var fullList = "";
  var dataSet = [];
  var dataVal = [];
  var i = 0;
  fullList += `<table id='thetable' class='table table-bordered' id='dataTable' width='100%' cellspacing='0' border=1>
              <thead><tr> <th> ProductID </th> <th> Product Name</th> <th> Price </th></tr></thead><tbody>`;
  for (let {
      ProductID,
      ProductName,
      UnitPrice

    } of data) {
    // fullList += SymbolID + " - " + Symbol + " - " + CompanyName + "<br/>";
    fullList += `<tr>`;
    fullList += `<form>`;
    fullList += `<td id ="theID" > ${ProductID} </td> <td id ="theName"> ${ProductName} </td> <td id ="thePrice"> ${UnitPrice} </td> `
    fullList += ` </tr>`;
    dataSet[i] = ProductName;
    dataVal[i] = UnitPrice;
    i++;
  }
  fullList += `</tbody><tfoot><tr> <th> ProductID </th> <th> Product Name</th> <th> Price </th>  </tr></tfoot></table>`;
  $("#output2").append(fullList);
  $("#thetable").DataTable();

  
});
//Order List
$.get("http://127.0.0.1:3000/orderlist", function (data, status, jqxhr) {
  var fullList = "";
  var dataSet = [];
  var dataVal = [];
  var i = 0;
  fullList += `<table id='thetable' class='table table-bordered' id='dataTable' width='100%' cellspacing='0' border=1>
              <thead><tr> <th> Email </th> </tr><tbody>`;
  for (let {
      email
   

    } of data) {
    // fullList += SymbolID + " - " + Symbol + " - " + CompanyName + "<br/>";
    fullList += `<tr>`;
    fullList += `<td id ="theID" > ${email} </td> `
    fullList += ` </td> </tr>`;
 
  }
  fullList += `</tbody><tfoot><tr> <th> Email </th>  </tr></tfoot></table>`;
  $("#order").append(fullList);
  $("#thetable").DataTable();

  
});

$.get("http://127.0.0.1:3000/employees", function (data, status, jqxhr) {
  var fullList = "";
  var dataSet = [];
  var dataVal = [];
  var i = 0;
  for (let {
      EmployeeID,
      FirstName,
      LastName,
      Title,
      Notes

    } of data) {
    // fullList += SymbolID + " - " + Symbol + " - " + CompanyName + "<br/>";
    fullList += `<div class="card mb-3 " style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title "> ${FirstName} ${LastName}</h5>
                <h5 class="card-title ">${Title}</h5>`;
    fullList += `<h6> Employee ID: ${EmployeeID} </h6> <p> ${Notes} </p> `;
    fullList += `</div></div>`;

  }

  $("#output3").append(fullList);
});

