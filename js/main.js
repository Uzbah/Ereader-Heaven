document.querySelector(".search-form").addEventListener("submit", search);

function search(e) {
  e.preventDefault();
  let search = document.getElementById("input").value;
  if (search.trim() === "") return;
  document.activeElement.blur(); // this removes focus on the input bar after search
  initiateApi(search);
}

async function initiateApi(search) {
  try {
    const searchResponse = await fetch(`http://localhost:3002/search-book?bookName=${encodeURIComponent(search)}`);
    if (!searchResponse.ok) throw new Error('Failed to search for book');
    const searchData = await searchResponse.json();

    const bookId = searchData.bookId;
    const fetchResponse = await fetch(`http://localhost:3002/fetch-book?bookId=${bookId}`);
    if (!fetchResponse.ok) throw new Error('Failed to fetch book content');
    const bookContent = await fetchResponse.text();

    displayBookContent(bookContent, search);
  } catch (error) {
    console.error('Error:', error);
  }
}

function displayBookContent(content, title) {
  const resultsContainer = document.getElementById("results");
  while (resultsContainer.firstChild) {
    resultsContainer.removeChild(resultsContainer.firstChild);
  }

  const bookCard = document.createElement("div");
  bookCard.classList.add("result", "row");

  const bookInfo = document.createElement("div");
  bookInfo.classList.add("col-md-8");
  
  const bookTitle = document.createElement("h1");
  bookTitle.textContent = title;
  
  const bookDescription = document.createElement("p");
  bookDescription.classList.add("description");
  bookDescription.textContent = content.substring(0, 300) + "...";

  const bookPreviewLink = document.createElement("button");
  bookPreviewLink.innerHTML = "READ";
  bookPreviewLink.classList.add("btn", "btn-outline-secondary");
  bookPreviewLink.addEventListener("click", () => displayFullContent(content));

  const downloadButton = document.createElement("button");
  downloadButton.classList.add("download", "btn", "btn-outline-secondary");
  downloadButton.textContent = "DOWNLOAD";
  downloadButton.addEventListener("click", () => downloadBook(content, title));

  bookInfo.append(bookTitle, bookDescription, bookPreviewLink, downloadButton);
  bookCard.append(bookInfo);
  resultsContainer.appendChild(bookCard);
  resultsContainer.scrollIntoView();
}

function displayFullContent(content) {
  const bookContentContainer = document.getElementById("bookContent");
  bookContentContainer.innerHTML = `<pre>${content}</pre>`;
  bookContentContainer.scrollIntoView();
}

function downloadBook(content, title) {
  fetch('http://localhost:3002/convert-to-pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      htmlContent: `<html><body><h1>${title}</h1><pre>${content}</pre></body></html>`
    })
  })
  .then(response => {
    if (!response.ok) throw new Error('Failed to convert to PDF');
    return response.blob();
  })
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${title}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

var icon = document.getElementById("icon");
icon.onclick = function() {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    icon.src = "img/sun.png";
    localStorage.setItem("theme", "dark");
  } else {
    icon.src = "img/moon.png";
    localStorage.setItem("theme", "light");
  }
};

const initIcon = () => {
  if (document.body.classList.contains("dark-theme")) {
    icon.src = "img/sun.png";
  } else {
    icon.src = "img/moon.png";
  }
};
window.onload = initIcon();
