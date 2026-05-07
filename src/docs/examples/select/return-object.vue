<script setup lang="ts">
	defineOptions({ name: 'SelectReturnObjectExample' });
	import { ref } from 'vue';
	import { GSelect } from '@/components';

	const users = [
		{ id: 1, name: 'Ada Lovelace', role: 'Architecture' },
		{ id: 2, name: 'Grace Hopper', role: 'Compiler systems' },
		{ id: 3, name: 'Margaret Hamilton', role: 'Flight software' }
	];
	const selectedUser = ref(users[1]);
</script>

<template>
	<div class="docs-component-detail__stack">
		<div class="docs-component-detail__form-preview">
			<g-select
				v-model="selectedUser"
				return-object
				label="Owner"
				:items="users"
				label-key="name"
				value-key="id">
				<template #selection="{ selectedItems }">
					<span v-if="selectedItems[0]">
						{{ selectedItems[0].raw.name }}
						<span class="docs-component-detail__field-hint">
							- {{ selectedItems[0].raw.role }}
						</span>
					</span>
				</template>
			</g-select>
		</div>

		<p class="docs-component-detail__value-line">
			Selected id: <code>{{ selectedUser.id }}</code>
		</p>
	</div>
</template>
