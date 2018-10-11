$(document).ready(function(){   // Doc ready
  $("#quotebtn").click(function() {   // Click quote button    
    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?", function(data){   // getJSON data
      
      // Store JSON data in variables & use 'Anonymous' if no author found
      if (data.quoteAuthor) {
        var qAuthor = data.quoteAuthor; }
      else {
        var qAuthor = "Anonymous"; }
      var qText = data.quoteText;
      var qLink = data.quoteLink;
      var combined = qText.replace(/;/g, ",") + " - " + qAuthor;
      
      // Store sharing links in variables
      var qface = "https://www.facebook.com/sharer/sharer.php?u=" + combined;
      var qtweet = "https://twitter.com/intent/tweet?text=" + combined;
      var qtumblr = "https://www.tumblr.com/widgets/share/tool?canonicalUrl=" + qLink + "&title=A Random quote&caption=" + combined;
      
      // Send quote data to quote area
      $(".message").empty().append(qText.italics());
      $(".author").empty().append("-  " + qAuthor);
      
      // Send links to share buttons
      $(".facebook").each(function() {
        $(this).attr("href", qface);
      });
      
      $(".twitter").each(function() {
        $(this).attr("href", qtweet);
      });
      
      $(".tumblr").each(function() {
        $(this).attr("href", qtumblr);
      });
      
      
    }); // getJSON
  }); // getMessage 
}); // Doc ready