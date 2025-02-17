import { useEffect, useState, useMemo } from "react";
import { useThemeContext } from "../hooks/useContexts";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const Pricing = () => {
  const [maxHeight, setMaxHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const { theme, themeStyle } = useThemeContext();

  const borderStyle =
    theme === "light" ? "border-[#747775]" : "border-[#8e918f]";
  const focusStyle =
    theme === "light"
      ? "focus:border-[#1f1f1f] focus:ring-1 focus:ring-[#1f1f1f]"
      : "focus:border-[#e3e3e3] focus:ring-1 focus:ring-[#e3e3e3]";

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
        link: "https://buymeacoffee.com/amilkarjdie/e/366566",
      },
      {
        title: "1 Year Access",
        price: "$60 USD",
        features: [
          "Unlimited downloads",
          "Keyword-based resumes (English only)",
        ],
        buttonLabel: "Upgrade now",
        link: "https://buymeacoffee.com/amilkarjdie/e/366568",
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
    <div
      className={`${themeStyle} mt-24 flex flex-col items-center justify-center gap-6 p-6 md:flex-row`}
    >
      {plans.map((plan, index) => (
        <Card
          key={index}
          title={plan.title}
          subTitle={plan.price}
          className={`${themeStyle} card w-full rounded border border-[#747775] shadow-lg`}
          style={{
            minHeight: `${maxHeight}px`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          footer={
            plan.title !== "Free" && (
              <div className="mt-auto text-center">
                <a href={plan.link} target="_blank" rel="noopener noreferrer">
                  <Button
                    label={plan.buttonLabel}
                    className={`${borderStyle} ${focusStyle} ${themeStyle} w-full rounded border border-[#747775] hover:bg-opacity-50`}
                    severity="secondary"
                  />
                </a>
              </div>
            )
          }
        >
          <div
            className="card-content"
            style={{
              minHeight: `${contentHeight}px`,
            }}
          >
            <p className="m-0">
              {plan.features.map((feature, idx) => (
                <span key={idx}>
                  ✔ {feature} <br />
                </span>
              ))}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Pricing;
