<script>
  import Icon from './Icon.svelte'

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
    <li><a href="/" class="h4" onclick={closeMenu}>Accueil</a></li>
    <li><a href="/" class="h4" onclick={closeMenu}>Paysages</a></li>
    <li><a href="/" class="h4" onclick={closeMenu}>Patrimoine</a></li>
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
      margin-top: auto;

      li {
        a {
          padding: $s-1 0;
          border-bottom: 1px solid $noir;
          transition: padding 0.333s;

          &:hover,
          &:focus {
            padding-left: $s1;
          }
        }
      }
    }
  }
</style>