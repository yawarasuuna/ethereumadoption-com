---
---

function handleViewChange(viewType) {
  // Show entity group
  document.getElementById('entityGroup').style.display = 'block';
}

// Handle initial load
document.addEventListener('DOMContentLoaded', function() {
  // Always show entity group
  document.getElementById('entityGroup').style.display = 'block';
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
