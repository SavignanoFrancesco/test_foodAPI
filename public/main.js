var app = new Vue({
    el: '#root',
    data: {

      food_genres_array: [],
      food_meals_array: [],
      cart_open : false,

    },
    methods: {
      async foodRequest(){
          this.food_genres_array = [];

          //richiesta al server(movies)
          await axios
              .get('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
              .then((response) => {

                // console.log(response.data);

                for (var i = 0; i < response.data.meals.length; i++) {

                  this.food_genres_array.push(response.data.meals[i].strCategory);

                }

                this.foodMealsRequest();

              });
              console.log('FOOD GENRES');
              console.log(this.food_genres_array);
              console.log('FOOD MEALS');
              console.log(this.food_meals_array);


      },
      async foodMealsRequest(){

          for (var i = 0; i < this.food_genres_array.length; i++) {
            //richiesta al server(movies)
            await axios
                .get('https://www.themealdb.com/api/json/v1/1/filter.php', {
                    params:
                        {
                            c: this.food_genres_array[i]
                        }
                    })
                .then((response) => {

                  //console.log(response.data.meals);

                  this.food_meals_array.push(response.data.meals);

                });
          }

      },
      fillArrays(){

        this.foodRequest();


      },
      toggleShoppingCart(){
        if (!this.cart_open) {
          this.cart_open = true;
        }else{
          this.cart_open = false;
        }
      },

    },
    mounted() {
      this.fillArrays();
    }
});
