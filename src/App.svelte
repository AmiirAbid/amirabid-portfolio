<script>
  import Navbar from './lib/Navbar.svelte';
  import Hero from './lib/Hero.svelte';
  import About from './lib/About.svelte';
  import Services from './lib/Services.svelte';
  import Skills from './lib/Skills.svelte';
  import Projects from './lib/Projects.svelte';
  import Footer from './lib/Footer.svelte';
  import ContactModal from './lib/ContactModal.svelte';

  let contactModalOpen = false;
  function openContactModal() {
    contactModalOpen = true;
  }
  function closeContactModal() {
    contactModalOpen = false;
  }
</script>

<a href="#main-content" class="skip-link">Skip to main content</a>

<Navbar {openContactModal} />
<main id="main-content" class="scroll-container">
  <Hero {openContactModal} />
  <About />
  <Services {openContactModal} />
  <Skills />
  <Projects {openContactModal} />
  <Footer />
</main>

<ContactModal open={contactModalOpen} onClose={closeContactModal} />

<style>
  .scroll-container {
    scroll-snap-type: y proximity;
  }
</style>
