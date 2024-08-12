import express, { Request, Response, } from 'express';
import mongoose from 'mongoose'
import cors from 'cors'
import { config } from 'dotenv'
import authRoute from '../routes/auth'
import { MongoClient, ServerApiVersion } from 'mongodb';

const userName = encodeURIComponent(process.env.DB_USER_NAME || 'ilyapozh')
const dbPass = encodeURIComponent(process.env.DB_PASSWORD || 'pMMZ7N-WBy8QK4k')
console.log(userName, dbPass)
const uri = `mongodb+srv://${userName}:${dbPass}@selffinance.frafh.mongodb.net/?retryWrites=true&w=majority&appName=SelfFinance`;
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

const app = express();
const port = process.env.PORT || 3001;
// const mongoURI = process.env.MONGO_URI ||'mongodb://127.0.0.1:27017/myapp';

app.use(express.json());
app.use(cors());

// mongoose.connect(mongoURI)
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

app.use('/api', authRoute)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});