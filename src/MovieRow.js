import React from "react";

class MovieRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
    };
    this.handleRed = this.handleRed.bind(this);
  }
  handleRed(){
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }))
  }
  render() {
    let { id, poster_src, title, overview, release_date } = this.props.movie;
    console.log("poster", poster_src)
    if (poster_src.search("null") > 0) {
      poster_src = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
    }
    if (overview.length > 280) {
      overview = overview.substring(0, 280) + "...";
    }
    return (
      <div className={`col-xl-6 col-12 ${id}`}>
        <div className="row flex-column flex-sm-row overview m-4">
          <img
            alt="Movie Poster"
            src={poster_src}
            className="poster mr-sm-3 mb-2 mb-sm-0"
          />
          <div className="col d-flex flex-column overview2">
            <strong>{title}</strong>
            <i>({release_date.slice(0,4)})</i>
            <p className="mt-2">{overview}</p>
            <button
              type="button"
              name="owened"
              className={`${this.state.isToggleOn? 'red' : 'btn-secondary'}`}
              onClick={this.handleRed}
            >  OWNED
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieRow;
