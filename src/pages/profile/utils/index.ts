import { userType } from "@/types/profile";

export const mapUserInfo = (me: userType) => {
  return {
    name_ka: me.name_ka,
    name_en: me.name_en,
    phone: me.phone,
    email: me.email,
    created_at: me.created_at,
    id: me.id,
    image: String(me.image),
  };
};
