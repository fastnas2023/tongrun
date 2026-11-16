const prepare = document.getElementById('prepare');

if (prepare) {
  const tier = prepare.querySelector('#prepare-tier');
  const extra = prepare.querySelector('#prepare-extra');
  const copy = prepare.querySelector('#prepare-copy');
  const status = prepare.querySelector('#prepare-status');
  const fallback = prepare.querySelector('#prepare-fallback');
  const output = prepare.querySelector('#prepare-output');
  const fields = [...prepare.querySelectorAll('[data-summary-label]')];
  const prompts = {
    A: '例如：优先展示哪些产品？已有规格表或产品图片吗？',
    B: '例如：已有英文品牌名、标识或目录册吗？',
    C: '例如：目前在哪些渠道推广？获客或询盘跟进卡在哪里？',
  };

  function updateTier() {
    extra.placeholder = prompts[tier.value] ?? '例如：当前最想解决的问题';
  }

  document.querySelectorAll('[data-prepare-tier]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      tier.value = link.dataset.prepareTier;
      status.textContent = '';
      fallback.hidden = true;
      updateTier();
    });
  });

  tier.addEventListener('change', updateTier);
  prepare.addEventListener('input', () => {
    status.textContent = '';
    fallback.hidden = true;
  });

  copy.addEventListener('click', async () => {
    const summary = [
      '出海合作需求摘要',
      `意向套餐：${tier.selectedOptions[0].textContent.trim()}`,
      ...fields.filter(field => field.value.trim()).map(field =>
        `${field.dataset.summaryLabel}：${field.value.trim()}`),
    ].join('\n');

    try {
      await navigator.clipboard.writeText(summary);
      fallback.hidden = true;
      status.textContent = '已复制';
    } catch {
      output.value = summary;
      fallback.hidden = false;
      status.textContent = '请手动复制下方摘要。';
      output.focus();
      output.select();
    }
  });

  updateTier();
}
