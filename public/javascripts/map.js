var map = L.map('main_map').setView([-32.9668371,-68.890004], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-32.985276,-68.8805794]).addTo(map)
    .bindPopup('Punto de partida de la excursión.')
    .openPopup();
    

$.ajax({
    method: 'POST',
    dataType: 'json',
    url: 'api/auth/authenticate',
    data: { email: 'matias@gmail.com', password: 'hola2020' },
}).done(function( data ) {
    console.log(data);

    $.ajax({
        dataType: 'json',
        url: 'api/bicicletas/map',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("x-access-token", data.data.token);
        }
    }).done(function (result) {
        console.log(result);

        result.bicicletas.forEach(bici => {
            L.marker(bici.ubicacion).addTo(map)
            .bindPopup(`Bicicleta n° ${bici.id}`)
            .openPopup();
        });
    });
});