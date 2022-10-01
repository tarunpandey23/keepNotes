console.log("app.js included in html file .");
displayNotes();
let btn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addText = document.getElementById("addTextarea");
    //this one..
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        ObjectNotes = [];

    } else {
        //this one ...
        ObjectNotes = JSON.parse(notes);
    }
    ObjectNotes.push(addText.value);
    //this one ....
    localStorage.setItem("notes", JSON.stringify(ObjectNotes));
    addText.value = "";
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
        html += `
        <div class=" notesCard card my-2 mx-2" style="width: 18rem; border-radius: 12px;">
           <div class="card-body">
          <h5 class="card-title">Note :${index + 1}</h5>
          <p class="card-text">${element}</p>
          <button id=${index} class="btn btn-primary" onclick="deleteNote(this.id)">Delete Note</button>
        </div>
      </div>`;

    })
    let notesElement = document.getElementById("notes");
    if (notes != null) {
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
    if (notes == null) {
        ObjectNotes = [];
    } else {
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
    let inputValue=search.value;
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