# Hosted WordPress performance check

**Captured October 29, 2026 at 1:09 PM CDT.** BlueRoof 0.2.0 was measured on a hosted WordPress test installation after the three-photo slider and sample review section were added. The internal test address is omitted from this public record. Uncropped screenshots and complete Lighthouse HTML and JSON reports are retained in the private theme repository.

| Lighthouse profile | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile | 100 | 100 | 100 | 69 | 1.2 s | 1.5 s | 0 ms | 0 |
| Desktop | 100 | 100 | 100 | 69 | 0.4 s | 0.4 s | 0 ms | 0 |

![Mobile Lighthouse report, internal address cropped](screenshots/2026-10-29T13-09-CDT_mobile-lighthouse.png)

![Desktop Lighthouse report, internal address cropped](screenshots/2026-10-29T13-09-CDT_desktop-lighthouse.png)

The final reports used Lighthouse 12.8.2 and Headless Chromium 156. Mobile used an emulated Moto G Power with simulated Slow 4G. These are anonymous initial page-load lab runs. Before the final check, three mobile Performance runs scored 99, 100, and 100; three desktop runs scored 100 each. A missing site icon was then fixed and both final Best Practices scores reached 100.

The test site deliberately includes `noindex, nofollow`. Lighthouse's only failed SEO audit was the resulting indexing block. It should be removed when a production site is ready for search. The exact hosting plan and server resource limits were not independently measured. Lab scores do not represent field Core Web Vitals, concurrency, or uptime.

The [October 28 baseline](../2026-10-28/README.md) predates the slider and review layout. Its scores remain available as a dated earlier build.
