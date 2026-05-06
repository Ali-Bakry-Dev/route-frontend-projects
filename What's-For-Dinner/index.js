var recipes = [
  {
    rate: 4.5,
    numberOfReviews: 189,
    prepTime: "10 min",
    cookTime: "5 min",
    serving: "2 people",
    country: "Italy",
    difficulty: "Easy",
    title: "Caprese Sandwich",
    description: "Fresh Italian sandwich with mozzarella, tomato, and basil",
    imageURL:
      "https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=800&auto=format&fit=crop",
    timeWarning: false,
    ingredients: [
      "1 ciabatta bread",
      "200g fresh mozzarella, sliced",
      "2 large tomatoes, sliced",
      "Fresh basil leaves",
      "3 tablespoons pesto",
      "2 tablespoons balsamic glaze",
      "Olive oil",
      "Salt and pepper",
    ],
    instructions: [
      "Slice ciabatta bread in half horizontally.",
      "Toast bread lightly until just crispy.",
      "Spread pesto on both sides of bread.",
      "Layer mozzarella slices, tomato slices, and fresh basil leaves.",
      "Drizzle with olive oil and balsamic glaze. Season with salt and pepper.",
      "Close sandwich, cut in half, and serve immediately.",
    ],
    nutrition: {
      calories: "480 kcal",
      protein: "22g",
      carbohydrates: "48g",
      fat: "22g",
      fiber: "3g",
      sodium: "680mg",
    },
    chefTips: [
      "Use ripe, in-season tomatoes for best flavor",
      "Buffalo mozzarella is traditional but harder to slice",
      "Toast bread lightly - not too crispy",
      "Add prosciutto or salami for a heartier sandwich",
    ],
  },

  {
    rate: 4.9,
    numberOfReviews: 512,
    prepTime: "90 min",
    cookTime: "12 min",
    serving: "2 people",
    country: "Italy",
    difficulty: "Intermediate",
    title: "Margherita Pizza",
    description: "Classic Italian pizza with fresh mozzarella and basil",
    imageURL:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop",
    timeWarning: false,
    ingredients: [
      "300g pizza dough",
      "200g crushed tomatoes",
      "250g fresh mozzarella",
      "Fresh basil leaves",
      "2 tablespoons olive oil",
      "2 cloves garlic, minced",
      "Salt and pepper to taste",
      "Parmesan cheese for topping",
    ],
    instructions: [
      "Let pizza dough come to room temperature and rest for 1 hour.",
      "Preheat oven to maximum temperature (usually 250°C/480°F).",
      "Mix crushed tomatoes with olive oil, garlic, salt, and pepper for the sauce.",
      "Roll out dough on a floured surface to desired thickness.",
      "Spread tomato sauce, add torn mozzarella pieces, and drizzle with olive oil.",
      "Bake for 10-12 minutes until crust is golden. Top with fresh basil and parmesan.",
    ],
    nutrition: {
      calories: "580 kcal",
      protein: "24g",
      carbohydrates: "68g",
      fat: "22g",
      fiber: "4g",
      sodium: "920mg",
    },
    chefTips: [
      "Use a pizza stone for crispier crust",
      "Don't overload with toppings - less is more",
      "Add basil after baking to keep it fresh",
      "Let dough rest properly for best texture",
    ],
  },

  {
    rate: 4.7,
    numberOfReviews: 367,
    prepTime: "15 min",
    cookTime: "60 min",
    serving: "4 people",
    country: "Asian",
    difficulty: "Easy",
    title: "Teriyaki Chicken Bowl",
    description: "Sweet and savory chicken over rice with vegetables",
    imageURL:
      "https://images.unsplash.com/photo-1546069901-eacef0df6022?q=80&w=800&auto=format&fit=crop",
    timeWarning: true,
    ingredients: [
      "400g chicken thighs, sliced",
      "1/2 cup teriyaki sauce",
      "2 cups cooked rice",
      "1 broccoli head, florets",
      "1 carrot, julienned",
      "Sesame seeds",
      "Green onions, sliced",
      "1 tablespoon sesame oil",
    ],
    instructions: [
      "Heat sesame oil in a pan. Cook chicken until browned on all sides.",
      "Add teriyaki sauce to chicken, simmer for 5 minutes until sauce thickens.",
      "Meanwhile, steam broccoli and carrots until tender-crisp.",
      "Divide rice between bowls.",
      "Top with teriyaki chicken and steamed vegetables.",
      "Garnish with sesame seeds and green onions. Serve hot.",
    ],
    nutrition: {
      calories: "540 kcal",
      protein: "42g",
      carbohydrates: "58g",
      fat: "14g",
      fiber: "4g",
      sodium: "1240mg",
    },
    chefTips: [
      "Use chicken thighs for juicier meat",
      "Make homemade teriyaki sauce for better flavor control",
      "Add edamame for extra protein",
      "Meal prep by cooking rice and chicken ahead",
    ],
  },

  {
    rate: 4.9,
    numberOfReviews: 478,
    prepTime: "30 min",
    cookTime: "90 min",
    serving: "4 people",
    country: "Italy",
    difficulty: "Intermediate",
    title: "Lasagna Bolognese",
    description: "Layered Italian pasta with rich meat sauce and béchamel",
    imageURL:
      "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=800&auto=format&fit=crop",
    timeWarning: true,
    ingredients: [
      "Lasagna sheets",
      "Ground beef",
      "Onion, diced",
      "Carrots, diced",
      "Tomatoes",
      "Béchamel sauce",
      "Mozzarella cheese",
      "Parmesan cheese",
    ],
    instructions: [
      "Cook ground beef with onion and carrots until browned. Add tomatoes and simmer for 30 minutes.",
      "Cook lasagna sheets according to package directions. Drain and set aside.",
      "Preheat oven to 180°C (350°F).",
      "In a baking dish, layer: meat sauce, lasagna sheets, béchamel sauce. Repeat 3-4 times.",
      "Top final layer with béchamel, mozzarella, and parmesan cheese.",
      "Bake for 45 minutes until golden and bubbly. Let rest 10 minutes before serving.",
    ],
    nutrition: {
      calories: "680 kcal",
      protein: "42g",
      carbohydrates: "58g",
      fat: "28g",
      fiber: "6g",
      sodium: "920mg",
    },
    chefTips: [
      "Make bolognese sauce a day ahead for better flavor",
      "Don't skip the resting time after baking",
      "Use fresh pasta sheets for best texture",
      "Freeze leftovers in individual portions",
    ],
  },

  {
    rate: 4.6,
    numberOfReviews: 289,
    prepTime: "20 min",
    cookTime: "30 min",
    serving: "4 people",
    country: "Asian",
    difficulty: "Easy",
    title: "Vegetable Curry",
    description: "Hearty vegetarian curry with coconut milk",
    imageURL:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop",
    timeWarning: false,
    ingredients: [
      "2 potatoes, cubed",
      "1 cauliflower, florets",
      "2 carrots, sliced",
      "1 can chickpeas",
      "400ml coconut milk",
      "3 tablespoons curry powder",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "Fresh spinach",
    ],
    instructions: [
      "Heat oil in a large pot. Sauté onion until soft, add garlic and curry powder, cook for 1 minute.",
      "Add potatoes and carrots, cook for 5 minutes.",
      "Pour in coconut milk and 1 cup water. Bring to simmer.",
      "Add cauliflower and chickpeas. Cook for 20 minutes until vegetables are tender.",
      "Stir in fresh spinach and cook until wilted.",
      "Serve hot over basmati rice or with naan bread.",
    ],
    nutrition: {
      calories: "380 kcal",
      protein: "14g",
      carbohydrates: "48g",
      fat: "16g",
      fiber: "12g",
      sodium: "480mg",
    },
    chefTips: [
      "Add vegetables in order of cooking time needed",
      "Adjust curry powder amount to taste",
      "Use full-fat coconut milk for creamier curry",
      "Add protein like tofu or paneer if desired",
    ],
  },

  {
    rate: 4.7,
    numberOfReviews: 267,
    prepTime: "15 min",
    cookTime: "60 min",
    serving: "4 people",
    country: "Mediterranean",
    difficulty: "Intermediate",
    title: "French Onion Soup",
    description: "Rich beef broth with caramelized onions and melted cheese",
    imageURL:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop",
    timeWarning: true,

    ingredients: [
      "Butter",
      "4 large onions, thinly sliced",
      "White wine",
      "Beef broth",
      "Bay leaves",
      "Thyme",
      "Baguette slices",
      "Gruyère cheese (or Swiss cheese)",
      "Salt and pepper",
    ],

    instructions: [
      "Melt butter in a large pot. Add onions and cook slowly for 40 minutes, stirring occasionally until caramelized.",
      "Add white wine and deglaze the pot, scraping up brown bits.",
      "Pour in beef broth, add bay leaves and thyme. Simmer for 20 minutes.",
      "Meanwhile, toast baguette slices until golden.",
      "Ladle soup into oven-safe bowls. Top with toasted bread and cheese.",
      "Broil for 3-5 minutes until cheese is melted and bubbly. Serve hot.",
    ],

    nutrition: {
      calories: "380 kcal",
      protein: "18g",
      carbohydrates: "36g",
      fat: "18g",
      fiber: "4g",
      sodium: "980mg",
    },

    chefTips: [
      "Patience is key - don't rush the onion caramelization",
      "Use good quality beef broth for best flavor",
      "Gruyère can be substituted with Swiss cheese",
      "Watch carefully when broiling to avoid burning",
    ],
  },

  {
    rate: 4.7,
    numberOfReviews: 412,
    prepTime: "15 min",
    cookTime: "240 min",
    serving: "4 people",
    country: "America",
    difficulty: "Easy",
    title: "BBQ Pulled Pork",
    description: "Slow-cooked tender pork in smoky barbecue sauce",
    imageURL:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=800&auto=format&fit=crop",
    timeWarning: true,

    ingredients: [
      "1kg pork shoulder",
      "1 cup BBQ sauce",
      "1/2 cup apple cider vinegar",
      "2 tablespoons brown sugar",
      "1 tablespoon paprika",
      "1 tablespoon garlic powder",
      "Burger buns",
      "Coleslaw for serving",
      "Salt and pepper",
    ],

    instructions: [
      "Mix paprika, garlic powder, brown sugar, salt and pepper. Rub all over pork shoulder.",
      "Place pork in slow cooker with apple cider vinegar and 1/2 cup water.",
      "Cook on low for 8 hours or high for 4 hours until meat is very tender.",
      "Remove pork and shred with two forks. Discard excess fat.",
      "Return shredded pork to slow cooker, mix with BBQ sauce.",
      "Serve on toasted buns with coleslaw on top.",
    ],

    nutrition: {
      calories: "620 kcal",
      protein: "48g",
      carbohydrates: "52g",
      fat: "22g",
      fiber: "3g",
      sodium: "1180mg",
    },

    chefTips: [
      "Use pork shoulder for best results - it stays moist",
      "Let pork rest before shredding for juicier meat",
      "Make your own BBQ sauce for better flavor",
      "Leftovers freeze well for up to 3 months",
    ],
  },
  {
    rate: 4.8,
    numberOfReviews: 350,
    prepTime: "20 min",
    cookTime: "25 min",
    serving: "4 people",
    country: "Mexico",
    difficulty: "Easy",
    title: "Beef Fajitas",
    description: "Sizzling beef strips with colorful bell peppers and onions",
    imageURL:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=800&auto=format&fit=crop",
    timeWarning: false,

    ingredients: [
      "500g beef strips",
      "2 bell peppers, sliced",
      "1 large onion, sliced",
      "2 tablespoons olive oil",
      "1 teaspoon chili powder",
      "1 teaspoon cumin",
      "Salt and pepper",
      "Tortillas for serving",
    ],

    instructions: [
      "Heat olive oil in a pan over medium-high heat.",
      "Add beef strips and cook until browned. Remove from pan.",
      "Add sliced peppers and onions, cook until softened.",
      "Return beef to the pan, add chili powder, cumin, salt, and pepper. Stir to combine.",
      "Serve hot with warm tortillas.",
    ],

    nutrition: {
      calories: "450 kcal",
      protein: "38g",
      carbohydrates: "32g",
      fat: "18g",
      fiber: "5g",
      sodium: "720mg",
    },

    chefTips: [
      "Use high heat to get a nice sear on the beef",
      "Cut vegetables uniformly for even cooking",
      "Serve with lime wedges for extra flavor",
    ],
  },

  {
    rate: 4.6,
    numberOfReviews: 290,
    prepTime: "15 min",
    cookTime: "40 min",
    serving: "4 people",
    country: "Japan",
    difficulty: "Medium",
    title: "Miso Soup with Tofu",
    description: "Traditional Japanese soup with tofu, seaweed, and miso",
    imageURL:
      "https://pickledplum.com/wp-content/uploads/2024/07/tofu-wakame-miso-soup-3.jpg",
    timeWarning: false,

    ingredients: [
      "4 cups dashi or vegetable broth",
      "3 tablespoons miso paste",
      "200g soft tofu, cubed",
      "1 sheet nori, cut into strips",
      "2 green onions, sliced",
      "Optional: mushrooms or wakame",
    ],

    instructions: [
      "Heat broth in a pot over medium heat.",
      "Add optional mushrooms or wakame and simmer for 5 minutes.",
      "Turn off heat and dissolve miso paste into broth using a ladle.",
      "Add cubed tofu and nori strips.",
      "Serve immediately, garnished with green onions.",
    ],

    nutrition: {
      calories: "180 kcal",
      protein: "12g",
      carbohydrates: "14g",
      fat: "8g",
      fiber: "3g",
      sodium: "900mg",
    },

    chefTips: [
      "Do not boil miso paste, it will lose flavor",
      "Use soft tofu for the authentic silky texture",
      "Add wakame for extra umami",
    ],
  },
];

