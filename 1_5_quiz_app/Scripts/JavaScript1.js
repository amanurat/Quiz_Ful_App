"use strict"
var twitter = {};
twitter.firstTimeLoadingPage = true;
twitter.tweets = [];
twitter.urlbase = "codercamps-uc";
twitter.friends = [
                //{ "url": "codercamps-uc2" }, //Me2
                //{ "url": "codercamps-mojo" },//joe
                //{ "url": "codercamps-csoler" }, //Christian
                //{ "url": "multiobjects" }, //Taryn
                //{ "url": "vejabi" },//Joshua
                //{ "url": "yolo360noscoped" },//Mondo
                //{ "url": "tweetscodercamps" },//Antonio
                //{ "url": "chirpster" },//Logan
                //{ "url": "chippel" },//Aaron
                //{ "url": "chirp101" },//Abraham
                //{ "url": "tersebird" },//Eric
                //{ "url": "crackling-fire-6742" }//Mike
];
twitter.mainCounter = 0;
twitter.profile = [];
twitter.profileOriginal = [{
    url: "codercamps-uc",
    name: "UC",
    image: "http://oi57.tinypic.com/29ojsl2.jpg",
    bio: " The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog",
}];

twitter.URLMaker = function (base, directories) {
    var holder = "https://";
    if (base) {
        holder += base + ".firebaseio.com/";
    }
    else {
        holder += twitter.urlbase + ".firebaseio.com/";
    }
    if (directories) {
        if (typeof directories === "string") {
            holder += directories;
        } else {
            holder += directories.join("/");
        }
    }
    holder += "/.json";
    return holder;
};

///Our generalized AJAX CAll
twitter.Ajax = function (/*"GET", "POST", "PATCH" or "DELETE"*/method,
    /*"https://example.firebaseio.com/folders(or not)/.json"*/URL,
    /*Data to send stringified (can be null if DELETING or GETTING)*/data,
    /*What FUNCTION>>DO NOT PUT THE PARENTHESIS() CAUSE IS A CALLBACK<< to do if success, can be null*/success,
    /*What FUNCTION>>DO NOT PUT THE PARENTHESIS() CAUSE IS A CALLBACK<< to do if fail, can be null*/failure,
    /*Index required for some success callbacks, can be null*/index) {
    var request = new XMLHttpRequest();
    request.open(method, URL);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            if (typeof success === 'function') {
                success(this.response, index);
            }
        } else {
            if (typeof failure === 'function') {
                failure(this.response);
            } else {
                console.log("Error on " + method + " to " + URL + ": " + this.response);
            }
        }
    };
    request.onerror = function () {
        if (typeof failure === 'function') {
            failure(this.readyState + "Com Error");
        }
    };
    request.send(JSON.stringify(data));
};

twitter.getFriends = function () {
    twitter.Ajax(
        "GET",
        twitter.URLMaker(null, "friends"),
        null,
        twitter.putFriendsInArray,
        console.log
    );
};

twitter.getProfile = function () {
    twitter.Ajax(
        "GET",
        twitter.URLMaker(null, "profile"),
        null,
        twitter.saveMyProfileLocally,
        console.log
    );
};


twitter.saveMyProfileLocally = function (data) {
    data = JSON.parse(data);
    twitter.profile = [];
    for (var w in data) {
        data[w].key = w;
        twitter.profile.push(data[w]);
    }
    twitter.writeProfile();
    if (twitter.firstTimeLoadingPage) {
        twitter.getMyTweets();
        twitter.firstTimeLoadingPage = false;
    }
};

twitter.writeProfile = function () {
    var holder = "";
    document.getElementById("name").innerHTML = twitter.profile[0].name;
    document.getElementById("photo").setAttribute("src", twitter.profile[0].image);
    document.getElementById("bio").innerHTML = twitter.profile[0].bio;
    document.getElementById("profile_editing").className = "hide";
    document.getElementById("profile_showing").className = "show";
};

twitter.updateProfile = function () {
    document.getElementById("profile_showing").className = "hide";
    document.getElementById("profile_editing").className = "show";
    document.getElementById("name_update").value = twitter.profileOriginal[0].name;
    document.getElementById("bio_update").value = twitter.profileOriginal[0].bio;
    document.getElementById("img_update").value = twitter.profileOriginal[0].image;
};

