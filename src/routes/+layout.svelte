<script lang="ts">
	import '../styles/styles.scss'
	
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
  
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<main>
		<Header />
		{@render children()}
	</main>
</ParaglideJS>
