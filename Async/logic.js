/*

La api tiene un metodo random,
por lo que no es necesario el endpoint

function getIdDrink() {
    const elem = document.getElementById('idDrink');
    const idDrink = elem.value;
    return idDrink;
}

function getEndpointWithId() {
    const idDrink = this.getIdDrink();
    if (!idDrink) { // '', 0, null, undefined // valores truthy , falsy
        return '';
    }
    return `www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
}

*/

function showCocktail(cocktail) {
    const received = cocktail.drinks[0];
    document.getElementById('idCocktail').innerText = received.idDrink;
    console.log(received.idDrink);
    document.getElementById('nameCocktail').innerText = received.strDrink;
    console.log(received.strDrink);
    document.getElementById('catCocktail').innerText = received.strCategory;
    console.log(received.strCategory);
    
    let ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = received[`strIngredient${i}`];
        const measure = received[`strMeasure${i}`];
        if (ingredient && measure) {
            ingredients.push(`${measure} ${ingredient}`);
        }
    }

    let newHtml = '<ul>';
    ingredients.forEach(ingredient => {
        newHtml += `<li>${ingredient}</li>`;
        console.log(ingredient);
    });
    newHtml += '</ul>';
    const typesContainer = document.getElementById('ingCocktail');
    typesContainer.innerHTML = newHtml;

    document.getElementById('insCocktail').innerText = received.strInstructions;
    document.getElementById('display').src = received.strDrinkThumb;
  
}

async function loadCocktailInfoAsyncAwait() {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
    try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json)
        showCocktail(json);
    } catch (error) {
        console.error(error);
        alert('Error al buscar el coctel');
    }
}
function showPopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "block";
  }
  
  function closePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
  }


