import { receipts } from "./receipts.js";

const ingredientsArray = [];
const appliancesArray = [];
const ustensilsArray = [];
const ingredientsList = document.getElementById("ingredients-list");
const appliancesList = document.getElementById("appliances-list");
const ustensilsList = document.getElementById("ustensils-list");
const chevronIngredients = document.getElementById("chevron-ingredients");
const chevronAppliances = document.getElementById("chevron-appliances");
const chevronUstensils = document.getElementById("chevron-ustensils");
const inputIngredients = document.getElementById("input-ingredients");
const inputAppliances = document.getElementById("input-appliances");
const inputUstensils = document.getElementById("input-ustensils");
const recipeInput = document.getElementById("recipe-input");
const tags = document.getElementById("tags");
const referenceArray = [
  { key: "global", data: [] },
  { key: "ingredients", data: [] },
  { key: "appareils", data: [] },
  { key: "ustensils", data: [] },
];
const formStateArray = [
  { key: "global", value: "", data: [] },
  { key: "ingredients", value: undefined, data: [] },
  { key: "appareils", value: undefined, data: [] },
  { key: "ustensils", value: undefined, data: [] },
];
let receiptsToShow = [];
let receiptsIdToShow = [];
let globalReceiptsId = [];

/////////////////////////////////////////////////////////////

function getRecipe() {
  receipts.forEach(function (recipe) {
    const ingredients = recipe.ingredients;
    const ustensils = recipe.ustensils;
    const appliance = recipe.appliance;

    setArrays(ingredients, ustensils, appliance);
    displayCard(recipe);
  });

  function displayCard(recipe) {
    const cards = document.getElementById("cards");
    const recipeDOM = getRecipeDOM(
      recipe.name,
      recipe.time,
      recipe.description
    );

    cards.appendChild(recipeDOM);

    function getRecipeDOM(name, time, description) {
      const article = document.createElement("article");
      article.innerHTML = `<div class="card-img-top"></div>
            <div class="card-body">
                <div class="card-body-header">
                    <h1>${name}</h1>
                    <p><i class="far fa-clock"></i>${time} min</p>
                </div>
                <div class="card-body-description">
                    <ul>${recipe.ingredients
                      .map(
                        (ingredient) =>
                          `<li><strong>${ingredient.ingredient}</strong>: ${
                            ingredient.quantity === undefined
                              ? ""
                              : ingredient.quantity
                          } ${
                            ingredient.unit === undefined ? "" : ingredient.unit
                          } </li>`
                      )
                      .join("")}</ul>
                    <p>${description}</p>
                </div>
            </div>`;

      return article;
    }
  }

  // add ingredients, ustensils, appliance to arrays
  function setArrays(ingredients, ustensils, appliance) {
    ingredients.forEach(function (ingredient) {
      if (ingredientsArray.indexOf(ingredient.ingredient) === -1) {
        ingredientsArray.push(ingredient.ingredient);
      }
    });

    ustensils.forEach(function (ustensil) {
      if (ustensilsArray.indexOf(ustensil) === -1) {
        ustensilsArray.push(ustensil);
      }
    });

    if (appliancesArray.indexOf(appliance) === -1) {
      appliancesArray.push(appliance);
    }
  }
}

/////////////////////////////////////////////////////////////

// display ingredients list to the ingredients filter
function displayIngredientsList(array) {
  refreshList(ingredientsList);
  array.forEach(function (ingredient, index) {
    ingredientsList.innerHTML += `<li><a href="#" id="ingredient-${index}">${ingredient}</a></li>`;
  });
}

// display appliances list to the appliances filter
function displayAppliancesList(array) {
  refreshList(appliancesList);
  array.forEach(function (appliance, index) {
    appliancesList.innerHTML += `<li><a href="#" id="appliance-${index}">${appliance}</a></li>`;
  });
}

// display ustensils list to the ustensils filter
function displayUstensilsList(array) {
  refreshList(ustensilsList);
  array.forEach(function (ustensil, index) {
    ustensilsList.innerHTML += `<li><a href="#" id="ustensil-${index}">${ustensil}</a></li>`;
  });
}

/////////////////////////////////////////////////////////////

