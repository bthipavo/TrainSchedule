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

  	var tempData = {
  		name: trainName,
  		destination: destination,
  		initialTrainTime: firstTrainTime,
  		frequency: frequency
  	}

  	database.ref().push(tempData)
  })

  database.ref().on('child_added', function(childSnapshot, prevChildKey) {
  	console.log(childSnapshot.val())


  	var trainName = childSnapshot.val().name
  	var destination = childSnapshot.val().destination
  	var initialTrainTime = childSnapshot.val().initialTrainTime
  	var frequency = childSnapshot.val().frequency


  	console.log(trainName)
  	console.log(destination)
  	console.log(initialTrainTime)
  	console.log(frequency)

	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  initialTrainTime + "</td><td>" + frequency + "</td></tr>");

  })