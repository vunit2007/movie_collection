import React, { Component } from "react";
import "./hero.jpg";
import "./App.css";
import $ from "jquery";
import MovieRow from "./MovieRow.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.performSearch();
  }
  performSearch(searchTerm) {
    let urlString =
      "https://api.themoviedb.org/3/search/movie?api_key=6f39e1f4a1964e027808b167e50271b3&query=" +
      searchTerm;
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data success");
        let results = searchResults.results;
        var movieRows = [];
        searchTerm === undefined
          ? (searchResults = null)
          : results.forEach((movie) => {
              movie.poster_src =
                "https://image.tmdb.org/t/p/w220_and_h330_face" +
                movie.poster_path;
              const movieRow = <MovieRow key={movie.id} movie={movie} />;
              movieRows.push(movieRow);
              console.log(Object.keys(movieRows).length);
            });
        this.setState({ rows: movieRows });
        this.setState({ nums: Object.keys(movieRows).length });
      },
      error: (xhr, status, err) => {
        console.log("Fetched data failed");
      },
    });
  }
  searchChangeHandler(event) {
    const boundObject = this;
    const searchTerm = event.target.value;
    boundObject.performSearch(searchTerm);
  }
  render() {
    return (
      <div>
        <header>
          <div className="container search">
            <h1>Movie Collection</h1>
            <div className="input-group col-10 col-lg-7 mt-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search for a movie"
                aria-label="Movies"
                aria-describedby="basic-addon2"
                onChange={this.searchChangeHandler.bind(this)}
              />
              <div className="input-group-append">
                <button className="input-group-text fa fa-search"></button>
              </div>
            </div>
          </div>
        </header>
        <section className="container-fluid">
          <div className="row">{this.state.rows}</div>
          <p className="text-center search-num mt-4">
            {this.state.nums} Search Results
          </p>
        </section>
      </div>
    );
  }
}

export default App;
