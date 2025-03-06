
<figure>
  <img src="https://images.unsplash.com/photo-1739993655680-4b7050ed2896?q=80&w=1270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hero" />
  <figcaption>
    <svg viewBox="0 0 300 50" preserveAspectRatio="none">
    <path d="M0 0L300 50H0V0Z"/>
    </svg>

    Caption
  </figcaption>
</figure>

<style lang="scss">
  figure {
    width: 100%;
    margin: $s1 0;
    position: relative;
    overflow: hidden;

    figcaption {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: $jaune;
      padding: 0 $s-1 $s-1;
      transition: transform 0.333s, opacity 0.333s;
      transform: translateY(100%);
      opacity: 0;
      mix-blend-mode: screen;

      svg {
        position: absolute;
        bottom: calc(100% - 1px);
        left: 0;
        width: 100%;
        height: 0lvh;
        transition: height 0.333s;

        path {
          fill: $jaune !important;
        }
      }
    }

    &:hover {
      figcaption {
        transform: translateY(0);
        opacity: 1;

        svg {
          height: 5lvh;
        }
      }
    }
  }
</style>