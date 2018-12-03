// Random Background 

var root = document.documentElement;
var numbers = [1,2,3,4,5,6,7,8,9,10,11,12];

function backgroundHandler(e) {
  var num = Math.floor(Math.random() *12);

  root.style.setProperty("--change", "url('../img/" + num + ".jpg')");  
  console.log(num);  
}

function randomize(arr) {
  var temp;

  for(i =  arr.length-1; i >=0; i--) {
    var random = Math.floor(Math.random() *3);
    temp = a[i];
    arr[i] = a[random];
    a[random] = temp;
  }
}


document.addEventListener('click', backgroundHandler);


// Browser Clock

var second = document.querySelector(".second");
    var minute = document.querySelector(".minute");
    var hour = document.querySelector(".hour");
    
    secStick();
    minStick();
    hourStick();

    
    function secStick() {
      var time = new Date();
      var sec = time.getSeconds();
      
      let secDeg = sec * 6;
      second.style.transform = `rotate( ${secDeg}deg )`;

    }
    
    function minStick() {
      var time = new Date();
      var mins = time.getMinutes();
      
      let minDeg = mins * 6;
      minute.style.transform = `rotate( ${minDeg}deg )`;
    }
    
    function hourStick() {
      var time = new Date();
      var hours = time.getHours()%12;

      let hourDeg = hours * 30;
      
      hour.style.transform = `rotate( ${hourDeg}deg )`;
    }

    setInterval( secStick, 1000);
    setInterval( minStick , 60000);
    setInterval( hourStick, 3600000);

    