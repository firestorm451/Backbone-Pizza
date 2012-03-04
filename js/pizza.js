(function($) {

  window.Ingredient = Backbone.Model.extend({});
  window.Pizza = Backbone.Model.extend({});
  
  $(document).ready(function() {
    
    
    window.PizzaView = Backbone.View.extend({
      initialize: function() {
        this.template = _.template($('#pizza-template').html());
      },
      
      render: function() {
        var renderedContent = this.template(this.model.toJSON());
        $(this.el).html(renderedContent);
        return this;
      }
      
    });
    
    window.IngredientView = Backbone.View.extend({
      initialize: function() {
        this.template = _.template($('#ingredient-template').html());
      },
      
      render: function() {
        var renderedContent = this.template(this.model.toJSON());
        $(this.el).html(renderedContent);
        return this;
      }
      
    });
    
    window.BackbonePizza = Backbone.Router.extend({
      routes: {
        ''      : 'home',
      },
      
      initialize: function() {
        pizza             = new Pizza();
        peperoni          = new Ingredient({title: 'peperoni'});
        ingredientView    = new IngredientView({model: peperoni});
      },
      
      home: function() {
        $("#ingredients").append(ingredientView.render().el);
      }
      
    });
    
    window.App = new BackbonePizza();
    Backbone.history.start();
    
  });


})(jQuery);
