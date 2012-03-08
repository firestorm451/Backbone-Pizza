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
    localStorage: new Store('pizza_selected_toppings')
  });

  window.pizzaMenu = new PizzaMenuCollection();
  
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
      
      template: _.template($('#ingredient-template').html()),
      
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
          {title: 'Olives'},
          {title: 'Capscicum'},
          {title: 'Bocconcini'}
        ]);
      },
      
      render: function() {
        console.log('App View : render');
      },
      
      addMenuIngredient: function(ingredient) {
        console.log('App View : render an ingredient view for pizza menu.', ingredient);
        var view = new IngredientView({model: ingredient});
        $("#ingredients_pizza").append(view.render().el);
      },

    });
    
    window.app = new AppView();
    
  });


})(jQuery);
