import express from 'express';
import { books } from './db.js';

const app = express();
const PORT = 5000;


app.use(express.json());


app.all('/', (req, res) => {
    res.send("ברוכים הבאים לשרת הספרייה שלנו!");
});



app.get('/books', (req, res) => {
    res.json(books);
});


app.get('/books/:code', (req, res) => {
    const code = parseInt(req.params.code); 
    const book = books.find(b => b.code === code);
    
    if (!book) {
        return res.status(404).send("שגיאה: הספר לא נמצא");
    }
    res.json(book);
});

app.post('/books', (req, res) => {
    const newBook = req.body; 
    
 
    newBook.isBorrowed = false;
    newBook.borrowHistory = [];
    
    books.push(newBook);
    res.status(201).json(newBook); 


    
app.put('/books/:code', (req, res) => {
    const code = parseInt(req.params.code);
    const book = books.find(b => b.code === code);
    
    if (!book) {
        return res.status(404).send("שגיאה: הספר לא נמצא");
    }

  
    const { name, category, price } = req.body;
    
 
    if (name) book.name = name;
    if (category) book.category = category;
    if (price) book.price = price;

    res.json(book);
});


    const code = parseInt(req.params.code);
    const { userId } = req.body; 
    
    const book = books.find(b => b.code === code);
    
    if (!book) return res.status(404).send("שגיאה: הספר לא נמצא");
    if (book.isBorrowed) return res.status(400).send("שגיאה: הספר כבר מושאל");


    book.isBorrowed = true;
    book.borrowHistory.push({
        borrowDate: new Date().toLocaleDateString(), 
        userId: userId
    });

    res.json(book);
});

// 6. ביצוע החזרה
app.patch('/books/:code/return', (req, res) => {
    const code = parseInt(req.params.code);
    const book = books.find(b => b.code === code);
    
    if (!book) return res.status(404).send("שגיאה: הספר לא נמצא");
    if (!book.isBorrowed) return res.status(400).send("שגיאה: הספר אינו מושאל כרגע");

    book.isBorrowed = false;
    res.json(book);
});

// 7. מחיקת ספר
app.delete('/books/:code', (req, res) => {
    const code = parseInt(req.params.code);
    const index = books.findIndex(b => b.code === code);
    
    if (index === -1) {
        return res.status(404).send("שגיאה: הספר לא נמצא");
    }

    books.splice(index, 1); // מחיקת הספר מהמערך
    res.send(`ספר עם קוד ${code} נמחק בהצלחה`);
});

// --- הפעלת השרת ---
app.listen(PORT, () => {
    console.log(`השרת פועל ומאזין בכתובת: http://localhost:${PORT}`);
});