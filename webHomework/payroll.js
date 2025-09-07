/*
    Payroll program created by spubbyborp
    Fall 2020, Web Programming
    GSU
*/ 
//table to be displayed
var table = "<tr><th> Employee # </th> <th> Hours </th> <th> Pay </th></tr>";
//employee count
var count = 1;
function add(){

    //caluculated pay
    var pay;
    var minWage = 15.0;
    var overtimeWage = minWage * 1.5;
    //maximum hours to work before overtime
    var maxMinHours = 40;
    
    //prompt for employee hours
    var hours = prompt("Please enter the amount of hours \n Type in -1 to stop and see results, \n or if entered first, clear the table");   
    
    //if first entry is -1, clear table
    if(parseInt(hours) == -1){
        count = 1;      
        document.getElementById("table_id").innerHTML = "Cleared";
        table = "<tr><th> Employee # </th> <th> Hours </th> <th> Pay </th></tr>";   
        return;
    }

    //so long as the user does not enter -1
    for(var i = 1; parseInt(hours) != -1; i++){

        var intHours = parseInt(hours);
        //if employee worked over time
        if(intHours > maxMinHours){ 
            //calulate pay along with overtime wage
            var diff = intHours - maxMinHours;
            pay = maxMinHours*minWage + diff*overtimeWage;
        }else{
            //use normal wage for pay
            pay = intHours*minWage;
        }
        //add employee to table
        table += "<tr> <td>" + count + "</td> <td>" + intHours + "</td> <td>"+ pay + "</td> </tr>"; 
        //increase employee count
        count++;
        //give prompt user again
        hours = prompt("Please enter the amount of hours \n Type in -1 to stop and see results, \n or if entered first, clear the table");   
    }
    //display table
    document.getElementById("table_id").innerHTML = table;
}
