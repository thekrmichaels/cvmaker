/* eslint-disable react/prop-types */
import { useThemeContext } from "../../hooks/useContexts";

const Loader = ({ loadText }) => {
  const { textClass } = useThemeContext();

  return (
    <output
      className={`${textClass} absolute inset-0 z-20 flex items-center justify-center bg-white/40 dark:bg-[#131314]/40`}
      aria-live="assertive"
      aria-label={loadText}
    >
      <strong className="animate-pulse">{loadText}...</strong>
    </output>
  );
};

export default Loader;
