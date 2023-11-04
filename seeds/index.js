const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64f35e63bd4c2d38f8b92ad6',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: { coordinates: [cities[random1000].longitude, cities[random1000].latitude], type: 'Point' },
            images: [{
                url: 'https://res.cloudinary.com/dkkmgwqes/image/upload/v1697875860/yelpcamp/qhrd1sezde0ugkagcgha.jpg',
                filename: 'yelpcamp/qhrd1sezde0ugkagcgha'
            },
            {
                url: 'https://res.cloudinary.com/dkkmgwqes/image/upload/v1697875860/yelpcamp/qtw5hqgr1fb5l1ttixrd.jpg',
                filename: 'yelpcamp/qtw5hqgr1fb5l1ttixrd'
            },
            {
                url: 'https://res.cloudinary.com/dkkmgwqes/image/upload/v1697875860/yelpcamp/va0ksyssqed1oag6dqxq.jpg',
                filename: 'yelpcamp/va0ksyssqed1oag6dqxq'
            }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})