var oldIndex;

function randomRecipes() {
  do {
    randomIndex = Math.floor(Math.random() * recipes.length);
  } while (randomIndex == oldIndex);
  oldIndex = randomIndex;

  var IngredientsGroup = "";
  for (var i = 0; i < recipes[randomIndex].ingredients.length; i++) {
    IngredientsGroup += `
                            <li class="d-flex mb-3">
                              <div
                                class="step-counter rounded-circle d-flex justify-content-center align-items-center p-0 me-2"
                              >
                                ${i + 1}
                              </div>
                              <span>${
                                recipes[randomIndex].ingredients[i]
                              }</span>
                            </li>`;
  }

  var Instructions = "";
  for (var i = 0; i < recipes[randomIndex].instructions.length; i++) {
    Instructions += `
                        <div class="d-flex align-items-center mb-4">
                            <div
                              class="instruction-step d-flex align-items-center justify-content-center me-3"
                            >
                              ${i + 1}
                            </div>
                            <p>
                              ${recipes[randomIndex].instructions[i]}
                            </p>
                          </div>`;
  }

  var Tips = "";
  for (var i = 0; i < recipes[randomIndex].chefTips.length; i++) {
    Tips += `
    <div class="tips-card d-flex align-items-center mb-3">
                            <i class="fa-solid fa-circle-check me-2 fs-5"></i>
                            <p class="mb-0 text-muted-subtle">
                              ${recipes[randomIndex].chefTips[i]}
                            </p>
                          </div>
                          `;
  }

  var warning = "";
  if (recipes[randomIndex].timeWarning == true) {
    warning = `<div class="time-warning mb-4">
                    <div class="d-flex align-items-center">
                      <i class="fa-solid fa-triangle-exclamation fs-5 me-3"></i>
                      <div>
                        <p class="m-0">Extended Preparation Time</p>
                        <p class="m-0">
                          This recipe requires more than 45 minutes to prepare. Plan
                          accordingly!
                        </p>
                      </div>
                    </div>
                    </div>`;
  }

  document.getElementById("recipe-container").innerHTML = `          <div class="row h-100">
                <div class="recipe-image-col col-lg-5 p-0">
                  <div class="image-wrapper  position-relative">
                    <img
                      src="${recipes[randomIndex].imageURL}"
                      alt=""
                      class="w-100 h-100 object-fit-cover"
                    />
                    <div class="rating-badge position-absolute rounded-pill">
                      <div class="d-flex align-items-center">
                        <i class="star-icon fa-solid fa-star me-2"></i>
                        <span class="me-2 fw-bolder">${recipes[randomIndex].rate}</span>
                        <span class="text-muted-subtle">(${recipes[randomIndex].numberOfReviews} reviews)</span>
                      </div>
                    </div>
                    <div class="recipe-info position-absolute">
                      <div class="d-flex justify-content-between">
                        <div class="text-center px-4">
                          <i class="fa-solid fa-clock fs-3"></i>
                          <p class="text-muted-subtle m-0">Prep Time</p>
                          <p class="fw-bolder m-0">${recipes[randomIndex].prepTime}</p>
                        </div>
                        <div class="text-center px-4">
                          <i class="fa-solid fa-fire-burner fs-3"></i>
                          <p class="text-muted-subtle m-0">Cook Time</p>
                          <p class="fw-bolder m-0">${recipes[randomIndex].cookTime}</p>
                        </div>
                        <div class="text-center px-4">
                          <i class="fa-solid fa-users fs-3"></i>
                          <p class="text-muted-subtle m-0">Servings</p>
                          <p class="fw-bolder m-0">${recipes[randomIndex].serving}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="recipe-details-col col-lg-7 p-5 overflow-auto h-100">
                  <div
                    class="recipe-header d-flex align-items-center justify-content-between mb-3"
                  >
                    <div>
                      <div class="mb-3">
                        <span class="badge-difficulty rounded-pill me-2">${recipes[randomIndex].difficulty}</span>
                        <span class="badge-cuisine rounded-pill">${recipes[randomIndex].country}</span>
                      </div>
                      <h2 class="fw-bolder fs-2">${recipes[randomIndex].title}</h2>
                      <p class="text-muted-subtle fs-5">
                        ${recipes[randomIndex].description}
                      </p>
                    </div>
                    <div>
                      <div class="d-flex">
                        <div
                          class="action-icon me-4 d-flex align-items-center justify-content-center rounded-3"
                        >
                          <i class="fa-solid fa-bookmark fs-5"></i>
                        </div>
                        <div
                          class="action-icon d-flex align-items-center justify-content-center rounded-3"
                        >
                          <i class="fa-solid fa-share-nodes fs-5"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                    ${warning}
                  <div>
                    <ul
                  class="nav nav-pills recipe-tabs mb-3 d-flex justify-content-between p-2 row"
                  id="pills-tab"
                  role="tablist"
                >
                  <li class="nav-item col-3" role="presentation">
                    <button
                      class="nav-link active"
                      id="pills-Ingredients-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-Ingredients"
                      type="button"
                      role="tab"
                      aria-controls="pills-Ingredients"
                      aria-selected="true"
                    >
                      <i class="fa-solid fa-list-check me-1"></i>
                      Ingredients
                    </button>
                  </li>
                  <li class="nav-item col-3" role="presentation">
                    <button
                      class="nav-link"
                      id="pills-Instructions-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-Instructions"
                      type="button"
                      role="tab"
                      aria-controls="pills-Instructions"
                      aria-selected="false"
                    >
                      <i class="fa-etch fa-solid fa-book-open me-1"></i>
                      Instructions
                    </button>
                  </li>
                  <li class="nav-item col-3" role="presentation">
                    <button
                      class="nav-link"
                      id="pills-Nutrition-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-Nutrition"
                      type="button"
                      role="tab"
                      aria-controls="pills-Nutrition"
                      aria-selected="false"
                    >
                      <i class="fa-solid fa-chart-pie me-1"></i>
                      Nutrition
                    </button>
                  </li>
                  <li class="nav-item col-3" role="presentation">
                    <button
                      class="nav-link"
                      id="pills-Tips-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-Tips"
                      type="button"
                      role="tab"
                      aria-controls="pills-Tips"
                      aria-selected="false"
                    >
                      <i class="fa-solid fa-lightbulb me-1"></i>
                      Chef's Tips
                    </button>
                  </li>
                </ul>
                    <hr />
                    <div class="tab-content mt-4" id="pills-tabContent">
                      <div
                        class="Ingredients tab-pane fade show active overflow-auto"
                        id="pills-Ingredients"
                        role="tabpanel"
                        aria-labelledby="pills-Ingredients-tab"
                        tabindex="0"
                      >
                        <div class="container p-3 overflow-auto">
                          <ul>
                          ${IngredientsGroup} 
                          </ul>
                        </div>
                      </div>
                      <div
                        class="Instructions tab-pane fade overflow-auto"
                        id="pills-Instructions"
                        role="tabpanel"
                        aria-labelledby="pills-Instructions-tab"
                        tabindex="0"
                      >
                        <div class="w-100">
                          ${Instructions}
                        </div>
                      </div>
                      <div
                        class="Nutrition tab-pane fade overflow-auto"
                        id="pills-Nutrition"
                        role="tabpanel"
                        aria-labelledby="pills-Nutrition-tab"
                        tabindex="0"
                      >
                        <div class="container w-100 h-100">
                          <div class="row row-gap-3">
                            <div class="col-md-6">
                              <div
                                class="d-flex align-items-center justify-content-between nutrition-card"
                              >
                                <div class="d-flex align-items-center">
                                  <div
                                    class="nutrition-icon d-flex justify-content-center align-items-center flex-shrink-0 me-3"
                                  >
                                    <i class="fa-solid fa-fire fs-5"></i>
                                  </div>
                                  <span>Calories</span>
                                </div>
                                <span class="fw-bolder fs-5">${recipes[randomIndex].nutrition.calories}</span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div
                                class="d-flex align-items-center justify-content-between nutrition-card"
                              >
                                <div class="d-flex align-items-center">
                                  <div
                                    class="nutrition-icon d-flex justify-content-center align-items-center flex-shrink-0 me-3"
                                  >
                                    <i class="fa-solid fa-dumbbell fs-5"></i>
                                  </div>
                                  <span>Protein</span>
                                </div>
                                <span class="fw-bolder fs-5">${recipes[randomIndex].nutrition.protein}</span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div
                                class="d-flex align-items-center justify-content-between nutrition-card"
                              >
                                <div class="d-flex align-items-center">
                                  <div
                                    class="nutrition-icon d-flex justify-content-center align-items-center flex-shrink-0 me-3"
                                  >
                                    <i class="fa-solid fa-wheat-awn fs-5"></i>
                                  </div>
                                  <span>Carbohydrates</span>
                                </div>
                                <span class="fw-bolder fs-5">${recipes[randomIndex].nutrition.carbohydrates}</span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div
                                class="d-flex align-items-center justify-content-between nutrition-card"
                              >
                                <div class="d-flex align-items-center">
                                  <div
                                    class="nutrition-icon d-flex justify-content-center align-items-center flex-shrink-0 me-3"
                                  >
                                    <i class="fa-solid fa-droplet fs-5"></i>
                                  </div>
                                  <span>Fat</span>
                                </div>
                                <span class="fw-bolder fs-5">${recipes[randomIndex].nutrition.fat}</span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div
                                class="d-flex align-items-center justify-content-between nutrition-card"
                              >
                                <div class="d-flex align-items-center">
                                  <div
                                    class="nutrition-icon d-flex justify-content-center align-items-center flex-shrink-0 me-3"
                                  >
                                    <i class="fa-solid fa-seedling fs-5"></i>
                                  </div>
                                  <span>Fiber</span>
                                </div>
                                <span class="fw-bolder fs-5">${recipes[randomIndex].nutrition.fiber}</span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div
                                class="d-flex align-items-center justify-content-between nutrition-card"
                              >
                                <div class="d-flex align-items-center">
                                  <div
                                    class="nutrition-icon d-flex justify-content-center align-items-center flex-shrink-0 me-3"
                                  >
                                    <i class="fa-solid fa-cube fs-5"></i>
                                  </div>
                                  <span>Sodium</span>
                                </div>
                                <span class="fw-bolder fs-5">${recipes[randomIndex].nutrition.sodium}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade overflow-auto"
                        id="pills-Tips"
                        role="tabpanel"
                        aria-labelledby="pills-Tips-tab"
                        tabindex="0"
                      >
                        <div>
                 ${Tips}
                        </div>
                      </div>
                    </div>
                    <hr class="mt-4" />
                    <div>
                      <button
                        class="btn randomize-btn rounded-3 shadow text-white"
                        onclick="randomRecipes()"
                      >
                        <i class="fa-solid fa-rotate me-1"></i>
                        Try Another Recipe
                      </button>
                    </div>
                  </div>
                </div>
              </div>`;
}