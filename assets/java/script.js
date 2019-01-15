$(document).ready(function(){
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAzcIdiLkyoCScPSvtRIV5a1HZKaXV4UHk",
    authDomain: "trainscheduler-b2ac1.firebaseapp.com",
    databaseURL: "https://trainscheduler-b2ac1.firebaseio.com",
    projectId: "trainscheduler-b2ac1",
    storageBucket: "trainscheduler-b2ac1.appspot.com",
    messagingSenderId: "327951779385"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Saving inputs in variables after user submits
  $("#submitBtn").on("click", function(e){
      e.preventDefault();
      var trainName = $("#trainNameInput").val().trim();
      console.log("TRAIN NAME:" + trainName);
      var destination = $("#destinationInput").val().trim();
      var firstTrain = $("#firstTrainInput").val().trim();
      var frequency = $("#frequencyInput").val().trim();

      // Pushing variable info to database
      database.ref().push({
          trainData: trainName,
          destinationData: destination,
          firstTrainData: firstTrain,
          frequencyData: frequency,
      })

      // Showing real time data in database
      database.ref().on("child_added", function(childSnapshot){
          console.log(childSnapshot.val().trainData);
          console.log(childSnapshot.val().destinationData);
          console.log(childSnapshot.val().firstTrainData);
          console.log(childSnapshot.val().frequencyData);

      // Calculating Time
      var tFrequency = $("#frequencyInput").val().trim();
      console.log(tFrequency);

      // First Time
      var firstTime = "12:00";

      // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
      console.log(firstTimeConverted);
  
      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);
  
      // Time apart (remainder)
      var tRemainder = diffTime % tFrequency;
      console.log(tRemainder);
  
      // Minute Until Train
      var tMinutesTillTrain = tFrequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      // Appending database info into html table format
      $("#tableBody").append("<tr><td>" + childSnapshot.val().trainData + "</td><td>" + childSnapshot.val().destinationData + "</td><td>" + childSnapshot.val().frequencyData + "</td><td>" + nextTrain + "</td><td>"  + tMinutesTillTrain + "</td></tr>");

      })

  })
})

