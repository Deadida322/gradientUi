import type { MdiIcon } from '@/types/CommonTypes';

export type GStateIconMap<TState extends string> = Partial<
	Record<TState, MdiIcon>
>;

export interface ResolveStateIconOptions<TState extends string> {
	state: TState;
	icon?: MdiIcon;
	icons?: GStateIconMap<TState>;
	defaultIcons?: GStateIconMap<TState>;
}

export const resolveStateIcon = <TState extends string>({
	state,
	icon,
	icons,
	defaultIcons
}: ResolveStateIconOptions<TState>): MdiIcon | undefined =>
	icons?.[state] ?? defaultIcons?.[state] ?? icon;
