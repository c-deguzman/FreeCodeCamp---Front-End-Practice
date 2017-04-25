var search_limit = 7;


function find_id(title){
  
  var return_id = "null";
  
   var titles_api_url = "https://en.wikipedia.org/w/api.php?action=query&format=json&indexpageids=1&origin=*&titles=";

  $.ajax({
    dataType: "json",
    type: "GET",
    url: titles_api_url + title,
    async: false,
    success: function (data){
      var id = data.query.pageids;
      
      return_id = id[0];
    }
  });
  
  return return_id;
}


function addContent(ind, result){
  var page_id_url = "https://en.wikipedia.org/?curid=";
  
  var res_id = "\"" + "res_" + ind + "\"";
          
  $("#content_area").append("<div class=\"result\" id=" + res_id + "> </div>");
  $("#res_" + ind).append("<h3>" + result.title + "</h3>");
  $("#res_" + ind).append("<p>" + result.snippet + "</p>");


  var page_id = find_id(result.title);
  var page_url = "\"" + page_id_url + page_id + "\"";

  $("#res_" + ind).attr("onClick", "window.open(" + page_url + ")");
  //$("#res_" + ind).append("<button class=\"btn\"> Visit page </button>");
  $("#content_area").append(" <br>");
}


function takeSearch(){
  
  $("#content_area").empty();
  var titles = "";
 
  var text = encodeURI($("#entry").val());
 
  var search_api_url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&format=json&srlimit="+ search_limit + "&origin=*&srsearch="
  
  $.ajax({
	    type: "GET",
	    url: search_api_url + text,
	    contentType: "application/json; charset=utf-8",
	    async: false,
	    dataType: "json",
	    success: function (data) {

        var results = data.query.search;
        
        for (var i in results){
          
          addContent(i, results[i]);
   
        }     
      }
  });

}