// put each word with their ids to the referenceArray
function reference() {
  aboutGlobal();
  aboutIngredients();
  aboutAppliances();
  aboutUstensils();

  function aboutGlobal() {
    const array = [];
    receipts.forEach(function (recipe) {
      const title = array.push(
        recipe.name
          .split(" ")
          .join("-")
          .toLocaleLowerCase()
          .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      );

      recipe.name
        .split(" ")
        .join("-")
        .split("-")
        .forEach(function (word) {
          word = word
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/'/g, "-");
          array.push(word);
        });

      recipe.description
        .split(" ")
        .join("-")
        .split("-")
        .forEach(function (word) {
          word = word
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/'/g, "-");
          array.push(word);
        });
    });

    array.forEach(function (word) {
      referenceArray.forEach(function (object) {
        if (object.key === "global") {
          if (!object.data.find((element) => element.key === word)) {
            object.data.push({ key: word, receiptsId: [] });
          }
        }
      });
    });

    referenceArray.forEach(function (object) {
      if (object.key === "global") {
        object.data.forEach(function (dataWord) {
          receipts.forEach(function (recipe) {
            const recipeKeyName = recipe.name
              .split(" ")
              .join("-")
              .toLocaleLowerCase()
              .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "");

            if (dataWord.key === recipeKeyName) {
              if (!dataWord.receiptsId.includes(recipe.id)) {
                dataWord.receiptsId.push(recipe.id);
              }
            }
          });
        });
      }
    });

    referenceArray.forEach(function (object) {
      if (object.key === "global") {
        object.data.forEach(function (dataWord) {
          receipts.forEach(function (recipe) {
            recipe.name
              .split(" ")
              .join("'")
              .split("'")
              .join("-")
              .split("-")
              .forEach(function (word) {
                word = word
                  .toLowerCase()
                  .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "")
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "");

                if (dataWord.key === word) {
                  if (!dataWord.receiptsId.includes(recipe.id)) {
                    dataWord.receiptsId.push(recipe.id);
                  }
                }
              });

            recipe.description
              .split(" ")
              .join("'")
              .split("'")
              .join("-")
              .split("-")
              .forEach(function (word) {
                word = word
                  .toLowerCase()
                  .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "")
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "");

                if (dataWord.key === word) {
                  if (!dataWord.receiptsId.includes(recipe.id)) {
                    dataWord.receiptsId.push(recipe.id);
                  }
                }
              });
          });
        });
      }
    });
  }

  function aboutIngredients() {
    ingredientsArray.forEach(function (ingredientArray) {
      let ingredientKey = ingredientArray
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      referenceArray.forEach(function (object) {
        if (object.key === "ingredients") {
          if (!object.data.find((element) => element.key === ingredientKey)) {
            object.data.push({ key: ingredientKey, receiptsId: [] });
          }
        }
      });
    });

    receipts.forEach(function (recipe) {
      const recipeId = recipe.id;
      recipe.ingredients.forEach(function (ingredient) {
        const ingredientName = ingredient.ingredient
          .split(" ")
          .join("-")
          .toLowerCase()
          .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        referenceArray.forEach(function (object) {
          if (object.key === "ingredients") {
            object.data.forEach(function (ingredientData) {
              if (ingredientName === ingredientData.key) {
                ingredientData.receiptsId.push(recipeId);
              }
            });
          }
        });
      });
    });
  }

  function aboutAppliances() {
    appliancesArray.forEach(function (appliance) {
      let applianceKey = appliance
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      referenceArray.forEach(function (object) {
        if (object.key === "appareils") {
          if (!object.data.find((element) => element.key === applianceKey)) {
            object.data.push({ key: applianceKey, receiptsId: [] });
          }
        }
      });
    });

    receipts.forEach(function (recipe) {
      const recipeId = recipe.id;
      const applianceName = recipe.appliance
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      referenceArray.forEach(function (object) {
        if (object.key === "appareils") {
          object.data.forEach(function (applianceData) {
            if (applianceName === applianceData.key) {
              applianceData.receiptsId.push(recipeId);
            }
          });
        }
      });
    });
  }

  function aboutUstensils() {
    ustensilsArray.forEach(function (ustensil) {
      let ustensilKey = ustensil
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      referenceArray.forEach(function (object) {
        if (object.key === "ustensils") {
          if (!object.data.find((element) => element.key === ustensilKey)) {
            object.data.push({ key: ustensilKey, receiptsId: [] });
          }
        }
      });
    });

    receipts.forEach(function (recipe) {
      const recipeId = recipe.id;
      recipe.ustensils.forEach(function (ustensil) {
        const ustensilName = ustensil
          .split(" ")
          .join("-")
          .toLowerCase()
          .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        referenceArray.forEach(function (object) {
          if (object.key === "ustensils") {
            object.data.forEach(function (ustensilData) {
              if (ustensilName === ustensilData.key) {
                ustensilData.receiptsId.push(recipeId);
              }
            });
          }
        });
      });
    });
  }
}

