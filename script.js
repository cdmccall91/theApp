// Storage Controller

// Item Controller
const ItemCtrl = (function(){
    // Item Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure / State
    const data = {
        items: [],
        currentItem: null,
        totalCalories: 0
    }

    // Public Methods
    return {
        getItems: function(){
            return data.items;
        },
        addItem: function(name, calories){
            let ID;
            // Create ID
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id +1
            } else {
                ID = 0;
            }

            // Calories to number
            calories = parseInt(calories);

            // Create new item
            newItem = new Item(ID, name, calories);

            // Add to items array
            data.items.push(newItem);

            return newItem;
        },
        getItemById: function(id){
            let found = null;
            // Loop through items
            data.items.forEach(function(item){
                if(item.id === id){
                    found = item;
                }
            });
            return found;
        },
        setCurrentItem: function(item){
            data.currentItem = item;
        },
        getCurrentItem: function(){
            return data.currentItem;
        },
        getTotalCalories: function(){
            let total = 0;

            // Loop through items and add cals
            data.items.forEach(function(item){
                total += item.calories;
            });

            // Set total cal in data structure
            data.totalCalories = total;

            // Return total
            return data.totalCalories;
        },
        logData: function(){
            return data;
        }
    }
})();
// UI Controller
const UICtrl = (function(){
    const UISelectors = {
        foodList: '#food-list',
        addMealBtn: '#add-meal-btn',
        updateBtn: '#update-btn',
        deleteBtn: '#delete-btn',
        backBtn: '#back-btn',
        foodNameInput: '#food-name',
        caloriesInput: '#calories-input',
        totalCalories: '#calories-number'
    }
    
    // Public Methods
    return {
        populateItemList: function(items){
            let html = '';

            items.forEach(function(item){
                html += `                        <li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            </li>`;
            });

            // Insert list items
            document.querySelector(UISelectors.foodList).innerHTML = html;
        },
        getItemInput: function(){
            return {
                name:document.querySelector(UISelectors.foodNameInput).value,
                calories:document.querySelector(UISelectors.caloriesInput).value
            }
        },
        addListItem: function(item){
            // Create li element
            const li = document.createElement('li');
            // Add class
            li.className = 'collection-item';
            // Add ID
            li.id = `item-${item.id}`;
            // Add HTML
            li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`;
            // Insert item
            document.querySelector(UISelectors.foodList).insertAdjacentElement('beforeend', li);
        },
        clearInput: function(){
            document.querySelector(UISelectors.foodNameInput).value = '';
            document.querySelector(UISelectors.caloriesInput).value = '';
        },
        addItemToForm: function(){
            document.querySelector(UISelectors.foodNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.caloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        clearEditState: function(){
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addMealBtn).style.display = 'inline';
        },
        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addMealBtn).style.display = 'none';
        },
        getSelectors: function(){
            return UISelectors;
        }
    }
})();
// App Controller
const App = (function(ItemCtrl, UICtrl){
    // Load event listeners
    const loadEventListeners = function(){
        // Get UI Selectors
        const UISelectors = UICtrl.getSelectors();

        // Add item event
        document.querySelector(UISelectors.addMealBtn).addEventListener('click', itemAddSubmit);

        // Edit icon click event
        document.querySelector(UISelectors.foodList).addEventListener('click', itemUpdateSubmit);
    }

    // Add item submit
    const itemAddSubmit = function(e){
        // Get form input from UI Controller
        const input = UICtrl.getItemInput();

        // Check for name and calorie input
        if(input.name !== '' && input.calories !== ''){
            // Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            // Add item to UI list
            UICtrl.addListItem(newItem);
            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);
            // Clear fields
            UICtrl.clearInput();
        }

        e.preventDefault();
    }

    // Update item submit
    const itemUpdateSubmit = function(e){
        if(e.target.classList.contains('edit-item')){
            // Get list item id (item-o, item-1)
            const listId = e.target.parentNode.parentNode.id;

            // Break into an array
            const listIdArr = listId.split('-');
            // Get the actual id
            const id = parseInt(listIdArr[1]);
            // Get item
            const itemToEdit = ItemCtrl.getItemById(id);
            // Set current item
            ItemCtrl.setCurrentItem(itemToEdit);
            // Add item to form
            UICtrl.addItemToForm();
        }

        e.preventDefault();
    }

    // Public Methods
    return {
        init: function(){
            // Clear edit stat / set initial state
            UICtrl.clearEditState();
            // Fetch items from data structure
            const items = ItemCtrl.getItems();
            // Populate list with items
            UICtrl.populateItemList(items);
            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);
            // Load event listeners
            loadEventListeners();
        }
    }

})(ItemCtrl, UICtrl);

// Initialize App
App.init();


const inputs = document.querySelectorAll(".inputs");
const navBtns = document.querySelectorAll('.nav-btn');
const cards = document.querySelectorAll('.cards');
const caloriesCard = document.getElementById('calories-card');
const pushUpsCard = document.getElementById('push-ups-card');
const stepsCard = document.getElementById('steps-card');

inputs.forEach((input) => {
    input.addEventListener('focus', () => {
        input.parentNode.style.color="var(--orange-color)";
    });
    input.addEventListener('focusout', () => {
        input.parentNode.style.color="black";
    });
});

// This adds the "Active" class to the correct button, and reveals it's card
navBtns.forEach(function(btn) {
    btn.addEventListener('click', () => {
        for (let i = 0; i < navBtns.length; i++){
            navBtns[i].classList.remove('active');
        }
        btn.classList.add('active');
        for (let i = 0; i < cards.length; i++){
            cards[i].classList.add('hide');
        };
        if (btn.classList.contains('push-ups-btn')){
            pushUpsCard.classList.remove('hide');
        } else if (btn.classList.contains('calories-btn')){
            caloriesCard.classList.remove('hide');
        } else {
            stepsCard.classList.remove('hide');
        }
    });
});
