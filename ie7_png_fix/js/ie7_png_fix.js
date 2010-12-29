/* IE PNG fix multiple filters */
(function ($) {
    if (!$) return;
    $.fn.extend({
        fixPNG: function(sizingMethod, forceBG) {
                if (!($.browser.msie)) return this;
                var emptyimg = Drupal.settings.ie7_png_fix.cleargif; // Path to empty 1x1px GIF
                sizingMethod = sizingMethod || "scale"; //sizingMethod, defaults to scale (matches image dimensions)
                this.each(function() {
                        var isImg = (forceBG) ? false : jQuery.nodeName(this, "img"),
                                imgname = (isImg) ? this.src : this.currentStyle.backgroundImage,
                                src = (isImg) ? imgname : imgname.substring(5,imgname.length-2);
                        this.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "', sizingMethod='" + sizingMethod + "')";
                        if (isImg) this.src = emptyimg;
                        else this.style.backgroundImage = "url(" + emptyimg + ")";
                });
                return this;
        }
    });
})(jQuery);


$(document).ready(function() {
   $("." + Drupal.settings.ie7_png_fix.targetclass + " img").fixPNG(); // passing target class by variable
});
