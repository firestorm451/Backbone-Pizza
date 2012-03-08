(function($) {

  window.Ingredient = Backbone.Model.extend({});

  // These are the available ingredients.
  window.PizzaMenuCollection = Backbone.Collection.extend({
    model: Ingredient,
    localStorage: new Store('pizza_menu'),
    initialize: function() {
      console.log('Inititalize PizzaMenuCollection', this);
    }
  });

  // These are the selected ingredients.
  window.SelectedIngredientsCollection = Backbone.Collection.extend({
    model: Ingredient,
    localStorage: new Store('pizza_selected_toppings'),
    initialize: function() {
      console.log('Inititalize SelectedIngredientsCollection', this);
    }
  });

  window.pizzaMenu = new PizzaMenuCollection();
  window.pizzaToppings = new SelectedIngredientsCollection();
  
  $(document).ready(function() {
    
    window.PizzaView = Backbone.View.extend({
      
      template: _.template($('#pizza-template').html()),
      
      render: function() {
        var renderedContent = this.template(this.model.toJSON());
        $(this.el).html(renderedContent);
        return this;
      }
      
    });
    
    window.IngredientView = Backbone.View.extend({
      
      tagName: 'tr',
      template: _.template($('#ingredient-template').html()),
      
      events: {
        'click .add' : 'addToPizza'
      },
      
      addToPizza: function() {
        console.log(this.model);
        pizzaToppings.trigger('add', this.model);
      },
      
      render: function() {
        var renderedContent = this.template(this.model.toJSON());
        $(this.el).html(renderedContent);
        return this;
      }
      
    });
    
    window.AppView = Backbone.View.extend({
      
      el: $('#pizzaapp'),
      
      initialize: function() {
        console.log('App View : function: initialize');
        
        pizzaMenu.bind('add', this.addMenuIngredient, this);
        
        pizzaMenu.add([
          {title: 'Peperoni'},
          {title: 'Anchovies'},
          {title: 'Kalamata Olives'},
          {title: 'Prosciutto'},
          {title: 'Bocconcini'}
        ]);
        
        pizzaToppings.bind('add', this.addIngredientToPizza, this);
        
        pizzaToppings.add({title: 'Tomato Base'});
      },
      
      render: function() {
        console.log('App View : render');
      },
      
      addIngredientToPizza: function(ingredient) {
        console.log('App View : add ingredient to pizza');
        var view = new IngredientView({model: ingredient});
        $("#ingredients_pizza").append(view.render().el);
      },
      
      addMenuIngredient: function(ingredient) {
        console.log('App View : render an ingredient view for pizza menu.', ingredient);
        var view = new IngredientView({model: ingredient});
        $("#ingredients_menu").append(view.render().el);
      },

    });
    
    window.app = new AppView();
    
  });


})(jQuery);
