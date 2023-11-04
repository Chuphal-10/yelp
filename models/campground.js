const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
    url: String,
    filename: String
})
const opts = { toJSON: { virtuals: true } }
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
})

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, opts);

CampgroundSchema.virtual('properties.PopUpMark').get(function () {
// if put href in "" shows error maybe because of JSON 
// you can put only properties in virtual and then popup message in show file
// campgroundSchema.virtual('properties').get(function () {
//     return {
//       id: this._id,
//       title: this.title
//     }
//   });
//   Then in the clusterMap.js I created the popupText:

// const popText = `<a href="/campgrounds/${e.features[0].properties.id}">${e.features[0].properties.title}</a>`


    return `<a href=/campgrounds/${this._id}>${this.title}</a> <p>${this.description.substring(0, 20)}......</p>`;
})



CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);