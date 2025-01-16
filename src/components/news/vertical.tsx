import { Link } from "react-router-dom";

const NewsForInnerPages = ({ headline }: { headline: string }) => {
  return (
    <div className="mb-14 mt-10 flex">
      <div className="mx-auto w-full flex-col space-y-8 px-4 md:w-5/6">
        <div>
          <h3 className="text-secondary border-primary dark:text-muted-foreground dark:border-primary-foreground mb-3 border-l-4 pl-2 text-3xl font-bold">
            {headline}
          </h3>
        </div>
        <div className="flex flex-col space-y-10">
          {Array.from({ length: 5 }).map((index) => (
            <div
              key={index as number}
              className="flex h-[100px] cursor-pointer flex-row gap-2 rounded-md shadow-md"
            >
              <div className="w-1/3">
                <img
                  src={
                    import.meta.env.VITE_SUPABASE_STORAGE_URL +
                    "movies/brad.jpg"
                  }
                  className="max-h-[100px] w-full rounded-l-md"
                />
              </div>
              <div className="flex w-2/3 flex-col text-sm">
                <Link to="news/2" className="hover:underline">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </Link>
                <div className="text-muted-foreground pt-1 text-xs">11 Jan</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsForInnerPages;
