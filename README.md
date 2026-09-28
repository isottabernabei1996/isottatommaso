# Isotta & Tommaso

Sito mobile-first ispirato alla location di Suvereto, in Toscana, in HTML/CSS/JavaScript, con autenticazione server-side tramite Cloudflare Pages Functions e RSVP tramite Formspree.

## Anteprima
Installare Node.js, quindi dalla cartella eseguire `npx wrangler pages dev public`. Per testare il login creare `.dev.vars` (non caricarlo online):
```
LOGIN_PASSWORD=una-password-lunga
SESSION_SECRET=una-stringa-casuale-di-almeno-32-caratteri
```

## Fotografie
Aggiungere `public/assets/hero.jpg` e `public/assets/location.jpg`. Sostituire i quattro placeholder della galleria in `index.html` con immagini reali.

## RSVP
1. Creare un form su Formspree.
2. Copiare l'endpoint assegnato.
3. In `public/index.html` sostituire `https://formspree.io/f/INSERIRE_ID_FORMSPREE` con l'endpoint reale.
4. Impostare nel pannello Formspree l'email di notifica. Le risposte vengono salvate nel pannello ed esportate.
5. Inserire l'informativa privacy, un contatto e il periodo di conservazione.

## Pubblicazione su Cloudflare Pages
1. Caricare questa cartella in un repository GitHub privato.
2. Cloudflare > Workers & Pages > Create > Pages > Connect to Git.
3. Framework preset: `None`; build command vuoto; output directory: `public`.
4. Dopo il primo deploy: Settings > Variables and Secrets. Aggiungere come secret `LOGIN_PASSWORD` e `SESSION_SECRET`.
5. Eseguire un nuovo deploy e provare login, logout, navigazione e RSVP.

La password non è nel frontend. La Function la verifica sul server e crea un cookie firmato `HttpOnly`, `Secure`, `SameSite=Lax`, valido 30 giorni.

## Dominio, HTTPS ed email
Nel brief compaiono due domini diversi: `isottaetommaso.it` e `isottatommaso.it`. Verificare quello acquistato. Il codice funziona con entrambi.

1. Aggiungere il dominio come zona in Cloudflare.
2. Prima di cambiare nameserver, copiare tutti i record email del provider: MX, SPF, DKIM, DMARC ed eventuali record `mail`, `autodiscover`, `autoconfig`.
3. Nel registrar impostare i nameserver assegnati da Cloudflare.
4. Workers & Pages > progetto > Custom domains > Set up a domain. Inserire il dominio esatto.
5. Aggiungere eventualmente `www` e reindirizzarlo al dominio principale.
6. Non eliminare o modificare i record email. I record web e mail convivono.
7. Cloudflare Pages emette il certificato HTTPS per il dominio associato. Quando è attivo, abilitare SSL/TLS `Full` e `Always Use HTTPS`.

## Informazioni ancora necessarie
- dominio esatto;
- data, termine RSVP e orari;
- nome preciso della location, indirizzo, testo e link Google Maps;
- conferma della fotografia hero preferita tra quelle fornite;
- indicazioni auto/treno, parcheggio e navetta;
- hotel/B&B/appartamenti, distanze, link e convenzioni;
- dress code e piano pioggia;
- FAQ e contatto organizzativo;
- fotografie e testo della storia;
- eventuale lista nozze;
- informativa privacy;
- endpoint Formspree e email destinataria.
