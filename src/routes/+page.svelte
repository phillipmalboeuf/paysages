<script lang="ts">
  import type { Entry } from 'contentful'
  
  import { isTypeCarte, isTypeFormulaire, isTypeHero, isTypeListe, isTypeText, type TypeTextSkeleton } from '$lib/clients/content_types'
  import Form from '$lib/components/Form.svelte'
  import Logo from '$lib/components/Logo.svelte'
  import List from '$lib/components/List.svelte'
  import Hero from '$lib/components/Hero.svelte'
  import Text from '$lib/components/Text.svelte'
  import Map from '$lib/components/Map.svelte'

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
<section class="{item.sys.contentType.sys.id} {(item as Entry<TypeTextSkeleton>).fields.fond} {(item as Entry<TypeTextSkeleton>).fields.alignement}"
  style:z-index={(item as Entry<TypeTextSkeleton>).fields.alignement ? i + 1 : undefined}>
  {#if isTypeText(item)}
  <Text {item} first={i === 0} />
  {:else if isTypeListe(item)}
  <List {item} />
  {:else if isTypeHero(item)}
  <Hero {item} />
  {:else if isTypeCarte(item)}
  <Map {item} />
  {:else if isTypeFormulaire(item)}
  <Form {item} />
  {/if}

  {#if !!(item as Entry<TypeTextSkeleton>).fields.alignement}
    <svg viewBox="0 0 300 50" preserveAspectRatio="none"><path d="M0 0L300 50H0V0Z"/></svg>
    <svg viewBox="0 0 300 50" preserveAspectRatio="none"><path d="M0 0L300 50H0V0Z"/></svg>
  {/if}
</section>
{/each}
{/if}


<style lang="scss">
  section {
    position: relative;

    &.Blanc {
      background-color: var(--fond);
      --fond: #{$blanc};
    }
    
    &.Foncé {
      background-color: var(--fond);
      :global(.corail) & { --fond: #{$corail}; }
      :global(.jaune) & { --fond: #{$jaune}; }
      :global(.bleu) & { --fond: #{$bleu}; }
      :global(.vert) & { --fond: #{$vert}; }
      :global(.gris) & { --fond: #{$gris}; }
    }
    
    &.Léger {
      background-color: var(--fond);
      :global(.corail) & { --fond: #{$corail-pale}; }
      :global(.jaune) & { --fond: #{$jaune-pale}; }
      :global(.bleu) & { --fond: #{$bleu-pale}; }
      :global(.vert) & { --fond: #{$vert-pale}; }
      :global(.gris) & { --fond: #{$gris-pale}; }
    }

    svg {
      position: absolute;
      z-index: 2;
      bottom: calc(100% - 1px);
      left: 0;
      width: 100%;
      height: calc(10svh + 2px);
      transform: rotate(0deg);
      pointer-events: none;

      @media (max-width: $mobile) {
        height: calc(5svh + 2px);
      }

      path {
        color: var(--fond, white);
      }

      &:last-of-type {
        bottom: auto;
        top: calc(100% - 1px);
        transform: rotate(180deg);
      }
    }

    // &.first {
    //   svg {
    //     &:first-of-type {
    //       display: none;
    //     }
    //   }
    // }

    &:not(.hero) {
      padding: $s5 $s0;
    }

    &:first-child {
      padding-top: calc($s5 + 10svh);
    }

    // :global(> section.Gauche),
    // :global(> section.Droite) {
    //   // mask-image: linear-gradient(black, transparent);
    // }

    &.Gauche + &.Droite {
      margin-top: calc(10svh);

      @media (max-width: $mobile) {
        margin-top: calc(5svh);
      }
    }

    &.Droite + &.Gauche {
      margin-top: calc(10svh);

      @media (max-width: $mobile) {
        margin-top: calc(5svh);
      }
    }

    &:not(.Gauche):not(.Droite):not(.hero) {
      // padding: calc($s5 + 10svh) $s0;
    }

    &:global(:has(+ .Droite)) {
      :global(.hero figcaption) {
        @media (min-width: $mobile) {
          left: auto;
          right: 0;
        }
      }
    }

    &:global(:has(+ .Gauche)) {
      :global(.hero figcaption) {
        @media (max-width: $mobile) {
          right: 0;
          left: auto;
        }
      }
    }

    &.Gauche {
      svg {
        &:last-of-type {
          transform: rotate(180deg) scaleX(-1);
        }
      }
    }

    &.Droite {
      svg {
        &:first-of-type {
          transform: rotate(180deg) scaleY(-1);
        }
      }
    }
  }
</style>