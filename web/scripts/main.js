var btn_press = document.getElementById("btn_press");
var btn_click = document.getElementById("btn_click");

/*btn audit function*/
function playAudio(btn,type) {
    /*play btn audit when press*/
    if(btn === "btn_press"){
        btn_press.play();

        /*work for btn click*/
    }else if (btn === "btn_click") {
        /*play btn audit when click*/
        btn_click.play();
        /*url transition*/
        if (type === "chapter") {
            window.location.replace("/level.html");
        } else if (type === "customize") {
            window.location.replace( "/customize.html");
        } else if (type === "quit") {
            window.location.replace("/index.html");
        } else if (type === "game"){
            window.location.replace("/game.html");
        } else if (type === "save"){
            var Id = window.sessionStorage.getItem("UserId");
            var MaxLevel = window.sessionStorage.getItem("UserLevel");
            UpdateUserLevel(Id,MaxLevel);
        }
    }
}

/*set up google login config*/
function start() {
    gapi.load('auth2', function() {
        auth2 = gapi.auth2.init({
            client_id: '988977465903-4kmoa98jvcbi98ool9runutkohh6u52h.apps.googleusercontent.com',
        });
    });
}



function signInCallback(authResult) {
    if (authResult['code']) {
        /*change button for login process sucessful*/
        document.getElementById("guestbtn").style.display="none";
        document.getElementById('signinButton').innerHTML = "Enter and Play";
        /* get user information and send it is url*/
        var profile = auth2.currentUser.get().getBasicProfile();

        /* store user info into storage*/
        window.sessionStorage.setItem("auth","1");
        window.sessionStorage.setItem("UserLevel","1");
        window.sessionStorage.setItem("UserId",profile.getId());
        window.sessionStorage.setItem("UserName",profile.getName());
        window.location.href = "game.html";
    } else {
        // There was an error.
    }
}


/*load json file for game setting change*/
function loadJsonData() {
    var dataFile = "./scripts/gameDataSet.json";
    /*loadData from json file*/
    if(window.sessionStorage.getItem("MyData") === null){
        loadData(dataFile);
    }
    /*Json data to storage*/
    function loadData(jsonFile) {
        $.getJSON(jsonFile, function (json) {
            window.sessionStorage.setItem("MyData", JSON.stringify(json));
        });
    }
}

/*create guest infomation and login transition*/
function guestLogin() {
    /* default case, auth = 0 for guest, and change to 1 to google player*/
    window.sessionStorage.setItem("auth","0");
    window.sessionStorage.setItem("UserLevel", "-1");
    window.sessionStorage.setItem("UserId", "Guest");
    window.sessionStorage.setItem("UserName", "Guest");
    window.location.href = "game.html";
}

/*google login access*/
function googleLogin() {
    auth2.grantOfflineAccess({'redirect_uri': 'postmessage'}).then(signInCallback);
}

/*initialize  firebase cofig*/
function initFirebase(){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAK0KZzE-3VD5Xur7lDx7d_ZZLCx4uBxsU",
        authDomain: "castledefend-build1.firebaseapp.com",
        databaseURL: "https://castledefend-build1.firebaseio.com",
        storageBucket: "castledefend-build1.appspot.com",
        messagingSenderId: "588744861663"
    };
    firebase.initializeApp(config);
}

/*update google user info*/
function updateUserInfo(){
    var auth = window.sessionStorage.getItem("auth");
    /*if google user update info and write it to DB*/
    if(auth == "1"){
        var id = window.sessionStorage.getItem("UserId");
        firebase.database().ref('user/' + id).once('value').then(function(snapshot) {
            var MaxLevel = snapshot.child("Level").val();
            if(MaxLevel == null){
                var userId = window.sessionStorage.getItem("UserId");
                var userName = window.sessionStorage.getItem("UserName");
                writeUserData(userId,userName,1);
            }else{
                window.sessionStorage.setItem("UserLevel",MaxLevel);
            }
        });
    }
}

/* read share cust level from firebase*/
function readShareLevel(){
    var query = firebase.database().ref("share").orderByKey();
    var cusName = "";
    query.once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                // key will be "ada" the first time and "alan" the second time
                var key = childSnapshot.key;
                cusName = cusName+key + ",";
                window.sessionStorage.setItem("cusName",cusName);
                //childData will be the actual contents of the child, and load cus level info to storage
                var Data = childSnapshot;
                var balance = Data.child("Balance").val();
                var map = Data.child("Map").val();
                var monster = Data.child("Monster").val();
                var content = JSON.stringify({Map : map, Monster: monster, Money : balance});
                window.localStorage.setItem(key,content);
            });
        });
}

/*write user info into DB for first time login player */
function writeUserData(userId, name, level) {
    firebase.database().ref('user/'+userId).set({ Name : name, Level : level});
}

/* set up user level for google login player*/
function UpdateUserLevel(){
    /* get user type from storage*/
    var auth = window.sessionStorage.getItem("auth");
    /*if google user login, set up user info to storage for control*/
    if(auth =="1"){
        var userId = window.sessionStorage.getItem("UserId");
        var level = window.sessionStorage.getItem("UserLevel");
        firebase.database().ref('user/'+userId).update({ Level : level});
    }
}
