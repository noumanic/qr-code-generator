// DOM Elements
const urlInput = document.getElementById('url-input');
const generateBtn = document.getElementById('generate-btn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const results = document.getElementById('results');
const qrPreviewImg = document.getElementById('qr-preview-img');
const generatedUrl = document.getElementById('generated-url');
const generateAnotherBtn = document.getElementById('generate-another-btn');
// State
let currentDownloads = {};

// Event Listeners
generateBtn.addEventListener('click', handleGenerate);
generateAnotherBtn.addEventListener('click', handleGenerateAnother);
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleGenerate();
    }
});


// Screen reader announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// URL validation
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Show/hide elements
function showElement(element) {
    element.classList.remove('hidden');
}

function hideElement(element) {
    element.classList.add('hidden');
}

function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    showElement(error);
    hideElement(loading);
    hideElement(results);
    
    // Announce error to screen readers
    announceToScreenReader(`Error: ${message}`);
    
    // Focus on error message for keyboard users
    error.focus();
}

function hideError() {
    hideElement(error);
}

// Handle generate button click
async function handleGenerate() {
    const url = urlInput.value.trim();
    
    // Validate input
    if (!url) {
        showError('Please enter a URL');
        return;
    }
    
    if (!isValidUrl(url)) {
        showError('Please enter a valid URL (e.g., https://example.com)');
        return;
    }
    
    // Show loading state
    hideError();
    hideElement(results);
    showElement(loading);
    
    // Disable generate button
    generateBtn.disabled = true;
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    
    try {
        const response = await fetch('/api/generate-qr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to generate QR code');
        }
        
        // Store downloads for later use
        currentDownloads = data.downloads;
        
        // Show results
        displayResults(data);
        
    } catch (err) {
        console.error('Error generating QR code:', err);
        showError(err.message || 'Failed to generate QR code. Please try again.');
    } finally {
        // Re-enable generate button
        generateBtn.disabled = false;
        generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate QR Code';
        hideElement(loading);
    }
}

// Display results
function displayResults(data) {
    // Update preview
    qrPreviewImg.src = data.preview;
    qrPreviewImg.alt = `QR Code for ${data.url}`;
    
    // Update generated URL
    generatedUrl.textContent = data.url;
    
    // Update download cards
    updateDownloadCards(data.downloads);
    
    // Show results with animation
    showElement(results);
    results.classList.add('success-animation');
    
    // Announce success to screen readers
    announceToScreenReader(`QR code generated successfully for ${data.url}`);
    
    // Focus on results for keyboard users
    results.focus();
    
    // Scroll to results
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Update download cards
function updateDownloadCards(downloads) {
    Object.keys(downloads).forEach(format => {
        const download = downloads[format];
        const card = document.querySelector(`[data-format="${format}"]`);
        const sizeElement = document.getElementById(`${format}-size`);
        const downloadBtn = card.querySelector('.download-btn');
        
        if (download.error) {
            // Show error state
            card.classList.add('error');
            sizeElement.textContent = 'Error';
            downloadBtn.disabled = true;
            downloadBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
        } else {
            // Show success state
            card.classList.remove('error');
            sizeElement.textContent = formatFileSize(download.size);
            downloadBtn.disabled = false;
            downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download';
            
            // Add click handler
            downloadBtn.onclick = () => downloadFile(download.downloadUrl, format);
        }
    });
}

// Download file
function downloadFile(url, format) {
    const link = document.createElement('a');
    link.href = url;
    link.download = `qr-code.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Handle generate another button
function handleGenerateAnother() {
    // Clear input
    urlInput.value = '';
    urlInput.focus();
    
    // Hide results and error
    hideElement(results);
    hideError();
    
    // Reset state
    currentDownloads = {};
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Focus on input when page loads
        urlInput.focus();
        
        // Add input validation feedback
        urlInput.addEventListener('input', function() {
            const url = this.value.trim();
            if (url && !isValidUrl(url)) {
                this.style.borderColor = 'var(--error-color)';
            } else {
                this.style.borderColor = 'var(--gray-200)';
            }
        });
        
        // Add smooth scrolling for better UX
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error initializing page:', error);
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to generate
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleGenerate();
    }
    
    // Escape to clear and focus input
    if (e.key === 'Escape') {
        handleGenerateAnother();
    }
});

// Add copy URL functionality
function copyToClipboard(text) {
    // Immediate visual feedback
    const originalText = generatedUrl.textContent;
    
    // Add copying class and show immediate feedback
    generatedUrl.classList.add('copying');
    generatedUrl.textContent = 'Copying...';
    
    // Use modern clipboard API with fallback
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showCopySuccess(originalText);
        }).catch(() => {
            fallbackCopyTextToClipboard(text, originalText);
        });
    } else {
        fallbackCopyTextToClipboard(text, originalText);
    }
}

// Fallback copy method for older browsers
function fallbackCopyTextToClipboard(text, originalText) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(originalText);
        } else {
            showCopyError(originalText);
        }
    } catch (err) {
        showCopyError(originalText);
    }
    
    document.body.removeChild(textArea);
}

// Show copy success feedback
function showCopySuccess(originalText) {
    // Remove copying class and add copied class
    generatedUrl.classList.remove('copying');
    generatedUrl.classList.add('copied');
    generatedUrl.textContent = '✓ Copied!';
    
    // Announce to screen readers
    announceToScreenReader('URL copied to clipboard');
    
    // Reset after shorter delay for better responsiveness
    setTimeout(() => {
        generatedUrl.classList.remove('copied');
        generatedUrl.textContent = originalText;
    }, 1200);
}

// Show copy error feedback
function showCopyError(originalText) {
    // Remove copying class and add error class
    generatedUrl.classList.remove('copying');
    generatedUrl.classList.add('error');
    generatedUrl.textContent = '✗ Copy failed';
    
    // Announce to screen readers
    announceToScreenReader('Failed to copy URL to clipboard');
    
    setTimeout(() => {
        generatedUrl.classList.remove('error');
        generatedUrl.textContent = originalText;
    }, 1800);
}

// Add click to copy functionality to generated URL
generatedUrl.addEventListener('click', function() {
    try {
        copyToClipboard(this.textContent);
    } catch (error) {
        console.error('Error copying to clipboard:', error);
        showCopyError(this.textContent);
    }
});

// Add tooltip for copy functionality
generatedUrl.title = 'Click to copy URL';
generatedUrl.style.cursor = 'pointer';

