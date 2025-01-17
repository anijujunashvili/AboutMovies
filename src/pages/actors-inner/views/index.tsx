import ActorInfo from "./actor-info";
import ActorMovies from "./actor-movies";

const ActorsInner = () => {
  return (
    <>
      <div className="mt-6 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        <div className="grid lg:col-span-2">
          <ActorInfo />
        </div>
        <div>
          <ActorMovies />
        </div>
      </div>
    </>
  );
};

export default ActorsInner;
