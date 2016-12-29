// Váriáveis necessárias
var map;
var infoWindow;

// A variável markersData guarda a informação necessária a cada marcador
// Para utilizar este código basta alterar a informação contida nesta variável
var markersData = [
   {
      lat: -12.90516535,
      lng: -38.40025306,
      nome: "Parque de Campismo Praia da Barra",
      endereco:"Rua Diogo Cão, 125",
      complemento: "Praia da Barra",
      codPostal: "3830-772 Gafanha da Nazaré", // não colocar virgula no último item de cada maracdor
      url: "http://www.tigurio.com.br/frontend/bugingar/anuncio.html",
      categoria:'images/mark.png'
   },
   {
      lat: -12.90565687,
      lng: -38.39717925,
      nome: "Parque de Campismo da Costa Nova",
      endereco:"Quinta dos Patos, n.º 2",
      complemento: "Praia da Costa Nova",
      codPostal: "3830-453 Gafanha da Encarnação", // não colocar virgula no último item de cada maracdor
      url: "http://www.tigurio.com.br/frontend/bugingar/anuncio.html",
      categoria:'images/mark.png'
   },
   {
      lat: -12.90597584,
      lng: -38.39737236,
      nome: "Parque de Campismo da Gafanha da Nazaré",
      endereco:"Rua dos Balneários do Complexo Desportivo",
      complemento: "Gafanha da Nazaré",
      codPostal: "3830-225 Gafanha da Nazaré", // não colocar virgula no último item de cada maracdor
      url: "http://www.tigurio.com.br/frontend/bugingar/anuncio.html",
      categoria:'images/mark.png'
   },
   {
      lat: -12.90701116,
      lng: -38.39619756,
      nome: "Parque de Campismo da Costa Nova",
      endereco:"Quinta dos Patos, n.º 2",
      complemento: "Praia da Costa Nova",
      codPostal: "3830-453 Gafanha da Encarnação", // não colocar virgula no último item de cada maracdor
      url: "http://www.tigurio.com.br/frontend/bugingar/anuncio.html",
      categoria:'images/mark.png'
   },
   {
      lat: -12.90576668,
      lng: -38.39904606,
      nome: "Parque de Campismo da Gafanha da Nazaré",
      endereco:"Rua dos Balneários do Complexo Desportivo",
      complemento: "Gafanha da Nazaré",
      codPostal: "3830-225 Gafanha da Nazaré", // não colocar virgula no último item de cada maracdor
      url: "http://www.tigurio.com.br/frontend/bugingar/anuncio.html",
      categoria:'images/mark.png'
   } 
];


// FUNCAO PARA PEGAR COORDENADAS DE LOCALIZACAO
// function localizarUsuario(){
//   if (window.navigator && window.navigator.geolocation) {
//    var geolocation = window.navigator.geolocation;
//    geolocation.getCurrentPosition(sucesso, erro);
//   } else {
//      alert('Geolocalização não suportada em seu navegador.')
//   }
//   function sucesso(posicao){
//     console.log(posicao);
//     var latitude = posicao.coords.latitude;
//     var longitude = posicao.coords.longitude;
//     alert('Sua latitude estimada é: ' + latitude + ' e longitude: ' + longitude )
//   }
//   function erro(error){
//     console.log(error)
//   }

// }

// localizarUsuario();
////////////////////////////////////////////////


function initialize() {


	
   var mapOptions = {
      center: new google.maps.LatLng(-12.91167004,-38.39113355),
      zoom: 9,
      mapTypeId: 'roadmap'

   };

   map = new google.maps.Map(document.getElementById('map'), mapOptions);

						GeoMarker = new GeolocationMarker();
				        // GeoMarker.setCircleOptions({fillColor: '#808080'});

				        google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {
				          map.setCenter(this.getPosition());
				          map.fitBounds(this.getBounds());
				        });

				        google.maps.event.addListener(GeoMarker, 'geolocation_error', function(e) {
				          alert('Ocorreu um erro ao obter sua localização. Message: ' + e.message);
				        });

				        GeoMarker.setMap(map);

   // cria a nova Info Window com referência à variável infowindow
   // o conteúdo da Info Window será atribuído mais tarde
   infoWindow = new google.maps.InfoWindow();

   // evento que fecha a infoWindow com click no mapa
   google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
   });

   // Chamada para a função que vai percorrer a informação
   // contida na variável markersData e criar os marcadores a mostrar no mapa
   displayMarkers();

}

if(!navigator.geolocation) {
        alert('Your browser does not support geolocation');
      }


google.maps.event.addDomListener(window, 'load', initialize);

// Esta função vai percorrer a informação contida na variável markersData
// e cria os marcadores através da função createMarker
function displayMarkers(){

   // esta variável vai definir a área de mapa a abranger e o nível do zoom
   // de acordo com as posições dos marcadores
   //////////////////////////////////////////////////////////////////////////////////////var bounds = new google.maps.LatLngBounds();
   
   // Loop que vai estruturar a informação contida em markersData
   // para que a função createMarker possa criar os marcadores 
   for (var i = 0; i < markersData.length; i++){

      var latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
      var nome = markersData[i].nome;
      var endereco = markersData[i].endereco;
      var complemento = markersData[i].complemento;
      var codPostal = markersData[i].codPostal;
      var url = markersData[i].url;
      var categoriaIcon = markersData[i].categoria;

      createMarker(latlng, nome, endereco, complemento, codPostal, url, categoriaIcon);

      // Os valores de latitude e longitude do marcador são adicionados à
      // variável bounds
      //////////////////////////////////////////////////////////////////////////////////////bounds.extend(latlng);  
   }

   // Depois de criados todos os marcadores
   // a API através da sua função fitBounds vai redefinir o nível do zoom
   // e consequentemente a área do mapa abrangida.
   //////////////////////////////////////////////////////////////////////////////////////map.fitBounds(bounds);
}

// Função que cria os marcadores e define o conteúdo de cada Info Window.
function createMarker(latlng, nome, endereco, complemento, codPostal, url,categoriaIcon){
   var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      title: nome,
      icon: categoriaIcon
   });

   // Evento que dá instrução à API para estar alerta ao click no marcador.
   // Define o conteúdo e abre a Info Window.
   google.maps.event.addListener(marker, 'click', function() {
      
      window.location.href = url;
      // window.open(url, '_blank');

      // Variável que define a estrutura do HTML a inserir na Info Window.
      // var iwContent = '<div id="iw_container">' +
      //       '<div class="iw_title">' + nome + '</div>' +
      //    '<div class="iw_content">' + endereco + '<br />' +
      //    complemento + '<br />' +
      //    codPostal + '</div></div>';
      
      // O conteúdo da variável iwContent é inserido na Info Window.
      // infoWindow.setContent(iwContent);

      // A Info Window é aberta.
      // infoWindow.open(map, marker);
   });
}






