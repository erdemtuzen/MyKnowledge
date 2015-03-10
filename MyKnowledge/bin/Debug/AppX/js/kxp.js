setTimeout("CallButton()", 0)
function CallButton() {
    $(".Current").click();
    $(".Lang").click();

}


function selectLang(lang) {
    sessionStorage.setItem("applang", lang);
    getLang(sessionStorage.getItem("applang"));
}

function getLang(str) {
    if (str == null) {
        str = "tr";
    }
    lxmlhttp = new XMLHttpRequest();
    lxmlhttp.open("GET", "languages/" + str + ".xml", false);
    lxmlhttp.send();
    lxmlDoc = lxmlhttp.responseXML;



    var x = lxmlDoc.getElementsByTagName("language");
    for (i = 0; i < x.length; i++) {
        document.getElementById('Presentations').innerHTML = x[i].getElementsByTagName("Presentations")[0].childNodes[0].nodeValue;
        document.getElementById('pagetitle').innerHTML = x[i].getElementsByTagName("pagetitle")[0].childNodes[0].nodeValue;
        document.getElementById('showcurrent').innerHTML = x[i].getElementsByTagName("showcurrent")[0].childNodes[0].nodeValue;
        document.getElementById('turkish').innerHTML = x[i].getElementsByTagName("turkish")[0].childNodes[0].nodeValue;
        document.getElementById('english').innerHTML = x[i].getElementsByTagName("english")[0].childNodes[0].nodeValue;
        document.getElementById('hello').innerHTML = x[i].getElementsByTagName("hello")[0].childNodes[0].nodeValue;
        document.getElementById('Documents').innerHTML = x[i].getElementsByTagName("Documents")[0].childNodes[0].nodeValue;
        document.getElementById('OtherMedia').innerHTML = x[i].getElementsByTagName("OtherMedia")[0].childNodes[0].nodeValue;
        //document.getElementById('Company').innerHTML = x[i].getElementsByTagName("Company")[0].childNodes[0].nodeValue;
    }

}

function getDateTime() {
    var currentTime = new Date()
    var month = currentTime.getMonth()
    var day = currentTime.getDate()
    var year = currentTime.getFullYear()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    document.write(month + "/" + day + "/" + year + "   " + hours + ":" + minutes + " ")
    if (hours > 11) {
        document.write("PM")
    } else {
        document.write("AM")
    }
}


function getXmls(str) {

    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "data/" + str + ".xml", false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;
}

function quickS() {

    quickSelect("Presentation");
    quickSelect("Document");
    quickSelect("Other");
}



//$(document).ready(function () {
//    $("#itemFileid").click(function () {
//        $(this).css("background", "#000");

//        //(x[i].getElementsByTagName("File")[0].childNodes[0].nodeValue);
//    });
//});

function quickSelect(type) {
    var selObj = document.getElementById("myselect");
    var selIndex = selObj.selectedIndex;
    getXmls(selObj.options[selIndex].value);
    item = "<ul class=\"fileall\">";
    var x = xmlDoc.getElementsByTagName("Item");
    var item;
    for (i = 0; i < x.length; i++) {
        if (x[i].getElementsByTagName("Type")[0].childNodes[0].nodeValue == type) {
            var itemFileid = "itemFile" + i;
            item += "<a href=\"" + x[i].getElementsByTagName("File")[0].childNodes[0].nodeValue + "\"><li id=\"" + itemFileid + "\"><div class=\"listitem\">";
            item += x[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue;
            item += "<div class=\"listfiles\" style=\"float: left; width: 100%;\">";
            // item += "<span>: ";
            // item += x[i].getElementsByTagName("Company")[0].childNodes[0].nodeValue;
            //   item += "</span>";
            item += "</div></div></li></a>";
        }
    }
    item += "</ul>";

    if (type == "Presentation") {
        document.getElementById('Presentation').innerHTML = item;
    } else if (type == "Document") {
        document.getElementById('Document').innerHTML = item;
    } else if (type == "Other") {
        document.getElementById('Other').innerHTML = item;
    }
}
