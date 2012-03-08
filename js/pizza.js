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

  window.pizzaMenu = new PizzaMenuCollection([
    {title: 'Peperoni'},
    {title: 'Anchovies'},
    {title: 'Olives'},
    {title: 'Capscicum'},
    {title: 'Bocconcini'}
  ]);
  
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
        
        
        // Ingredients.bind('add',   this.addOne, this);
        // Ingredients.bind('reset', this.addAll, this);
        // pizzaMenu.bind('change', this.render);
        
        // console.log('App View : fetch pizza menu');
        // pizzaMenu.fetch();
        
        // This should be bound to an event?
        this.render();
      },
      
      render: function() {
        console.log('App View : render');
        
        // This isn't right... there should be some iterator thing.
        for(var i = 0; i < pizzaMenu.models.length; i++) {
          console.log('App View : render : pizza menu', pizzaMenu.models[i]);
          model = pizzaMenu.models[i];
          this.addOne(model);
        }
        
        
      
        
        // $("#pizza_menu").append('');
      },
      
      addOne: function(ingredient) {
        console.log('App View : function: addOne', ingredient);
        var view = new IngredientView({model: ingredient});
        $("#ingredients_pizza").append(view.render().el);
      },

      addAll: function() {
        console.log('App View : function: addAll');
        
      }
      
      
    });
    
    window.app = new AppView();
    
  });


})(jQuery);
