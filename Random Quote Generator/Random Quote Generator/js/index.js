var global_quote;
var global_author;

function tempQuote(){
 $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(data){
   $("#quote").text(data[0].content);
 });  

}

function chooseQuote(){
  $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=40&callback=", function(data) {

    var index = Math.floor(Math.random() * 40);
    global_quote = $("<div/>").html(data[index].content).text();
    global_author = $("<div/>").html(data[index].title).text();
    $("#quote").text(global_quote);
    $("#author").text(global_author);
  });
}

function tweet(){
  window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent( global_quote + "-" + global_author));
}

/*
$(document).ready(function(){
    $("#gen_quote").click(function(){      
        chooseQuote();
   });
  
  $("tweeter").click(function(){
    tweet();
  });
});
*/