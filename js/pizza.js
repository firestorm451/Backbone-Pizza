(function($) {

  window.Ingredient = Backbone.Model.extend({});

  $(document).ready(function() {
    
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
        peperoni          = new Ingredient({title: 'peperoni'});
        ingredientView    = new IngredientView({model: peperoni});
      },
      
      home: function() {
        $("#container").append(ingredientView.render().el);
      }
      
    });
    
    window.App = new BackbonePizza();
    Backbone.history.start();
    
  });


})(jQuery);
