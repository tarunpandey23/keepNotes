console.log("app.js included in html file .");
displayNotes();
let addBtn = document.getElementById("addBtn");
let addHeading=document.getElementById("heading");
let isChecked=document.getElementById("myCheckBox");
let bool;

addBtn.addEventListener("click", function (e) {
    let addText = document.getElementById("addTextarea");
    let alert=document.getElementsByClassName("alert")[0];
    if(isChecked.checked==true){
        bool=true;
    }
    else{
        bool=false;
    }
    if(addText.value==""){
        alert.style.display="block";
        return false;
    }else{
        alert.style.display="none";
    }
   //this one..
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        ObjectNotes = [];
    } else {
        //this one ...
        ObjectNotes = JSON.parse(notes);
       
    }
    let obj={
        text:addText.value,
        heading:addHeading.value,
        check:bool
    };
    
    //ObjectNotes.push(addText.value);
    ObjectNotes.push(obj);
    //this one ....
    localStorage.setItem("notes", JSON.stringify(ObjectNotes));
    addText.value = "";
    addHeading.value="";
    console.log(ObjectNotes);
    displayNotes();
});
//function for display notes...
function displayNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        ObjectNotes = [];
    } else {
        ObjectNotes = JSON.parse(notes);
    }
    let html = "";
    ObjectNotes.forEach(function (element, index) {
        if(element.check==true){
            html += `
            <div class=" notesCard card my-2 mx-2  border-warning mb-3" style="width: 18rem; border-radius: 12px;">
               <div class="card-body">
              <h5 class="card-title">${index + 1}:  ${element.heading}</h5>
              
              <p class="card-text">${element.text}</p>
              <button id=${index} class="btn btn-primary" onclick="deleteNote(this.id)">Delete Note</button>
              </div>
          </div>`;
        }else{
            html += `
            <div class=" notesCard card my-2 mx-2" style="width: 18rem; border-radius: 12px;">
               <div class="card-body">
              <h5 class="card-title">${index + 1}:  ${element.heading}</h5>
              
              <p class="card-text">${element.text}</p>
              <button id=${index} class="btn btn-primary" onclick="deleteNote(this.id)">Delete Note</button>
              </div>
          </div>`;
        }
       
    })
    let notesElement = document.getElementById("notes");
    if (notes !=null) {
        notesElement.innerHTML = html;
    }
    else {
        notesElement.innerHTML = `Nothing to show here,add your notes from<strong>ADD NOTES</strong> .`;
    }
}
//function for delete note ...
function deleteNote(index) {
    console.log("deleting note....");
    let notes = localStorage.getItem("notes");
    if(notes.length == 0){
        ObjectNotes=[];
    }else {
        ObjectNotes = JSON.parse(notes);
    }
    ObjectNotes.forEach(function (index) {
        localStorage.removeItem(index);
    })
    //this one...
    ObjectNotes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(ObjectNotes));
    displayNotes();
}
let search = document.getElementById("searchText");
search.addEventListener("input",function(){
    console.log("input event working properly...");
    let inputValue=search.value.toLowerCase();
    let notesCard=document.getElementsByClassName("notesCard");
    //this one....
    Array.from(notesCard).forEach(function(element){
        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputValue)){
            element.style.display="block";
        }else{
            element.style.display="none";
        }
    })
})