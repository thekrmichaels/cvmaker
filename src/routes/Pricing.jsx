import { useEffect, useState, useMemo } from "react";
import { useAuthContext, useThemeContext } from "../hooks/useContexts";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const Pricing = () => {
  const [maxHeight, setMaxHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const { user: { license } = {} } = useAuthContext();
  const { isLightMode, bgClass, textClass } = useThemeContext();

  const borderClass = "border border-[#747775] dark:border-[#8E918F]";
  const plans = useMemo(
    () => [
      {
        title: "Free",
        price: "$0 USD",
        features: ["One download per day, available at 00:00 UTC"],
        buttonLabel: "Upgrade now",
      },
      {
        title: "1 Month Access",
        price: "$10 USD",
        features: [
          "Unlimited downloads",
          "Keyword-based resumes (English only)",
        ],
        buttonLabel: "Upgrade now",
        link: "https://buymeacoffee.com/thekrmichaels/e/366566",
      },
      {
        title: "1 Year Access",
        price: "$60 USD",
        features: [
          "Unlimited downloads",
          "Keyword-based resumes (English only)",
        ],
        buttonLabel: "Upgrade now",
        link: "https://buymeacoffee.com/thekrmichaels/e/366568",
      },
    ],
    [],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const cardElements = document.querySelectorAll(".card");
      const heights = Array.from(cardElements).map((card) => ({
        cardHeight: card.offsetHeight,
        contentHeight: card.querySelector(".card-content").offsetHeight,
      }));

      const highestCard = Math.max(
        ...heights.map(({ cardHeight }) => cardHeight),
      );
      const highestContent = Math.max(
        ...heights.map(({ contentHeight }) => contentHeight),
      );

      setMaxHeight(highestCard);
      setContentHeight(highestContent);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [plans]);

  return (
    <section className="mt-16 flex flex-col items-center justify-center gap-6 p-6 md:mt-48 md:flex-row">
      {plans.map(({ title, price, features, buttonLabel, link }, index) => (
        <Card
          key={index}
          aria-labelledby={`plan-title-${index}`}
          title={
            <h2 id={`plan-title-${index}`} className={`${textClass}`}>
              {title}
            </h2>
          }
          subTitle={<h3 className={`${textClass} text-lg`}>{price}</h3>}
          className={`${bgClass} ${borderClass} card w-72 rounded shadow-lg`}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: `${maxHeight}px`,
          }}
          footer={
            title !== "Free" && (
              <footer className="mt-auto text-center">
                <Button
                  label={<span className={`${textClass}`}>{buttonLabel}</span>}
                  aria-label={`Upgrade to ${title}`}
                  className={`group ${bgClass} button w-full ${isLightMode ? "button--light" : "button--dark"}`}
                  severity="secondary"
                  disabled={license}
                  onClick={() =>
                    !license &&
                    window.open(link, "_blank", "noopener,noreferrer")
                  }
                />
              </footer>
            )
          }
        >
          <div
            className="card-content"
            style={{
              minHeight: `${contentHeight}px`,
            }}
          >
            <ul className="list-inside list-none" aria-label="Plan features">
              {features.map((feature, idx) => (
                <li key={idx}>
                  <span
                    className={`${textClass} inline-flex items-center gap-2`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 108 108"
                      fill="none"
                      className="text-theme shrink-0 -rotate-45"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M0 107.093 107.123 0l.827 107.95z"
                      />
                    </svg>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      ))}
    </section>
  );
};

export default Pricing;
