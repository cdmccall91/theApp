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
        foodNameInput: '#food-name',
        caloriesInput: '#calories-input'
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
            // Clear fields
            UICtrl.clearInput();
        }

        e.preventDefault();
    }

    // Public Methods
    return {
        init: function(){
            // Fetch items from data structure
            const items = ItemCtrl.getItems();

            // Populate list with items
            UICtrl.populateItemList(items);

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
