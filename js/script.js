import { receipts } from "./receipts.js";

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
const tags = document.getElementById("tags");
const tagsArray = [{key: "global", label: "global", targetted: []}, {key: "ingredients", label: "ingredients", targetted: []}, {key: "appareils", label: "appareils", targetted: []}, {key: "ustensils", label: "ustensils", targetted: []}];
const referenceArray = [{key: "ingredients", data: []}, {key: "appareils", data: []}, {key: "ustensiles", data: []}];

/////////////////////////////////////////////////////////////

function getRecipe(){
    receipts.forEach(function(recipe){
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

function reference(){
    aboutIngredients();
    aboutAppliances();
    aboutUstensils();

    function aboutIngredients(){
        ingredientsArray.forEach(function(ingredientArray){
            let ingredientKey = ingredientArray.split(' ').join('-').toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g,"").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            
            referenceArray.forEach(function(object){
                if(object.key === "ingredients"){   
                    if(!object.data.find(element => element.key === ingredientKey)){
                        object.data.push({key: ingredientKey, receipts: []});
                    }
                } 
            });
        });

        receipts.forEach(function(recipe){
            const recipeId = recipe.id;
            recipe.ingredients.forEach(function(ingredient){
                const ingredientName = ingredient.ingredient.split(' ').join('-').toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g,"").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
                referenceArray.forEach(function(object){   
                    if(object.key === "ingredients"){   
                        object.data.forEach(function(ingredientData){
                            if(ingredientName === ingredientData.key){
                                ingredientData.receipts.push(recipeId);
                            }
                        });
                    }
                });
            });
        });
    }
    
    function aboutAppliances(){
        appliancesArray.forEach(function(appliance){
            let applianceKey = appliance.split(' ').join('-').toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g,"").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
            referenceArray.forEach(function(object){
                if(object.key === "appareils"){
                    if(!object.data.find(element => element.key === applianceKey)){
                        object.data.push({key: applianceKey, receipts: []});
                    } 
                }
            });
        });
    
        receipts.forEach(function(recipe){
            const recipeId = recipe.id;
            const applianceName = recipe.appliance.split(' ').join('-').toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g,"").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            referenceArray.forEach(function(object){   
                if(object.key === "appareils"){   
                    object.data.forEach(function(applianceData){
                        if(applianceName === applianceData.key){
                            applianceData.receipts.push(recipeId);
                        }
                    });
                }
            });
            
        });
    }

    function aboutUstensils(){
        ustensilsArray.forEach(function(ustensil){
            let ustensilKey = ustensil.split(' ').join('-').toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g,"").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
            referenceArray.forEach(function(object){
                if(object.key === "ustensiles"){
                    if(!object.data.find(element => element.key === ustensilKey)){
                        object.data.push({key: ustensilKey, receipts: []});
                    } 
                }
            });
        });

        receipts.forEach(function(recipe){
            const recipeId = recipe.id;
            recipe.ustensils.forEach(function(ustensil){
                const ustensilName = ustensil.split(' ').join('-').toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g,"").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
                referenceArray.forEach(function(object){   
                    if(object.key === "ustensiles"){   
                        object.data.forEach(function(ustensilData){
                            if(ustensilName === ustensilData.key){
                                ustensilData.receipts.push(recipeId);
                            }
                        });
                    }
                });
            });
        });
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
        addIngredientsTagsToArray();
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
        addAppliancesTagsToArray();
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
        addUstensilsTagsToArray();
    }else if(ustensilValue.length === 0){
        hideDropdown(ustensilsList);
        refreshList(ustensilsList);
        displayUstensilsList(ustensilsArray);
        inputUstensils.style.width = "140px";
    }
}

/////////////////////////////////////////////////////////////

// add ingredients tags, appliances tags, ustensils tags to tagsArray
function addIngredientsTagsToArray(){
    const ingredients = document.querySelectorAll("#ingredients-list li a");

    ingredients.forEach(function(ingredient){
        ingredient.addEventListener("click", function(){
            let targettedIngredient = ingredient.textContent.split(' ').join('-').toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g,"").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            tagsArray.forEach(function(object){
                if(object.key === "ingredients"){
                    
                    if(!object.targetted.find(o => o.key === targettedIngredient)){
                        const targettedObject = {key: targettedIngredient, label: ingredient.textContent};
                        object.targetted.push(targettedObject);
                        tags.innerHTML += `<button class="ingredient-tag">${targettedObject.label}<i class="fa-regular fa-circle-xmark"></i></button>`;
                    }
                }
            });
            
            console.log("tagsArray", tagsArray);
            deleteTag();
        })
    })  
}

function addAppliancesTagsToArray(){
    const appliances = document.querySelectorAll("#appliances-list li a");

    appliances.forEach(function(appliance){
        appliance.addEventListener("click", function(){
            let targettedAppliance = appliance.textContent.split(' ').join('-').toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g,"").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            tagsArray.forEach(function(object){
                if(object.key === "appareils"){
                    
                    if(!object.targetted.find(o => o.key === targettedAppliance)){
                        const targettedObject = {key: targettedAppliance, label: appliance.textContent};
                        object.targetted.push(targettedObject);
                        tags.innerHTML += `<button class="appliance-tag">${targettedObject.label}<i class="fa-solid fa-circle-xmark"></i></button>`;
                    }
                }
            });

            console.log("tagsArray", tagsArray);
            deleteTag();
        })
    })
}

function addUstensilsTagsToArray(){
    const ustensils = document.querySelectorAll("#ustensils-list li a");

    ustensils.forEach(function(ustensil){
        ustensil.addEventListener("click", function(){
            let targettedUstensil = ustensil.textContent.split(' ').join('-').toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g,"").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            
            tagsArray.forEach(function(object){
                if(object.key === "ustensils"){
                    
                    if(!object.targetted.find(o => o.key === targettedUstensil)){
                        const targettedObject = {key: targettedUstensil, label: ustensil.textContent};
                        object.targetted.push(targettedObject);
                        tags.innerHTML += `<button class="ustensil-tag">${targettedObject.label}<i class="fa-solid fa-circle-xmark"></i></button>`;
                    }
                }
            });

            console.log("tagsArray", tagsArray);
            deleteTag();
        })
    })
}

function deleteTag(){
    const activeTags = document.querySelectorAll("#tags button");

    activeTags.forEach(function(activeTag, index){
        activeTag.addEventListener("click", function(e){
            tagsArray.splice(index, 1);
            console.log(tags.childNodes[index])
            tags.removeChild(tags.childNodes[index]);
            console.log(tagsArray)
        })
    }) 
}

/////////////////////////////////////////////////////////////

function init(){
    getRecipe();
    reference();
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
            addIngredientsTagsToArray()
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
            addAppliancesTagsToArray();
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
            addUstensilsTagsToArray();
        }
    })

    inputIngredients.addEventListener("input", function(){
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
            addIngredientsTagsToArray()
        }
    })

    inputAppliances.addEventListener("input", function(){
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
            addAppliancesTagsToArray();
        }
    });

    inputUstensils.addEventListener("input", function(){
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
            addUstensilsTagsToArray();
        }
    })

    recipeButton.addEventListener("click", filterByAll);
    inputIngredients.addEventListener("input", filterByIngredients);
    inputAppliances.addEventListener("input", filterByAppliances);
    inputUstensils.addEventListener("input", filterByUstensils);

}

init();






