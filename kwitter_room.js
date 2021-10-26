
const firebaseConfig = {
  apiKey: "AIzaSyAf4eoeG5Kjub9BpyVhjGPM05hpXM9A0VQ",
  authDomain: "project-97-ca4e3.firebaseapp.com",
  databaseURL: "https://project-97-ca4e3-default-rtdb.firebaseio.com",
  projectId: "project-97-ca4e3",
  storageBucket: "project-97-ca4e3.appspot.com",
  messagingSenderId: "754503468102",
  appId: "1:754503468102:web:29fb0b7ff81ea66a6f3647"
};

firebase.initializeApp(firebaseConfig);
document.getElementById("user_name").innerHTML = "Welcome " + localStorage.getItem("user_name") + "!";

function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function getData()
{
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            //Start code
            console.log("room Name = " + Room_names);
            row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;
            //End code
        });
    });
}
getData();

function logout()
{
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}

function addRoom()
{
    room_name = document.getElementById("add_room").value;
    firebase.database().ref("/").child(room_name).update({
        purpose : "adding room name"
    });
    localStorage.setItem("room_name", room_name);
    window.location = "kwitter_page.html";
}