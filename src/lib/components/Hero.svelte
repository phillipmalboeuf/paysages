<section>
  <img src="https://images.unsplash.com/photo-1739993655680-4b7050ed2896?q=80&w=1270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hero" />
  <svg width="1513" height="982" viewBox="0 0 1513 982" preserveAspectRatio="xMidYMax slice">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1513 0H0V982H1513V0ZM273.842 242C402.43 242 506.683 346.459 506.683 475.302V475.352C506.683 604.194 402.43 708.653 273.842 708.653V941.955H41V242H273.842ZM867.611 242C674.728 242 518.349 398.688 518.349 591.952C518.349 785.216 674.728 941.905 867.611 941.905V242ZM1473 941.955L890.896 242H1473V941.955Z" />
  </svg>
</section>

<style lang="scss">
  section {
    position: relative;
    min-height: 100vh;
    background-color: $noir;

    scroll-timeline: --scrollTimeline y;

    svg,
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    img {
      animation-name: parallaxAnimation;
      // animation-duration: 1ms;
      animation-timeline: --scrollTimeline;
    }

    svg {
      
      path {
        fill: $jaune !important;
      }
    }
  }

  @keyframes parallaxAnimation {
    from {
      transform: translateY(-10%);
    }

    to {
      transform: translateY(10%);
    }
  }
</style>