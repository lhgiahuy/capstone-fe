import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef } from "react";

type AddSearchParam = (params: Record<string, string>) => void;

const useAddSearchParam = (): AddSearchParam => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paramsRef = useRef(new URLSearchParams(searchParams?.toString()));

  const addSearchParam = useCallback((paramsToAdd: Record<string, string>) => {
    Object.entries(paramsToAdd).forEach(([name, value]) => {
      paramsRef.current.set(name, value);
    });
    router.push(`${pathname}?${paramsRef.current.toString()}`);
  }, []);

  return addSearchParam;
};

export default useAddSearchParam;
