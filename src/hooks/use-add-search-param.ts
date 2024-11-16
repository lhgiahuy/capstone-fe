import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

type AddSearchParam = (params: Record<string, string>) => void;
type ClearSearchParam = (paramName: string) => void;

const useSearchParamsHandler = (): [AddSearchParam, ClearSearchParam] => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramsRef = useRef(new URLSearchParams(searchParams?.toString()));

  useEffect(() => {
    paramsRef.current = new URLSearchParams(searchParams?.toString());
  }, [searchParams]);

  const addSearchParam = useCallback(
    (paramsToAdd: Record<string, string>) => {
      Object.entries(paramsToAdd).forEach(([name, value]) => {
        paramsRef.current.set(name, value);
      });
      router.push(`${pathname}?${paramsRef.current.toString()}`);
    },
    [router, pathname]
  );

  const clearSearchParam = useCallback(
    (paramName: string) => {
      paramsRef.current.delete(paramName);
      router.push(`${pathname}?${paramsRef.current.toString()}`);
    },
    [router, pathname]
  );

  return [addSearchParam, clearSearchParam];
};

export default useSearchParamsHandler;
