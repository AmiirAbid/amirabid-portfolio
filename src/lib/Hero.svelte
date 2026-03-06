<script>
  import { MessageCircle, FileDown } from 'lucide-svelte';

  export let openContactModal;
</script>

<section class="hero" id="hero" aria-label="Introduction">
  <div class="hero-bg">
    <div class="grid-bg" aria-hidden="true"></div>
  </div>
  <div class="hero-content section">
    <div class="hero-text">
      <h1>Building Systems That Scale. Securing What Matters.</h1>
      <p class="subheadline">Full-Stack Developer | Cybersecurity Engineering Student</p>
      <div class="ctas">
        <button type="button" class="btn-primary" onclick={openContactModal}>
          <MessageCircle size={20} aria-hidden="true" />
          Contact Me
        </button>
        <a href="/cv.pdf" class="btn-secondary" download>
          <FileDown size={20} aria-hidden="true" />
          Download CV
        </a>
      </div>
    </div>
    <div class="profile-wrap">
      <!-- Replace with /profile.jpg once you add your photo to public/ -->
      <img
        src="/amirabid.png"
        alt="Amir Abid"
        width="240"
        height="240"
        class="profile-img"
      />
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    scroll-snap-align: start;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .grid-bg {
    position: absolute;
    inset: -50%;
    background-image:
      linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: gridPulse 8s ease-in-out infinite;
  }

  @keyframes gridPulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }

  .hero-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    text-align: center;
  }

  @media (min-width: 768px) {
    .hero-content {
      flex-direction: row;
      text-align: left;
      align-items: center;
      justify-content: space-between;
    }
  }

  .hero-text h1 {
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }

  .subheadline {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    color: var(--text-muted);
  }

  .ctas {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  @media (min-width: 768px) {
    .ctas {
      justify-content: flex-start;
    }
  }

  .profile-wrap {
    flex-shrink: 0;
  }

  .profile-img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid var(--glass-border);
    box-shadow: 0 0 40px var(--accent-glow);
  }

  @media (min-width: 768px) {
    .profile-img {
      width: 240px;
      height: 240px;
    }
  }
</style>
