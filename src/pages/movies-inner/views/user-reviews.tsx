import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { useAddUserReview } from "@/react-query/mutation/reviews";
import { addReviewType } from "@/types/reviews";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddReviewsSchema } from "../schema";
import { useAtom } from "jotai";
import { meAtom } from "@/store/auth";
import { useParams } from "react-router-dom";
import { useGetUserReviews } from "@/react-query/query/reviews";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const UserReviews = () => {
  const [me] = useAtom(meAtom);
  const { lang, id } = useParams();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<addReviewType>({
    defaultValues: { comment: "" },
    resolver: zodResolver(AddReviewsSchema),
  });

  const { data: userReviews, refetch } = useGetUserReviews(Number(id));

  const { mutate: addReview } = useAddUserReview();

  const onSubmit = async (fieldsValues: addReviewType) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (fieldsValues && me) {
      const payload = {
        ...fieldsValues,
        user_id: me?.id,
        m_id: Number(id),
      };

      addReview(payload, {
        onSuccess: () => {
          refetch();
          setValue("comment", "");
        },
      });
    }
  };
  const hStyles =
    lang === "ka"
      ? "text-secondary font-primaryRegular font-bold border-primary border-l-4 pl-3 pt-1 text-3xl"
      : "text-secondary uppercase font-bold border-primary border-l-4 pl-3 pt-1 text-3xl";
  return (
    <>
      <div className="mb-10 flex flex-col space-y-4">
        <div className="pb-4">
          <h3 className={hStyles}>{t("movies.user_reviews")}</h3>
        </div>
        <div>
          {Array.isArray(userReviews) && userReviews.length !== 0 && (
            <ScrollArea className="h-[250px] w-full rounded-md p-4">
              {userReviews?.map((r) => {
                return (
                  <div className="flex flex-col" key={r.id}>
                    <div className="flex flex-row items-center gap-4 pt-4">
                      <div className="">
                        <Avatar>
                          <AvatarImage
                            src={
                              import.meta.env.VITE_SUPABASE_STORAGE_URL +
                              r.image
                            }
                          />
                          <AvatarFallback className="dark:text-secondary font-bold">
                            {lang === "ka" ? r.name_ka[0] : r.name_en[0]}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <div className="font-sm dark:text-secondary cursor-pointer text-xl font-bold">
                          {lang === "ka" ? r.name_ka : r.name_en}
                        </div>
                        <div className="text-muted-foreground text-sm">
                          {dayjs(r?.created_at).format("DD/MM/YYYY")}
                        </div>
                      </div>
                    </div>
                    <div className="cursor-pointer border-b pb-6 pt-2 italic dark:border-gray-700 dark:text-gray-400">
                      {r?.comment}
                    </div>
                  </div>
                );
              })}
            </ScrollArea>
          )}
        </div>
        {me?.id && (
          <div>
            <div className="grid w-full gap-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Controller
                  name="comment"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Textarea
                        onChange={onChange}
                        placeholder={t("movies.type_msg")}
                        className="dark:text-secondary h-[100px] p-4 dark:border-gray-700"
                        value={value}
                      />
                    );
                  }}
                />

                <div className="flex flex-row justify-between">
                  <div>
                    {errors.comment && (
                      <span className="text-destructive text-sm">
                        {t("layout.reviews_error")}
                      </span>
                    )}
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="dark:text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? t("layout.loading")
                        : t("movies.add_review")}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserReviews;
