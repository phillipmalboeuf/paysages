<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import Icon from './Icon.svelte'

  const { navigations }: { navigations: {[id: string]: Entry<TypeNavigationSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>} } = $props()

  let scrollY = $state(0)
  let menuOpen = $state(false)

  $effect(() => {
    document.documentElement.classList.toggle('noscroll', menuOpen)
  })

  function closeMenu() {
    menuOpen = false
  }
</script>

<svelte:window bind:scrollY />

<header class:scrolled={scrollY > 100} class="padded flex flex--middle flex--spaced">
  <a href="/" class="flex flex--middle flex--thick_gapped logo" onclick={closeMenu}>
    <Icon label="Accueil" i="logo" />
    <Icon label="Paysages Capitale-Nationale" i="logotype" />
  </a>

  <button class="menu_button button--none" onclick={() => menuOpen = !menuOpen}>
    {#if menuOpen}
      <Icon label="Fermer le menu" i="menu-close" />
    {:else}
      <Icon label="Ouvrir le menu" i="menu" />
    {/if}
  </button>
</header>

<nav class="menu padded flex flex--column" class:open={menuOpen}>
  <ul class="list--nostyle">
    {#each navigations['menu'].fields.liens as lien}
      <li><a href={lien.fields.route} class="h4" onclick={closeMenu}>{lien.fields.titre}</a></li>
    {/each}
  </ul>
  <ul class="list--nostyle flex flex--gapped">
    {#each navigations['social'].fields.liens as lien}
      <li><a href={lien.fields.route} onclick={closeMenu}>{lien.fields.titre}</a></li>
    {/each}
  </ul>
</nav>

<style lang="scss">
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    
    .logo {
      width: auto;

      :global(svg) {
        transition: opacity 0.333s, transform 0.333s;
        transform: translateX(calc(-85px - var(--gap)));

        &:first-child {
          opacity: 0;
        }
      }
    }

    &.scrolled {
      .logo {
        :global(svg) {
          transform: translateX(0);

          &:first-child {
            opacity: 1;
          }
        }
      }
    }
  }

  .menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $blanc;
    z-index: 99;
    transition: transform 0.666s;
    transform: translateY(-100%);

    &.open {
      transform: translateY(0);
    }

    ul {
      width: 100%;

      &:first-child {
        margin-top: auto;

        a {
          &:hover,
          &:focus {
            padding-left: $s1;
          }
        }
      }

      li {
        a {
          padding: $s-1 0;
          border-bottom: 1px solid $noir;
          transition: padding 0.333s;
        }
      }

      &:last-child {
        margin: $s1 0;

        a {
          padding: $s-2 0;
        }
      }
    }
  }
</style>