import { Link } from "react-router-dom";
import TEMPLATES from "@constants/Templates";

/**
 * Static preview images are pre-rendered from the real templates with sample
 * data — regenerate with `npm run gen:templates` after changing a layout.
 */
const previewSrc = (id: string) => `/template/${id}.png`;

const ChooseTemplate = () => (
  <div className="min-h-svh w-full bg-black py-10 text-white">
    <h1 className="mb-3 text-center text-4xl font-bold text-pink-600 sm:text-6xl">
      Choose Template
    </h1>
    <p className="mx-auto mb-10 max-w-xl text-center text-neutral-400">
      Pick a layout — you can recolor and change fonts &amp; spacing on the next
      screen.
    </p>
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
      {TEMPLATES.map((t) => (
        <Link
          key={t.id}
          to={`/resume/${t.id}`}
          className="group flex flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 transition-all hover:-translate-y-1 hover:border-neutral-600"
        >
          <div className="aspect-[3/4] w-full overflow-hidden border-b border-neutral-800 bg-neutral-200">
            <img
              src={previewSrc(t.id)}
              alt={`${t.name} template preview`}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
          <div className="p-3">
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: t.accent }}
              />
              <span className="font-semibold">{t.name}</span>
            </div>
            <p className="mt-1 text-xs text-neutral-400">{t.blurb}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default ChooseTemplate;
