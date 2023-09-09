function showCocktail(cocktail) {
    const received = cocktail.drinks[0];
    document.getElementById('idCocktail').innerText = received.idDrink;
    document.getElementById('nameCocktail').innerText = received.strDrink;
    document.getElementById('catCocktail').innerText = received.strCategory;

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
    });
    newHtml += '</ul>';
    const typesContainer = document.getElementById('ingCocktail');
    typesContainer.innerHTML = newHtml;

    document.getElementById('insCocktail').innerText = received.strInstructions;

    const display = document.getElementById('display');

    // Mostrar la imagen de carga (loading.gif) en lugar de la imagen real
    display.src = 'loading.gif';

    // Cargar la imagen real y reemplazar la animación de carga cuando esté lista
    const image = new Image();
    image.src = received.strDrinkThumb;
    image.onload = () => {
        display.src = image.src; // Reemplazar la animación de carga con la imagen real cuando se carga
    };
}

async function loadCocktailInfoAsyncAwait() {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
    try {
        const response = await fetch(url);
        const json = await response.json();
        showCocktail(json);
        document.getElementById('Favorito').disabled = false;
    } catch (error) {
        console.error(error);
        alert('Error al buscar el coctel');
    }
}

function viewFavorites() {
    updateFavoritesList();
    showPopup();
}

function showPopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "block";
    updateFavoritesList();
}
  
function closePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}

function toggleFavorite() {
    const idCocktail = document.getElementById('idCocktail').textContent;
    const nameCocktail = document.getElementById('nameCocktail').textContent;

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const existingFavoriteIndex = favorites.findIndex(favorite => favorite.id === idCocktail);

    if (existingFavoriteIndex === -1) {
        favorites.push({ id: idCocktail, name: nameCocktail });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesList();
    } else {
        alert('Este cóctel ya está en tus favoritos.');
    }
}

function updateFavoritesList() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const list = document.getElementById('myList');

    list.innerHTML = '';

    favorites.forEach(favorite => {
        const listItem = document.createElement('li');
        listItem.textContent = favorite.name;

        listItem.onclick = () => loadFavoriteCocktail(favorite.id);

        list.appendChild(listItem);
    });
}

async function loadFavoriteCocktail(id) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    
    try {
        const response = await fetch(url);
        const json = await response.json();
        
        if (json.drinks && json.drinks.length > 0) {
            const cocktail = json.drinks[0];
            
            document.getElementById('idCocktail').innerText = cocktail.idDrink;
            document.getElementById('nameCocktail').innerText = cocktail.strDrink;
            document.getElementById('catCocktail').innerText = cocktail.strCategory;
            
            let ingredients = [];
            for (let i = 1; i <= 15; i++) {
                const ingredient = cocktail[`strIngredient${i}`];
                const measure = cocktail[`strMeasure${i}`];
                if (ingredient && measure) {
                    ingredients.push(`${measure} ${ingredient}`);
                }
            }
        
            let newHtml = '<ul>';
            ingredients.forEach(ingredient => {
                newHtml += `<li>${ingredient}</li>`;
            });
            newHtml += '</ul>';
            const typesContainer = document.getElementById('ingCocktail');
            typesContainer.innerHTML = newHtml;
        
            document.getElementById('insCocktail').innerText = cocktail.strInstructions;
            document.getElementById('display').src = cocktail.strDrinkThumb;        
        } else {
            alert('Cóctel no encontrado.');
        }
    } catch (error) {
        console.error(error);
        alert('Error al cargar el cóctel favorito');
    }
}