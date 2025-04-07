<script lang="ts">
	import '../styles/styles.scss'
	
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
  
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Articles from '$lib/components/Articles.svelte';

	import { page } from '$app/stores'
	
	let { children, data } = $props();
</script>

<ParaglideJS {i18n}>
	<Header navigations={data.navigations} />
	<main class="{$page.data.page?.fields.couleur}">
		
		{@render children()}

		<Articles articles={data.articles.items} />
	</main>
	<Footer navigations={data.navigations} />
</ParaglideJS>


<style lang="scss">
	main {
		// padding-top: 100px;

		:global(> section:first-of-type > section:not(.Gauche):not(.Droite)) {
			// padding-top: 100px;
		}
	}
</style>