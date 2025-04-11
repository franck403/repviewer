document.addEventListener('DOMContentLoaded', () => {
  const downloadBtn = document.getElementById('downloadBtn');
  const platformSelect = document.getElementById('platformSelect');
  const versionInfo = document.getElementById('versionInfo');
  let currentVersion = '';

  async function fetchLatestVersion() {
    try {
      const proxyUrl = 'https://static.geoloup.com/repviewer/updates/latest.yml';
      const response = await fetch(proxyUrl);
      const yamlContent = await response.text();
      console.log(yamlContent)
      // Extract version using regex
      const versionMatch = yamlContent.match(/version: (.+)/);
      if (versionMatch && versionMatch[1]) {
        currentVersion = versionMatch[1];
        versionInfo.textContent = `Version ${currentVersion}`;
        return currentVersion;
      } else {
        throw new Error('Version not found in YAML');
      }
    } catch (error) {
      console.error('Error fetching version:', error);
      versionInfo.textContent = 'Error loading version';
      return null;
    }
  }

  downloadBtn.addEventListener('click', () => {
    const platform = platformSelect.value;
    
    if (platform === 'windows' && currentVersion) {
      const downloadUrl = `https://static.geoloup.com/repviewer/updates/RepViewer Setup ${currentVersion}.exe`;
      window.location.href = downloadUrl;
    } else {
      alert('This platform is not yet supported. Please check back later!');
    }
  });

  platformSelect.addEventListener('change', (e) => {
    const platform = e.target.value;
    downloadBtn.disabled = platform !== 'windows';
    if (platform !== 'windows') {
      downloadBtn.style.opacity = '0.5';
      downloadBtn.style.cursor = 'not-allowed';
    } else {
      downloadBtn.style.opacity = '1';
      downloadBtn.style.cursor = 'pointer';
    }
  });

  // Fetch version when page loads
  fetchLatestVersion();
});