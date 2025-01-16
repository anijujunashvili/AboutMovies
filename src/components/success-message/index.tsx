import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { APP_PATHS } from "@/routes/enum";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SuccessMsg = ({
  lgText,
  smText,
  btnName,
  type,
}: {
  lgText: string;
  smText: string;
  btnName: string;
  type: "register" | "rate";
}) => {
  const { lang } = useParams();
  const { t } = useTranslation();
  const h2Styles =
    type === "register"
      ? "text-xl font-semibold tracking-tight text-white"
      : "text-xl font-semibold tracking-tight";
  return (
    <div className="text-foreground flex flex-col items-center space-y-2 p-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Check className="text-primary size-16" />
      </motion.div>

      <motion.h2
        className={h2Styles}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        {t(lgText)}
      </motion.h2>
      {type === "register" && (
        <>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            {t(smText)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <Link to={`/${lang}/${APP_PATHS.HOME}`}>
              <Button className="bg-primary mt-6 px-8 font-medium" size="lg">
                {t(btnName)}
              </Button>
            </Link>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default SuccessMsg;
