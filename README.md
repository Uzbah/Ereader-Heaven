# Ereader Heaven

**Ereader Heaven** is a web application that allows users to search for and download books in PDF format. It provides an easy-to-use interface for book enthusiasts, students, and researchers to access a vast collection of books. The app integrates the [Project Gutenberg API](https://gutenberg.org/wiki/Gutenberg:API) for book retrieval and uses `html-pdf-node` to convert books into downloadable PDFs.

## Features

- **Book Search**: Users can search for books by entering a title or keyword. The app fetches relevant details from Project Gutenberg, including the book's title, description, and download link.
- **Book Download**: Users can download the book as a PDF, created from the HTML content using the `html-pdf-node` module.
- **User-Friendly Interface**: Designed with simplicity in mind, the application is intuitive and accessible to a wide audience.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Uzbah/Ereader-Heaven.git
   cd Ereader-Heaven
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   node server.mjs
   ```

4. Open your browser and go to `http://localhost:3000`.

## Usage

### Book Search

1. Enter the name of a book in the search bar.
2. Click the search icon.
3. The app will retrieve relevant book details from the Project Gutenberg API, including a brief description and download options.

### Book Download

1. After finding a book, click the "Download" button.
2. The server will convert the HTML content of the book to a PDF using the `html-pdf-node` module.
3. A download link for the PDF will be provided.

## Project Structure

- **Front-end**: HTML, CSS, and JavaScript.
- **Back-end**: Node.js and Express.js for server-side logic.
- **APIs**: Project Gutenberg API for book search and `html-pdf-node` for PDF conversion.

## Technologies Used

- **HTML/CSS/JavaScript**: Front-end structure, styling, and interactivity.
- **Node.js**: Server-side processing.
- **Project Gutenberg API**: Fetching book data.
- **html-pdf-node**: Converting book content into PDFs.

## References

- Project Gutenberg API: [https://gutenberg.org/wiki/Gutenberg:API](https://gutenberg.org/wiki/Gutenberg:API)
- html-pdf-node: [https://www.npmjs.com/package/html-pdf-node](https://www.npmjs.com/package/html-pdf-node)
- Express.js Documentation: [https://expressjs.com/](https://expressjs.com/)
- Node.js Documentation: [https://nodejs.org/](https://nodejs.org/)

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/uzbah-naseem/)
