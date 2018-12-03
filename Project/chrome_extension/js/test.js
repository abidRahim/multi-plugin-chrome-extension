document.getElementById('submit').addEventListener('click', addlist);
window.addEventListener('keypress', (e) => {
    if(e.charCode == 13) addlist();
});
const itemLeft = document.querySelector(".item_left");



// var arr1 = [
//     {
//         name: "something",
//         status: false
//     },
//     {
//         name: "something",
//         status: false
//     },
// ];

var arr1 = JSON.parse(localStorage.getItem('arr1')) || []; 


var catagoryStatus = "all";



var itemList = document.querySelector('.item_list');

displayX();

function addlist() {
    var getValue = document.getElementById('input').value;
    var obj = {
        name: getValue,
        status: false        
    }
    arr1.push(obj);
    document.getElementById('input').value = "";

    
    displayX();

    localStorage.arr1 = JSON.stringify(arr1);
}




function displayX() {

    if (catagoryStatus == 'active') {
        activeArray();
    } else if (catagoryStatus == 'completed') {
        completedArray();
    }
    else {
        document.querySelector('.item_list').innerHTML = "";
        var i = 0;
        for (item of arr1) {
            itemList.innerHTML += `<li><input data-id=${i} type="checkbox" class="tick" ${item.status ? "checked" : ""}><p class="${item.status ? "strike" : ""}"> ${item.name} </p><span><i data-cross=${i} class="fas fa-times"></i></span></li>`;
            i++;
            //  console.log(item.status);
        }
    }
    selector();
    displayleft();
    // console.table(arr1);
}



// addlist();
function selector() {
    document.querySelectorAll('.fas').forEach(v => v.addEventListener('click', deletex));
    document.querySelectorAll('.tick').forEach(v => v.addEventListener('click', done));

}




function deletex(e) {
    let index = Number(e.target.dataset.cross);
    arr1.splice(index, 1);
    displayX();
    localStorage.arr1 = JSON.stringify(arr1);
}



function done(f) {
    let index = Number(f.target.dataset.id); arr1[index].status
    arr1[index].status = !arr1[index].status;
    // done();
    displayX();
    localStorage.arr1 = JSON.stringify(arr1);
}



document.querySelector('.all').addEventListener('click', () => {
    catagoryStatus = "all";
    displayX();
});




document.querySelector('.active').addEventListener('click', activeArray);
document.querySelector('.completed').addEventListener('click', completedArray);
document.querySelector('.clearcompleted').addEventListener('click', clearcompleted);
// document.querySelector('.item_left').addEventListener('click', displayleft);



function activeArray() {
    document.querySelector('.item_list').innerHTML = "";
    catagoryStatus = "active";
    var i = 0;
    for (item of arr1) {
        if (item.status == false) {
            itemList.innerHTML += `<li><input data-id=${i} type="checkbox" class="tick" ${item.status ? "checked" : ""}><p class="${item.status ? "strike" : ""}"> ${item.name} </p><span><i data-cross=${i} class="fas fa-times"></i></span></li>`;
        }
        i++;
    }
    selector();
}

    


function completedArray() {
    document.querySelector('.item_list').innerHTML = "";
    catagoryStatus = "completed";
    var i = 0;
    for (item of arr1) {
        if (item.status == true) {
            itemList.innerHTML += `<li><input data-id=${i} type="checkbox" class="tick" ${item.status ? "checked" : ""}><p class="${item.status ? "strike" : ""}"> ${item.name} </p><span><i data-cross=${i} class="fas fa-times"></i></span></li>`;
        }
        i++;
    }
    selector();
}



function clearcompleted() {
    var arr2 = arr1.filter(v => v.status==false);
    arr1 = arr2;
    displayX();
    localStorage.arr1 = JSON.stringify(arr1);
}

function displayleft() {
    var i = 0;
    for (item of arr1) {
        if (item.status == false) {
            i++;
        }
    }
    itemLeft.textContent = `${i} Items Left`;

}



// if (arr1[index].status = true){
//     document.querySelector()
// }
// displayX(); 
// e.target.dataset.cross
// document.write(arr1);
// console.log(arr1)