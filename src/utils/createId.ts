import { useSsrId } from '@/ssr/use';

export const createId = (prefix = 'g') => useSsrId(prefix);
