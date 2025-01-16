import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Link, useParams } from "react-router-dom";
import { useGetActors } from "@/react-query/query/actors";
import { APP_PATHS } from "@/routes/enum";

const BornToday = () => {
  const { lang } = useParams();
  const actorsList = useGetActors();

  return (
    <div className="mb-14 mt-10 flex">
      <div className="mx-auto w-full flex-col space-y-4 px-4 md:w-5/6">
        <div>
          <h3 className="text-secondary border-primary dark:text-muted-foreground dark:border-primary-foreground mb-3 border-l-4 pl-2 text-3xl font-bold">
            Born Today
          </h3>
          <p>People born on January 12</p>
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="w-full space-x-6">
            {actorsList?.map((act) => (
              <Link to={APP_PATHS.ACTOR + "/" + act.id} key={act.id}>
                <CarouselItem className="relative space-y-3 bg-opacity-10">
                  <Avatar className="h-[350px] w-[350px] md:h-[210px] md:w-[210px]">
                    <AvatarImage
                      src={
                        import.meta.env.VITE_SUPABASE_STORAGE_URL + act.image
                      }
                      alt=""
                      className="w-full"
                    />
                    <AvatarFallback>
                      {lang === "ka" ? act.name_ka[0] : act.name_en[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-3 z-10 h-[210px] w-[210px] rounded-full bg-slate-950 opacity-0 hover:opacity-15"></div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-md font-bold dark:text-white">
                      {lang === "ka" ? act.name_ka : act.name_en}
                    </div>
                    <div className="text-primary-foreground dark:text-muted-foreground">
                      54
                    </div>
                  </div>
                </CarouselItem>
              </Link>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-2 dark:text-white" />
          <CarouselNext className="right-0 dark:text-white" />
        </Carousel>
      </div>
    </div>
  );
};

export default BornToday;
