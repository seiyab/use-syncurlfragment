import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Options = {
  enabled: boolean;
  ids: string[];
  observerOption: ConstructorParameters<typeof IntersectionObserver>[1];
};

export default function useSyncUrlFragment(
  options?: Partial<Options>
): () => void {
  const {
    enabled = true,
    ids: paramIDs = null,
    observerOption = {
      root: null,
      threshold: 0,
      rootMargin: "3% 0px -95% 0px",
    },
  } = options ?? {};
  const loc = useLocation();
  const navigate = useNavigate();
  const [dummy, setDummy] = React.useState(0);
  const rerender = React.useCallback(() => setDummy((prev) => prev + 1), []);

  const handler = React.useCallback<IntersectionObserverCallback>((entries) => {
    const target = entries
      .filter((entry) => entry.isIntersecting)
      .reduce<IntersectionObserverEntry | null>((acc, entry) => {
        if (!acc || entry.boundingClientRect.top < acc.boundingClientRect.top) {
          return entry;
        }
        return acc;
      }, null);
    console.log(target);
    if (!target) return;
    const id = target.target.id;
    if (id === "") return;
    navigate({ hash: `#${id}` }, { replace: true });
  }, []);

  React.useEffect(() => {
    if (!enabled) return;
    const _ = dummy;
    const observer = new IntersectionObserver(handler, observerOption);
    elements(paramIDs).map((e) => observer.observe(e));
    return () => observer.disconnect();
  }, [handler, enabled, dummy]);

  return rerender;
}

function elements(ids: string[] | null): Element[] {
  if (ids === null) {
    const result: ReturnType<typeof elements> = [];
    document.querySelectorAll("*[id]").forEach((elem) => result.push(elem));
    return result;
  }
  return ids
    .map(document.getElementById)
    .filter((value): value is HTMLElement => value !== null);
}
