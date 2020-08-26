var map = L.map('main_map').setView([-32.9668371,-68.890004], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-32.985276,-68.8805794]).addTo(map)
    .bindPopup('Punto de partida de la excursión.')
    .openPopup();
    

$.ajax({
    dataTypes: "json",
    url: 'api/bicicletas/map',
    'x-access-token': eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDRlZDBlNDU3N2YwNDA4Y2FlZjIxNyIsImlhdCI6MTU5ODM3MzA4OSwiZXhwIjoxNTk4OTc3ODg5fQ.OjOaMkGgHgVlHKEyl03qz99KoQC4XpHwdyYhkbxqyFE,
    success: (result) => {
        console.log(result);
        result.bicicletas.forEach(bici => {
            L.marker(bici.ubicacion).addTo(map)
            .bindPopup(`Bicicleta n° ${bici.id}`)
            .openPopup();
        });
    }
})