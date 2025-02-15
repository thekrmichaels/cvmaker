import { useEffect, useState } from "react";
import { CVMaker_API } from "../../env.js";

export default function useLicense(email) {
  const [license, setLicense] = useState(null);

  useEffect(() => {
    if (!email) return;

    getLicense(email)
      .then(setLicense)
      .catch((error) => console.error(`${error.name}: ${error.message}`));
  }, [email]);

  return license;
}

function getLicense(email) {
  return fetch(`${CVMaker_API}/licenses/${email}`, {
    credentials: "include",
  }).then((response) =>
    response.ok
      ? response.json()
      : Promise.reject(new Error("Error querying license data.")),
  );
}
