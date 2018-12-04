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



// change background:

var changeBackground = (function() {

  var colour = 0;
  var colours = ['', './img/0.jpg','./img/1.jpg','./img/2.jpg','./img/3.jpg', './img/4.jpg', 'green', 'light'];

  return function() {
    colour = (colour+1) % colours.length ;
    document.body.style.backgroundImage =  `url(${colours[colour]})`;
    console.log(colour);

  };

}());

window.setInterval( changeBackground, 5000);



// document.addEventListener('click', backgroundHandler);


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

// Quote Generator

var quoting = document.querySelector('.quote-generator');

function quoteGenerator() {
  var num = Math.floor(Math.random() * quotes.length);

  quoting.innerHTML = `<blockquote>"${quotes[num].quote}"</blockquote> <cite>${quotes[num].author}</cite>`;
}

quoteGenerator();
setInterval(quoteGenerator, 8000);