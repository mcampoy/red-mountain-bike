var map = L.map('main_map').setView([-32.9668371,-68.890004], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-32.9655714,-68.8912686]).addTo(map)
L.marker([-32.9722849,-68.8825144]).addTo(map)
L.marker([-32.9557964,-68.8591285]).addTo(map)
L.marker([-32.985276,-68.8805794]).addTo(map)
    .bindPopup('Punto de partida de la excursión.')
    .openPopup();