twitter.saveProfile = function () {
    twitter.addProfile();
    document.getElementById("profile_showing").className = "show";
    document.getElementById("profile_editing").className = "hide";
};

twitter.putFriendsInArray = function (data) {
    data = JSON.parse(data);
    twitter.friends = [];
    for (var w in data) {
        data[w].key = w;
        twitter.friends.push(data[w]);
    }
    twitter.getFriendsProfileDataIteration();
};

twitter.getFriendsProfileDataIteration = function () {
    for (var i = 0; i < twitter.friends.length; i++) {
        twitter.getFriendsProfileData(i);
    }
};

twitter.getFriendsProfileData = function (index) {
    var friendSubDomain = twitter.friends[index].url;
    twitter.Ajax(
        "GET",
        twitter.URLMaker(friendSubDomain, "profile"),
        null,
        twitter.saveFriendsProfileLocally,
        console.log,
        index
        )
};

twitter.saveFriendsProfileLocally = function (response, index) {
    var data = JSON.parse(response);
    for (var w in data) {
        twitter.friends[index].name = data[w].name;
        twitter.friends[index].image = data[w].image;
        twitter.friends[index].bio = data[w].bio;
    }
    twitter.writeFriends(index);
};

twitter.writeFriends = function (index) {
    var holder = "";
    holder += "<div class='row clearfix well well-sm'><div class='col-md-4 column'><img src='";
    holder += twitter.friends[index].image;
    holder += "' width='64' height='64' class='img-circle' alt='64x64' /></div><div class='col-md-8 column'><div class='row clearfix'><div class='col-md-12 column'><h4><small>"
    holder += twitter.friends[index].name;
    holder += "</small></h4>";
    holder += "<h4><small>" + twitter.friends[index].url + "</small></h4>";
    holder += "</div></div><div class='row clearfix'><div class='col-md-12 column'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    holder += "<!-- <button class='btn btn-primary btn-xs'><span class='fa fa-envelope'></span></button> -->";
    holder += "&nbsp;&nbsp;<button class='btn btn-danger btn-xs' onclick='twitter.deleteFriends(\"" + twitter.friends[index].key + "\")'>Delete</button></div></div></div></div>";
    twitter.getFriendsTweets(index);
    document.getElementById("friends_place").innerHTML += holder;
};

twitter.getMyTweets = function () {
    twitter.Ajax(
        "GET",
        twitter.URLMaker(null, "tweets"),
        null,
        twitter.saveMyTweetsLocally,
        console.log
        );
};

twitter.getFriendsTweets = function (index) {
    var friendSubDomain = twitter.friends[index].url;
    twitter.Ajax(
        "GET",
        twitter.URLMaker(friendSubDomain, "tweets"),
        null,
        twitter.saveFriendsTweetsLocally,
        console.log,
        index
        )
};

twitter.saveMyTweetsLocally = function (response) {
    var data = JSON.parse(response);
    for (var w in data) {
        var indexArray = []
        for (var j in twitter.tweets) {
            indexArray.push(twitter.tweets[j].key);
        }
        data[w].key = w;
        if (twitter.profile[0].image) {
            data[w].image = twitter.profile[0].image;
        } else {
            data[w].image = twitter.profileOriginal[0].image;
        }
        if (twitter.profile[0].name) {
            data[w].name = twitter.profile[0].name;
        } else {
            data[w].name = twitter.profileOriginal[0].name;
        }
        if (twitter.profile[0].url) {
            data[w].url = twitter.profile[0].url;
        } else {
            data[w].url = twitter.profileOriginal[0].url;
        }
        twitter.tweets.push(data[w]);
    }
    twitter.checkIfWriteTweets();
};

twitter.saveFriendsTweetsLocally = function (response, index) {
    var data = JSON.parse(response);
    for (var w in data) {
        var indexArray = []
        for (var j in twitter.tweets) {
            indexArray.push(twitter.tweets[j].key);
        }
        data[w].key = w;
        data[w].name = twitter.friends[index].name;
        data[w].url = twitter.friends[index].url;
        data[w].image = twitter.friends[index].image;
        twitter.tweets.push(data[w]);
    }
    twitter.checkIfWriteTweets();
};

twitter.checkIfWriteTweets = function () {
    twitter.mainCounter++;
    if (twitter.mainCounter === twitter.friends.length + 1) {
        twitter.mainCounter = 0;
        twitter.writeTweets();
        twitter.tweets = [];
    }
};

