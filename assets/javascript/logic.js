var name, frequncy, startTime, destination;
var tr = document.createElement("tr");
var td = document.createElement("td");
var error = false;



//Initialize Firebase

var config = {
    apiKey: "AIzaSyCwKmfHozfji4pQ7GvADrIyLs_DWONKkpo",
    authDomain: "trainproblem-ba82e.firebaseapp.com",
    databaseURL: "https://trainproblem-ba82e.firebaseio.com",
    projectId: "trainproblem-ba82e",
    storageBucket: "",
    messagingSenderId: "96443606087"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#addTrainBtn").on("click", function(){
   
    name = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    startTime = $("#startInput").val().trim();
    if(!moment(startTime, "HH:mm", true).isValid()){
        error = true
    }
    frequncy = $("#frequencyInput").val().trim();
    var newTrain = {
        trainName: name,
        trainDestination: destination,
        trainStartTime: startTime,
        trainFrequency: frequncy
    };
    if(error){
        alert("Sorry something was entered incorrectly, please check your inputs and try again");
    }
    else{
        database.ref("/Train").push(newTrain);
    }

});

database.ref("/Train").on("child_added", async function(snapshot){
    var info = snapshot.val().trainName;
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var txt = document.createTextNode(info);
    td.appendChild(txt);
    tr.appendChild(td);
    info = snapshot.val().trainDestination;
    var td = document.createElement("td");
    var txt = document.createTextNode(info);
    td.appendChild(txt);
    tr.appendChild(td);
    var dayStart = snapshot.val().trainStartTime;
    var dstart = await dayStart;
    var td = document.createElement("td");
    var txt = document.createTextNode(dayStart);
    td.appendChild(txt);
    tr.appendChild(td);
    tFrequency = snapshot.val().trainFrequency;
    var td = document.createElement("td");
    var txt = document.createTextNode(tFrequency);
    td.appendChild(txt);
    tr.appendChild(td);
    
    console.log("this is when the day starts: " + dstart);
    var currentTime = moment();
    var difference = moment().diff(moment(dstart), "minutes");
    console.log(difference);
    
    td.appendChild(txt);
    tr.appendChild(td);
    // Time apart (remainder)
    var tRemainder = difference % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    var td = document.createElement("td");
    var txt = document.createTextNode(tMinutesTillTrain);
    td.appendChild(txt);
    tr.appendChild(td);
    $("#trainTable").append(tr);
   
});
