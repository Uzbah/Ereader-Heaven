import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import htmlPdf from 'html-pdf-node';

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Endpoint to search for book by name and get its ID
app.get('/search-book', async (req, res) => {
    try {
        const { bookName } = req.query;
        if (!bookName) {
            throw new Error('Book name is required');
        }
        const url = `https://gutendex.com/books/?search=${encodeURIComponent(bookName)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to search for book');
        }
        const data = await response.json();
        if (data.results.length === 0) {
            throw new Error('No book found');
        }
        const bookId = data.results[0].id;
        res.send({ bookId });
    } catch (error) {
        console.error('Error searching for book:', error);
        res.status(500).send('Error searching for book');
    }
});

// Endpoint to fetch book content from Gutenberg based on book ID
app.get('/fetch-book', async (req, res) => {
    try {
        const { bookId } = req.query;
        if (!bookId) {
            throw new Error('Book ID is required');
        }
        const url = `https://www.gutenberg.org/ebooks/${bookId}.txt.utf-8`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch book');
        }
        const text = await response.text();
        res.send(text);
    } catch (error) {
        console.error('Error fetching book text:', error);
        res.status(500).send('Error fetching book text');
    }
});

// Endpoint to convert HTML content to PDF
app.post('/convert-to-pdf', async (req, res) => {
    try {
        const { htmlContent } = req.body;
        if (!htmlContent) {
            throw new Error('HTML content is required');
        }

        const options = { format: 'A4' };
        const file = { content: htmlContent };

        const pdfBuffer = await htmlPdf.generatePdf(file, options);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=converted.pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error converting to PDF:', error.message, error.stack);
        res.status(500).send('Error converting to PDF');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
