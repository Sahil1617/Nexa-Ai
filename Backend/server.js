import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/api", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  connectDB();
});

const connectDB = async() =>{
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
}

// app.post("/test", async(req, res) => {
//   const options = {
//     method : "POST",
//     headers : {
//       "Content-Type" : "application/json",
//       "Authorization" : `Bearer ${process.env.NEXA_KEY}`
//     },
//     body: JSON.stringify({
//       "model" : "gpt-4o-mini",
//       "messages" : [
//         {
//           "role" : "user",
//           "content" : req.body.message
//         }
//       ]
//     })
//   }
//   try {
//     const response = await fetch("https://openrouter.ai/api/v1/chat/completions", options);
//     const data = await response.json();
//     res.send(data.choices[0].message.content);
//   } catch (error) {
//     console.log(error);
//   }
// });


