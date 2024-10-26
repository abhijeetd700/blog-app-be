import express from 'express'; 
import bodyParser from 'body-parser';
import postRoutes from './routes/posts.js'
import authRoutes from './routes/auth.js'
// import userRoutes from './routes/user.js'
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser'
import multer from "multer";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

const envPath = path.resolve(process.cwd(), '.env');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: envPath });

app.use(cors({origin: '*'}));
app.use(cookieParser());
// Use body-parser middleware
app.use(bodyParser.json());  // Parses incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true }));  // Parses URL-encoded data

app.use(express.json())

// Serve static files from the 'public/upload' directory
app.use('/api/static', express.static(path.join(__dirname, 'public/upload')));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage })

app.get('/api', (req, res) => {
    res.send('Hello from Express on Render!');
});

app.post("/api/upload",upload.single("file"),(req,res)=>{

    try {
        // File is uploaded successfully
        res.json({ message: 'File uploaded successfully', file: req.file });
    } catch (err) {
        res.status(400).json({ error: 'File upload failed' });
    }

})
// Middleware

app.use("/api/post",postRoutes)
// app.use("/api/user",userRoutes)
app.use("/api/auth",authRoutes)



app.listen(process.env.PORT,()=>{
    console.log("Connected server running on port 8800")
})