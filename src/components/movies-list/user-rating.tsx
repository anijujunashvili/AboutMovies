import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { meAtom, userAtom } from "@/store/auth";
import { useAtom } from "jotai";
import StarRatings from "react-star-ratings";
import { useRateMovie } from "@/react-query/mutation/movies";
import { lastRatedType } from "@/types/movies";
import SuccessMsg from "@/components/success-message";
import { useState } from "react";
import { Star } from "lucide-react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/react-query/query/enum";

const UserRating = ({
  rating,
  mid,
  nameKa,
  nameEn,
  rSum,
  rCount,
}: {
  rating: number;
  mid: number;
  nameKa: string;
  nameEn: string;
  rSum: number;
  rCount: number;
}) => {
  const [user] = useAtom(userAtom);
  const [me] = useAtom(meAtom);
  const { lang } = useParams();
  const queryClient = useQueryClient();
  const [star, setStar] = useState(0);
  const [lastRated, setLastRated] = useState<lastRatedType>({
    rated: false,
    id: 0,
    value: 0,
  });
  const { mutate: rateMovie } = useRateMovie();
  const handleRate = (mid: number, rcount: number, rsum: number) => {
    if (me?.id) {
      const payload = {
        m_id: mid,
        rate: star,
        user_id: me?.id,
        rating_count: rcount,
        rating_sum: rsum,
      };
      if (star > 0) {
        rateMovie(payload, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEYS.GET_USER_RATED_MOVIES, me?.id],
            });
          },
        });
        setStar(0);
        setLastRated({ rated: true, id: mid, value: star });
      }
    }
  };
  return (
    <>
      {typeof user?.user.id !== "undefined" && (
        <div className="">
          {rating > 0 || lastRated.id === mid ? (
            <div className="flex flex-row gap-1">
              <Star
                size={20}
                className="text-secondary fill-secondary cursor-pointer"
                fill="#283b7b"
              />
              <span className="dark:text-white">
                {rating > 0 ? rating : lastRated.value}
              </span>
            </div>
          ) : (
            <Dialog>
              <DialogTrigger>
                <Star size={20} className="text-secondary cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="justify-center text-center dark:border-gray-800">
                {lastRated.rated && lastRated.id === mid ? (
                  <SuccessMsg
                    lgText="layout.rated"
                    smText=""
                    btnName=""
                    type="rate"
                  />
                ) : (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-center"></DialogTitle>
                      <DialogDescription className="dark:text-secondary text-center text-2xl font-bold text-black">
                        {lang == "ka" ? nameKa : nameEn}
                      </DialogDescription>
                    </DialogHeader>
                    <div>
                      <StarRatings
                        numberOfStars={10}
                        changeRating={(rating) => {
                          setStar(rating);
                        }}
                        rating={star}
                        name="rating"
                        starDimension="20px"
                        starSpacing="4px"
                        starHoverColor="#283b7b"
                        starRatedColor="#283b7b"
                      />
                    </div>
                    <div className="my-4 flex justify-center">
                      <Button
                        className="bg-primary w-1/2 rounded-full dark:text-white"
                        onClick={() =>
                          handleRate(mid, Number(rCount), Number(rSum))
                        }
                      >
                        Rate
                      </Button>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          )}
        </div>
      )}
    </>
  );
};
export default UserRating;
