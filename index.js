const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const { intialiseDatabase } = require("./db/db.connect.js");
const Hotels = require("./models/hotel.model.js");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

intialiseDatabase();

// const newHotel = {
//   name: "Lake View",
//   category: "Mid-Range",
//   location: "124 Main Street, Anytown",
//   rating: 3.2,
//   reviews: [],
//   website: "https://lake-view-example.com",
//   phoneNumber: "+1234555890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "12:00 PM",
//   amenities: ["Laundry", "Boating"],
//   priceRange: "$$$ (31-60)",
//   reservationsNeeded: true,
//   isParkingAvailable: false,
//   isWifiAvailable: true,
//   isPoolAvailable: false,
//   isSpaAvailable: false,
//   isRestaurantAvailable: false,
//   photos: [
//     "https://example.com/hotel1-photo1.jpg",
//     "https://example.com/hotel1-photo2.jpg",
//   ],
// };

// const newHotel = {
//   name: "Sunset Resort",
//   category: "Resort",
//   location: "12 Main Road, Anytown",
//   rating: 4.0,
//   reviews: [],
//   website: "https://sunset-example.com",
//   phoneNumber: "+1299655890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "11:00 AM",
//   amenities: [
//     "Room Service",
//     "Horse riding",
//     "Boating",
//     "Kids Play Area",
//     "Bar",
//   ],
//   priceRange: "$$$$ (61+)",
//   reservationsNeeded: true,
//   isParkingAvailable: true,
//   isWifiAvailable: true,
//   isPoolAvailable: true,
//   isSpaAvailable: true,
//   isRestaurantAvailable: true,
//   photos: [
//     "https://example.com/hotel2-photo1.jpg",
//     "https://example.com/hotel2-photo2.jpg",
//   ],
// };

async function createHotel1(newHotel) {
  try {
    const hotel = new Hotels(newHotel);
    const saveHotel = await hotel.save();
    console.log("Successfully added hotel data:", saveHotel);
  } catch (error) {
    throw error;
  }
}

app.post("/hotels", async (req, res) => {
  try {
    const saveHotel = await createHotel1(req.body);
    res.status(201).json({ message: "Successfully added hotel." });
  } catch (error) {
    res.status(500).json({ error: "Failed to add hotel." });
  }
});

// createHotel1(newHotel);

// async function createHotel2(newHotel) {
//   try {
//     const hotel = new Hotels(newHotel);
//     const saveHotel = await hotel.save();
//     console.log(saveHotel);
//   } catch (error) {
//     throw error;
//   }
// }

// createHotel2(newHotel);

async function viewAllHotels() {
  try {
    const viewHotel = await Hotels.find();
    console.log(viewHotel);
    return viewHotel;
  } catch (error) {
    throw error;
  }
}

// viewAllHotels();

app.get("/hotels", async (req, res) => {
  try {
    const allHotels = await viewAllHotels();
    if (allHotels.length != 0) {
      res.json(allHotels);
    } else {
      res.status(404).json({ error: "Hotels are not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels." });
  }
});

async function viewByName(name) {
  try {
    const byName = await Hotels.findOne({ name: name });
    console.log(byName);
    return byName;
  } catch (error) {
    throw error;
  }
}

// viewByName("Lake View");

app.get("/hotels/:hotelName", async (req, res) => {
  try {
    const byName = await viewByName(req.params.hotelName);
    if (byName) {
      res.json(byName);
    } else {
      res.status(404).json({ error: "Hotel not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels." });
  }
});

async function offeringParking(parking) {
  try {
    const parkingAvailable = await Hotels.findOne({
      isParkingAvailable: parking,
    });
    console.log(parkingAvailable);
  } catch (error) {
    throw error;
  }
}

// offeringParking(true);

async function restaurantAvailable(available) {
  try {
    const resAvail = await Hotels.findOne({
      isRestaurantAvailable: available,
    });
    console.log(resAvail);
  } catch (error) {
    throw error;
  }
}

// restaurantAvailable(true);

async function byHotelCategory(category) {
  try {
    const byCategory = await Hotels.findOne({
      category: Array.category,
    });
    console.log(byCategory);
    return category;
  } catch (error) {
    throw error;
  }
}

// byHotelCategory("Mid-Range");

app.get("/hotels/category/:hotelCategory", async (req, res) => {
  try {
    const category = await byHotelCategory(req.params.hotelCategory);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: "hotel not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels." });
  }
});

