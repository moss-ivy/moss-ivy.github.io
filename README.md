# Dobiasova Design — Webové Portfolio (moss-ivy.github.io)

Oficiální statické portfolio pro **Ivanu Dobiášovou (Dobiasova Design)** – multidisciplinární designérku fyzických produktů, vytvořené speciálně pro běh na **GitHub Pages**.

---

## 🎨 Vizuální identita a barvy

Web využívá přesnou paletu z dodaného grafického návrhu:
- **Hlavní pozadí**: Hluboká vínová (`#501526`)
- **Karta About**: Pudrově růžová (`#e29aa7`)
- **Karta Collaboration**: Šalvějově zelená (`#9fb399`)
- **Karta Get in touch / Contact**: Lesní mechová zeleň (`#3e5b46`)
- **Tlačítka a detaily**: Bílý kontrastní pilulkový tvar s vysokým kontrastem splňujícím přístupnost **WCAG AAA / AA**.

---

## 🌐 Dvojjazyčný systém (EN / CS)

Web je plně dvojjazyčný:
- **Výchozí jazyk**: Angličtina (`EN`)
- **Čeština**: Přepínatelná jedním kliknutím přes tlačítko `[ EN | CS ]` v pravém horním rohu navigace.
- Volba jazyka se automaticky ukládá do prohlížeče (`localStorage`).
- Web podporuje také přímé odkazy v češtině pomocí parametru v adrese: `?lang=cs` (např. `moss-ivy.github.io?lang=cs`).
- Všechny texty jsou přehledně uloženy v souboru [assets/js/i18n.js](assets/js/i18n.js), kde je můžete kdykoliv snadno editovat.

---

## 📁 Struktura souborů

```
moss-ivy.github.io/
├── index.html               # Hlavní stránka (Full-width Hero banner + 2x2 vizuální karty)
├── about.html               # O mně (Designová filosofie, disciplíny, příběh)
├── shop.html                # Obchod & Edice (Fyzické produkty, vázy, svítidla, poptávka)
├── collaboration.html       # Možnosti spolupráce (4 modely, tvůrčí proces)
├── contact.html             # Kontakt (Formulář, e-mail, sociální sítě)
├── projects.html            # Portfolio vybraných děl (Filtrování dle oborů)
├── assets/
│   ├── css/
│   │   └── style.css        # Kompletní styly, barvy, responzivita a přístupnost
│   ├── js/
│   │   ├── i18n.js          # Dvojjazyčné texty (EN / CS)
│   │   └── main.js          # Mobilní menu, slider, interaktivita
│   └── images/
│       ├── vase.svg         # Azurová žebrovaná váza
│       ├── chandelier.svg   # Orbitální svítidlo
│       ├── planter.svg      # Parametrický stojánek
│       ├── chair.svg        # Sochařské křeslo
│       ├── hero-1.svg       # Banner 1
│       ├── hero-2.svg       # Banner 2
│       ├── hero-3.svg       # Banner 3
│       ├── jewelry.svg      # Šperk
│       └── graphic.svg      # Vizuální design
└── README.md
```

---

## 🚀 Jak publikovat změny přes GitHub Desktop

1. Otevřete aplikaci **GitHub Desktop**.
2. V seznamu změn vlevo uvidíte všechny nově vytvořené a upravené soubory.
3. Vlevo dole napište do pole *Summary* zprávu (např. `Initial design portfolio`).
4. Klikněte na modré tlačítko **Commit to main** (nebo *Commit to master*).
5. Nahoře klikněte na tlačítko **Push origin**.
6. Váš web bude během 1–2 minut dostupný na adrese:  
   👉 **https://moss-ivy.github.io/**

*(Pokud ještě nemáte v repozitáři na GitHubu zapnuté GitHub Pages, stačí jít na GitHub.com do repozitáře → Settings → Pages → vybrat Branch: `main` / root a uložit).*

---

## 📸 Jak vyměnit obrázky za vlastní fotografie

Kdykoliv budete chtít nahradit vektorové grafiky skutečnými fotografiemi z ateliéru:
1. Vložte fotografie do složky `assets/images/` (např. `vase.jpg`, `chair.jpg`).
2. V příslušném HTML souboru (`index.html`, `shop.html` atd.) změňte příponu u tagu `src="..."` (např. z `assets/images/vase.svg` na `assets/images/vase.jpg`).
3. Commitněte a pushněte přes GitHub Desktop.
