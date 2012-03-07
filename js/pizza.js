(function($) {

  window.Ingredient = Backbone.Model.extend({});
  window.IngredientList = Backbone.Collection.extend({
    model: Ingredient,
    
    localStorage: new Store("ingredients"),
    
    initialize: function() {
      console.log(this);
    }
  });


  model = new Ingredient();
  model.set('title', 'peperoni');
  
  console.log('Create a global list of ingredients');
  window.Ingredients = new IngredientList([model]);
  
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
        // console.log('App View : function: initialize');

        // Ingredients.bind('add',   this.addOne, this);
        // Ingredients.bind('reset', this.addAll, this);
        // Ingredients.bind('all',   this.render, this);

      },
      
      addOne: function() {
        console.log('App View : function: addOne');
      },

      addAll: function() {
        console.log('App View : function: addAll');
      }
      
      
    });
    
    window.App = new AppView();
    
  });


})(jQuery);