twitter.writeTweets = function () {
    twitter.tweets.sort(function (a, b) {
        return (a.time > b.time) ? -1 : (b.time > a.time ? 1 : 0);
    });
    var holder = "";
    for (var w in twitter.tweets) {
        holder += "<div class='row clearfix media well' id=";
        holder += twitter.tweets[w].key;
        holder += "><div class='col-md-2 column'><img src='";
        holder += twitter.tweets[w].image;
        holder += "' width='64' height='64' class='img-circle' alt='64x64' /></div>";
        holder += "<div class='col-md-10 column'><div class='row clearfix'><div class='col-md-12 column'><div class='col-md-6 column'>";
        holder += "<h4><small>" + twitter.tweets[w].name + "</small></h4>";
        holder += "<h4><small>" + twitter.tweets[w].url + "</small></h4>";
        holder += "</div><div class='col-md-4 column'><h4><small>";
        var fecha = twitter.tweets[w].time;
        fecha = new Date(fecha);
        holder += (fecha.toString("MMM-dd h:mm tt"));
        holder += "</small></h4></div><div class='col-md-2 column'>"
        if (twitter.tweets[w].url === twitter.profile[0].url) {
            holder += "<button class='btn btn-danger btn-xs'";
            holder += "onclick='twitter.deleteTweet(\"" + twitter.tweets[w].key + "\")'>Delete</button>";
        }
        holder += "</div></div></div><div class='row clearfix'><div class='col-md-12 column'><h5>";
        holder += twitter.tweets[w].content + "</h5></div></div></div></div>";
    }
    document.getElementById("tweets_place").innerHTML = holder;
};

twitter.addFriend = function () {
    var friendObject = {};
    friendObject.url = document.getElementById("new_friend").value;
    document.getElementById("new_friend").value = "";
    twitter.Ajax(
        "POST",
        twitter.URLMaker(null, "friends"),
        friendObject,
        function () { window.location.reload(true); },
        function () { window.location.reload(true); }
        );
};

twitter.enterPressed = function (e) {
    if (e.charCode === 13 || e.keyCode === 13) {
        twitter.addTweet();
    }
};

twitter.addTweet = function () {
    var tweetObject = {};
    tweetObject.content = document.getElementById("new_tweet").value;
    tweetObject.time = Date.now();
    twitter.Ajax(
        "POST",
        twitter.URLMaker(null, "tweets"),
        tweetObject,
        function (x) { console.log(JSON.stringify(x)) },
        console.log
        );
    document.getElementById("new_tweet").value = "";
};

twitter.deleteProfile = function () {
    twitter.Ajax(
        "DELETE",
        twitter.URLMaker(null, "profile"),
        null,
        twitter.addProfile,
        console.log
        );
};

twitter.addProfile = function () {
    var profileObject = {};
    profileObject.name = document.getElementById("name_update").value;
    profileObject.url = twitter.profileOriginal[0].url;
    profileObject.image = document.getElementById("img_update").value;
    profileObject.bio = document.getElementById("bio_update").value;
    twitter.Ajax(
        "POST",
        twitter.URLMaker(null, "profile"),
        profileObject,
        twitter.getProfile,
        console.log
        );
};

twitter.deleteTweet = function (urlTarget) {
    twitter.Ajax(
        "DELETE",
        twitter.URLMaker(null, ["tweets", urlTarget]),
        null,
        twitter.deleteMyTweetFromLocal(urlTarget),
        console.log
        );
};

twitter.deleteMyTweetFromLocal = function (key) {
    var indexArray = []
    for (var index in twitter.tweets) {
        indexArray.push(twitter.tweets[index].key);
    }
    var index2erase = $.inArray(key, indexArray)
    if (index2erase > -1) {
        twitter.tweets.splice(index2erase, 1);
    }
};

twitter.deleteFriends = function (urlTarget) {
    twitter.Ajax(
        "DELETE",
        twitter.URLMaker(null, ["friends", urlTarget]),
        null,
        function () { window.location.reload(true) },
        function () { window.location.reload(true) }
        );
};

twitter.getProfile();
twitter.getFriends();

setInterval(function () {
    twitter.getMyTweets();
    for (var i in twitter.friends) {
        twitter.getFriendsTweets(i);
    }
}, 3000)
