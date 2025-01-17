import { useParams } from "react-router-dom";
import { ActorsPropsType } from "@/types/actors";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { APP_PATHS } from "@/routes/enum";

const MovieActors: React.FC<ActorsPropsType> = ({ actors }) => {
  const { lang } = useParams();
  return (
    <>
      {actors?.map((a, i) => {
        return (
          <div key={i} className="flex gap-2">
            {/* <Link to="/" key={a.id}>
            
              <span className="text-secondary hover:underline">
                {lang === "ka" ? a?.actors?.name_ka : a?.actors?.name_en}
              </span>
            </Link> */}
            <HoverCard>
              <HoverCardTrigger>
                <Link
                  to={"/" + lang + "/" + APP_PATHS.ACTORS + "/" + a?.actors?.id}
                  className="hover:underline"
                >
                  {lang === "ka" ? a?.actors?.name_ka : a?.actors?.name_en}
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-start space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={
                        import.meta.env.VITE_SUPABASE_STORAGE_URL +
                        a.actors?.image
                      }
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
                    <div className="flex items-center pt-2">
                      <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                      <span className="text-muted-foreground text-xs">
                        {a?.actors?.born}
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