/////////////////////////////////////////////////////////////

function formState() {
  function filterByNamesDescriptions() {
    const recipeValue = recipeInput.value;
    const recipeValueKey = recipeValue
      .split(" ")
      .join("-")
      .toLocaleLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    formStateArray.forEach(function (objectFormState) {
      if (objectFormState.key === "global") {
        objectFormState.value = recipeValue;
        if (recipeValue.length >= 3) {
          objectFormState.data = [];
          referenceArray.forEach(function (objectReferenceArray) {
            objectReferenceArray.data.filter(function (
              dataObjectReferenceArray
            ) {
              if (dataObjectReferenceArray.key.includes(recipeValueKey)) {
                objectFormState.data.push({
                  key: dataObjectReferenceArray.key,
                });
              }
            });
          });
        } else {
          objectFormState.data = [];
        }
      }
    });

    algoA();
  }

  function filterByIngredients(e) {
    const ingredientValue = e.target.value.toLowerCase();

    if (ingredientValue.length >= 3) {
      refreshList(ingredientsList);
      const ingredientsResult = ingredientsArray.filter((ingredient) =>
        ingredient.toLowerCase().includes(ingredientValue)
      );

      displayIngredientsList(ingredientsResult);
      showDropdown(ingredientsList);
      inputIngredients.style.width = "566px";
      addIngredientsTagsToFormState();
    } else {
      hideDropdown(ingredientsList);
      refreshList(ingredientsList);
      displayIngredientsList(ingredientsArray);
      inputIngredients.style.width = "140px";
    }
  }

  function filterByAppliances(e) {
    const applianceValue = e.target.value.toLowerCase();

    if (applianceValue.length >= 3) {
      refreshList(appliancesList);
      const appliancesResult = appliancesArray.filter((appliance) =>
        appliance.toLowerCase().includes(applianceValue)
      );

      displayAppliancesList(appliancesResult);
      showDropdown(appliancesList);
      inputAppliances.style.width = "566px";
      addAppliancesTagsToFormState();
    } else {
      hideDropdown(appliancesList);
      refreshList(appliancesList);
      displayAppliancesList(appliancesArray);
      inputAppliances.style.width = "140px";
    }
  }

  function filterByUstensils(e) {
    const ustensilValue = e.target.value.toLowerCase();

    if (ustensilValue.length >= 3) {
      refreshList(ustensilsList);
      const ustensilsResult = ustensilsArray.filter((ustensil) =>
        ustensil.toLowerCase().includes(ustensilValue)
      );

      displayUstensilsList(ustensilsResult);
      showDropdown(ustensilsList);
      inputUstensils.style.width = "566px";
      addUstensilsTagsToFormState();
    } else {
      hideDropdown(ustensilsList);
      refreshList(ustensilsList);
      displayUstensilsList(ustensilsArray);
      inputUstensils.style.width = "140px";
    }
  }

  function displayIngredientsList(array) {
    refreshList(ingredientsList);
    array.forEach(function (ingredient, index) {
      ingredientsList.innerHTML += `<li><a href="#" id="ingredient-${index}">${ingredient}</a></li>`;
    });
  }

  function displayAppliancesList(array) {
    refreshList(appliancesList);
    array.forEach(function (appliance, index) {
      appliancesList.innerHTML += `<li><a href="#" id="appliance-${index}">${appliance}</a></li>`;
    });
  }

  function displayUstensilsList(array) {
    refreshList(ustensilsList);
    array.forEach(function (ustensil, index) {
      ustensilsList.innerHTML += `<li><a href="#" id="ustensil-${index}">${ustensil}</a></li>`;
    });
  }

  recipeInput.addEventListener("input", filterByNamesDescriptions);
  inputIngredients.addEventListener("input", filterByIngredients);
  inputAppliances.addEventListener("input", filterByAppliances);
  inputUstensils.addEventListener("input", filterByUstensils);
}

