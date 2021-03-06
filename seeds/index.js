if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/my-yelp-camp';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connextion error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

// ToDo - https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22291516#questions/16345686
// Currently hardcoded one image as unsplash random image generator is not working

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    //changed to 20 campsites
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '6234d7d38fb57211c482738f',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum tempora consequuntur iste ea sed quibusdam ab? Soluta mollitia assumenda distinctio, eligendi autem animi debitis impedit! Iusto blanditiis autem labore laborum.',
      price,
      geometry: {
        type: "Point",
        coordinates: [cities[random1000].longitude, cities[random1000].latitude]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/ddrwijehn/image/upload/v1646932627/YelpCamp/gk6fo8loughfkzsqm5sa.jpg',
          filename: 'YelpCamp / gk6fo8loughfkzsqm5sa'
        },
        {
          url: 'https://res.cloudinary.com/ddrwijehn/image/upload/v1646932629/YelpCamp/fpvmaqckij0v9r9lfgpw.jpg',
          filename: 'YelpCamp / fpvmaqckij0v9r9lfgpw'
        }
      ]
    })
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
