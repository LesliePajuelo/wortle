import { Trans, useTranslation } from "react-i18next";

import coffee from "../img/hot-beverage_2615.png";
import heart from "../img/yellow-heart_1f49b.png";
import btcImg from "../img/btc.png";

const Footer = ({ setIsSourcesModalOpen, setIsBugReportModalOpen, setIsDonateModalOpen }) => {
  const { t } = useTranslation();
  return (
    <div className="is-flex is-flex-direction-column is-align-items-center is-justify-content-center mt-3 pb-5">
      <p className="has-text-white">
        <Trans i18nKey="footer.createdBy">
          <span>Created by </span>
          <a className="has-text-white is-underlined" href="https://twitter.com/nmfretz" target="_blank">
            Nathan Fretz
          </a>
        </Trans>
      </p>
      <p className="has-text-white is-size-7 mt-1">
        <a className="has-text-white is-underlined" onClick={() => setIsBugReportModalOpen(true)}>
          Found a bug? Submit a bug report here
        </a>
      </p>
      <p className="has-text-white is-size-7">
        <a className="has-text-white is-underlined" onClick={() => setIsSourcesModalOpen(true)}>
          {t("footer.sources")}
        </a>
      </p>

      {/* <p className="has-text-white is-size-7 has-text-centered pt-3 pl-3 pr-3">
        <img className="custom-heart" src={heart} />
        <span>SQWORDLE? - </span>
        <a className="has-text-white custom-buy-coffee-link" href="https://ko-fi.com/nmfretz" target="_blank">
          {t("footer.ko-fi")} <img className="custom-coffee is-underlined" src={coffee}></img>
        </a>
        <span> or </span>
        <a className="has-text-white custom-buy-coffee-link" onClick={() => setIsDonateModalOpen(true)}>
          donate <img className="custom-btc-img-footer" src={btcImg} />
        </a>
      </p> */}
    </div>
  );
};

export default Footer;
