<script lang="ts">
  import { isTypeFormulaire, isTypeListe, isTypeText } from '$lib/clients/content_types'
  import Form from '$lib/components/Form.svelte'
  import Hero from '$lib/components/Hero.svelte'
  import List from '$lib/components/List.svelte'
  import Text from '$lib/components/Text.svelte'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>

<!-- 
{#if data.page.fields.popup}
<Popup item={data.page.fields.popup} />
{/if} -->

{#if data.page.fields.id === 'accueil'}
<Hero />
{/if}

{#if data.page.fields.contenu?.length}
{#each data.page.fields.contenu as item, i}
<section class="padded">
  {#if isTypeText(item)}
  <Text {item} />
  {:else if isTypeListe(item)}
  <List {item} />
  {:else if isTypeFormulaire(item)}
  <Form {item} />
  {/if}
</section>
{/each}
{/if}


<style lang="scss">
  section {
    // margin: $s5 0;
  }
</style>