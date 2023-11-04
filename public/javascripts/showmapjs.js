const cordinate = JSON.parse(campground).geometry

console.log("////////////////********************/////////////")
console.log(campground)
const camp = JSON.parse(campground)
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/dark-v11',
    center: cordinate.coordinates,
    zoom: 8
});

map.addControl(new mapboxgl.NavigationControl());




const marker = new mapboxgl.Marker()
    .setLngLat(cordinate.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${camp.title}</h3>`
            )
    )
    .addTo(map);
