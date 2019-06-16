$(document).ready(function() {


 if (window.location.href.indexOf("?c=1") > -1) {
  //  console.log("Client visitor detected!");
 } else {
  //  console.log("No client visitor detected!");
  $("a[href='/hc/en-us/articles/214169168-Live-Chat-Support']").parent().css("display", "none");
  $('.search-result-link:contains("Live Chat Support")').parent().css("display", "none");
 }

 if ($(".notification-inline").not("#upload-error").length) {
  $(".form_list").hide();
 }


 // shift things around a bit  



 if (HelpCenter.user.role == "enduser") {
  $('#zenbox_tab').css('display', 'none');
 }

 //Check that the user is going to the "Submit a Request" page from a search page
 if (window.location.href.indexOf('requests/new') > -1 && document.referrer.indexOf("search?") > -1) {

  //Set the last location the user was in to extract the user's search
  var cameFrom = document.referrer;
  //get the substring of the search from the URL
  var lastSearched = cameFrom.substr(cameFrom.lastIndexOf("query"));
  //Use the browser storage to accomodate for accounts with more than one support form
  localStorage.setItem("lastSearched", lastSearched);

 } //end if (window.location... > -1)

 //Check that the request form is logging the reporting as a request made from a search
 if (window.location.href.indexOf('request_from_search=true') > -1) {
  //The next two lines are to hide the custom fields from the end-user in the form 
  $("div.request_custom_fields_26893797").hide();
  $('.request_custom_fields_26872828').hide();
  //Fire this right before the user submits the form (when the user's mouse pointer is over the "Submit" button)
  $("input[value='Submit']").hover(function() {
   //Get the search string from the browser's local storage
   var lastSearched = localStorage.getItem("lastSearched");
   //if the lastSearched variable has a value (this check is used inorder to not duplicate the string we're sending to the Agent interface
   if (lastSearched) {
    //Clean up the user's query we're sending to the Agent interface
    var lastSearched = (lastSearched).replace('&commit=Search', '');
    //Set the text custom field to reference the search string the customer searched
    $("div.request_custom_fields_26872828 input").val("Search of: " + lastSearched);
    //Set the dropdown custom field to reference that the ticket came from search
    $('.request_custom_fields_26893797 input').val('ticket_after_help_center_search');
    //clear out the local storage so that we do not add this line multiple times if the user hovers over the "Submit" button many times
    localStorage.removeItem("lastSearched");
   } //end if(lastSearched)
  }); //end .hover(function(){})
 } //end if (window.location... > -1)
 //Check that the user is going to the "Submit a Request" page from an article
 if (window.location.href.indexOf('requests/new') > -1 && document.referrer.indexOf("articles") > -1) {
  //Set the last location the user was in to extract the last article the user was on
  var cameFrom = document.referrer;
  //get the substring of the article ID and title from the URL
  var referrerArticle = cameFrom.substr(cameFrom.lastIndexOf("/") + 1);
  //Use the browser storage to accomodate for accounts with more than one support form
  localStorage.setItem("referrerArticle", referrerArticle);
 } //end if (window.location... > -1)

 //Check that the user is on the request form
 if (window.location.href.indexOf('requests/new') > -1) {
  //The next two lines are to hide the custom fields from the end-user in the form 
  $('.request_custom_fields_26893797').hide();
  $("div.request_custom_fields_26872828").hide();
  //Fire this right before the user submits the form (when the user's mouse pointer is over the "Submit" button)
  $("input[value='Submit']").hover(function() {
   //Get the article ID and title from the browser's local storage
   var referrerArticle = localStorage.getItem("referrerArticle");
   //if the referrerArticle variable has a value (this check is used inorder to not duplicate the string we're sending to the Agent interface)
   if (referrerArticle) {
    //Sets the dropdown custom field to reference that this came from an article
    $('.request_custom_fields_26893797 input').val('ticket_after_help_center_article');
    //Set the text custom field to reference the article ID and title
    $("div.request_custom_fields_26872828 input").val("From Article: " + referrerArticle);
    //clear out the local storage so that we do not add this line multiple times if the user hovers over the "Submit" button many times
    localStorage.removeItem("referrerArticle");
   } //end if(lastSearched)
  }); //end .hover(function(){})
 } //end if (window.location... > -1)
 if (typeof HelpCenter.user.locale === 'undefined') {
  HelpCenter.user.locale = 'en-us';
 }

 $.when(

  $.get("/api/v2/help_center/" + HelpCenter.user.locale + "/sections.json", function(data) {
   allsections = data;
  }),

  $.get("/api/v2/help_center/" + HelpCenter.user.locale + "/articles.json?per_page=100&page=1", function(data) {
   page1 = data;
  }),

  $.get("/api/v2/help_center/" + HelpCenter.user.locale + "/articles.json?per_page=100&page=2", function(data) {
   page2 = data;
  }),

  $.get("/api/v2/help_center/" + HelpCenter.user.locale + "/articles.json?per_page=100&page=3", function(data) {
   page3 = data;
  })

 ).done(function() {

  var sectionList = $.map(allsections.sections,
   function(section, i) {

    return {
     "sectionname": section.name,
     "sectionid": section.id
    }
   });



  var articleList = $.map(page1.articles.concat(page2.articles, page3.articles), function(article, i) {
   return {
    "title": article.title,
    "value": article.title,
    "url": article.html_url,
    "section": article.section_id
   };
  });

  // remove chat article from autocomplete
  for (var count = 1; count < articleList.length; count++) {
   if (articleList[count].url == "https://support.hidemyass.com/hc/en-us/articles/214169168-Live-Chat-Support") {
    articleList.splice(count, 1);
   }
  }


  $("#query").autocomplete({
   minLength: 0,
   source: articleList,
   focus: function(event, ui) {
    $("#query").val(ui.item.title);
    return false;
   },
   select: function(event, ui) {
    window.location.replace(ui.item.url);
    return false;
   }
  })

  .autocomplete("instance")._renderMenu = function(ul, items) {
   var that = this;
   $.each(items, function(index, item) {
    that._renderItemData(ul, item);
   });
   $(ul).slideDown(500);
  }



  $("#query").autocomplete("instance")._renderItem = function(ul, item) {

   var neededname = "";
   for (var n = 0; n < sectionList.length; ++n) {
    if (sectionList[n].sectionid == item.section) {
     neededname = sectionList[n].sectionname + ": ";
    }
   };

   neededname = '<font color="#000000">' + neededname + '</font>';
   return $("<li>")
    .append("<a>" + neededname + '<b>' + item.title + "</b></a>")
    .appendTo(ul);

  };
 });

 // End of autocomplete code

 // social share popups
 $(".share a").click(function(e) {
  e.preventDefault();
  window.open(this.href, "", "height = 500, width = 500");
 });

 // toggle the share dropdown in communities
 $(".share-label").on("click", function(e) {
  e.stopPropagation();
  var isSelected = this.getAttribute("aria-selected") == "true";
  this.setAttribute("aria-selected", !isSelected);
  $(".share-label").not(this).attr("aria-selected", "false");
 });

 $(document).on("click", function() {
  $(".share-label").attr("aria-selected", "false");
 });

 // show form controls when the textarea receives focus
 $(".answer-body textarea").one("focus", function() {
  $(".answer-form-controls").show();
 });

 $(".comment-container textarea").one("focus", function() {
  $(".comment-form-controls").show();
 });

 // custom function to replace strings multiple times
 String.prototype.replaceAll = function(find, replace) {
  var str = this;
  return str.replace(new RegExp(find, 'g'), replace);
 };

 // give all sections a hook for styling
 var sectionlist = $(".section h3");
 if (sectionlist.length > 0) {
  for (var i = 0, maxi = sectionlist.length; i < maxi; i++) {
   var
    sect = $(sectionlist[i]),
    className = "section-" + $(sect).find("a").first().text().toLowerCase().replaceAll(" ", "-").replaceAll("/", "-");
   sect.addClass(className);
  }
 }

 // add class names to each element in a category list
 var categories = $(".category-list li");
 if (categories.length > 0) {
  

  // give all categories a hook for styling
  for (var i = 0, maxi = categories.length; i < maxi; i++) {
   var
    cat = $(categories[i]),
    className = $(cat).find("a").first().text().toLowerCase().replaceAll(" ", "-");
   cat.addClass(className);
  }
 }


 // Get form ID from URL  
 function queryParameters() {
  var result = {};
  var params = window.location.search.split(/\?|\&/);
  params.forEach(function(it) {
   if (it) {
    var param = it.split("=");
    result[param[0]] = decodeURI(param[1]).trim();
   }
  });
  return result;
 }


 if (window.location.href.indexOf("ticket_form_id=") > -1) {

  $(".hmaforms").css("display", "none");
  console.log(queryParameters());
  var formid = queryParameters().ticket_form_id;
  var formtopic = $('a[href$="ticket_form_id=' + formid + '"]').text();


 // section desc doesnt allow html otherwise  
 function replacesectiondesc(c, d) {
  if ($(".section-description").length) {
   var sectdesc = $(".section-description").html();
   $(".section-description").html(sectdesc.replace(c, d));
  }
 }
 
 }
  
  // rearrange form fields
$('#new_request.request-form label:contains("request_custom_fields_31443628")').parent().insertBefore('#new_request.request-form label:contains("request_custom_fields_77434407"")');
  

(function() {
	'use strict';
	$(document).ready(function() {
var CookieBar = {};
        CookieBar.cookieDom = document.querySelector('.js-cookie-bar');
        CookieBar.cookieCloseDom = document.querySelector('.js-cookie-bar .js-close');

		/**
		 * @description Close the cookie-bar by removing it from the DOM, and saving this preference to the local storage
		 */
		CookieBar.close = function() {
			try {
				localStorage.setItem('hma-cookie-bar-closed', true);
			} catch (error) {
				console.log('Unable to store preference in local storage, cookiebar will show upon next visit', error);
			}

			CookieBar.cookieDom.parentNode.removeChild(CookieBar.cookieDom);
		};

		/**
		 * @description Initialise the CookieBar component, by binding all the event handlers
		 */
		CookieBar.initialise = function() {
			// Cookiebar will be visible either when the key doesn't exist (getItem returns null) or returns another value than "true"
			if (localStorage.getItem('hma-cookie-bar-closed') !== 'true') {
				CookieBar.cookieDom.classList.add('visible');
				CookieBar.cookieCloseDom.onclick = CookieBar.close;
			} else {
				CookieBar.cookieDom.parentNode.removeChild(CookieBar.cookieDom);
			}
		};

		CookieBar.initialise();
	});
})();
});