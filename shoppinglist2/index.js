'use strict';

const STORE = {
  items: [
  {name: "apples", id: 1 ,checked: false},
  {name: "oranges", id: 2, checked: false},
  {name: "milk", id: 3, checked: true},
  {name: "bread", id: 4, checked: false}
  ],
  
  hideCompleted: false, 

}


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
  return items.join("");
}


function renderShoppingList() {
  // render the shopping list in the DOM
  // const allItems = generateShoppingItemsString(STORE.items);
  // const filteredItems = generateShoppingItemsString(STORE.items.filter(item => item.checked === false));
  let shoppingListItemsString = generateShoppingItemsString(STORE.items);
  
  if (STORE.hideCompleted === true){
    shoppingListItemsString = generateShoppingItemsString(STORE.items.filter(item => item.checked === false)) ;
  }



  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
  
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, id: STORE.items.length + 1, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  console.log("Toggling checked property for item at index " + itemIndex);
  STORE.items.find(element => element.id === itemIndex).checked = !STORE.items.find(element => element.id === itemIndex).checked;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    console.log(itemIndex,event.currentTarget);

    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function deleteListItem(itemIndex) {
  console.log('delete check for item');
  // STORE.items.splice(STORE.items.find(element => element.id === itemIndex).id - 1, 1);
  STORE.items = STORE.items.filter(element => element.id !== itemIndex);
}

function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', `.js-item-delete`, event => {
    console.log('`handleItemCheckDelete` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteListItem(itemIndex);
    renderShoppingList();
  });
}


function toggleHideCompleted(){
  STORE.hideCompleted = !STORE.hideCompleted;
  console.log('hidecompleted is ' + STORE.hideCompleted);
}


function handleToggleBox() {
  $('#checkBox').change(function() {
    console.log('toggle box clicked');
    toggleHideCompleted();
    renderShoppingList();

  })
}


// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleToggleBox();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);