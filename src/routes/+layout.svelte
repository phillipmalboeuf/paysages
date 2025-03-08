<script lang="ts">
	import '../styles/styles.scss'
	
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
  
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	
	let { children, data } = $props();
</script>

<ParaglideJS {i18n}>
	<main>
		<Header navigations={data.navigations} />
		{@render children()}
		<Footer navigations={data.navigations} />
	</main>
</ParaglideJS>
