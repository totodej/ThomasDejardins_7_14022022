import { recipes } from "./recipes.js";

const ingredientsArray = [];
const appliancesArray = [];
const ustensilsArray = [];
const ingredientsList = document.getElementById("ingredients-list");
const appliancesList = document.getElementById("appliances-list");
const ustensilsList = document.getElementById("ustensils-list");
const chevronIngredients = document.getElementById("chevron-ingredients");
const chevronAppliances = document.getElementById("chevron-appliances");
const chevronUstensils = document.getElementById("chevron-ustensils")
const inputIngredients = document.getElementById("input-ingredients");
const inputAppliances = document.getElementById("input-appliances");
const inputUstensils = document.getElementById("input-ustensils");
const recipeButton = document.getElementById("recipe-button");


/////////////////////////////////////////////////////////////

function getRecipe(){
    recipes.forEach(function(recipe){
        const ingredients = recipe.ingredients;
        const ustensils = recipe.ustensils;
        const appliance = recipe.appliance;
    
        setArrays(ingredients, ustensils, appliance);
        displayCard(recipe);
    });

    function displayCard(recipe){
        const cards = document.getElementById("cards");
        const recipeDOM = getRecipeDOM(recipe.name, recipe.time, recipe.description);
    
        cards.appendChild(recipeDOM);
    
        function getRecipeDOM(name, time, description){
            const article = document.createElement("article");
            article.innerHTML = 
            `<div class="card-img-top"></div>
            <div class="card-body">
                <div class="card-body-header">
                    <h1>${name}</h1>
                    <p><i class="far fa-clock"></i>${time} min</p>
                </div>
                <div class="card-body-description">
                    <ul>${recipe.ingredients.map(ingredient =>`<li><strong>${ingredient.ingredient}</strong>: ${ingredient.quantity === undefined ? "": ingredient.quantity} ${ingredient.unit === undefined ? "": ingredient.unit} </li>`).join('')}</ul>
                    <p>${description}</p>
                </div>
            </div>`;
    
            return article;
        }    
    }
    
    // add ingredients, ustensils, appliance to arrays
    function setArrays(ingredients, ustensils, appliance){
        ingredients.forEach(function(ingredient){
            if(ingredientsArray.indexOf(ingredient.ingredient) === -1){
                ingredientsArray.push(ingredient.ingredient)  
            }
        });
    
        ustensils.forEach(function(ustensil){
            if(ustensilsArray.indexOf(ustensil) === -1){
                ustensilsArray.push(ustensil)  
            }
        });
    
        if(appliancesArray.indexOf(appliance) === -1){
            appliancesArray.push(appliance)  
        }
    }
}

/////////////////////////////////////////////////////////////

function displayIngredientsList(array){
    refreshList(ingredientsList);
    array.forEach(function(ingredient, index){
        ingredientsList.innerHTML += `<li><a href="#" id="ingredient-${index}">${ingredient}</a></li>`;
    });
}

function displayAppliancesList(array){
    refreshList(appliancesList);
    array.forEach(function(appliance, index){
        appliancesList.innerHTML += `<li><a href="#" id="appliance-${index}">${appliance}</a></li>`;
    })
}

function displayUstensilsList(array){
    refreshList(ustensilsList);
    array.forEach(function(ustensil, index){
        ustensilsList.innerHTML += `<li><a href="#" id="ustensil-${index}">${ustensil}</a></li>`;
    });
}

/////////////////////////////////////////////////////////////

function showDropdown(element){
    element.style.display = "grid";
}

function hideDropdown(element){
    element.style.display = "none";
}

function refreshList(element){
    element.innerHTML = "";
}

/////////////////////////////////////////////////////////////

function filterByAll(){
    const recipeValue = document.getElementById("recipe-input").value.toLowerCase();

    console.log(recipeValue)   
}

function filterByIngredients(e){
    const ingredientValue = e.target.value.toLowerCase();

    if(ingredientValue.length >= 3){
        refreshList(ingredientsList);
        const ingredientsResult = ingredientsArray.filter(ingredient => ingredient.toLowerCase().includes(ingredientValue));
        console.log(ingredientsResult);
        displayIngredientsList(ingredientsResult);
        showDropdown(ingredientsList);
        inputIngredients.style.width = "566px";
    }else if(ingredientValue.length === 0){
        hideDropdown(ingredientsList);
        refreshList(ingredientsList);
        displayIngredientsList(ingredientsArray);
        inputIngredients.style.width = "140px";
    }
}

function filterByAppliances(e){
    const applianceValue = e.target.value.toLowerCase();

    if(applianceValue.length >= 3){
        refreshList(appliancesList);
        const appliancesResult = appliancesArray.filter(appliance => appliance.toLowerCase().includes(applianceValue));
        console.log(appliancesResult);
        displayAppliancesList(appliancesResult);
        showDropdown(appliancesList);
        inputAppliances.style.width = "566px";
    }else if(applianceValue.length === 0){
        hideDropdown(appliancesList);
        refreshList(appliancesList);
        displayAppliancesList(appliancesArray);
        inputAppliances.style.width = "140px";
    }
}

function filterByUstensils(e){
    const ustensilValue = e.target.value.toLowerCase();

    if(ustensilValue.length >= 3){
        refreshList(ustensilsList);
        const ustensilsResult = ustensilsArray.filter(ustensil => ustensil.toLowerCase().includes(ustensilValue));
        console.log(ustensilsResult);
        displayUstensilsList(ustensilsResult);
        showDropdown(ustensilsList);
        inputUstensils.style.width = "566px";
    }else if(ustensilValue.length === 0){
        hideDropdown(ustensilsList);
        refreshList(ustensilsList);
        displayUstensilsList(ustensilsArray);
        inputUstensils.style.width = "140px";
    }
}

/////////////////////////////////////////////////////////////

function init(){
    getRecipe();
    displayIngredientsList(ingredientsArray);
    displayAppliancesList(appliancesArray);
    displayUstensilsList(ustensilsArray);

    chevronIngredients.addEventListener("click", function(){
        if(ingredientsList.style.display === "grid"){
            hideDropdown(ingredientsList);
            inputIngredients.style.width = "140px";
        } else {
            showDropdown(ingredientsList);
            hideDropdown(appliancesList);
            hideDropdown(ustensilsList);
            inputIngredients.style.width = "566px";
            inputAppliances.style.width = "140px";
            inputUstensils.style.width = "140px";
        }
    });
    
    chevronAppliances.addEventListener("click", function(){
        if(appliancesList.style.display === "grid"){
            hideDropdown(appliancesList);
            inputAppliances.style.width = "140px";
        } else {
            showDropdown(appliancesList);
            hideDropdown(ingredientsList);
            hideDropdown(ustensilsList);
            inputAppliances.style.width = "566px";
            inputIngredients.style.width = "140px";
            inputUstensils.style.width = "140px";
        }
    });
    
    chevronUstensils.addEventListener("click", function(){
        if(ustensilsList.style.display === "grid"){
            hideDropdown(ustensilsList);
            inputUstensils.style.width = "140px";
        } else {
            showDropdown(ustensilsList);
            hideDropdown(ingredientsList);
            hideDropdown(appliancesList);
            inputUstensils.style.width = "566px";
            inputIngredients.style.width = "140px";
            inputAppliances.style.width = "140px";
        }
    })

    recipeButton.addEventListener("click", filterByAll);
    inputIngredients.addEventListener("input", filterByIngredients);
    inputAppliances.addEventListener("input", filterByAppliances);
    inputUstensils.addEventListener("input", filterByUstensils);
}

init();





