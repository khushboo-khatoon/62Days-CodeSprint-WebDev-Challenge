/**
 * Valentine Config Loader
 * Fetches customization from Supabase based on URL hash
 * 
 * Environment variables are loaded from:
 * - LOCAL: env.local.js (create from env.local.example.js)
 * - PRODUCTION: env.js (values injected by Vercel build)
 */

// Get Supabase config from window (set by env.js or env.local.js)
const SUPABASE_URL = window.SUPABASE_URL;
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY;

// DEBUG: Log config status
console.log('🔧 Config Loader Debug:');
console.log('  SUPABASE_URL:', SUPABASE_URL ? SUPABASE_URL.substring(0, 40) + '...' : 'NOT SET');
console.log('  SUPABASE_ANON_KEY:', SUPABASE_ANON_KEY ? 'SET (' + SUPABASE_ANON_KEY.length + ' chars)' : 'NOT SET');

// Check if Supabase is configured
function isSupabaseConfigured() {
  const configured = SUPABASE_URL && 
         SUPABASE_ANON_KEY && 
         !SUPABASE_URL.includes('__SUPABASE') &&
         !SUPABASE_ANON_KEY.includes('__SUPABASE');
  console.log('  isSupabaseConfigured:', configured);
  return configured;
}


/**
 * Sanitize text to prevent XSS - escapes HTML except for allowed tags
 * Allowed: <br>, <br/>, <b>, </b>, <i>, </i>, <em>, </em>, <strong>, </strong>
 */
function sanitizeText(text) {
  if (!text) return '';
  // First escape all HTML
  let safe = String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
  
  // Then restore allowed tags (case-insensitive)
  safe = safe.replace(/&lt;br\s*\/?&gt;/gi, '<br>');
  safe = safe.replace(/&lt;(\/?)b&gt;/gi, '<$1b>');
  safe = safe.replace(/&lt;(\/?)i&gt;/gi, '<$1i>');
  safe = safe.replace(/&lt;(\/?)em&gt;/gi, '<$1em>');
  safe = safe.replace(/&lt;(\/?)strong&gt;/gi, '<$1strong>');
  
  return safe;
}

/**
 * Sanitize plain text (no HTML allowed)
 */
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Extract the valentine ID from the URL
 * Supports: /v/{id}, /m/{id}, or ?id={id}
 */
