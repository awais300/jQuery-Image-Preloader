/*
Description: Preload all images
Author: Muhammad Awais
Contact: awais300@gmail.com
bug-report: awais300@gmail.com
*/

(function($) {
    $.imgPreloader = $.fn.imgPreloader = function(imgArray, settings) {

    var loading = 0;
    var iteration = 0;
    var ObjSettings = {};

    var helpMsgs = {
        'noImgFound': 'No image found',
        'loadingProgress': 'Preloading progress bar initiated',
        'completed' : 'Image caching completed'
    }

    var defaults = {
        'showPercentage': true,
        'reporting':false,
        'afterEveryImage': $.noop(),
        'onComplete': $.noop()
    };

    objSettings = $.extend({}, defaults, settings);

    if (!imgArray.length == 0) {
        if (imgArray.length == 0) {
            if(objSettings.reporting == true) {
                console.log(helpMsgs.noImgFound);
            }
        }   

        if(objSettings.showPercentage == true) {
            if(objSettings.reporting == true) {
                console.log(helpMsgs.loadingProgress);
            }

            //Append a div to display loading precentage
            $('html').append("<div class='imgPreloader'></div>");
            $imgPreloader = $('.imgPreloader');
            $imgPreloader.center('absolute').text('Loading 1 %');
        }

        //cache each image
        $(imgArray).each(function(index, value) {
            $('<img/>').attr('src', value).load(function(e) {
                ++iteration;
                loading = parseInt((iteration / imgArray.length) * 100);

                //if true then show image uploading in percentage in the center of window
                if (objSettings.showPercentage == true) {
                    $imgPreloader.center('absolute').text('Loading ' + loading + '%');
                }
                
                //function call after each image is cahced                     
                objSettings.afterEveryImage(value);

                if(iteration == imgArray.length) {
                    if(objSettings.showPercentage == true) {
                        $imgPreloader.fadeOut('slow');
                    }

                    if(objSettings.reporting == true) {
                        console.log(helpMsgs.completed);
                    }

                    //function call after all image are cached
                    objSettings.onComplete.apply(this);
                }
            });
        });
    }
    else {
        //function call after all image are cached
        objSettings.onComplete.apply(this);
    }
}

//function to center a div
$.fn.center = function(position) {
    var $this = $(this);
    $this.css('position', position);
    $this.css('bottom', (($(window).height() - $this.outerHeight()) / 2 + $(window).scrollTop()));
    $this.css('left', (($(window).width() - $this.outerWidth()) / 2 + $(window).scrollLeft()));
    return $this;
}
})(jQuery);