/////////////////////////////////////////////////////////////

// add ingredients tags to the FormStateArray
function addIngredientsTagsToFormState() {
  const ingredients = document.querySelectorAll("#ingredients-list li a");

  ingredients.forEach(function (ingredient) {
    ingredient.addEventListener("click", function () {
      let targettedIngredient = ingredient.textContent
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      formStateArray.forEach(function (object) {
        if (object.key === "ingredients") {
          if (!object.data.find((o) => o.key === targettedIngredient)) {
            const targettedObject = {
              key: targettedIngredient,
              value: ingredient.textContent,
            };
            object.data.push(targettedObject);
            tags.innerHTML += `<button class="ingredient-tag">${targettedObject.value} <i class="far">&#xf057</i></button>`;
          }
        }
      });

      deleteTag();
      algoA();
    });
  });
}

// add appliances tags to the FormStateArray
function addAppliancesTagsToFormState() {
  const appliances = document.querySelectorAll("#appliances-list li a");

  appliances.forEach(function (appliance) {
    appliance.addEventListener("click", function () {
      let targettedAppliance = appliance.textContent
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      formStateArray.forEach(function (object) {
        if (object.key === "appareils") {
          if (!object.data.find((o) => o.key === targettedAppliance)) {
            const targettedObject = {
              key: targettedAppliance,
              value: appliance.textContent,
            };
            object.data.push(targettedObject);
            tags.innerHTML += `<button class="appliance-tag">${targettedObject.value} <i class="far">&#xf057</i></button>`;
          }
        }
      });

      deleteTag();
      algoA();
    });
  });
}

// add ustensils tags to the FormStateArray
function addUstensilsTagsToFormState() {
  const ustensils = document.querySelectorAll("#ustensils-list li a");

  ustensils.forEach(function (ustensil) {
    ustensil.addEventListener("click", function () {
      let targettedUstensil = ustensil.textContent
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      formStateArray.forEach(function (object) {
        if (object.key === "ustensils") {
          if (!object.data.find((o) => o.key === targettedUstensil)) {
            const targettedObject = {
              key: targettedUstensil,
              value: ustensil.textContent,
            };
            object.data.push(targettedObject);
            tags.innerHTML += `<button class="ustensil-tag">${targettedObject.value} <i class="far">&#xf057</i></button>`;
          }
        }
      });

      deleteTag();
      algoA();
    });
  });
}

// take off the selected word of the FormStateArray
function deleteTag() {
  const activeTags = document.querySelectorAll("#tags button");

  activeTags.forEach(function (activeTag) {
    activeTag.addEventListener("click", function (e) {
      const activeTagKey = activeTag.textContent
        .substring(0, activeTag.textContent.length - 2)
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      formStateArray.forEach(function (objectFormStateArray) {
        objectFormStateArray.data.forEach(function (objectArrayData, index) {
          if (objectArrayData.key === activeTagKey) {
            objectFormStateArray.data.splice(index, 1);
            activeTag.remove();
          }
        });
      });

      algoA();
    });
  });
}

/////////////////////////////////////////////////////////////

function showDropdown(element) {
  element.style.display = "grid";
}

function hideDropdown(element) {
  element.style.display = "none";
}

function refreshList(element) {
  element.innerHTML = "";
}

/////////////////////////////////////////////////////////////

