import React, { useState, useEffect } from 'react';
import './Index.css';

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchType, setSearchType] = useState('genre');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [showMoreGenres, setShowMoreGenres] = useState(false);

  const API_KEY = 'b759026d';
  const RESULTS_PER_PAGE = 8;
  const baseGenres = ['action', 'comedy', 'drama', 'horror'];
  const extraGenres = ['romance', 'thriller', 'sci-fi', 'adventure'];

  useEffect(() => {
    if (searchType === 'genre') fetchMovies('action', 1);
  }, []);

  const fetchMovies = async (query, page, isNewSearch = false) => {
    try {
      setIsLoading(true);
      const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&type=movie&page=${page}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.Search) {
        setTotalResults(data.totalResults);
        setMovies(prev => isNewSearch ? data.Search : [...prev, ...data.Search]);
        setCurrentPage(page);
      } else setError(data.Error || 'No movies found');
    } catch (err) {
      setError('Error fetching movies');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMovieDetails = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
      const data = await response.json();
      setMovieDetails(data);
      setSelectedMovie(id);
    } catch (err) {
      setError('Failed to load details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenreClick = (genre) => {
    setSearchTerm('');
    setSearchType('genre');
    setMovies([]);
    fetchMovies(genre, 1, true);
  };

  const handleHomeClick = () => {
    setSearchTerm('');
    setSelectedMovie(null);
    fetchMovies('action', 1, true);
  };

  const loadMore = () => {
    const nextPage = currentPage + 1;
    searchType === 'genre' ? fetchMovies('action', nextPage) : fetchMovies(searchTerm, nextPage);
  };

  return (
    <div className="app-container">
      <div className="star-icon" onClick={handleHomeClick}>★</div>

      {selectedMovie ? (
        <div className="movie-details">
          <button className="back-btn" onClick={() => setSelectedMovie(null)}>← Back</button>
          {movieDetails && (
            <div className="detail-content">
              <img src={movieDetails.Poster} alt={movieDetails.Title} className="detail-poster" />
              <div className="detail-info">
                <h1>{movieDetails.Title}</h1>
                <p className="meta">{movieDetails.Year} • {movieDetails.Runtime}</p>
                <p className="rating">⭐ {movieDetails.imdbRating}</p>
                <p className="plot">{movieDetails.Plot}</p>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="label">Genre:</span>
                    <span className="value">{movieDetails.Genre}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Director:</span>
                    <span className="value">{movieDetails.Director}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Actors:</span>
                    <span className="value">{movieDetails.Actors}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <nav className="nav-container">
            <div className="genre-wrapper">
              <div className={`genre-buttons ${showMoreGenres ? 'expanded' : ''}`}>
                {baseGenres.map(genre => (
                  <button key={genre} className="genre-btn" onClick={() => handleGenreClick(genre)}>
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </button>
                ))}
                {showMoreGenres && extraGenres.map(genre => (
                  <button key={genre} className="genre-btn" onClick={() => handleGenreClick(genre)}>
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </button>
                ))}
              </div>
              <button 
                className="genre-arrow"
                onClick={() => setShowMoreGenres(!showMoreGenres)}
              >
                {showMoreGenres ? '◀' : '▶'}
              </button>
            </div>
          </nav>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (e.target.value.length > 2) {
                  setSearchType('search');
                  fetchMovies(e.target.value, 1, true);
                }
              }}
              className="search-input"
            />
          </div>

          <div className="movie-grid">
            {movies.slice(0, currentPage * RESULTS_PER_PAGE).map(movie => (
              <div key={movie.imdbID} className="movie-card" onClick={() => fetchMovieDetails(movie.imdbID)}>
                <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
                <div className="movie-info">
                  <h3 className="movie-title">{movie.Title}</h3>
                  <p className="movie-year">{movie.Year}</p>
                </div>
              </div>
            ))}
          </div>

          {movies.length < totalResults && (
            <div className="load-more-container">
              <button onClick={loadMore} className="load-more-btn" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default MovieApp;