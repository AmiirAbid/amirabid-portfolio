<script>
  import { fade } from 'svelte/transition';
  import { fly } from 'svelte/transition';
  import { tick } from 'svelte';
  import { X } from 'lucide-svelte';

  export let open = false;
  export let onClose;

  let submitted = false;
  let name = '';
  let email = '';
  let message = '';
  let closeButtonEl;

  function handleClose() {
    if (submitted) {
      name = '';
      email = '';
      message = '';
      submitted = false;
    }
    onClose();
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') handleClose();
  }

  function handleSubmit(e) {
    e.preventDefault();
    submitted = true;
    setTimeout(handleClose, 1500);
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) handleClose();
  }

  $: if (open && closeButtonEl) {
    tick().then(() => closeButtonEl?.focus());
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_interactive_supports_focus -->
  <div
    class="backdrop"
    role="dialog"
    aria-modal="true"
    aria-labelledby="contact-modal-title"
    tabindex="-1"
    onclick={handleBackdropClick}
    onkeydown={(e) => e.key === 'Escape' && handleClose()}
    transition:fade={{ duration: 200 }}
  >
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div
      class="panel"
      role="document"
      onclick={(e) => e.stopPropagation()}
      transition:fly={{ y: 20, duration: 250 }}
    >
      <button
        type="button"
        class="close-btn"
        bind:this={closeButtonEl}
        onclick={handleClose}
        aria-label="Close contact form"
      >
        <X size={24} />
      </button>

      {#if submitted}
        <p class="thank-you">Thank you. I'll get back to you soon.</p>
      {:else}
        <h2 id="contact-modal-title" class="modal-title">Get in Touch</h2>
        <form class="form" onsubmit={handleSubmit}>
          <label for="contact-name">Name</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            bind:value={name}
            required
            autocomplete="name"
            placeholder="Your name"
          />
          <label for="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            bind:value={email}
            required
            autocomplete="email"
            placeholder="your@email.com"
          />
          <label for="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            bind:value={message}
            required
            rows="4"
            placeholder="Your message..."
          ></textarea>
          <button type="submit" class="btn-primary submit-btn">
            Send Message
          </button>
        </form>
      {/if}
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200;
    padding: 1rem;
  }

  .panel {
    position: relative;
    width: 100%;
    max-width: 440px;
    padding: 2rem;
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.3);
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    background: transparent;
    color: var(--text-muted);
    min-width: 44px;
    min-height: 44px;
  }

  .close-btn:hover {
    color: var(--accent);
  }

  .modal-title {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  .thank-you {
    padding: 2rem 0;
    color: var(--text-primary);
    font-weight: 500;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form label {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-primary);
  }

  .form input,
  .form textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--text-primary);
    background: var(--bg-tertiary);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius);
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  }

  .form input::placeholder,
  .form textarea::placeholder {
    color: var(--text-muted);
  }

  .form input:focus,
  .form textarea:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-glow);
  }

  .submit-btn {
    margin-top: 0.5rem;
    width: 100%;
  }
</style>
