function listaAnuncio(){              

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,                   
          center: new google.maps.LatLng(-33.92, 151.25),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infowindow = new google.maps.InfoWindow();

        var marker, i;

        var icon = "images/mark.png";
        

        for (i = 0; i < locations.length; i++) {  
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2], locations[i][3]),
            map: map,
            icon:icon
          });

          google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
            return function() {
              infowindow.setContent(locations[i][0]);
              infowindow.open(map, marker);
            }
          })(marker, i));
        }

};




$(function(){

 
    $('.verContato').click(function(){
        var phone = $('.phone').text();
        $(this).text(phone).addClass('click');
    });

    $('.favoritar').click(function(e) {
        $(this).text('Adicinado aos favoritos');
    });

    $('.avaliacao i').mouseover(function(){        
        $(this).removeClass().toggleClass('fa fa-star');
    }).mouseout(function(event) {
        $(this).removeClass().toggleClass('fa fa-star-o');
    });

})


