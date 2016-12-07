
function dropdown() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function home() {
    location.reload();
}

(function version() {
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/version";
    xhr.open("GET", uri, true);
    xhr.onload = function () {
    var version_d = document.getElementById("version");
    var dat = xhr.responseText;
    parser = new DOMParser();
    xmldat = parser.parseFromString(dat,"text/xml");
    version_d.innerHTML = "<center>By Muzamil Khan &copy Version: "+ xmldat.getElementsByTagName("string")[0].childNodes[0].nodeValue + "</center>";
    }
    xhr.send(null);
})();

function courses() {
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/courses";
    xhr.open("GET", uri, true);
    xhr.onload = function () {
    var version_d = document.getElementById("pageBody");
    var dat = JSON.parse(xhr.responseText);
    version_d.innerHTML = "<center><h1>Courses</h1></center>";
    for (j = 0; j < dat.courses.coursePaperSection.length; j++){
      var prereq = dat.courses.coursePaperSection[j].prerequisite;
      if (prereq == null){
          prereq = "No prerequisites for this course";
      }
      var desc = dat.courses.coursePaperSection[j].description;
      if (desc.length == 0){
          desc = "None";
      }

      var heading = dat.courses.coursePaperSection[j].title;
      var topic = ": " + heading;
      if (heading.length == 0){
          topic = "";
      }
      version_d.innerHTML += "<center><div class = \"card\"><br><center>" + ("<b>"+dat.courses.coursePaperSection[j].subject.courseA + topic + "</b></center>") + "<center><p>"+ (dat.courses.coursePaperSection[j].subject.points)+"</p></center><p><font size= \"2\">"+desc+"</font></p>" + "<p><font size= \"2\">" + prereq + "</font></p><br><br></div></center><br>";
      }
    }
    xhr.send(null);
    document.getElementById("pageLogo").innerHTML = "";
    }

function news() {
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/newsfeed";
    xhr.open("GET", uri, true);
    xhr.onload = function () {
    var version_d = document.getElementById("pageBody");
    var dat = xhr.responseText;
    parser = new DOMParser();
    xmldat = parser.parseFromString(dat,"text/xml");
    version_d.innerHTML = "<center><h1>News</h1></center>";
    item = xmldat.getElementsByTagName("item");
    for (j = 1; j < item.length; j++){
        version_d.innerHTML += "<center><div class = \"card\"><br><b><center><h3>"+item[j].childNodes[1].textContent+"</h3></b>" + "<p><font size= \"2\">" + item[j].childNodes[9].textContent+"</font></p><p><font size= \"3\">"+ item[j].childNodes[3].textContent+"</font></p><p><font size= \"2\"><b>Read more: </b><a href="+item[j].childNodes[5].textContent+">"+item[j].childNodes[5].textContent+"</a></font></p></div></center></br></br>";
        }
    }
    xhr.send(null);
    document.getElementById("pageLogo").innerHTML = "";
    }

function notices() {
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/noticesfeed";
    xhr.open("GET", uri, true);
    xhr.onload = function () {
    var version_d = document.getElementById("pageBody");
    var dat = xhr.responseText;
    parser = new DOMParser();
    xmldat = parser.parseFromString(dat,"text/xml");
    version_d.innerHTML = "<center><h1>Notices</h1></center>";
    item = xmldat.getElementsByTagName("item");
    for (j = 0; j < item.length; j++){
        version_d.innerHTML += "<center><div class = \"card\"><h4>"+item[j].childNodes[1].textContent+"</h4>" + "<p><font size= \"2\">" + item[j].childNodes[9].textContent+"</font></p>" + "</font></p><p><font size= \"3\">" + item[j].childNodes[3].textContent+"</font></p><p><font size= \"2\"><b>Read more: </b><a href="+item[j].childNodes[5].textContent+">"+item[j].childNodes[5].textContent+"</a></font></p></div><center></br></br>";
        }
    }
    xhr.send(null);
    document.getElementById("pageLogo").innerHTML = "";
    }
