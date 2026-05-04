import { makeOverlayProps } from '@/use/overlay';

export const makeBaseOverlayProps = makeOverlayProps;

export type BaseOverlayProps = ReturnType<typeof makeBaseOverlayProps>;
