import { useEffect, useState, useMemo } from "react";
import { useThemeContext } from "../hooks/useContexts";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const Pricing = () => {
  const [maxHeight, setMaxHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const { isLightMode, bgClass, textClass } = useThemeContext();

  const borderClass = "border border-[#747775] dark:border-[#8E918F]";
  const plans = useMemo(
    () => [
      {
        title: "Free",
        price: "$0 USD",
        features: ["One download per day,\n available at 00:00 UTC"],
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
    setTimeout(() => {
      const cardElements = document.querySelectorAll(".card");
      const heights = Array.from(cardElements).map((card) => ({
        cardHeight: card.offsetHeight,
        contentHeight: card.querySelector(".card-content").offsetHeight,
      }));

      const highestCard = Math.max(...heights.map((h) => h.cardHeight));
      const highestContent = Math.max(...heights.map((h) => h.contentHeight));

      setMaxHeight(highestCard);
      setContentHeight(highestContent);
    }, 0);
  }, [plans]);

  return (
    <section className="mt-24 flex flex-col items-center justify-center gap-6 p-6 md:mt-48 md:flex-row">
      {plans.map(({ title, price, features, buttonLabel, link }, index) => (
        <Card
          key={index}
          title={<h2 className={`${textClass}`}>{title}</h2>}
          subTitle={<h3 className={`${textClass} text-lg`}>{price}</h3>}
          className={`${bgClass} ${borderClass} card w-full rounded shadow-lg`}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: `${maxHeight}px`,
          }}
          footer={
            title !== "Free" && (
              <footer className="mt-auto text-center">
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <Button
                    label={
                      <span
                        className={`${textClass} group-hover:text-[#E3E3E3] dark:group-hover:text-[#1F1F1F]`}
                      >
                        {buttonLabel}
                      </span>
                    }
                    className={`group ${bgClass} ${borderClass} button w-full hover:bg-[#131314] dark:hover:bg-[#FFFFFF] button--focus-${isLightMode ? "light" : "dark"}`}
                    severity="secondary"
                  />
                </a>
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
                  <span className={`${textClass}`}>✔ {feature}</span>
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