async function byHotelPrice(range) {
  try {
    const byPrice = await Hotels.findOne({
      priceRange: range,
    });
    console.log(byPrice);
  } catch (error) {
    throw error;
  }
}

// byHotelPrice("$$$$ (61+)");

async function allHotelsWithRating(rating) {
  try {
    const withRating = await Hotels.findOne({ rating: rating });
    console.log(withRating);
    return withRating;
  } catch (error) {
    throw error;
  }
}

// allHotelsWithRating(4.0);

app.get("/hotels/rating/:hotelRating", async (req, res) => {
  try {
    const byRating = await allHotelsWithRating(req.params.hotelRating);
    if (byRating) {
      res.json(byRating);
    } else {
      res.status(404).json({ error: "hotel not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel." });
  }
});

async function byPhoneNumber(phoneNumber) {
  try {
    const byNumber = await Hotels.findOne({ phoneNumber: phoneNumber });
    console.log(byNumber);
    return byNumber;
  } catch (error) {
    throw error;
  }
}

// byPhoneNumber("+1299655890");

app.get("/hotels/directory/:phoneNumber", async (req, res) => {
  try {
    const byNumber = await byPhoneNumber(req.params.phoneNumber);
    if (byNumber) {
      res.json(byNumber);
    } else {
      res.status(404).json({ error: "Hotel not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel." });
  }
});

async function updateData(hotelId, dataToUpdate) {
  try {
    const hotelUpdate = await Hotels.findByIdAndUpdate(hotelId, dataToUpdate, {
      new: true,
    });
    console.log(hotelUpdate);
  } catch (error) {
    console.log("Error updating data", error);
  }
}

// updateData("6982267a8726141f2e01eaef", { checkOutTime: "11:00 AM" });

async function updateDetails(hotelName, dataToUpdate) {
  try {
    const hotelRating = await Hotels.findOneAndUpdate(
      { name: hotelName },
      dataToUpdate,
      { new: true },
    );
    console.log(hotelRating);
  } catch (error) {
    console.log("Error updating data", error);
  }
}

// updateDetails("Sunset Resort", { rating: 4.2 });

async function updatePhoneNumber(number, dataToUpdate) {
  try {
    const updateNumber = await Hotels.findOneAndUpdate(
      { phoneNumber: number },
      dataToUpdate,
      { new: true },
    );
    console.log(updateNumber);
  } catch (error) {
    console.log("Error updating data", error);
  }
}

// updatePhoneNumber(1299655890, { phoneNumber: 1997687392 });

async function deleteHotelById(hotelId) {
  try {
    const deleteHotel = await Hotels.findByIdAndDelete(hotelId);
    console.log(deleteHotel);
  } catch (error) {
    console.log("Error deleting data", error);
  }
}

// deleteHotelById("697e1104f63a20afff208502");

app.delete("/hotels/:hotelId", async (req, res) => {
  try {
    const deletedHot = await deleteHotelById(req.params.hotelId);
    if (deletedHot) {
      res.status(200).json({ message: "Hotel deleted successfully." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete hotel." });
  }
});

async function deleteHotelByNumber(number) {
  try {
    const deleteByNumber = await Hotels.findOneAndDelete({
      phoneNumber: number,
    });
    console.log(deleteByNumber);
  } catch (error) {
    console.log("Error deleting data", error);
  }
}

// deleteHotelByNumber(1997687392);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log("Server is listening", PORT);
});
