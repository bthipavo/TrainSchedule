$(document).ready(function(){
    update();
    setInterval(update, 60000);
});
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC1MN7IcakRMEECZGf_Zp2RZb3QYfsmY28",
    authDomain: "trainschedule-f3383.firebaseapp.com",
    databaseURL: "https://trainschedule-f3383.firebaseio.com",
    projectId: "trainschedule-f3383",
    storageBucket: "trainschedule-f3383.appspot.com",
    messagingSenderId: "525025194575"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = ""
  var destination = ""
  var firstTrainTime = ""
  var frequency = ""

  $('#submit').on('click', function() {
  	event.preventDefault()

  	console.log($('#firstTrainTime').val())

  	trainName = $('#trainName').val().trim()
  	destination = $('#destination').val().trim()
  	firstTrainTime = $('#firstTrainTime').val()
	frequency = $('#frequency').val().trim()
	console.log("first train time " + firstTrainTime)

  	var tempData = {
  		name: trainName,
  		destination: destination,
  		initialTrainTime: firstTrainTime,
  		frequency: frequency
  	}

  	database.ref().push(tempData)
  })

function update() {
	$("#train-table > tbody").html("")
	database.ref().on('child_added', function(childSnapshot, prevChildKey) {
		console.log(childSnapshot.val())


		var trainName = childSnapshot.val().name
		var destination = childSnapshot.val().destination
		var TrainTime = childSnapshot.val().initialTrainTime
		var frequency = childSnapshot.val().frequency

		var currentTime = moment()
		console.log(currentTime)

		var initialTrainTime = moment(TrainTime, "hh:mm").subtract('1, years')
		var trainDifference = currentTime.diff(initialTrainTime, "minutes")
		var nextTrain = Math.abs(trainDifference % frequency)
		var nextTrainMinutes = parseInt(frequency) - nextTrain
		var nextTrainTime = currentTime.add(nextTrainMinutes, "minutes").format("hh:mm a")

		console.log(trainName)
		console.log(destination)
		console.log("train time snap " + TrainTime)
		console.log("next train time " + initialTrainTime.format('LT'))
		console.log("difference " + trainDifference)
		console.log(trainDifference/frequency)
		console.log(nextTrain)
		console.log("next Train minutes " +  nextTrainMinutes)
		// console.log("next train time " + currentTime - nextTrain)
		console.log(frequency)
		
		$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
		initialTrainTime.format("hh:mm a") + "</td><td>" + frequency + " minutes" + "</td><td>" + nextTrainTime + "</td><td>" +
		nextTrainMinutes + "</td></tr>");
	})
}