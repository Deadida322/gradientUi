import { useSsrId } from '@/ssr/use';

export const createComponentId = (prefix: string) => useSsrId(prefix);
