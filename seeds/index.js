const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/my-yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
  for (let i = 0; i < 30; i++) {
    //changed to 20 campsites
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '6227689e038dea6d7cf78d56',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image:
        "https://images.unsplash.com/photo-1518602164578-cd0074062767?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum tempora consequuntur iste ea sed quibusdam ab? Soluta mollitia assumenda distinctio, eligendi autem animi debitis impedit! Iusto blanditiis autem labore laborum.",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
