---
---

function handleViewChange(viewType) {
  // Hide all groups
  document.getElementById('dateGroup').classList.add('d-none');
  document.getElementById('entityGroup').classList.add('d-none');
  document.getElementById('networkGroup').classList.add('d-none');

  // Show selected group
  let groupId;
  switch(viewType) {
    case 'byDate':
      groupId = 'dateGroup';
      break;
    case 'byEntity':
      groupId = 'entityGroup';
      break;
    case 'byNetwork':
      groupId = 'networkGroup';
      break;
    default:
      groupId = 'dateGroup';
  }

  document.getElementById(groupId).classList.remove('d-none');
  
  // Update URL without refreshing page
  const newPath = `${window.location.pathname.split('?')[0]}?view=${viewType}`;
  window.history.pushState({}, '', newPath);
}

// Handle initial load
document.addEventListener('DOMContentLoaded', function() {
  // Get view from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const view = urlParams.get('view');
  
  if (view) {
    // Check the appropriate radio button
    const radioButton = document.getElementById(view);
    if (radioButton) {
      radioButton.checked = true;
      handleViewChange(view);
    }
  }

  // Set up link handling
  updateLinkTargets();
  enableTooltips();
});

// Handle link targets
function updateLinkTargets() {
  document.querySelectorAll("a").forEach(link => {
    let href = link.href;
    if (/^(https?:)?\/\//.test(href)) {
      link.target = "_blank";
    }
    if (/(\.pdf$|\.png$|\.jpe*g$|\.mp4)/.test(href)) {
      link.target = "_blank";
    }
    if (link.classList.contains("new-tab")) {
      link.target = "_blank";
    }
  });
}

// Enable tooltips
function enableTooltips() {
  let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  });
}

// Copy text functionality
function copyText(text, id) {
  navigator.clipboard.writeText(text).then(function() {
    let tooltipElement = document.getElementById(id);
    let tooltip = bootstrap.Tooltip.getInstance(tooltipElement);
    tooltip.show();
    setTimeout(() => { tooltip.hide(); }, 1000);
  }, function(err) {
    console.error('Could not copy text: ', err);
  });
}
