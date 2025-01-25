import { useNavigate, useParams } from "react-router-dom";
import { ActorsPropsType } from "@/types/actors";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays } from "lucide-react";
import { APP_PATHS } from "@/routes/enum";
import dayjs from "dayjs";
import "dayjs/locale/ka";

const MovieActors: React.FC<ActorsPropsType> = ({ actors }) => {
  const navigate = useNavigate();
  const { lang } = useParams();
  const handleNavigate = (id: number) => {
    const path = `/${lang}/${APP_PATHS.ACTORS}/${id}`;
    navigate(path);
  };
  return (
    <>
      {actors?.map((a, i) => {
        return (
          <div key={i} className="flex gap-2">
            <HoverCard>
              <HoverCardTrigger
                className="dark:text-secondary font-bold hover:underline"
                onClick={() => handleNavigate(Number(a?.actors?.id))}
              >
                {lang === "ka" ? a?.actors?.name_ka : a?.actors?.name_en}
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-start space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={
                        import.meta.env.VITE_SUPABASE_STORAGE_URL +
                        a.actors?.image
                      }
                      className="h-full w-full object-cover"
                    />
                    <AvatarFallback>
                      {lang === "ka"
                        ? a?.actors?.name_ka[0]
                        : a?.actors?.name_en[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">
                      {lang === "ka" ? a?.actors?.name_ka : a?.actors?.name_en}
                    </h4>
                    <div className="flex items-center">
                      <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                      <span className="text-muted-foreground text-xs">
                        {dayjs(a?.actors?.born)
                          .locale(`${lang}`)
                          .format("DD MMM, YYYY")}
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            {i == actors.length - 1 ? (
              ""
            ) : (
              <span className="text-secondary">&#x2022;</span>
            )}
          </div>
        );
      })}
    </>
  );
};

export default MovieActors;
