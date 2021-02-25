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
  //Search Method
  performSearch(searchTerm) {
    //API endpoint + search term
    let urlString =
      "https://api.themoviedb.org/3/search/movie?api_key=6f39e1f4a1964e027808b167e50271b3&query=" +
      searchTerm;
    //jQuery function to fetch data
    $.ajax({
      url: urlString,
      //Callback function that is executed on success will display these data
      success: (searchResults) => {
        console.log("Fetched data success");
        //Results is an array with information on your object like id, release date, overview, etc. This is how you access the results by let results = searchResults.results.
        let results = searchResults.results;
        var movieRows = [];
        //Application would go to 404 if searchTerm is undefined so this tenary operator will prevent application from going to 404.
        searchTerm === undefined
          ? (searchResults = null)
          //Looping through the movie results from the API
          : results.forEach((movie) => {
            //Manually concatinate poster source to poster path
              movie.poster_src =
                "https://image.tmdb.org/t/p/w220_and_h330_face" +
                movie.poster_path;
                //MovieRow subclass and movie property
              const movieRow = <MovieRow key={movie.id} movie={movie} />;
              movieRows.push(movieRow);
              console.log(Object.keys(movieRows).length);
            });
        //Set State for movieRows for changes and rerendering
        this.setState({ rows: movieRows });
        console.log("ROWS__STATE", {movieRows})
        //Set State for Search Result Number
        this.setState({ nums: Object.keys(movieRows).length });
      },
      //Call back function execution failed display
      error: (xhr, status, err) => {
        console.log("Fetched data failed");
      },
    });
  }

  //Search Input Function
  searchChangeHandler(event) {
    const boundObject = this;
    //event.target.value is whatever I am entering into my search input
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
              {/* Search Input */}
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
          {/* Search Result Number */}
          <p className="text-center search-num my-4">
            {this.state.nums} Search Results
          </p>
        </section>
      </div>
    );
  }
}

export default App;
