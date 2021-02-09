const searchRecipe = async () => {
    document.getElementById('detailRecipe').style.display = 'none';
    document.getElementById('errorMsg').style.display = 'none';
    document.getElementById('foodCart').style.display = 'flex';
    const keyWord = document.getElementById('searchInput').value;
    const foodCart = document.getElementById('foodCart');
    foodCart.innerHTML = '';
    const link = `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyWord}`
    try {
        const res = await fetch(link);
        const data = await res.json();
        const recipes = data.meals;
        recipes.forEach(recipe => {
            const mealName = recipe.strMeal;
            const mealImgLink = recipe.strMealThumb;
            const newCard = document.createElement('div');
            newCard.className = 'recipeCard';
            newCard.id = recipe.idMeal;
            newCard.innerHTML = `<div class="card rounded m-3" style="width: 18rem;">
        <img src=${mealImgLink} class="card-img-top" alt="Food  image">
        <h5 class="card-body card-title text-center"> ${mealName} </h5>
        </div>`;
            foodCart.appendChild(newCard);
        });
        document.getElementById('foodCart').addEventListener('click', event => {
            showDetails(event.target);
        })
    }
    catch(error) {
        document.getElementById('errorMsg').style.display = 'flex';
    }
}

const showDetails = async (clickedEvent) => {
    const mealId = clickedEvent.parentElement.parentElement.id;
    const link = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const res = await fetch(link);
    const data = await res.json();
    const recipe = data.meals[0];
    document.getElementById('origin').innerText = `Authentic ${recipe.strArea} dish!`;
    document.getElementById('recipeImg').src = recipe.strMealThumb;
    document.getElementById('recipeName').src = recipe.strMeal;
    document.getElementById('ingredientsList').innerHTML = '';
    for (let i = 1; i <= 20; i++) {
        const keyName = `strIngredient${i}`;
        const keyMeasure = `strMeasure${i}`;
        const ingredient = recipe[keyName];
        const measurement = recipe[keyMeasure];
        if (ingredient != "" && ingredient != null) {
            const newIngredient = document.createElement('li');
            newIngredient.innerText = `${ingredient} - ${measurement}`;
            document.getElementById('ingredientsList').appendChild(newIngredient);
        }
    }
    document.getElementById('instructions').innerText= recipe.strInstructions;
    document.getElementById('youtubeLink').href = recipe.strYoutube;
    document.getElementById('detailsLink').href = recipe.strSource;
    //hide search result and display details
    document.getElementById('detailRecipe').style.display = 'flex';
    document.getElementById('foodCart').style.display = 'none';
}

const back = () => {
    //hide everything but search results
    document.getElementById('errorMsg').style.display = 'none';
    document.getElementById('detailRecipe').style.display = 'none';
    document.getElementById('foodCart').style.display = 'flex';
}