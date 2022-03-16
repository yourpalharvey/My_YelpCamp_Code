const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

//https://res.cloudinary.com/ddrwijehn/image/upload/v1647013602/YelpCamp/cadlqxomt3mw4vcok6nn.jpg

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

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
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

// Pop up on index page map to link to the click on campground's show page
CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong>
        <a href="/campgrounds/${this._id}">${this.title}</a>
    <strong>
    <p>
        ${this.description.substring(0, 20)}...
    </p>
    `
});


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