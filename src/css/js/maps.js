function success(position) {
    // var s = document.querySelector('#status');
    var s = document.querySelector('#status');

    if (s.className == 'chamada') {
        return;
    }

    // s.innerHTML = "Você foi localizado!";
    s.innerHTML = "<span>Sendo alugado</span> perto de você";    
    s.className = 'chamada';

    var mapcanvas = document.createElement('div');
        mapcanvas.id = 'mapcanvas';
        mapcanvas.className = 'col-lg-12 col-md-12 col-sm-12';
        mapcanvas.style.height = '70vh';
        // mapcanvas.style.width = '100%';

    document.querySelector('#mapa').appendChild(mapcanvas);

    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var myOptions = {
        zoom: 17,
        center: latlng,
        mapTypeControl: false,
        navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };


   

    var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);

    var image = 'images/mark-you.png'; 
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title:"Você está aqui!",
        icon: image
    });



				// var markersData = [
				//   {
				//       lat: -12.9051598,
				//       lng: -38.400243,
				//       nome: "Shopping Cajazeiras",
				//       morada1:"Rua Diogo Cão, 125",
				//       morada2: "Praia da Barra",
				//       codPostal: "3830-772 Gafanha da Nazaré" // não colocar virgula no último item de cada marcador
				//    },
				//    {
				//       lat: -12.89849316,
				//       lng: -38.40768814,
				//       nome: "O Fazendão",
				//       morada1:"Quinta dos Patos, n.º 2",
				//       morada2: "Praia da Costa Nova",
				//       codPostal: "3830-453 Gafanha da Encarnação" // não colocar virgula no último item de cada marcador
				//    }
				// ];

	
}

function error(msg) {
    var s = document.querySelector('#status');
        s.innerHTML = typeof msg == 'string' ? msg : "falhou";
        s.className = 'fail';
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
} else {
    error('Seu navegador não suporta <b style="color:black;background-color:#ffff66">Geolocalização</b>!');
}