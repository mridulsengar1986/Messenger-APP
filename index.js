//import {add} from "../functions.js"

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
  databaseURL: "https://fir-628b8-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
//console.log(app)
const database = getDatabase(app)
const shoppingInDB = ref(database, "shopping_Database")
const inputFieldEl = document.getElementById("input-field")
const addButtonEl  = document.getElementById("add-button")
let shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function(){
let inputValue = inputFieldEl.value
   push(shoppingInDB, inputValue)
   clearInputField()
 })
   
onValue(shoppingInDB, function(snapshot) {//fetching or updating values in database for that we using onValue()
  if(snapshot.exists()){
  let shoppingArr = Object.entries(snapshot.val())
 //console.log(shoppingArr)
 clearShoppingListEl()
  for(let i=0;i<shoppingArr.length; i++){
   let currentItem =   shoppingArr[i]
   let currentItemID = currentItem[0]
   let currentItemValue = currentItem[1]
  appendingItem(currentItem)
  }
}
else{
  shoppingListEl.innerHTML="No item here...yet!"
}
})

function clearInputField()
{
  inputFieldEl.value = " "
}
function clearShoppingListEl(){
  shoppingListEl.innerHTML = " "
}
function appendingItem(item)
{
  //shoppingListEl.innerHTML += `<li> ${newItem} </li>`
  let itemId = item[0]
  let itemValue = item[1]
  let newEl = document.createElement("li")
  newEl.textContent = itemValue
  newEl.addEventListener("dblclick" , function(){
    //console.log(itemId)
   let exactLocationInDB = ref(database, `shopping_Database/${itemId}`)
    remove(exactLocationInDB)
    
  })
  shoppingListEl.append(newEl)
}
 