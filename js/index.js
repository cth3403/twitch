var users = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas",
  "brunofin",
  "comster404",
  "MLPinball"
];

var channels = [];

function createUrl(type, channel) {
  return "https://wind-bow.glitch.me/twitch-api/" + type + "/" + channel +"?callback=?";
}

function getChannel() {
 
  users.forEach(function(user) {
     
      $.getJSON(createUrl("streams", user), function(data) {
        var channel = {};

        if (data.stream == null) {
          channel.status = "Offline";
        } else {
          channel.status = "Online";
        }
        
        $.getJSON(createUrl("channels", user), function(data) {
          channel.name = data.display_name?data.display_name:user;
          channel.game = data.game?data.game:"";
          channel.url = data.url
          channel.logo = data.logo;
          
          $.getJSON(createUrl("users", user), function(data) {
          if (data.status == 404) {
            channel.status = "Closed";
          } else {
            if(data.bio !== undefined && data.bio !== null){
              channel.bio = data.bio;
            }
            else{
              channel.bio = "";
            }
          }    
        }).done(function(){
            var html = "<div class='row'><hr><div class='col-md-12 "+channel.status+" name channel'>";
            html += "<div class='row'>";
              html += "<div class='col-md-4 ' id='"+channel.name+"'>";
                html += "<div class='row'>";
                html += "<div class='col-md-3 indicator "+channel.status+"'><i class='fa fa-circle ' aria-hidden='true'></i></div><div class='col-md-9'>";            
            if(channel.url !== undefined){
              html+= "<a target='_blank' href='"+channel.url+"'>"+channel.name+"</a>";
            }
            else{
              html += channel.name;
            }
            
            html += "</div>";
                html += "</div>";
              html += "</div>";
              html += "<div class='col-md-4 game'>"+channel.game+"</div>";
              if( (channel.logo !== undefined && channel.logo !== null) && channel.url !== undefined || null){
                html += "<div class='col-md-4 logo'><a target='_blank' href='"+channel.url+"'><img src='"+channel.logo+"' alt='channel logo'></a></div>";
              }
              else{
                if(channel.logo == undefined || null){
                  html += "<div class='col-md-4 logo'>";
                  if(channel.url !== undefined || null){
                    html += "<a target='_blank' href='"+channel.url+"'>No Logo Defined</a>";
                  }
                  else{
                    html += "No Logo Defined";
                  }
                  html += "</div>";
                }
              }
      
            if(channel.bio !== undefined){
              html += "<div class='col-md-12 bio'>"+channel.bio+"</div>";
            }
            else{
              html += "<div class='col-md-12 bio'></div>";
            }
            html += "</div>";
            
            $('#results').append(html);
          });
      });
        
      });       
});
}



$(document).ready(function() {
getChannel();
  
  $("button").click(function() {
    var click = $(this).text();
    click.replace("/\s/", "");
  
    $(".name").each(function(){
      var classes = $(this).attr("class");
      $(this).parent().removeClass("removed");
      if(classes.match(click) == null){
        $(this).parent().addClass("removed");
      } 
    });
   
   
  });
});