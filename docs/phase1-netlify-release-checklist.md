# Jasmine Phase 1 — Netlify release checklist

This PR changes source code only. Do not merge until the preview is reviewed.

## Before merge (Netlify site owner)
- Confirm the Netlify site is linked to `rongilles01-design/jasminehomecare` and production branch is `main`.
- In **Forms**, select **Enable form detection** if the option appears. Forms detection must be enabled when the updated HTML is deployed.
- Inspect the Deploy Preview on both mobile and desktop: menu, fixed Call Now / Get a Quote actions, form fields, gallery filters, image fallbacks and thank-you page. Confirm the mobile bar does not hide content.
- Review the revised privacy notice to ensure it matches actual customer-data practices. Ask the business owner to confirm text.
- Review all site changes in the PR and approve before merge.

## After merge and successful production deploy
1. In Netlify **Forms**, check that **jasmine-quote** appears in Active forms and **Extra spam prevention** reports the honeypot. Netlify also applies Akismet spam filtering by default.
2. In **Forms → Submission notifications**, add an **email notification** to `Info@jasminehomecare.net` for the **jasmine-quote** form, and save. This dashboard step is **not** configured by GitHub code.
3. Confirm `Info@jasminehomecare.net` is a functional mailbox and check its spam folder.
4. Submit ONE test inquiry using non-sensitive test information and your own email, then verify ALL of:
   - Browser reaches `/thank-you.html` after submission.
   - Submission appears in **Forms → jasmine-quote → Verified submissions**.
   - Notification arrives at the mailbox. If it doesn't, inspect Netlify notification settings and spam folder.
5. Check spam prevention state in the Netlify form detail page.
6. Test with a real iPhone/Android viewport and an actual telephone; verify taps on Call Now and Get a Quote.
7. Check desktop layout, keyboard navigation, and the contact page with JavaScript disabled (native form submission must still work).
8. Watch Forms usage and any plan quotas; upgrade only if needed.
9. If there's a serious issue, use Netlify deployment rollback and revisit the PR changes.

## Code/behavior notes
- Form is plain HTML: name `jasmine-quote`, `data-netlify="true"`, POST, and action `/thank-you.html`.
- Netlify's static HTML processing injects the hidden `form-name` field during deployment.
- Honeypot: `netlify-honeypot="bot-field"` and matching hidden field. No captcha dependency.
- The browser no longer launches a mail app or relies on JavaScript to submit inquiries.
- No card data or other sensitive personal details should be requested.
- The thank-you page is marked `noindex`.
- No automatic live-domain test or dashboard configuration has been performed by this PR.
