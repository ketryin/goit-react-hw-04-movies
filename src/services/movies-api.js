const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '15a194ab80a203d64301c11a78757845';

async function fetchWithErrorHandling(url = '') {
    const response = await fetch(url);
    return response.ok
        ? response.json()
        : console.log("Fetch failed.");
}

export function fetchTrending() {
    const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
    return fetchWithErrorHandling(url);
}

export function fetchSearchMovies(query) {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=1`;
    return fetchWithErrorHandling(url);    
}

export function fetchMovieDetails(movieId) {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
    return fetchWithErrorHandling(url);    
}

export function fetchMovieCredits(movieId) {
    const url = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;
    return fetchWithErrorHandling(url);    
}

export function fetchMovieReviews(movieId) {
    const url = `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&page=1`;
    return fetchWithErrorHandling(url);    
}