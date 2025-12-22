// Code block copy button with language indicator
document.addEventListener('DOMContentLoaded', () => {
  const codeBlocks = document.querySelectorAll('pre.astro-code');
  
  codeBlocks.forEach((block) => {
    // Skip if already processed
    if (block.querySelector('.code-toolbar')) return;
    
    // Get language from data attribute or class
    const codeElement = block.querySelector('code');
    const language = block.getAttribute('data-language') || 
                     codeElement?.getAttribute('data-language') || 
                     block.className.match(/language-(\w+)/)?.[1] || 
                     'code';
    
    // Make the pre block relative for positioning
    block.style.position = 'relative';
    
    // Create toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'code-toolbar';
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Mobile: large padding
      toolbar.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(8px); z-index: 10;';
    } else {
      // Desktop: compact padding
      toolbar.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; display: flex; align-items: center; justify-content: space-between; padding: 6px 8px; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(8px); z-index: 10;';
    }
    
    // Language label
    const langLabel = document.createElement('span');
    const fontSize = isMobile ? '12px' : '10px';
    langLabel.style.cssText = `font-size: ${fontSize}; font-weight: 500; color: rgba(255, 255, 255, 0.8); text-transform: uppercase; letter-spacing: 0.5px;`;
    langLabel.textContent = language;
    
    // Copy button container
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = 'display: flex; align-items: center;';
    
    // Copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-button';
    const iconSize = isMobile ? '16' : '14';
    copyButton.style.cssText = 'background: none; border: none; cursor: pointer; padding: 0; display: flex; align-items: center; position: relative;';
    copyButton.innerHTML = `
      <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="color: rgba(255, 255, 255, 0.8);">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
      </svg>
    `;
    
    // Tooltip
    const tooltip = document.createElement('span');
    tooltip.style.cssText = 'position: absolute; bottom: -32px; right: 0; background: rgba(0, 0, 0, 0.9); color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 0.2s;';
    tooltip.textContent = 'Copy';
    copyButton.appendChild(tooltip);
    
    // Show tooltip on hover
    copyButton.addEventListener('mouseenter', () => {
      tooltip.style.opacity = '1';
    });
    
    copyButton.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
    
    // Copy functionality
    copyButton.addEventListener('click', async () => {
      const code = codeElement?.textContent || block.textContent || '';
      
      try {
        await navigator.clipboard.writeText(code);
        
        // Change to checkmark
        copyButton.innerHTML = `
          <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="color: #10b981;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        `;
        
        // Update tooltip
        const newTooltip = document.createElement('span');
        newTooltip.style.cssText = tooltip.style.cssText;
        newTooltip.style.opacity = '1';
        newTooltip.textContent = 'Copied!';
        copyButton.appendChild(newTooltip);
        
        // Reset after 2 seconds
        setTimeout(() => {
          copyButton.innerHTML = `
            <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="color: rgba(255, 255, 255, 0.8);">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
          `;
          copyButton.appendChild(tooltip);
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
    
    toolbar.appendChild(langLabel);
    buttonContainer.appendChild(copyButton);
    toolbar.appendChild(buttonContainer);
    
    // Add padding to top of code block
    block.style.paddingTop = isMobile ? '48px' : '40px';
    block.insertBefore(toolbar, block.firstChild);
  });
});
