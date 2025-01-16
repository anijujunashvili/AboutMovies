import MovieInfo from "./movie-info";
import UserReviews from "./user-reviews";
import SimilarMovies from "./similar-movies";

const MovieInner = () => {
  return (
    <>
      <div className="mt-6 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        <div className="grid lg:col-span-2">
          <MovieInfo />
          <UserReviews />
        </div>
        <div>
          <SimilarMovies />
        </div>
      </div>
    </>
  );
};

export default MovieInner;
