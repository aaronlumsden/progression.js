/*!
 * Progression.js
 * Original author: @aaronlumsden
 * Further changes, comments: @aaronlumsden
 * Licensed under the MIT license
 */
;(function ( $, window, document, undefined ) {

    var pluginName = "progression",
        defaults = {
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

       // $('<style>body { background-color: red; color: white; }</style>').appendTo('head');

    function Plugin( element, options ) {
        this.element = element;
        this.$elem = $(this.element);
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function() {

             data_prog = this.$elem.css('position','relative').find('[data-progression]');   

            



          

            items =  data_prog.length;
            thisid = this.$elem.attr('id');
            firstoffset =  data_prog.first().position().top;
            firsthelper =  data_prog.first().attr('data-helper');
          
                function GetPercentage(a, b) {
                    return ((b / a) * 100);
                }

            if (data_prog.first().attr('data-helper') !== undefined) {
                  firsthelper =  data_prog.first().attr('data-helper');
            } else {
                firsthelper = '';
            }

            if (this.options.showProgressBar === false) { 
                $display = 'display:none;';
            } else {
                  $display = '';
            }

            if (this.options.showHelper === false) {
              $display2 = 'display:none;';
            } else {
                  $display2 = '';
            }

             var animate = (this.options.tooltipAnimate) ? '-webkit-transition: top .3s ease-in-out;-moz-transition: top .3s ease-in-out;-o-transition: top .3s ease-in-out;transition: top .3s ease-in-out;' : '';
             var animate2 = (this.options.tooltipAnimate) ? '-webkit-transition: width .3s ease-in-out;-moz-transition: width .3s ease-in-out;-o-transition: width .3s ease-in-out;transition: width .3s ease-in-out;' : '';
             var arrowPosition = (this.options.tooltipPosition == 'right') ? 'border-color: transparent #'+this.options.tooltipBackgroundColor+' transparent transparent;' : 'border-color: transparent transparent transparent #'+this.options.tooltipBackgroundColor+'';


            marginRight = parseInt(this.options.tooltipWidth) + parseInt(this.options.tooltipOffset);
            myhtml = $('<div class="syco_tooltip" data-tooltip="'+thisid+'" style="'+animate+'padding:'+this.options.tooltipPadding+'px;top:'+firstoffset+'px;position:absolute;background:#'+this.options.tooltipBackgroundColor+';'+this.options.tooltipPosition+':-'+marginRight+'px;width:'+this.options.tooltipWidth+'px" ><span class="triangle_'+this.options.tooltipPosition+'" style="'+arrowPosition+'"></span><p style="'+$display2+'font-size:'+this.options.tooltipFontSize+'px;color:#'+this.options.tooltipFontColor+'"><span class="tooltip_helper"><span data-index="1" >1</span>/'+items+'</span> '+firsthelper+'</p><div class="percentagebar" style="'+$display+'background:#'+this.options.progressBarBackground+'""><div class="percentagebarinner" style="'+animate2+'background:#'+this.options.progressBarColor+'"></div><span class="percent" '+$display+'>0%</span></div></div>');
            this.$elem.prepend(myhtml);
            thiswidth = this.$elem.find('.syco_tooltip').width();

             data_prog.each(function(){

                var $this1 = $(this);
                var offset = $this1.position().top;

                $this1.bind('live focus change',function(){

                   thisprogressionlength = $this1.parent().parent().find('[data-progression]').length;
                   alldataprogression = $this1.parent().parent().find('[data-progression]');

                    thisid2=$this1.parent().parent().attr('id');
                    thistooltip = $('[data-tooltip="'+thisid2+'"]');
                    thishelper= $this1.attr('data-helper');

                    if ($this1.attr('data-helper') !== undefined) {
                            thishelper= $this1.attr('data-helper');
                    } else {
                        thishelper = '';
                    }

                    index = parseInt($('#'+thisid2).find('[data-progression]').index($this1)) + 1;
                    percentage = GetPercentage(thisprogressionlength, index).toFixed(0);
                    thistooltip.find('p').html('<span class="tooltip_helper"><span data-index="1" >'+index+'</span>/'+thisprogressionlength+'</span> '+thishelper).parent().find('.percentagebarinner').css( "width",parseInt(percentage)+'%').next().html(parseInt(percentage)+'%');
                    thistooltip.css( "top", offset+'px' );

                });

            });
            
         
            
        },

        yourOtherFunction: function(el, options) {
            // some logic
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


