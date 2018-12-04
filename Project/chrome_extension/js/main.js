// Random Background 

var root = document.documentElement;
var numbers = [1,2,3,4,5,6,7,8,9,10,11,12];

function backgroundHandler() {
  var num = Math.floor(Math.random() *12);

  root.style.setProperty("--change", "url('../img/" + num + ".jpg')");    
}

setInterval(backgroundHandler, 60000);
backgroundHandler();

function randomize(arr) {
  var temp;

  for(i =  arr.length-1; i >=0; i--) {
    var random = Math.floor(Math.random() *3);
    temp = a[i];
    arr[i] = a[random];
    a[random] = temp;
  }
}

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


// Browser Clock -- Digitial

let digiClock = document.getElementById('clockDisplay');

function displayTime() {
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  let dateString = date.toDateString();

  let meridiem = "AM";

  if (hour == 12) {
    meridiem = "PM";
  }
  
  if (hour > 12 ) {
    hour = hour - 12;
    meridiem = "PM";
  }

  if (hour == 0) {
    hour = 12;
    meridiem = "AM";
  }

  hour = (hour < 10) ? "0" + hour : hour;
  minute = (minute < 10) ? "0" + minute : minute;
  second = (second < 10) ? "0" + second : second;
  
  let time = hour + ":" + minute + ":" + second + " " + meridiem;
  
  digiClock.innerHTML = `<p class="time">${time}</p> <br> <p class="dateString">${dateString}</p>`;

  setTimeout(displayTime, 1000);
}

displayTime();


// Quote Generator

var quoting = document.querySelector('.quote-generator');

function quoteGenerator() {
  var num = Math.floor(Math.random() * quotes.length);

  quoting.innerHTML = `<blockquote>"${quotes[num].quote}"</blockquote> <cite>~ ${quotes[num].author}</cite>`;
}

quoteGenerator();
setInterval(quoteGenerator, 600000);

// ToDo List

var arr = JSON.parse(localStorage.getItem('arr')) || [];
var completedArr = [];
var state = 0;

var add = document.getElementById("addList");       // Selects the 'ul' element to populate lists
var input = document.getElementById("user-input");  // selects input element where the user enters text

var all = document.querySelector(".all")            // Selects All Button
var active = document.querySelector(".active")      // Selects Active button
var complete = document.querySelector(".completed") // Selects Completed button
var left = document.querySelector(".left");         // Para tag to display left items
var toggleSelect = document.querySelector(".selectAll"); 
var foot = document.querySelector(".foot");


function stateDisplay() {
  if(state == 0) {    
    allTasks();
  } else if (state == 1) {
    remaining();
  } else if (state == 2) {
    completed();
  }
}

// Adding a user input value
function addTodo(e) {
  if(e.keyCode == 13) {
    if( /^ *$/.test(input.value)) return;
    
    var randomId = Date.now();
                                          
    arr.push( { todo: input.value, checked: false, id: randomId } );

    localStorage.setItem('arr', JSON.stringify(arr));

    input.value = "";
    stateDisplay();
  }
}

// Displaying the list
function displayTodo(thisArr) {
  
  add.innerHTML = "";
  thisArr.forEach(elem => {
    add.innerHTML += 
    `<li class="list-node"><input data-id="${elem.id}" type="checkbox" ${elem.checked ? "checked" : ""}><label class= "${elem.checked ? "label" : ""}" data-id="${elem.id}">${elem.todo}</label><span data-id="${elem.id}" class="delete fas fa-times fa-2x"></span></li>`;
  });

  localStorage['arr'] = JSON.stringify(arr);

  lefting();
}
  
  
// Event listener function to select the respective id and toggle the checked property
function handleList(e) {

  if(e.target.localName !== 'input') return;
  const	id = e.target.dataset.id;

  completedArr.push(arr.filter(elem => (id == elem.id)));
  // console.log(completedArr);

  toggleTodo(id);
  removeSelectedAll();
  stateDisplay();
}	

