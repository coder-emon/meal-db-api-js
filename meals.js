const loadMeals = (search) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals))
}
const displayMeals = (meals) =>{
    console.log(meals)
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML ='';
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML= `
        <div  class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
            <button class="btn btn-primary" onclick="loadMealDetail(${meal.idMeal})" data-bs-toggle="modal" data-bs-target="#exampleModal">Meal Detail</button>
            </div>
        </div>
        `;
        mealContainer.appendChild(mealDiv);
    })
}
const loadMealDetail = (idMeal) => {
    const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetail(data.meals[0]))

};
const displayMealDetail = (meal) => {
     const mealDetailContainer = document.getElementById('meal-details')
     mealDetailContainer.innerHTML ='';
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('card');
    mealDiv.innerHTML = `
    <img class="w-25 mx-auto my-3 rounded" src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions}</p>
        <a href="${meal.strYoutube}" target="_blank" class="btn btn-primary"> Full Details On Youtube </a>
    </div>
    `;
    mealDetailContainer.appendChild(mealDiv);
}
const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadMeals(searchText);
    searchField.value = '';
}
loadMeals('');