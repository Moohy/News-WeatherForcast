var ACCESS_TOKEN = "76bf29fee2424002b41c081c9ac5523e"

var NEWS_ENDPOINT = " https://newsapi.org/v1/articles?"

var SOURCES = "https://newsapi.org/v1/sources?language=en"

//var srcIcon = $('<img src="'+data.urlsToLogos+'"/>')
//srcIcon.appendTo($('#articles'))

$(document).ready(function() {

  //This requests the sources that will be listed on the select element
  jQuery.ajax(SOURCES, requestSource)
  requestArticles("cnbc", "top")
  
  $('#sortBy').change(function(){
    $('#articles').empty()
    requestArticles($('#srcOp option:selected').data('status'), $('#sortBy option:selected').data('status'))
    console.log($('#srcOp option:selected').data('status'))
  });
  //Articles' of a specific source request function
  $('#srcOp').change(function(){
    var optionChosen = $('#srcOp option:selected').data('status')
    $('#sortBy').prop('selectedIndex',0);
    console.log("option")
    $('#articles').empty()
    requestArticles($('#srcOp option:selected').data('status'), "top")
    
  });
  
})

var requestSource = {
  error : requestError,
  success : sourceSuccess
}

function sourceSuccess(data, textStatus, jqXHR) {
  console.log("success1")
  console.log(data.sources)
  data.sources.forEach(function(source){
    var idOp = $('<option data-status="'+source.id+'">'+ source.name +'</option>')                

    idOp.appendTo($('#srcOp'))
  })

}


function requestArticles(source, sort) {
  console.log("search")
  var requestSettings = {
    data :{
      source : source,
      sortBy : sort,
      apiKey : ACCESS_TOKEN

    },
    error : requestError,
    success : articlesSuccess

  }
  jQuery.ajax(NEWS_ENDPOINT, requestSettings)
}

function articlesSuccess(data, textStatus, jqXHR) {
  console.log("success")
  console.log(data.articles)
  data.articles.forEach(function(article){
    
    var infoDiv = $('<div class="article"></div>')
    var titleDiv = $('<div class="title"></div>')
    var descrpDiv = $('<div class="description"></div>')
    var urlDiv = $('<div class="url"></div>')
    var imgDiv = $('<div class="articleImg"></div>')
    var authDiv = $('<div class="autherName"></div>')

    
    var title = $("<span />", { html: article.title })
    var descrp = $("<span />", { html: article.description })
    var url = $('<a href="'+ { html: article.url }+'">Read more</a>')
    var articleImg = $('<img class="theImage" src="' + article.urlToImage + '" />')
    var auther = $("<span />", { html: article.auther })

    articleImg.appendTo(imgDiv)
    //auther.appendTo(authDiv)  
    title.appendTo(titleDiv)
    descrp.appendTo(descrpDiv)
    url.appendTo(urlDiv)
    
    infoDiv.append(imgDiv)
    //infoDiv.append(authDiv)
    infoDiv.append(titleDiv)
    infoDiv.append(descrpDiv)
    infoDiv.append(urlDiv)
    infoDiv.appendTo($('#articles'))
  })

}

function requestError(jqXHR, error, errorThrown) {
  console.log("error")
  console.log(jqXHR)
 // $('#error-message').append($('<div class="error"> error </div>'))
}