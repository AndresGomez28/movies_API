const searchInput = document.getElementById('searchInput');
const moviesList = document.getElementById('moviesList');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');

let currentPage = 1;

searchInput.addEventListener('input', async () => {
    currentPage = 1;
    await searchMovies();
});

prevPageButton.addEventListener('click', async () => {
    if (currentPage > 1) {
        currentPage--;
        await searchMovies();
    }
});

nextPageButton.addEventListener('click', async () => {
    currentPage++;
    await searchMovies();
});

async function searchMovies() {
    const searchTerm = searchInput.value;
    const response = await fetch(`http://localhost:3011/api/movies?title=${searchTerm}&page=${currentPage}&limit=10`);

    if (response.ok) {
        const responseData = await response.json();
        const { data: movies, totalPages } = responseData;

        if (movies && movies.length > 0) {
            renderMovies(movies);
        } else {
            moviesList.innerHTML = '<p>Movie Not Found :(</p>';
        }

        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages;
    } else {
        console.error('Error to obtain movie:', responseData);
    }
}

function renderMovies(movies) {
    moviesList.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie';
        movieElement.innerHTML = `
            <h2>${movie.title}</h2>
            <p>Year: ${movie.releaseYear}</p>
            <p>Genre: ${movie.genre}</p>
            <p>Director: ${movie.director}</p>
            <p>Rating: ${movie.rating}</p>
        `;
        moviesList.appendChild(movieElement);
    });
}

searchMovies();