function people() {
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/people";
    xhr.open("GET", uri, true);
    xhr.onload = function () {
    var version_d = document.getElementById("pageBody");
    var dat = JSON.parse(xhr.responseText);
    version_d.innerHTML = "<br>";
    for (j = 0; j < dat.list.length; j++){
      var personId = dat.list[j].profileUrl[1];
      var imageId = dat.list[j].imageId;
      if (imageId == null){
          imageId = "103000628";
      }
      var image = "<img src= \"https://unidirectory.auckland.ac.nz/people/imageraw/"+personId+"/"+imageId+"/small/\">";
      if (imageId == null){
          image = "<img src=\"http://redsox.tcs.auckland.ac.nz/ups/logo.svg\" alt=\"UoA_Logo\" style=\"width:115px;height:115px;\">"
      }
      var mailto = dat.list[j].emailAddresses[0];
      extn = dat.list[j].extn;
      if (extn != null){
          extn = "<center>&#9990 "+extn+"(ext)<center>";
      }else {
          extn = "";
      }
      var vcard = dat.list[j].profileUrl[1];
      version_d.innerHTML += "<center>"+image+"</center>";
      version_d.innerHTML += "<br>";
      version_d.innerHTML += "<center>" + dat.list[j].names[0] + "</center>";
      version_d.innerHTML += "<center>" + dat.list[j].jobtitles[0];+ "</center>";
      version_d.innerHTML += "<br>";
      version_d.innerHTML += "<center><a href=\"mailto:"+mailto+"\"><div class = \"unic\">"+mailto+"</div></a></center>";
      version_d.innerHTML += "<center><a href=\"https://unidirectory.auckland.ac.nz/people/vcard/"+vcard+"\">Save Contact</a></center>"
      version_d.innerHTML += extn;
      version_d.innerHTML += "<center><h2>_________________________________</h2></center>";
      version_d.innerHTML += "<br>";
      version_d.innerHTML += "<br>";
        }
    }
    xhr.send(null);
    document.getElementById("pageLogo").innerHTML = "";
    }


function recentEntries() {
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/htmlcomments";
    xhr.open("GET", uri, true);
    xhr.onload = function () {
    var version_d = document.getElementById("pageBody");
    var dat = xhr.responseText;
    version_d.innerHTML = "<center><h1>Please sign our guest book!<h1></center>";
    version_d.innerHTML += "<center><textarea id = \"comment\" rows=\"8\" cols=\"150\" placeholder=\"Add a comment for guest book..\"></textarea><br></center>";
    version_d.innerHTML += "<center><input id = \"name\" placeholder=\"Add your name..\"></textarea><br><br></center>";
    version_d.innerHTML += "<center><button onclick=\"post()\" type=\"button\">Post</button><br></center>";
    version_d.innerHTML += "<center><center><div class = \"card\"><h2>Recent Entries</h2>" + dat + "</div></center>";
    }
    xhr.send(null);
    document.getElementById("pageLogo").innerHTML = " ";
    }

function post() {
    var nme = document.getElementById("name");
    var comm = document.getElementById("comment");
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/comment?name="+nme.value.replace(' ', '+');
    xhr.open("POST", uri, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        console.log(xhr.responseText);
        recentEntries();
        nme.value = "";
        comm.value = "";
    }
    xhr.send('\"'+comm.value+'\"');
}



