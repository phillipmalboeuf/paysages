<script lang="ts">
  import { isTypeText } from '$lib/clients/content_types'

  import Hero from '$lib/components/Hero.svelte'
  import Text from '$lib/components/Text.svelte'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>

<!-- 
{#if data.page.fields.popup}
<Popup item={data.page.fields.popup} />
{/if} -->

<Hero />

{#if data.page.fields.contenu?.length}
{#each data.page.fields.contenu as item, i}
<section class="padded">
  {#if isTypeText(item)}
  <Text {item} />
  {/if}
</section>
{/each}
{/if}


<style lang="scss">
  section {
    // margin: $s5 0;
  }
</style>