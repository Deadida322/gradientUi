import { defineComponent, h } from 'vue';

const ConfigIcon = defineComponent({
	name: 'ConfigIcon',
	props: { icon: { type: String, required: true } },
	setup: (props) => () =>
		h(
			'span',
			{ 'data-testid': 'config-icon' },
			`Config icon: ${props.icon}`
		)
});

export default {
	icons: {
		defaultSet: 'config',
		aliases: { proof: 'config:proof' },
		sets: { config: { component: ConfigIcon } }
	},
	theme: { seed: '#006c4c' }
};
