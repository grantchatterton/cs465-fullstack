const mongoose = require("mongoose");

const popStarterTrips = false; // if true, wipes and populates DB with starter trips

// Define the trip schema
const tripSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    index: { unique: true, dropDups: true },
  },
  name: {
    type: String,
    required: true,
    index: { unique: true, dropDups: true },
  },
  length: { type: String, required: true },
  start: { type: Date, required: true },
  resort: { type: String, required: true },
  perPerson: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
});

// Model for a trip
const Trip = mongoose.model("trips", tripSchema);

if (popStarterTrips) {
  mongoose.connection.on("connected", async () => {
    console.log("Populating starter trips");

    try {
      // wipe the DB
      await Trip.deleteMany({});
    } catch (err) {
      console.error(err);
    }

    // populate the DB with starter data
    const trips = [
      {
        code: "GALR210214",
        name: "Gale Reef",
        length: "4 nights / 5 days",
        start: "2021-02-14T08:00:00Z",
        resort: "Emerald Bay, 3 stars",
        perPerson: "799.00",
        image: "reef1.jpg",
        description:
          "<p>Gale Reef sed et augue lorem. In sit amet placerat arcu. Mauris volutpat ipsum ac justo mollis vel vestibulum orci gravida. Vestibulum sit amet porttitor odio. Nulla facilisi. Fusce at pretium felis.</p><p>Sed consequat libero ut turpis venenatis ut aliquam risus semper. Etiam convallis mi vel risus pretium sodales. Etiam nunc lorem ullamcorper vitae laoreet.</p>",
      },
      {
        code: "DAWR210315",
        name: "Dawson's Reef",
        length: "4 nights / 5 days",
        start: "2021-03-15T08:00:00Z",
        resort: "Blue Lagoon, 4 stars",
        perPerson: "1199.00",
        image: "reef2.jpg",
        description:
          "<p>Dawson's Reef integer magna leo, posuere et dignissim vitae, porttitor at odio. Pellentesque a metus nec magna placerat volutpat. Nunc nisi mi, elementum sit amet aliquet quis, tristique quis nisl. Curabitur odio lacus, blandit ut hendrerit</p><p>vulputate, vulputate at est. Morbi aliquet viverra metus eu consectetur. In lorem dui, elementum sit amet convallis ac, tincidunt vel sapien.</p>",
      },
      {
        code: "CLAR210621",
        name: "Claire's Reef",
        length: "4 nights / 5 days",
        start: "2021-06-21T08:00:00Z",
        resort: "Coral Sands, 5 stars",
        perPerson: "1999.00",
        image: "reef3.jpg",
        description:
          "<p>Claire's Reef donec sed felis risus. Nulla facilisi. Donec a orci tellus, et auctor odio. Fusce ac orci nibh, quis semper arcu. Cras orci neque, euismod et accumsan ac, sagittis molestie lorem. Proin odio sapien, elementum at tempor non.</p><p>Vulputate eget libero. In hac habitasse platea dictumst. Integer purus justo, egestas eu consectetur eu, cursus in tortor. Quisque nec nunc ac mi ultrices iaculis.</p>",
      },
    ];

    try {
      await Trip.insertMany(trips);
    } catch (err) {
      console.error(err);
    }
  });
}

module.exports = Trip;
