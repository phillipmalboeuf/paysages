<script lang="ts">
  import { isTypeFormulaire, isTypeHero, isTypeListe, isTypeText } from '$lib/clients/content_types'
  import Form from '$lib/components/Form.svelte'
  import Logo from '$lib/components/Logo.svelte'
  import List from '$lib/components/List.svelte'
  import Hero from '$lib/components/Hero.svelte'
  import Text from '$lib/components/Text.svelte'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>

<!-- 
{#if data.page.fields.popup}
<Popup item={data.page.fields.popup} />
{/if} -->

{#if data.page.fields.id === 'accueil'}
<Logo image={data.page.fields.image} focus={data.page.fields.focus} />
{/if}

{#if data.page.fields.contenu?.length}
{#each data.page.fields.contenu as item, i}
<section class="{(isTypeText(item) || isTypeListe(item)) ? `${item.fields.fond}` : ''}">
  {#if isTypeText(item)}
  <Text {item} />
  {:else if isTypeListe(item)}
  <List {item} />
  {:else if isTypeHero(item)}
  <Hero {item} />
  {:else if isTypeFormulaire(item)}
  <Form {item} />
  {/if}
</section>
{/each}
{/if}


<style lang="scss">
  section {

    :global(> section) {
      padding: $s5 $s0;
    }

    :global(> section.Gauche),
    :global(> section.Droite) {
      padding: calc($s5 + 10svh) $s0;
    }

    &.Blanc {
      background-color: $blanc;
    }
    
    &.Foncé {
      :global(.corail) & { background-color: $corail; }
      :global(.jaune) & { background-color: $jaune; }
      :global(.bleu) & { background-color: $bleu; }
      :global(.vert) & { background-color: $vert; }
      :global(.gris) & { background-color: $gris; }
    }
    
    &.Léger {
      :global(.corail) & { background-color: $corail-pale; }
      :global(.jaune) & { background-color: $jaune-pale; }
      :global(.bleu) & { background-color: $bleu-pale; }
      :global(.vert) & { background-color: $vert-pale; }
      :global(.gris) & { background-color: $gris-pale; }
    }
  }
</style>