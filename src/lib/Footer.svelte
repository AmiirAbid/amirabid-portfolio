<script>
  import { Linkedin, Github, Phone, Mail } from 'lucide-svelte';

  const phone = '+216 96 592 443';
  const email = 'amirabid401@gmail.com';
  const linkedInUrl = 'https://www.linkedin.com/in/amir-abid'; // placeholder
  const githubUrl = 'https://github.com/amirabid'; // placeholder
  const whatsappNumber = '21696592443';
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
</script>

<footer class="footer">
  <div class="footer-inner section">
    <p class="tagline">Building systems that scale. Securing what matters.</p>
    <div class="contacts">
      <a href="tel:+21696592443" aria-label="Phone">
        <Phone size={20} aria-hidden="true" />
        {phone}
      </a>
      <a href="mailto:{email}" aria-label="Email">
        <Mail size={20} aria-hidden="true" />
        {email}
      </a>
    </div>
    <div class="social">
      <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <Linkedin size={22} aria-hidden="true" />
      </a>
      <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <Github size={22} aria-hidden="true" />
      </a>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      </a>
    </div>
    <p class="copyright">© {new Date().getFullYear()} Amir Abid. All rights reserved.</p>
  </div>
</footer>

<style>
  .footer {
    background: var(--bg-secondary);
    border-top: 1px solid var(--glass-border);
    padding: 2rem 0;
  }

  .footer-inner {
    text-align: center;
  }

  .tagline {
    font-family: var(--font-heading);
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--text-muted);
    margin-bottom: 1rem;
  }

  .contacts {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 1rem;
  }

  .contacts a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-muted);
  }

  .contacts a:hover {
    color: var(--accent);
  }

  .social {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .social a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    color: var(--text-muted);
    border-radius: var(--radius);
  }

  .social a:hover {
    color: var(--accent);
    box-shadow: 0 0 16px var(--accent-glow);
  }

  .copyright {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin: 0;
  }
</style>
