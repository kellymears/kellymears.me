!function(e){var n={};function c(r){if(n[r])return n[r].exports;var t=n[r]={i:r,l:!1,exports:{}};return e[r].call(t.exports,t,t.exports,c),t.l=!0,t.exports}c.m=e,c.c=n,c.d=function(e,n,r){c.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},c.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(n,"a",n),n},c.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},c.p="",c(c.s=133)}({133:function(e,n,c){"use strict";!function(e){var n,c=!1,r=ajaxurl.replace("/admin-ajax.php","")+"/images/spinner";2<window.devicePixelRatio&&(r+="-2x"),n=e('<img src="'+(r+=".gif")+'" alt="" class="check-licence-spinner" />'),e(document).ready(function(){e("body").on("click",".check-my-licence-again",function(r){if(r.preventDefault(),e(this).blur(),c)return!1;c=!0,e(this).hide(),n.insertAfter(this);var t=' <a class="check-my-licence-again" href="#">'+wpmdb_update_strings.check_license_again+"</a>";e.ajax({url:ajaxurl,type:"POST",dataType:"json",cache:!1,data:{action:"wpmdb_check_licence",nonce:wpmdb_nonces.check_licence,context:"update"},error:function(n,r,i){c=!1,e(".wpmdb-licence-error-notice").fadeOut(650,function(){e(".wpmdb-licence-error-notice").empty().html(wpmdb_update_strings.license_check_problem+t).fadeIn(650)})},success:function(n){if(c=!1,void 0!==n.errors){var r="";for(var t in n.errors)r+=n.errors[t];e(".wpmdb-licence-error-notice").fadeOut(650,function(){e(".check-licence-spinner").remove(),e(".wpmdb-licence-error-notice").empty().html(r).fadeIn(650)})}else e(".wpmdbpro-custom-visible").fadeOut(650,function(){e(".check-licence-spinner").remove(),e(".wpmdbpro-custom-visible").empty().html(e(".wpmdb-original-update-row").html()).fadeIn(650)})}})}),e(".wpmdbpro-custom").prev().addClass("wpmdbpro-has-message")})}(jQuery)}});
//# sourceMappingURL=plugin-update-191.js.map