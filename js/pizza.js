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
    
  });


})(jQuery);