// Checking the checked property of the ToDo.
function toggleTodo(id) {
  arr.forEach(elem => {
    if (id == elem.id) {
      elem.checked = !elem.checked;
    }
  });
}


// Deletes a Todo list
function deleteTodo(e) {
  if(e.target.nodeName !== "SPAN") return;
  
  const	id = e.target.dataset.id;

  removeTodoArr(id);
}


// Removes or Deletes a task list ftom the source truth array
function removeTodoArr (del_id) {
  arr = arr.filter( (item) => item.id != del_id );

  completedArr = completedArr.filter( (elem) => elem.id != del_id);
  displayTodo(arr);

localStorage['arr'] = JSON.stringify(arr);

}

// Displays completed or checked lists
function completed() {
  let completedTask = arr.filter( elem => elem.checked == true);
  
  all.classList.remove("selected");
  active.classList.remove("selected");
  complete.classList.add("selected");

  displayTodo(completedTask);
}


// Displays remaining or pending tasks lists
function remaining() {
  let remainingTask = arr.filter( elem => elem.checked == false);

  all.classList.remove("selected");
  complete.classList.remove("selected");
  active.classList.add("selected");

  displayTodo(remainingTask);
}

// Displays all Todo lists
function allTasks() {

  active.classList.remove("selected");
  complete.classList.remove("selected");
  all.classList.add("selected");

  displayTodo(arr);
}


// Displays number of items remaining on the bottom left of the todo-container
function lefting() {
  let countChecked = arr.filter( v => v.checked == false);
  left.textContent = `${countChecked.length} Items left`;
}

// Displays clear completed lists on the bottom right of the todo-container
function clearCompleted() {
  let del_id;
  arr.forEach( v => {

    if (v.checked == true) {
      del_id = v.id;
    }
    
    removeTodoArr(del_id);
    allTasks();

  });

localStorage['arr'] = JSON.stringify(arr);


  toggleSelect.classList.remove("selectedAll");
}



// toggleSelect.classList.toggle("selectedAll");

function selectAllList(e) {
  
  
  let newArr = arr.filter( v =>  v.checked == true);
  
  if(arr.length == newArr.length) {
    arr.forEach( v => v.checked = false);
  } else {
    arr.forEach( v => v.checked = true);
  }

  stateDisplay();

  toggleSelect.classList.add("selectedAll");

  removeSelectedAll();
}

// Removes 'selectedAll' class
function removeSelectedAll() {
  arr.forEach(v => {
    if(v.checked == false) {
      toggleSelect.classList.remove("selectedAll");
    }
  });

}

function editBookList(e) {
  if (e.target.localName != "label") return;

  const id = e.target.dataset.id;
  const parent = e.target.parentNode;
  var labelNode = e.target;
  const listInput = document.createElement('input');
  listInput.type = 'text';
  listInput.classList.add('input-text');
  var editArr = arr.filter( v => (id == v.id) );
  listInput.value = editArr[0].todo;
  parent.replaceChild(listInput, labelNode);
  listInput.focus();
  listInput.addEventListener('blur', (e) => {
    editArr[0].todo = e.target.value;
    displayTodo(arr);

    parent.replaceChild(labelNode, listInput);
  });
  listInput.addEventListener("keyup", (e) => {
    if(e.keyCode == 13) {
      editArr[0].todo = e.target.value;
      displayTodo(arr)
    }
  });
}


// Event Listeners

input.addEventListener("keydown", addTodo);   // When "Enter" key is pressed, it adds the list to the array.
add.addEventListener("click", handleList);    // Marks the list.
add.addEventListener("click", deleteTodo);    // Deletes the list on clicking the close icon.
toggleSelect.addEventListener("click", selectAllList);
add.addEventListener("dblclick", editBookList);

// Event Listener for State "All"
all.addEventListener("click", () => {
  state = 0; 
  stateDisplay();
});

// Event Listener for State "Active"
active.addEventListener("click", () => {
  state = 1; 
  stateDisplay();
});

// Event Listener for State "Completed"
complete.addEventListener("click", () => {
  state = 2; 
  stateDisplay();
});

stateDisplay();