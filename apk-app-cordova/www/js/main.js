//inicializamos la aplicación
var $$ = Dom7;
var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App Recipes',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },

  // Add default routes
  routes: [
    {
      name: 'recetas',
      path: '/recetas/',
      id: 'recetas',
      url: './pages/recipes.html',

      on: {
        pageAfterIn: function (e, page) {
          //console.log(e);
        },
        pageInit: function (e, page) {

          var $recipes = '';
          app.request.json('./DB/dbrecipes.json', function (data) {

            for(var i = 0; i < data[0].recipes.length; i++){

            //  if(data[i].ingredients[i].id == data[i].recipes[i].ingredients[0]){

            //  console.log(data[i].recipes);
              //}

              //data[i].recipes[0].ingredients[0]

              $recipes += '<li class="item-content">' +
              '<a href="/single-recetas/'+data[0].recipes[i].id+'" class="item-link item-content">' +
                '<div class="item-media">' +
                  '<figure class="item-figure">' +
                    '<img src="'+data[0].recipes[i].recipe_img+'" width="100%"/>' +
                  '</figure>' +
                '</div>' +
                '<div class="item-inner">' +
                  '<div class="item-title-row">' +
                    '<div class="item-title">'+data[0].recipes[i].recipe_name+'</div>' +
                  '</div>' +
                    '<div class="item-subtitle">receta</div>'+
                '</div>' +
              '</a>' +
              '</li>';
            }
            $$('#list-items').html($recipes);
          });
        },
      }
    },
    {
      name: 'singleReceta',
      path: '/single-recetas/:id',
      templateUrl: './pages/single_recipes.html',
      on:{
       pageInit: function(e, page){
         console.log(page);
        var id_params = page.route.params.id;
        var $detail_recipe = '';
        app.request.json('./DB/dbrecipes.json', function (data) {
          for(var i = 0; i < data[0].recipes.length; i++){
            //console.log(data[0].recipes[i].id);
            if( id_params == data[0].recipes[i].id ){
              //console.log(data[0].recipes[i].recipe_name);
               $detail_recipe += '<div class="block-title">'+data[0].recipes[i].recipe_name+'</div>' +
              // '<figure class="item-figure">' +
              //   '<img src="'+data[0].recipes[i].recipe_img+'" width="100%"/>' +
              // '</figure>' +data[0].recipes[i].recipe_video
              '<iframe width="100%" height="200" src="https://www.youtube.com/embed/'+data[0].recipes[i].recipe_video+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'+
              '<p>'+data[0].recipes[i].recipe_description+'</p>' +
              '<div class="block-title">Ingredientes:</div>' +
              '<div class="list media-list inset list-ingredients">' +
                '<ul>';
                //Se busca los ingredientes en ingredients por la posicion de el array de ingredients_id en recipes json
                let json_ingredients = data[0].ingredients;
                let recipe_ingredients = data[0].recipes[i].ingredients_id;
                for (var position_ingredients in recipe_ingredients) {
                  let ingredients = json_ingredients[recipe_ingredients[position_ingredients]];
                  console.log(json_ingredients[recipe_ingredients[position_ingredients]]);
                  //se valida el array ingredientes de la receta con el id de ingredientes en el json
                  if(recipe_ingredients[position_ingredients] == ingredients.id){
                    $detail_recipe += '<li>' +
                      '<a class="item-link item-content">' +
                        '<div class="item-media">' +
                          '<figure class="img-ingredients">' +
                            '<img src="'+ingredients.img+'" width="80"/>' +
                          '</figure>'+
                        '</div>' +
                        '<div class="item-inner">' +
                          '<div class="item-title-row">' +
                            '<div class="item-title">Aguacate</div>' +
                            '<div class="item-after">$500</div>' +
                          '</div>' +
                          '<div class="item-subtitle">Verdura</div>' +
                        '</div>' +
                      '</a>'+
                    '</li>';
                  }
                }

              $detail_recipe += '</ul></div>'
            }
          }
          $$('#detail-recipe').html($detail_recipe);
        });
       },
      }
    },
  ],
});

//inicializamos la vista
var mainView = app.views.create('.view-main');
