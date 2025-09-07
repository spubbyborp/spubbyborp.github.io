function redirect(){
    var num_pics = document.getElementById("num_pics").value;
    if(num_pics == 8){
        window.location.href="matching_new1.html";
    }
    if(num_pics == 10){
        window.location.href="matching_new2.html";
    }
    if(num_pics == 12){
        window.location.href="matching_new3.html";
    }
}