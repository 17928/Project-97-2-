
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
user_name = localStorage.getItem('user_name');
room_name = localStorage.getItem('room_name');
function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0 
    });
    document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = " "; snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name']
                like = message_data['like'];
                name_with_tag = "<h4>" + name + "<img class = 'user_tick' src = 'https://www.freeiconspng.com/thumbs/checkmark-png/black-checkmark-png-4.png'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + "value=" + like + " onclick='updateLike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like :  " + like + "  </span></button><hr>";
                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
                //End Code
            }
        });
    });
}

getData();
function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}

function updateLike(message_id) {
        likes = document.getElementById(message_id).value;
        likes = Number(likes) + 1;
        firebase.database().ref(room_name).child(message_id).update({
            like: likes
        })
    }