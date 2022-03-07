import { useTranslation } from "react-i18next";

const AnswerAttack = ({ answerAttack }) => {
  const { t } = useTranslation();

  return (
    <div className={`notification container has-text-centered custom-answer-attack`}>
      <span>{t("attackMessage")}</span>
      <span className="is-uppercase">
        <strong>{t(`moves.${answerAttack}`)}</strong>{" "}
      </span>
    </div>
  );
};

export default AnswerAttack;