function getValentineId() {
  const path = window.location.pathname;
  
  // Check for /v/{id} or /m/{id} pattern
  const pathMatch = path.match(/^\/[vm]\/([^/]+)/);
  if (pathMatch) {
    return pathMatch[1];
  }
  
  // Fallback to query param
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

/**
 * Determine page type from URL
 * Returns 'full' for /v/ routes, 'main_only' for /m/ routes
 */
function getPageType() {
  const path = window.location.pathname;
  if (path.startsWith('/m/')) {
    return 'main_only';
  }
  return 'full';
}

/**
 * Fetch valentine config from Supabase
 */
async function fetchValentineConfig(valentineId) {
  console.log('📡 Fetching config for ID:', valentineId);
  
  if (!valentineId) {
    console.warn('❌ No valentine ID provided, using defaults');
    return null;
  }

  if (!isSupabaseConfigured()) {
    console.warn('❌ Supabase not configured. Create env.local.js for local dev.');
    return null;
  }

  const fetchUrl = `${SUPABASE_URL}/rest/v1/valentines?id=eq.${encodeURIComponent(valentineId)}&select=*`;
  console.log('  Fetch URL:', fetchUrl);

  try {
    const response = await fetch(fetchUrl, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    console.log('  Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('  Response error:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('  Data received:', data);
    
    if (data && data.length > 0) {
      console.log('✅ Config found:', data[0]);
      return data[0];
    }
    
    console.warn(`❌ No config found for ID: ${valentineId}`);
    return null;
  } catch (error) {
    console.error('❌ Error fetching valentine config:', error);
    return null;
  }
}

/**
 * Show error page when no valid config found
 */
function showErrorPage() {
  document.body.innerHTML = `
    <div style="
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: #fff;
      font-family: 'Poppins', sans-serif;
      text-align: center;
      padding: 2rem;
    ">
      <div style="font-size: 4rem; margin-bottom: 1rem;">💔</div>
      <h1 style="font-size: 2rem; margin-bottom: 0.5rem; color: #e25a6f;">Page Not Found</h1>
      <p style="color: #888; max-width: 400px;">
        This valentine doesn't exist or the link is incorrect.<br>
        Please check the URL you received.
      </p>
    </div>
  `;
}

/**
 * Apply config to the page
 * Names are REQUIRED - page won't personalize without them
 * Letter message is optional - uses existing HTML fallback
 * Polaroid images are optional - uses default imgs/p1-p6.png
 */
function applyConfig(config) {
  // If no config or missing required names, show error page
  if (!config || !config.your_name || !config.partner_name) {
    console.warn('Missing required config (your_name, partner_name). Showing error page.');
    showErrorPage();
    return false;
  }
  
  const cfg = config;
  
  // Update partner name in all places
  document.querySelectorAll('[data-partner-name]').forEach(el => {
    el.textContent = cfg.partner_name;
  });
  
  // Update your name in all places
  document.querySelectorAll('[data-your-name]').forEach(el => {
    el.textContent = cfg.your_name;
  });
  
  // Update hero title (For [Partner] <3)
  const heroTitle = document.querySelector('.hero h1.reveal');
  if (heroTitle) {
    heroTitle.textContent = `For ${cfg.partner_name} <3`;
  }
  
  // Update proposal card name
  const proposalName = document.querySelector('.proposal-card > h1');
  if (proposalName && !proposalName.id) {
    proposalName.textContent = `${cfg.partner_name},`;
  }
  
  // Update letter message (sanitized to allow only safe tags like <br>)
  // Only update if custom message provided, otherwise keep default HTML
  const letterContent = document.querySelector('.letter p');
  if (letterContent && cfg.letter_message && cfg.letter_message.trim()) {
    letterContent.innerHTML = sanitizeText(cfg.letter_message);
  }
  
  // Update footer (using textContent for plain text names)
  const footerNote = document.querySelector('.footer-note');
  if (footerNote) {
    footerNote.textContent = `With love from ${cfg.your_name} for ${cfg.partner_name}.`;
  }
  
  // Update polaroid images if URLs provided
  // Only replaces the ones provided - rest keep default imgs/p1.png etc.
  if (cfg.polaroid_urls && cfg.polaroid_urls.length > 0) {
    cfg.polaroid_urls.forEach((url, index) => {
      if (index < 6 && url && url.trim()) {
        const polaroid = document.querySelector(`.polaroid.p${index + 1} img`);
        if (polaroid) {
          polaroid.src = url;
          polaroid.alt = `Polaroid ${index + 1}`;
        }
      }
    });
    // Note: Polaroids p{n} where n > polaroid_urls.length will keep default imgs/p{n}.png
  }
  
  // Update page title
  document.title = `For ${cfg.partner_name} ❤️`;
  
  console.log('Config applied:', cfg.partner_name);
  return true;
}

/**
 * Hide the main countdown sections for main-only page
 */
function setupPageType(pageType) {
  if (pageType === 'main_only') {
    // Hide countdown days - keep only Valentine's Day section
    const daySections = document.querySelectorAll('.day-section:not(.hero)');
    daySections.forEach(section => {
      // Check if this is NOT the Valentine's Day final section
      const dayTitle = section.getAttribute('data-day-title');
      if (dayTitle && dayTitle !== "Happy Valentine's Day") {
        section.style.display = 'none';
        // Also hide the blend after it
        const nextBlend = section.nextElementSibling;
        if (nextBlend && nextBlend.classList.contains('section-blend')) {
          nextBlend.style.display = 'none';
        }
      }
    });
    
    // Hide hero section too for main-only
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.display = 'none';
      const nextBlend = hero.nextElementSibling;
      if (nextBlend && nextBlend.classList.contains('section-blend')) {
        nextBlend.style.display = 'none';
      }
    }
  }
}

/**
 * Initialize the config loader
 */
async function initValentineConfig() {
  const valentineId = getValentineId();
  const urlPageType = getPageType(); // What URL says (/v/ or /m/)
  
  // Show loading state
  document.body.classList.add('config-loading');
  
  // Fetch config from database
  const config = await fetchValentineConfig(valentineId);
  
  // If no config found, show error page and stop
  if (!config) {
    console.warn('No config found for this ID');
    showErrorPage();
    return;
  }
  
  // SECURITY: Enforce product_type from DATABASE, not URL
  // If someone paid for 'main_only' but visits /v/, they still only get main_only
  const paidProductType = config.product_type || 'full';
  
  // If they paid for main_only but are trying to access full (/v/)
  if (paidProductType === 'main_only' && urlPageType === 'full') {
    console.warn('Access denied: Customer paid for main_only, redirecting...');
    // Redirect to correct URL
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/v\//, '/m/');
    if (newPath !== currentPath) {
      window.location.replace(newPath + window.location.search);
      return; // Stop execution, page will redirect
    }
  }
  
  // Apply config - if it fails (missing required fields), error page is shown
  const success = applyConfig(config);
  if (!success) return;
  
  // Use the PAID product type, not URL
  setupPageType(paidProductType);
  
  // Remove loading state
  document.body.classList.remove('config-loading');
  document.body.classList.add('config-loaded');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initValentineConfig);
} else {
  initValentineConfig();
}

// Export for manual use if needed
window.ValentineConfig = {
  init: initValentineConfig,
  getValentineId,
  getPageType,
  fetchConfig: fetchValentineConfig,
  applyConfig
};
