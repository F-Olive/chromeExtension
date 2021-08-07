let myLeads = [{
    title: "",
    url: ""
   }]
const inputTitle = document.getElementById("inputTitle-el")
const inputUrl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")
const editBtn = document.getElementById("edit-btn")

let isEditing = false
let editIndex = 0
   
   //If data in local storage, copy to myLeads object and render out
if (leadsFromLocalStorage) {
   myLeads = leadsFromLocalStorage
   render(myLeads)
}
   
   //Use Chrome API to add tab to myLeads array and stringify to localStorage. Render out 
tabBtn.addEventListener("click", function(){    
   chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
       myLeads.push({
           url: tabs[0].url, 
           title: tabs[0].title
           })
       localStorage.setItem("myLeads", JSON.stringify(myLeads) )
       render(myLeads)
       isEditing = false
   })
})
   
   //Set isEditing Boolean to True. Allow editing of selected index and then save this back to same index
function edit(index) {
   isEditing = true
   editIndex = index
   inputTitle.value = myLeads[index].title
   inputUrl.value = myLeads[index].url
}
   
   //Remove item and then enter same item at 1 lower index (index -1)
function reorderUp(index) {
   let toMoveArray =  myLeads.splice(index, 1)
   let toMoveObject = toMoveArray[0]
   myLeads.splice(index - 1, 0, toMoveObject)
   localStorage.setItem("myLeads", JSON.stringify(myLeads) )
   render(myLeads)
}
   //Remove item and then enter same item at 1 higher index (index + 1)
function reorderDown(index) {
   let toMoveArray =  myLeads.splice(index, 1)
   let toMoveObject = toMoveArray[0]
   myLeads.splice(index + 1, 0, toMoveObject)
   localStorage.setItem("myLeads", JSON.stringify(myLeads) )
   render(myLeads)
}
   
   //This code does not work with Chrome Extensions, as it has an inline event handler, which does not comply with Chrome security policy. I rewrote the code with eventlistener's.
// function render(leads) {
//    let listItems = ""
//     for (let i = 0; i < leads.length; i++) {
       
//         listItems += `
//             <li>
//                 <a target='_blank' href='${leads[i].url}'>
//                     ${leads[i].title}
//                 </a>
//                 <button class="edit-btn" onclick="edit(${i})">🔧</button>
//                 <button class="up-btn" onclick="reorderUp(${i})">⬆️</button>
//                 <button class="down-btn" onclick="reorderDown(${i})">⬇️</button>
//             </li>
//         `
//     }
//     ulEl.innerHTML = listItems
// }

   //Render function 
function render(leads) {
 let listItems = ""
  for (let i = 0; i < leads.length; i++) {
      listItems += `
          <li>
              <a target='_blank' href='${leads[i].url}'>
                  ${leads[i].title}
              </a>
              <button class="edit-btn">🔧</button>
              <button class="up-btn">⬆️</button>
              <button class="down-btn">⬇️</button>
          </li>
      `
  }
  ulEl.innerHTML = listItems
  
  // make an array for each type of button so you can add eventListeners to each one
  let editBtns = document.querySelectorAll('.edit-btn')
  let upBtns = document.querySelectorAll('.up-btn')
  let downBtns = document.querySelectorAll('.down-btn')

  // use a for loop to loop through each item in the leads array
  leads.forEach((lead, i) => {
       // add an event listener to each item in each button array
       editBtns[i].addEventListener("click", function(){
           // pass the index to each function
           edit(i)
       })
       upBtns[i].addEventListener("click", function(){
           reorderUp(i)
       })
       downBtns[i].addEventListener("click", function(){
           reorderUp(i)
       })
  })
  
}

   //Deletes all leads and clears local storage
deleteBtn.addEventListener("dblclick", function() {
   localStorage.clear()
   myLeads = []
   render(myLeads)
   isEditing = false
})

   //If editing, then allow edited URL and Title to edit same indexed data, ELSE push new data to new index in object array. Set isEditing back to False, clear input boxes, add new data to local storage, Render all data again.
inputBtn.addEventListener("click", function() {
   if (isEditing) {
       myLeads[editIndex] = {
           url: inputUrl.value,
           title: inputTitle.value
       }
   } else { 
       myLeads.push({
       title: inputTitle.value,
       url: inputUrl.value
           })
       }
   isEditing = false
   inputTitle.value = ""
   inputUrl.value = ""
   localStorage.setItem("myLeads", JSON.stringify(myLeads))
   render(myLeads)
})
