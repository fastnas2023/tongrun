document.querySelectorAll('[data-product-showcase]').forEach(showcase => {
  const tabs = [...showcase.querySelectorAll('[data-product-tab]')];
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
  let active = 0;

  function selectTab(index) {
    if (index === active) return;
    tabs[active].setAttribute('aria-selected', 'false');
    tabs[active].tabIndex = -1;
    panels[active].hidden = true;
    active = index;
    tabs[active].setAttribute('aria-selected', 'true');
    tabs[active].tabIndex = 0;
    panels[active].hidden = false;
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(index));
    tab.addEventListener('keydown', event => {
      const directions = {
        ArrowRight: (index + 1) % tabs.length,
        ArrowLeft: (index + tabs.length - 1) % tabs.length,
        Home: 0,
        End: tabs.length - 1,
      };
      const next = directions[event.key];
      if (next === undefined) return;
      event.preventDefault();
      selectTab(next);
      tabs[next].focus({ preventScroll: true });
    });
  });
});
