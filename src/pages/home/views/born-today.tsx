import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";

import { Link, useParams } from "react-router-dom";
import { useGetActors } from "@/react-query/query/actors";
import { APP_PATHS } from "@/routes/enum";

const BornToday = () => {
  const { lang } = useParams();
  const { t } = useTranslation();
  const actorsList = useGetActors();
  const hStyle =
    lang === "ka"
      ? "text-secondary font-primaryRegular border-primary mb-6 border-l-4 pl-3 pt-1 text-3xl font-bold"
      : "text-secondary uppercase border-primary mb-6 border-l-4 pl-3 pt-1 text-3xl font-bold";
  return (
    <div className="mb-14 mt-10 flex">
      <div className="mx-auto w-full flex-col space-y-4 px-4 lg:w-5/6">
        <div>
          <h3 className={hStyle}>{t("layout.actors")}</h3>
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="w-full space-x-6">
            {actorsList?.map((act) => (
              <Link
                to={"/" + lang + "/" + APP_PATHS.ACTORS + "/" + act.id}
                key={act.id}
              >
                <CarouselItem className="relative space-y-3 bg-opacity-10">
                  <Avatar className="h-[350px] w-[350px] md:h-[240px] md:w-[240px]">
                    <AvatarImage
                      src={
                        import.meta.env.VITE_SUPABASE_STORAGE_URL + act.image
                      }
                      alt=""
                      className="w-full object-cover"
                    />
                    <AvatarFallback>
                      {lang === "ka" ? act.name_ka[0] : act.name_en[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-3 z-10 h-[350px] w-[350px] rounded-full bg-slate-950 opacity-0 hover:opacity-15 md:h-[240px] md:w-[240px]"></div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-md font-bold dark:text-white">
                      {lang === "ka" ? act.name_ka : act.name_en}
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