/*
//toggle dropdown sourced from w3schools http://www.w3schools.com/howto/howto_js_topnav.asp
function dropDownMenu() {
    var nav = document.getElementById("navbar");
    if (nav.className === "nav") {
        nav.className += " responsive";
    } else {
        nav.className = "nav";
    }
}

//loads home page when provoked
function home() {
    location.reload();
}

//iify/iife function which is invoked immediately
(function version() {
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/version";
    xhr.open("GET", uri, true);
    xhr.onload = function () {
        var version_data = document.getElementById("version");
        var response = xhr.responseText;
        parser = new DOMParser();
        xmldat = parser.parseFromString(response, "text/xml");
        version_data.innerHTML = "All rights reserved &copy v" + xmldat.getElementsByTagName("string")[0].childNodes[0].nodeValue;
    }
    xhr.send(null);
})();

//retrives and appends course data
function courses() {
    var inactive = document.getElementById("one");
    inactive.className = "none";
    var inactive = document.getElementById("three");
    inactive.className = "none";
    var inactive = document.getElementById("four");
    inactive.className = "none";
    var inactive = document.getElementById("five");
    inactive.className = "none";
    var inactive = document.getElementById("six");
    inactive.className = "none";
    var select = document.getElementById("two");
    select.className = "active";
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/courses";
    xhr.open("GET", uri, true);
    xhr.onload = function () {
        var courses_data = document.getElementById("pageBody");
        var response = JSON.parse(xhr.responseText);

        courses_data.innerHTML = "</br>";
        courses_data.innerHTML += "<h2>" + "Courses" + "</h2>";

        //retrieving and appending each field
        for (i = 0; i < response.courses.coursePaperSection.length ; i++) {
            var pre;
            var requisite;
            var subject = response.courses.coursePaperSection[i].subject.courseA;
            var points = response.courses.coursePaperSection[i].subject.points;
            var desc = response.courses.coursePaperSection[i].description;
            var prerequisite = response.courses.coursePaperSection[i].prerequisite;
            if (prerequisite == null) {
                prerequisite = "None";
            }

            courses_data.innerHTML += "<div class = \"card\">  </br>" + "<b>" + subject + "</b>" + "</br> </br>" + "<b>Points: </b>" + points + "</br> </br>" + desc + "</br> </br>" + prerequisite + "</br> </br>";
            courses_data.innerHTML += "</div>";
            courses_data.innerHTML += "</br>";
        }
    }
    xhr.send(null);
}

//retrives and appends news data
function news() {
    var inactive = document.getElementById("one");
    inactive.className = "none";
    var inactive = document.getElementById("three");
    inactive.className = "none";
    var inactive = document.getElementById("two");
    inactive.className = "none";
    var inactive = document.getElementById("five");
    inactive.className = "none";
    var inactive = document.getElementById("six");
    var select = document.getElementById("four");
    select.className = "active";
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/newsfeed";
    xhr.open("GET", uri, true);
    xhr.onload = function () {
        var news_data = document.getElementById("pageBody");
        var response = xhr.responseText;
        parser = new DOMParser();
        xmldat = parser.parseFromString(response, "text/xml");
        news_data.innerHTML = "</br>";
        news_data.innerHTML += "<h2>" + "News" + "</h2>";
        data = xmldat.getElementsByTagName("item");
        for (i = 0; i < data.length + 1; i++) {
            var title = data[i].childNodes[1].textContent;
            var date = data[i].childNodes[9].textContent;
            var description = data[i].childNodes[3].textContent;
            var link = data[i].childNodes[5].textContent;

            news_data.innerHTML += "<div class = \"notice\">"
            news_data.innerHTML += "<div class = \"card\">" + "</br>" + "<b>" + title + "</b>" + "</br> </br>" + "<b>Date: </b>" + date + "</br> </br>" + "<b>Description: </b>" + description + "</br> </br> <b>Link:</b>" + "<a href=" + link + ">" + link + "</a> </br></br>";
            news_data.innerHTML += "</div>";
            news_data.innerHTML += "</div>";

        }
    }
    xhr.send(null);
}

//retrives and appends notices data
function notices() {
    var inactive = document.getElementById("one");
    inactive.className = "none";
    var inactive = document.getElementById("three");
    inactive.className = "none";
    var inactive = document.getElementById("four");
    inactive.className = "none";
    var inactive = document.getElementById("two");
    inactive.className = "none";
    var inactive = document.getElementById("six");
    inactive.className = "none";
    var select = document.getElementById("five");
    select.className = "active";
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/noticesfeed";
    xhr.open("GET", uri, true);
    xhr.onload = function () {
        var notices_data = document.getElementById("pageBody");
        var response = xhr.responseText;
        parser = new DOMParser();
        xmldat = parser.parseFromString(response, "text/xml");
        notices_data.innerHTML = "<br>";
        data = xmldat.getElementsByTagName("item");
        notices_data.innerHTML = "</br>";
        notices_data.innerHTML += "<h2>" + "Notices" + "</h2>";
        for (i = 0; i < data.length; i++) {
            var title = data[i].childNodes[1].textContent;
            var date = data[i].childNodes[9].textContent;
            var description = data[i].childNodes[3].textContent;
            var link = data[i].childNodes[5].textContent;
            notices_data.innerHTML += "<div class = \"notice\">"
            notices_data.innerHTML += "<div class = \"card\">" + "</br>" + "<b>" + title + "</b>" + "</br> </br>" + "<b>Date: </b>" + date + "</br> </br>" + "<b>Description:</b>" + description + "</br> </br>" + "<b>Link: </b>" + "<a href=" + link + ">" + link + "</a>" + "</br></br>";
            notices_data.innerHTML += "</div>";
            notices_data.innerHTML += "</div>";
        }
    }
    xhr.send(null);
}

//retrives and appends people data
function people() {
    var inactive = document.getElementById("one");
    inactive.className = "none";
    var inactive = document.getElementById("two");
    inactive.className = "none";
    var inactive = document.getElementById("four");
    inactive.className = "none";
    var inactive = document.getElementById("five");
    inactive.className = "none";
    var inactive = document.getElementById("six");
    var select = document.getElementById("three");
    select.className = "active";
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/people";
    xhr.open("GET", uri, true);
    xhr.onload = function () {
        var people_data = document.getElementById("pageBody");
        var response = JSON.parse(xhr.responseText);
        people_data.innerHTML = "<br>";
        people_data.innerHTML += "<h2>" + "People" + "</h2>";
        //retrieving data for each property
        for (i = 0; i < response.list.length; i++) {
            var personId = response.list[i].profileUrl[1];
            var imageId = response.list[i].imageId;
            var job_titles = response.list[i].jobtitles[0];
            var names = response.list[i].names[0];
            var image = "<img src= \"https://unidirectory.auckland.ac.nz/people/imageraw/" + personId + "/" + imageId + "/small/\" >";
            //checking if image exists or not
            if (imageId == null) {
                image = "<img src=\"https://www.cs.auckland.ac.nz/static/g5Km3OjLZuWCA8w7PdOyS4j603aTN0QC7X2gk6kRhEs.png\" alt=\"UoA_Logo\" style=\"width:100px;height:130px;\">"
            }

            var mailto = response.list[i].emailAddresses[0];
            var extn = response.list[i].extn;

            if (extn == null) {
                extn = "None";
            }

            if (vcard == null) {
                vcard = "None";
            }
            //filtering out non academic staff
            if (response.list[i].jobtitles == "Associate Professor" || response.list[i].jobtitles == "Professional Teaching Fellow" || response.list[i].jobtitles == "Senior Lecturer" || response.list[i].jobtitles == "Senior Tutor" || response.list[i].jobtitles == "Professor" || response.list[i].jobtitles == "Senior Lecturer" || response.list[i].jobtitles == "Lecturer" || response.list[i].jobtitles == "Tutor" || response.list[i].jobtitles == "Head of Department") {
                var vcard = response.list[i].profileUrl[1];
                people_data.innerHTML += "<div class = \"notice\">"
                people_data.innerHTML += "<div class = \"cardP\">" + "<div class = \"picture\">" + image + "</div>" + "<div class = \"data\">" + "<b class = \"text\">" + names + "</b>" + "</br>" + job_titles + "<a href=\"mailto:" + mailto + "\"><div class = \"utf\">&#9993</div></a>" + "<div class = \"extn\">" + "Extn: " + extn + "</div>" + "<a  href=\"https://unidirectory.auckland.ac.nz/people/vcard/" + vcard + "\"><div class = \"vcard\">Download VCard</div></a>" + "</div>" + "</div>";
                people_data.innerHTML += "</div>"
            }
        }
    }
    xhr.send(null);
}

//retrives and appends guestbook data
function guestBook() {
    var inactive = document.getElementById("one");
    inactive.className = "none";
    var inactive = document.getElementById("three");
    inactive.className = "none";
    var inactive = document.getElementById("four");
    inactive.className = "none";
    var inactive = document.getElementById("five");
    inactive.className = "none";
    var inactive = document.getElementById("two");
    inactive.className = "none";
    var select = document.getElementById("six");
    select.className = "active";
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/htmlcomments";
    //  var uri = "http://localhost:8188/UniProxService.svc/htmlcomments";
    xhr.open("GET", uri, true);
    xhr.onload = function () {
        var guestBook_data = document.getElementById("pageBody");
        var response = xhr.responseText;
        guestBook_data.innerHTML = "</br>";
        guestBook_data.innerHTML += "<h2>" + "Guestbook" + "</h2>";
        guestBook_data.innerHTML += "</br>";
        guestBook_data.innerHTML += "<div >";
        guestBook_data.innerHTML += "Please sign our guest book. Your comments are greatly appreciated.</br>";
        guestBook_data.innerHTML += "</br>";
        guestBook_data.innerHTML += "<textarea id = \"comment\" rows=\"10\" cols=\"150\" placeholder=\"Add comment here...\" class = \"guestbook\"></textarea>";
        guestBook_data.innerHTML += "</br>";
        guestBook_data.innerHTML += "<textarea id = \"name\" rows=\"1\" cols=\"150\" placeholder=\"Add name here...\" class = \"guestbook\"></textarea>";
        guestBook_data.innerHTML += "</br>";
        //  guestBook_data.innerHTML += "<div class=\"button\" onclick=\"post()\" type=\"button\">"  + ➤ + 	"</div>";
        guestBook_data.innerHTML += "<div onclick=\"post()\" class=\"button\">Post</div></br>";
        guestBook_data.innerHTML += "</div>";
        guestBook_data.innerHTML += response;
    }
    xhr.send(null);
}

//post function for guestbook
function post() {
    var name = document.getElementById("name");
    var comment = document.getElementById("comment");
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/comment?name=" + name.value.replace(' ', '+');
    //var uri = "http://localhost:8188/UniProxService.svc/comment?name="+name.value.replace(' ', '+');
    xhr.open("POST", uri, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        console.log(xhr.responseText);
        guestBook();
        name.value = "";
        comment.value = "";
    }
    xhr.send('\"' + comment.value + '\"');

}
*/