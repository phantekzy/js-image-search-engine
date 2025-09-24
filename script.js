// ============================
// Image Search Engine Script
// ============================

// Unsplash API Access Key
const accessKey = "wSeei1UPwFD5_Uen19FMwo3HF6PjVoX2fGnOXkiNuiI";

// DOM Elements
let searchForm = document.getElementById('search-form');
let searchBox = document.getElementById('search-box');
let searchRslt = document.getElementById('search-results');
let showBtn = document.getElementById('show-btn');

// Search state
let keyword = "";
let page = 1;

/**
 * Fetch images from Unsplash API and display them.
 */
async function searchImg() {
	try {
		keyword = searchBox.value.trim(); // Remove extra spaces
		if (!keyword) return; // Prevent empty searches

		// API URL
		const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

		const res = await fetch(url);

		if (!res.ok) {
			throw new Error('Fetch error: ' + res.status);
		}

		const data = await res.json();
		const results = data.results;

		// Clear previous results if it's a new search
		if (page === 1) {
			searchRslt.innerHTML = "";
		}

		// Append images to results
		results.forEach(result => {
			const image = document.createElement('img');
			image.src = result.urls.small;
			image.alt = result.alt_description || "Unsplash Image";

			const imageLink = document.createElement('a');
			imageLink.href = result.links.html;
			imageLink.target = "_blank";
			imageLink.appendChild(image);

			searchRslt.appendChild(imageLink);
		});

		// Show the "Show More" button if there are results
		showBtn.style.display = results.length ? "block" : "none";

	} catch (err) {
		console.error('Fetch error:', err);
	}
}

/**
 * Handle form submit event to start a new search.
 */
searchForm.addEventListener('submit', (e) => {
	e.preventDefault(); // Prevent page reload
	page = 1; // Reset to first page
	searchImg();
});

/**
 * Handle "Show More" button click to load more images.
 */
showBtn.addEventListener('click', () => {
	page++;
	searchImg();
});