function algoA() {
  const copyFormStateArray = [...formStateArray];

  for (const objectFormStateArray of copyFormStateArray) {
    for (const objectArrayData of objectFormStateArray.data) {
      objectArrayData.receiptsId = [];
      for (const objectReferenceArray of referenceArray) {
        for (const dataReferenceArray of objectReferenceArray.data) {
          if (objectArrayData.key === dataReferenceArray.key) {
            for (const dataReferenceRecipeId of dataReferenceArray.receiptsId) {
              objectArrayData.receiptsId.push(dataReferenceRecipeId);
            }
          }
        }
      }

      let copyArrayReceiptsId = [];
      let count = 0;
      let start = false;

      for (const objectArrayDataRecipeId of objectArrayData.receiptsId) {
        for (const copyArrayRecipeId of copyArrayReceiptsId) {
          if (objectArrayDataRecipeId === copyArrayRecipeId) {
            start = true;
          }
        }
        count++;
        if (count === 1 && start === false) {
          copyArrayReceiptsId.push(objectArrayDataRecipeId);
        }
        start = false;
        count = 0;
      }
      objectArrayData.receiptsId = copyArrayReceiptsId;
    }
  }

  globalReceiptsId = [];
  for (const objectFormStateArray of copyFormStateArray) {
    if (objectFormStateArray.key === "global") {
      for (const objectArrayData of objectFormStateArray.data) {
        let count = 0;
        let start = false;
        for (const objectArrayDataRecipeId of objectArrayData.receiptsId) {
          for (const globalRecipeId of globalReceiptsId) {
            if (objectArrayDataRecipeId === globalRecipeId) {
              start = true;
            }
          }
          count++;
          if (count === 1 && start === false) {
            globalReceiptsId.push(objectArrayDataRecipeId);
          }
          start = false;
          count = 0;
        }
        objectArrayData.receiptsId = globalReceiptsId;
      }
    }
  }

  receiptsIdToShow = [];
  for (const objectFormStateArray of copyFormStateArray) {
    for (const objectArrayData of objectFormStateArray.data) {
      if (receiptsIdToShow.length === 0) {
        receiptsIdToShow = objectArrayData.receiptsId;
      } else {
        const array = [];
        for (const recipeIdToShow of receiptsIdToShow) {
          for (const recipeId of objectArrayData.receiptsId) {
            if (recipeId === recipeIdToShow) {
              array.push(recipeId);
            }
          }
        }
        receiptsIdToShow = array;
      }
    }
  }

  receiptsToShow = [];
  for (const recipe of receipts) {
    for (const recipeIdToShow of receiptsIdToShow) {
      if (recipe.id === recipeIdToShow) {
        receiptsToShow.push(recipe);
      }
    }
  }

  refreshView();
}

function refreshView() {
  const cards = document.getElementById("cards");
  const noReceipts = document.getElementById("no-receipts");

  cards.innerHTML = "";

  if (receiptsToShow.length > 0) {
    receiptsToShow.forEach(function (recipeToShow) {
      displayCard(recipeToShow);
    });
    noReceipts.style.display = "none";
    cards.style.display = "grid";
  } else if (receiptsToShow.length === 0) {
    noReceipts.style.display = "block";
    cards.style.display = "none";

    formStateArray.forEach(function (objectFormStateArray1) {
      if (
        objectFormStateArray1.key === "global" &&
        objectFormStateArray1.data.length === 0
      ) {
        formStateArray.forEach(function (objectFormStateArray2) {
          if (
            objectFormStateArray2.key === "ingredients" &&
            objectFormStateArray2.data.length === 0
          ) {
            formStateArray.forEach(function (objectFormStateArray3) {
              if (
                objectFormStateArray3.key === "appareils" &&
                objectFormStateArray3.data.length === 0
              ) {
                formStateArray.forEach(function (objectFormStateArray4) {
                  if (
                    objectFormStateArray4.key === "ustensils" &&
                    objectFormStateArray4.data.length === 0
                  ) {
                    if (recipeInput.value.length > 3) {
                      noReceipts.style.display = "block";
                      cards.style.display = "none";
                    } else {
                      receipts.forEach(function (recipe) {
                        displayCard(recipe);
                        noReceipts.style.display = "none";
                        cards.style.display = "grid";
                      });
                    }
                  }
                });
              }
            });
          }
        });
      }
    });
  }

  formStateArray.forEach(function (objectFormStateArray) {
    if (objectFormStateArray.key === "global") {
      if (
        objectFormStateArray.value.length > 3 &&
        objectFormStateArray.data.length === 0
      ) {
        noReceipts.style.display = "block";
        cards.style.display = "none";
      }
    }
  });

  function displayCard(recipe) {
    const cards = document.getElementById("cards");
    const recipeDOM = getRecipeDOM(
      recipe.name,
      recipe.time,
      recipe.description
    );

    cards.appendChild(recipeDOM);

    function getRecipeDOM(name, time, description) {
      const article = document.createElement("article");
      article.innerHTML = `<div class="card-img-top"></div>
            <div class="card-body">
                <div class="card-body-header">
                    <h1>${name}</h1>
                    <p><i class="far fa-clock"></i>${time} min</p>
                </div>
                <div class="card-body-description">
                    <ul>${recipe.ingredients
                      .map(
                        (ingredient) =>
                          `<li><strong>${ingredient.ingredient}</strong>: ${
                            ingredient.quantity === undefined
                              ? ""
                              : ingredient.quantity
                          } ${
                            ingredient.unit === undefined ? "" : ingredient.unit
                          } </li>`
                      )
                      .join("")}</ul>
                    <p>${description}</p>
                </div>
            </div>`;

      return article;
    }
  }
}

