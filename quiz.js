<script>
(function () {
  function text(n){return (n||'').trim().toLowerCase();}

  function checkSingle(div) {
    const correct = div.dataset.correct;
    const chosen = div.querySelector('input[type=radio]:checked');
    const fb = div.querySelector('.quiz-feedback');
    if (!chosen) { fb.textContent = 'Bitte eine Antwort wählen.'; return; }
    fb.textContent = (chosen.value === correct) ? 'Richtig!' : 'Leider falsch.';
  }

  function checkMulti(div) {
    const correct = (div.dataset.correct || '').split(',').map(s=>s.trim()).filter(Boolean).sort().join(',');
    const chosen = Array.from(div.querySelectorAll('input[type=checkbox]:checked')).map(i=>i.value).sort().join(',');
    const fb = div.querySelector('.quiz-feedback');
    if (!chosen) { fb.textContent = 'Bitte mindestens eine Antwort wählen.'; return; }
    fb.textContent = (chosen === correct) ? 'Richtig!' : 'Nicht ganz. Prüfe deine Auswahl.';
  }

  function checkShort(div) {
    const answers = (div.dataset.answers || '').split(';').map(text).filter(Boolean);
    const val = text(div.querySelector('.quiz-input').value);
    const fb = div.querySelector('.quiz-feedback');
    if (!val) { fb.textContent = 'Bitte eine Antwort eingeben.'; return; }
    fb.textContent = answers.includes(val) ? 'Richtig!' : 'Leider nicht korrekt.';
  }

  function onClick(e) {
    if (!e.target.classList.contains('quiz-check')) return;
    const div = e.target.closest('.quiz');
    if (div.classList.contains('mcq')) return checkSingle(div);
    if (div.classList.contains('mcq-multi')) return checkMulti(div);
    if (div.classList.contains('short-answer')) return checkShort(div);
  }

  document.addEventListener('click', onClick);
})();
</script>