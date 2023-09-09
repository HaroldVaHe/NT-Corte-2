function MostrarCoctel(cocktail) {
    const received = cocktail.drinks[0];
    document.getElementById('IdCoctel').innerText = received.idDrink;
    document.getElementById('NombreCoctel').innerText = received.strDrink;
    document.getElementById('CategoriaCoctel').innerText = received.strCategory;

    let Ingredientes = [];
    for (let i = 1; i <= 15; i++) {
        const Ingrediente = received[`strIngrediente${i}`];
        const measure = received[`strMeasure${i}`];
        if (Ingrediente && measure) {-
            Ingredientes.push(`${measure} ${Ingrediente}`);
        }
    }

    let newHtml = '<ul>';
    Ingredientes.forEach(Ingrediente => {
        newHtml += `<li>${Ingrediente}</li>`;
    });
    newHtml += '</ul>';
    const typesContainer = document.getElementById('IngredientesCoctel');
    typesContainer.innerHTML = newHtml;

    document.getElementById('insCocktail').innerText = received.strInstructions;

    const display = document.getElementById('display');

    // Mostrar la imagen de carga (loading.gif) en lugar de la imagen real
    display.src = 'loading.gif';

    // Cargar la imagen real y remplazar la animación de carga cuando esté lista
    const image = new Image();
    image.src = received.strDrinkThumb;
    image.onload = () => {
        display.src = image.src; // Remplazar la animación de carga con la imagen real cuando se carga
    };
}

async function fetchRandom() {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
    try {
        const response = await fetch(url);
        const json = await response.json();
        MostrarCoctel(json);
        document.getElementById('Favorito').disabled = false;
    } catch (error) {
        console.error(error);
        alert('Error al buscar el coctel');
    }
}

function AbrirFavs() {
    ActualizarFavs();
    showPopup();
}

function showPopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "block";
    ActualizarFavs();
}
  
function CerrarFavs() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}

function AgregarFavorito() {
    const IdCoctel = document.getElementById('IdCoctel').textContent;
    const NombreCoctel = document.getElementById('NombreCoctel').textContent;

    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const existingFavoriteIndex = favoritos.findIndex(favorite => favorite.id === IdCoctel);

    if (existingFavoriteIndex === -1) {
        favoritos.push({ id: IdCoctel, name: NombreCoctel });
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        ActualizarFavs();
    } else {
        alert('Este cóctel ya está en tus favoritos.');
    }
}
function LimpiarFavoritos(){
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const list = document.getElementById('myList');

    list.innerHTML = '';

    favoritos.forEach(favorite => {
        const listItem = document.createElement('li');
        listItem.textContent = favorite.name;

        listItem.onclick = () => CargarInfoFavs(favorite.id);

        list.removeChild(listItem); 
        localStorage.removeItem('favoritos');
    });
}

function ActualizarFavs() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const list = document.getElementById('myList');

    list.innerHTML = '';

    favoritos.forEach(favorite => {
        const listItem = document.createElement('li');
        listItem.textContent = favorite.name;

        listItem.onclick = () => CargarInfoFavs(favorite.id);

        list.appendChild(listItem);
    });
}

async function CargarInfoFavs(id) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    
    try {
        const response = await fetch(url);
        const json = await response.json();
        
        if (json.drinks && json.drinks.length > 0) {
            const cocktail = json.drinks[0];
            
            document.getElementById('IdCoctel').innerText = cocktail.idDrink;
            document.getElementById('NombreCoctel').innerText = cocktail.strDrink;
            document.getElementById('CategoriaCoctel').innerText = cocktail.strCategory;
            
            let Ingredientes = [];
            for (let i = 1; i <= 15; i++) {
                const Ingrediente = cocktail[`strIngrediente${i}`];
                const measure = cocktail[`strMeasure${i}`];
                if (Ingrediente && measure) {
                    Ingredientes.push(`${measure} ${Ingrediente}`);
                }
            }
        
            let newHtml = '<ul>';
            Ingredientes.forEach(Ingrediente => {
                newHtml += `<li>${Ingrediente}</li>`;
            });
            newHtml += '</ul>';
            const typesContainer = document.getElementById('IngredientesCoctel');
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