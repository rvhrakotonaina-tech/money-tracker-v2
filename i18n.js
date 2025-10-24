(function(){
  const STORAGE_KEY = "money-tracker:i18n";
  const DICTS = {
    en: {
      app_title: "Money Tracker",
      header_title: "Money Tracker",
      theme_toggle_title: "Toggle theme",
      select_currency: "Select your currency",
      currency_placeholder: "Currency",
      currency_title: "Enter ISO currency code (e.g., USD, EUR, INR)",
      export_json: "Export JSON",
      import_json: "Import JSON",
      seed_sample: "Seed Sample",
      reset: "Reset",
      income: "Income",
      expenses: "Expenses",
      balance: "Balance",
      add_transaction: "Add Transaction",
      amount: "Amount",
      category: "Category",
      note_optional: "Note (optional)",
      add: "Add",
      filter_all: "All",
      date_col: "Date",
      type_col: "Type",
      category_col: "Category",
      note_col: "Note",
      amount_col: "Amount",
      actions_col: "Actions",
      prev: "Prev",
      next: "Next",
      monthly_income_vs_expense: "Monthly Income vs Expense",
      expense_by_category: "Expense by Category",
      edit: "Edit",
      delete: "Delete",
      other: "Other",
      tx_count_one: "1 transaction",
      tx_count_other: "{count} transactions",
      confirm_clear: "Are you sure you want to clear all transactions?",
      invalid_currency: "Invalid currency code",
      search_note: "Search note"
    },
    fr: {
      app_title: "Suivi des finances",
      header_title: "Suivi des finances",
      theme_toggle_title: "Changer le thème",
      select_currency: "Choisissez votre devise",
      currency_placeholder: "Devise",
      currency_title: "Entrez un code devise ISO (ex : USD, EUR, INR)",
      export_json: "Exporter JSON",
      import_json: "Importer JSON",
      seed_sample: "Générer un exemple",
      reset: "Réinitialiser",
      income: "Revenus",
      expenses: "Dépenses",
      balance: "Solde",
      add_transaction: "Ajouter une transaction",
      amount: "Montant",
      category: "Catégorie",
      note_optional: "Note (optionnel)",
      add: "Ajouter",
      filter_all: "Tout",
      date_col: "Date",
      type_col: "Type",
      category_col: "Catégorie",
      note_col: "Note",
      amount_col: "Montant",
      actions_col: "Actions",
      prev: "Précédent",
      next: "Suivant",
      monthly_income_vs_expense: "Revenus vs Dépenses mensuels",
      expense_by_category: "Dépenses par catégorie",
      edit: "Modifier",
      delete: "Supprimer",
      other: "Autre",
      tx_count_one: "1 transaction",
      tx_count_other: "{count} transactions",
      confirm_clear: "Voulez-vous vraiment tout effacer ?",
      invalid_currency: "Code devise invalide",
      search_note: "Rechercher une note"
    }
  };

  let current = "en";

  function format(str, params){
    if (!params) return str;
    return String(str).replace(/\{(\w+)\}/g, (_, k) => params[k] ?? "");
  }

  function t(key, params){
    const d = DICTS[current] || {};
    const val = Object.prototype.hasOwnProperty.call(d, key) ? d[key] : key;
    return typeof val === "string" ? format(val, params) : key;
  }

  function applyTranslations(){
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-attr-title], [data-i18n-attr-placeholder]')
      .forEach(el => {
        const titleKey = el.getAttribute('data-i18n-attr-title');
        const placeholderKey = el.getAttribute('data-i18n-attr-placeholder');
        if (titleKey) el.setAttribute('title', t(titleKey));
        if (placeholderKey) el.setAttribute('placeholder', t(placeholderKey));
      });
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl){ titleEl.textContent = t(titleEl.getAttribute('data-i18n')); }
  }

  function updateLangButtons(lang){
    const container = document.getElementById('langSwitch');
    if (!container) return;
    container.querySelectorAll('button[data-lang]').forEach(btn => {
      const isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('bg-slate-900', isActive);
      btn.classList.toggle('text-white', isActive);
      btn.classList.toggle('bg-white', !isActive);
      btn.classList.toggle('dark:bg-slate-700', !isActive);
      btn.classList.toggle('dark:text-slate-100', !isActive);
    });
  }

  function setLanguage(lang){
    if (!DICTS[lang]) return;
    if (lang === current) return;
    current = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
    applyTranslations();
    updateLangButtons(lang);
    document.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang } }));
  }

  function getInitialLang(){
    const urlLang = new URLSearchParams(location.search).get('lang');
    if (urlLang && DICTS[urlLang]) return urlLang;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && DICTS[saved]) return saved;
    } catch {}
    return 'en';
  }

  // Expose minimal API for app code
  window.i18n = { t, setLanguage, getLanguage: () => current };

  // Global click handler for language switch buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#langSwitch button[data-lang]');
    if (!btn) return;
    setLanguage(btn.getAttribute('data-lang'));
  });

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    current = getInitialLang();
    applyTranslations();
    updateLangButtons(current);
    document.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang: current } }));
  });
})();
