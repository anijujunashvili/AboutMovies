import AppRoutes from "@/routes";
import { useGetUserInfo } from "@/react-query/query/profile";
import { useEffect } from "react";
import { supabase } from "@/supabase";
import { userAtom, meAtom } from "@/store/auth";
import { useSetAtom, useAtomValue } from "jotai";

function App() {
  const setUser = useSetAtom(userAtom);
  const setMe = useSetAtom(meAtom);

  const user = useAtomValue(userAtom);
  const getInfo = useGetUserInfo(user?.user?.id as string);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session);
      setMe(getInfo);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
      setMe(getInfo);
      // setRatedMovies(ratedMovies);
    });

    return () => subscription.unsubscribe();
  }, [setUser, setMe, getInfo]);

  return <AppRoutes />;
}

export default App;
