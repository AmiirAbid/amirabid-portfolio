<script>
  import { Menu, X, FileDown, MessageCircle } from 'lucide-svelte';
  import ThemeToggle from './ThemeToggle.svelte';

  export let openContactModal;
  let mobileMenuOpen = false;

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
  ];

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }
</script>

<header class="navbar">
  <a href="#hero" class="logo">Amir Abid</a>

  <nav class="nav-desktop" aria-label="Main navigation">
    {#each navLinks as link}
      <a href={link.href} onclick={closeMobileMenu}>{link.label}</a>
    {/each}
  </nav>

  <div class="nav-actions">
    <ThemeToggle />
    <a href="/Amir Abid CV.pdf" class="btn-secondary" download>
      <FileDown size={18} aria-hidden="true" />
      Download CV
    </a>
    <button type="button" class="btn-primary" onclick={openContactModal} aria-label="Open contact form">
      <MessageCircle size={18} aria-hidden="true" />
      Contact
    </button>
  </div>

  <button
    type="button"
    class="menu-toggle"
    onclick={toggleMobileMenu}
    aria-expanded={mobileMenuOpen}
    aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
  >
    {#if mobileMenuOpen}
      <X size={24} />
    {:else}
      <Menu size={24} />
    {/if}
  </button>
</header>

{#if mobileMenuOpen}
  <div class="nav-mobile-backdrop" onclick={closeMobileMenu} role="presentation" aria-hidden="true"></div>
  <nav class="nav-mobile" aria-label="Mobile navigation">
    {#each navLinks as link}
      <a href={link.href} onclick={closeMobileMenu}>{link.label}</a>
    {/each}
    <a href="/Amir Abid CV.pdf" class="btn-secondary" download onclick={closeMobileMenu}>
      <FileDown size={18} />
      Download CV
    </a>
    <button type="button" class="btn-primary" onclick={() => { openContactModal(); closeMobileMenu(); }}>
      <MessageCircle size={18} />
      Contact
    </button>
  </nav>
{/if}

<style>
  .navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    gap: 1rem;
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--glass-border);
  }

  .logo {
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--text-primary);
  }

  .logo:hover {
    color: var(--accent);
    box-shadow: none;
  }

  .nav-desktop {
    display: none;
  }

  @media (min-width: 768px) {
    .nav-desktop {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .nav-desktop a {
      color: var(--text-muted);
      font-weight: 500;
    }

    .nav-desktop a:hover {
      color: var(--accent);
    }

    .menu-toggle {
      display: none;
    }
  }

  .nav-actions {
    display: none;
    align-items: center;
    gap: 0.75rem;
  }

  @media (min-width: 768px) {
    .nav-actions {
      display: flex;
    }
  }

  .menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    background: transparent;
    color: var(--text-primary);
    min-width: 44px;
    min-height: 44px;
  }

  .menu-toggle:hover {
    color: var(--accent);
  }

  @media (min-width: 768px) {
    .menu-toggle {
      display: none;
    }
  }

  .nav-mobile-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
    animation: fadeIn 0.2s ease;
  }

  .nav-mobile {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(280px, 85vw);
    padding: 4rem 1.5rem 2rem;
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-left: 1px solid var(--glass-border);
    z-index: 101;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    animation: slideIn 0.25s ease;
  }

  .nav-mobile a {
    color: var(--text-primary);
    font-weight: 500;
    padding: 0.5rem 0;
  }

  .nav-mobile .btn-primary,
  .nav-mobile .btn-secondary {
    margin-top: 0.5rem;
    width: 100%;
    justify-content: center;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
</style>
