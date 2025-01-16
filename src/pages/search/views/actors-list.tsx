import { MapedActorType } from "@/types/actors";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type propsType = {
  actors: MapedActorType[] | undefined;
};

const ActorsListForSerach: React.FC<propsType> = ({ actors }) => {
  const { lang } = useParams();

  return (
    <>
      {actors?.map((a) => (
        <Card key={a.id} className="h-[300px] w-[30%]">
          <CardContent className="h-[250px] p-0">
            <img
              src={import.meta.env.VITE_SUPABASE_STORAGE_URL + a.image}
              className="h-full w-full rounded-t-md"
            />
          </CardContent>
          <CardFooter className="flex items-center p-2">
            <CardTitle>Card Title</CardTitle>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default ActorsListForSerach;
