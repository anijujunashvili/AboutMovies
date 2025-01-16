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

const UserReviews = () => {
  const [me] = useAtom(meAtom);
  const { id } = useParams();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<addReviewType>({
    defaultValues: { comment: "" },
    resolver: zodResolver(AddReviewsSchema),
  });

  const { mutate: addReview } = useAddUserReview();

  const onSubmit = async (fieldsValues: addReviewType) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (fieldsValues && me) {
      const payload = {
        ...fieldsValues,
        name_ka: me?.name_ka,
        name_en: me?.name_en,
        image: me?.image,
        user_id: me?.id,
        m_id: Number(id),
        likes: 0,
      };

      addReview(payload, {
        onSuccess: () => {
          console.log("daemata");
        },
      });
    }
  };
  return (
    <>
      <div className="mb-10 flex flex-col space-y-4">
        <div className="pb-6">
          <h3 className="text-secondary border-primary border-l-4 pl-3 text-3xl font-bold">
            User Reviews
          </h3>
        </div>
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
                      placeholder="Type your message here."
                      value={value}
                    />
                  );
                }}
              />

              <div className="flex flex-row justify-between">
                <div>{errors.comment && <>ERORIA</>}</div>
                <div>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Loading..." : "Add Review"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserReviews;
