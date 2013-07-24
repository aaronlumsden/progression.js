/*!
 * Progression.js
 * Original author: @aaronlumsden
 * Further changes, comments: @aaronlumsden
 * Licensed under the MIT license
 */
;(function ( $, window, document, undefined ) {

  // Setting defaults
  var pluginName = "progression", defaults = {
    tooltipWidth: '200',
    tooltipPosition: 'right',
    tooltipOffset: '50',
    showProgressBar: true,
    showHelper: true,
    validator: false,
    tooltipFontSize: '14',
    tooltipFontColor: 'ffffff',
    progressBarBackground: 'ffffff',
    progressBarColor: '6EA5E1',
    tooltipBackgroundColor: 'a2cbfa',
    tooltipPadding:'10',
    tooltipAnimate:true
  };

  function Plugin( element, options ) {
    this.element = element;
    this.currentForm = $(this.element);
    this.options = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype = {

    // Constructor function
    init: function() {

      // Setting helper function
      function GetPercentage(a, b) {
        return ((b / a) * 100);
      }

      // Set form to relative position
      // This is needed to position the progression tooltips correctly
      progressionElements = this.currentForm.css('position','relative');

      // Find all progression elements in the form
      progressionElements = this.currentForm.find('[data-progression]');

      // Get first helper text to display on init
      firstHelper =  progressionElements.first().attr('data-helper');

      // If there is no helper text set it to empty string
      if (firstHelper === undefined) {
        firstHelper = '';
      }

      // Style helper for different arrow positions
      var arrowPosition = (this.options.tooltipPosition == 'right') ? 'border-color: transparent #'+this.options.tooltipBackgroundColor+' transparent transparent;' : 'border-color: transparent transparent transparent #'+this.options.tooltipBackgroundColor+'';

      // Build the HTML for the tooltip
      html = $('\
        <div  class="syco_tooltip"\
              data-tooltip="'+this.currentForm.attr('id')+'"\
              style=" padding:'+this.options.tooltipPadding+'px;\
                      top:'+progressionElements.first().position().top+'px;\
                      position:absolute;\
                      background:#'+this.options.tooltipBackgroundColor+';\
                      '+this.options.tooltipPosition+':-'+(parseInt(this.options.tooltipWidth) + parseInt(this.options.tooltipOffset))+'px;\
                      width:'+this.options.tooltipWidth+'px"\
        >\
          <span class="triangle_'+this.options.tooltipPosition+'" style="'+arrowPosition+'"></span>\
          <p style="font-size:'+this.options.tooltipFontSize+'px;color:#'+this.options.tooltipFontColor+'">\
            <span class="tooltip_helper">\
              <span data-index="1" >1</span> /'+progressionElements.length+'\
            </span>\
            '+firstHelper+'\
          </p>\
          <div class="percentagebar" style="background:#'+this.options.progressBarBackground+'"">\
            <div class="percentagebarinner" style="background:#'+this.options.progressBarColor+'"></div>\
            <span class="percent">0%</span>\
          </div>\
        </div>');

      if(this.options.tooltipAnimate){
        html.addClass('animated');
        html.find('.percentagebarinner').addClass('animated');
      }

      // Hide percentage bar when it is disabled
      if(!this.options.showProgressBar) {
        html.find('.percentagebar').hide();
      }

      // Hide tooltip helper text when it is disabled
      if(!this.options.showHelper) {
        html.find('.tooltip_helper').hide();
      }

      // Add the tooltip in the form
      this.currentForm.prepend(html);

      // Get all progression elements
      progressionElements.each(function(){

        var currentElement = $(this);

        // Bind to action on a field to move the tooltip
        currentElement.bind('live focus change',function(){

          thisprogressionlength = currentElement.parent().parent().find('[data-progression]').length;
          alldataprogression = currentElement.parent().parent().find('[data-progression]');

          thisId2=currentElement.parent().parent().attr('id');
          thistooltip = $('[data-tooltip="'+thisId2+'"]');
          thishelper= currentElement.attr('data-helper');

          // Get current helper text to display on init
          thishelper =  currentElement.attr('data-helper');

          // If there is no helper text set it to empty string
          if (thishelper === undefined) {
            thishelper = '';
          }

          index = parseInt($('#'+thisId2).find('[data-progression]').index(currentElement)) + 1;
          percentage = GetPercentage(thisprogressionlength, index).toFixed(0);
          thistooltip.find('p').html('<span class="tooltip_helper"><span data-index="1" >'+index+'</span>/'+thisprogressionlength+'</span> '+thishelper).parent().find('.percentagebarinner').css( "width",parseInt(percentage)+'%').next().html(parseInt(percentage)+'%');
          thistooltip.css( "top", currentElement.position().top+'px' );

        });

      });

    }
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
      }
    });
  };

})( jQuery, window, document );