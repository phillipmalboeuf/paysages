<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  const { navigations }: { navigations: {[id: string]: Entry<TypeNavigationSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>} } = $props()
</script>

<footer class="padded">
  <hr>
  <nav class="flex flex--gapped">
    <div class="col col--3of12 col--mobile--6of12">
      <ol class="list--nostyle">
        {#each navigations['footer-1'].fields.liens as lien}
          <li><a href={lien.fields.route} class="">{lien.fields.titre}</a></li>
        {/each}
      </ol>
    </div>
    <div class="col col--3of12 col--mobile--6of12">
      <ol class="list--nostyle">
        {#each navigations['footer-2'].fields.liens as lien}
          <li><a href={lien.fields.route} class="">{lien.fields.titre}</a></li>
        {/each}
      </ol>
    </div>

    <div class="col col--3of12 col--mobile--12of12"></div>
    <div class="col col--3of12 col--mobile--12of12">
      <ol class="list--nostyle">
        {#each navigations['social'].fields.liens as lien}
          <li><a href={lien.fields.route} class="">{lien.fields.titre}</a></li>
        {/each}
        <li><br></li>
        <li>&copy; {new Date().getFullYear()} Paysages Capitale-Nationale</li>
      </ol>
    </div>
  </nav>
</footer>

<style lang="scss">
  nav {
    margin: $s2 0;
    font-size: $s-1;
  }
</style>