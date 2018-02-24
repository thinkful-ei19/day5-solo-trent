'use strict';



const STORE = {
  items: [
  {name: "apples", id: uuidv4() ,checked: false},
  {name: "oranges", id: uuidv4(), checked: false},
  {name: "milk", id: uuidv4(), checked: true},
  {name: "bread", id: uuidv4(), checked: false}
  ],
  
  hideCompleted: false, 
  searchTerm: null,
}


function generateItemElement(item) {
  return `
    <li class="js-item-id-element" data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
        <form id="edit-button-form">
          <input type="text" name="edit-button-entry" class="edit-button-entry" placeholder="Enter new item here">
          <button type="submit">Edit</button>
        </form>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  const items = shoppingList.map((item) => generateItemElement(item));
  
  return items.join("");
}


function renderShoppingList() {
  // render the shopping list in the DOM
  
  let arrayToRender = STORE.items


  if (STORE.hideCompleted === true){
    arrayToRender = arrayToRender.filter(item => item.checked === false);
    // shoppingListItemsString = generateShoppingItemsString(STORE.items.filter(item => item.checked === false)) ;
  }

  if (STORE.searchTerm !== null) {
    arrayToRender = arrayToRender.filter(item => item.name === STORE.searchTerm);
    // shoppingListItemsString = generateShoppingItemsString(STORE.items.filter(item => item.name === STORE.searchTerm));
  }

  let shoppingListItemsString = generateShoppingItemsString(arrayToRender);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
  
}


function addItemToShoppingList(itemName) {
  STORE.items.push({name: itemName, id: uuidv4(), checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemId) {
  STORE.items.find(element => element.id === itemId).checked = !STORE.items.find(element => element.id === itemId).checked;
}


function getItemIdFromElement(item) {
  const itemIdString = $(item)
    .closest('.js-item-id-element')
    .attr('data-item-id');
  return itemIdString;
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    const itemId = getItemIdFromElement(event.currentTarget);
    console.log(itemId,event.currentTarget);

    toggleCheckedForListItem(itemId);
    renderShoppingList();
  });
}

function deleteListItem(itemId) {
  STORE.items = STORE.items.filter(element => element.id !== itemId);
}

function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', `.js-item-delete`, event => {
    const itemId = getItemIdFromElement(event.currentTarget);
    deleteListItem(itemId);
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


function updateSearchTerm(searchTerm) {
  STORE.searchTerm = searchTerm;
}



function handleSearchBar() {
  $('#search-bar').submit(function(event) {
    event.preventDefault();
    let userSearchTerm = $('.search-entry').val();
    console.log(userSearchTerm);
    if (userSearchTerm === '') {
      userSearchTerm = null; 
    }
    updateSearchTerm(userSearchTerm);
    this.reset();
    renderShoppingList();
  })
}



function editListItem(itemId, editedName) {
  let itemsStoreIndex = STORE.items.findIndex(listObj => listObj.id === itemId);
  STORE.items[itemsStoreIndex].name = editedName;
  // console.log();
}


function handleEditItem() {
  $('.js-shopping-list').on('click', `.js-item-edit`, event => {
    const itemId = getItemIdFromElement(event.currentTarget);
    // event listener to submit the input
    // take user input and change store
    // editListItem(itemId, editedName);
    renderShoppingList();
  });
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
  handleSearchBar();
  handleEditItem();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);