/////////////////////////////////////////////////////////////

function init() {
  getRecipe();
  reference();
  displayIngredientsList(ingredientsArray);
  displayAppliancesList(appliancesArray);
  displayUstensilsList(ustensilsArray);
  formState();

  chevronIngredients.addEventListener("click", function () {
    if (ingredientsList.style.display === "grid") {
      hideDropdown(ingredientsList);
      inputIngredients.style.width = "140px";
    } else {
      showDropdown(ingredientsList);
      hideDropdown(appliancesList);
      hideDropdown(ustensilsList);
      inputIngredients.style.width = "566px";
      inputAppliances.style.width = "140px";
      inputUstensils.style.width = "140px";
      addIngredientsTagsToFormState();
    }
  });

  chevronAppliances.addEventListener("click", function () {
    if (appliancesList.style.display === "grid") {
      hideDropdown(appliancesList);
      inputAppliances.style.width = "140px";
    } else {
      showDropdown(appliancesList);
      hideDropdown(ingredientsList);
      hideDropdown(ustensilsList);
      inputAppliances.style.width = "566px";
      inputIngredients.style.width = "140px";
      inputUstensils.style.width = "140px";
      addAppliancesTagsToFormState();
    }
  });

  chevronUstensils.addEventListener("click", function () {
    if (ustensilsList.style.display === "grid") {
      hideDropdown(ustensilsList);
      inputUstensils.style.width = "140px";
    } else {
      showDropdown(ustensilsList);
      hideDropdown(ingredientsList);
      hideDropdown(appliancesList);
      inputUstensils.style.width = "566px";
      inputIngredients.style.width = "140px";
      inputAppliances.style.width = "140px";
      addUstensilsTagsToFormState();
    }
  });

  inputIngredients.addEventListener("input", function () {
    if (ingredientsList.style.display === "none") {
      showDropdown(ingredientsList);
      hideDropdown(appliancesList);
      hideDropdown(ustensilsList);
      inputIngredients.style.width = "566px";
      inputAppliances.style.width = "140px";
      inputUstensils.style.width = "140px";
      addIngredientsTagsToFormState();
    }
  });

  inputAppliances.addEventListener("input", function () {
    if (appliancesList.style.display === "none") {
      showDropdown(appliancesList);
      hideDropdown(ingredientsList);
      hideDropdown(ustensilsList);
      inputAppliances.style.width = "566px";
      inputIngredients.style.width = "140px";
      inputUstensils.style.width = "140px";
      addAppliancesTagsToFormState();
    }
  });

  inputUstensils.addEventListener("input", function () {
    if (ustensilsList.style.display === "none") {
      showDropdown(ustensilsList);
      hideDropdown(ingredientsList);
      hideDropdown(appliancesList);
      inputUstensils.style.width = "566px";
      inputIngredients.style.width = "140px";
      inputAppliances.style.width = "140px";
      addUstensilsTagsToFormState();
    }
  });
}

init();
