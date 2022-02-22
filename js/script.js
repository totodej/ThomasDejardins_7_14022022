import { recipes } from "./recipes.js";

const ingredientsArray = [];
const appliancesArray = [];
const ustensilsArray = [];

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


function init(){
    getRecipe();
}

init();





