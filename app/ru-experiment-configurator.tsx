"use client";

import { useState } from "react";
import { CodeBlock } from "./code-block";

const sampleRemote = JSON.stringify({ ru_pay: true, experiment_code: "fixture-paywall", segment_code: "a" }, null, 2);
const catalog = [
  { id: "basic", sku: "fixture.basic", section: "subscriptions", label: "Базовая подписка", default: true },
  { id: "plus", sku: "fixture.plus", section: "subscriptions", label: "Расширенная подписка", default: false },
  { id: "plus-copy", sku: "fixture.plus", section: "subscriptions", label: "Ещё одна строка того же SKU", default: false },
  { id: "tokens", sku: "fixture.tokens", section: "tokens", label: "Пакет токенов", default: true },
  { id: "offer", sku: "fixture.offer", section: "specialOffer", label: "Оффер · isSpecialOffer", default: true },
];

function validCode(value: unknown): value is string {
  if (typeof value !== "string" || value.trim() !== value || /[\p{Cc}\p{Cf}]/u.test(value)) return false;
  const count = [...new Intl.Segmenter("ru", { granularity: "grapheme" }).segment(value)].length;
  return count > 0 && count <= 64;
}

function remoteRUGate(remote: Record<string, unknown>) {
  const values = ["ru_pay", "pay", "russian_payment", "ru_billing"].filter((key) => key in remote).map((key) => remote[key]);
  return values.length > 0 && values.every((value) => value === true || value === 1 || (typeof value === "string" && ["1", "true", "yes", "y", "on"].includes(value.trim().toLowerCase())));
}

export function RUExperimentConfigurator() {
  const [enabled, setEnabled] = useState(true);
  const [fresh, setFresh] = useState(true);
  const [deviceRU, setDeviceRU] = useState(true);
  const [storefrontRU, setStorefrontRU] = useState(false);
  const [remoteText, setRemoteText] = useState(sampleRemote);
  const [idsText, setIDsText] = useState("fixture.plus");
  const [defaults, setDefaults] = useState(true);
  const [section, setSection] = useState("subscriptions");
  const [response, setResponse] = useState("match");
  const [method, setMethod] = useState("code");

  let remote: Record<string, unknown> = {};
  let jsonError = false;
  try {
    const parsed: unknown = JSON.parse(remoteText);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) jsonError = true;
    else remote = parsed as Record<string, unknown>;
  } catch { jsonError = true; }
  const validMetadata = validCode(remote.experiment_code) && validCode(remote.segment_code);
  const ruGate = fresh && remoteRUGate(remote) && (deviceRU || storefrontRU);
  const route = !enabled || !ruGate ? "adapty" : validMetadata ? "backend" : "none";
  const candidates = catalog.filter((row) => row.section === section);
  const ids = idsText.split(/[\s,]+/).filter(Boolean);
  const matched = candidates.filter((row) => ids.some((id) => id === row.id || id === row.sku));
  const missing = ids.filter((id) => !candidates.some((row) => id === row.id || id === row.sku));
  const defaultRows = defaults ? candidates.filter((row) => row.default) : [];
  const selected = matched.length ? matched : defaultRows.length ? defaultRows : candidates;
  const reason = matched.length ? "Совпадения с placement" : defaultRows.length ? "Резервный набор isDefault" : "Весь раздел: прежний fallback";
  const shownCode = response === "mismatch" ? "stored-b" : String(remote.segment_code ?? "");
  const isMismatch = response === "mismatch" && remote.segment_code !== "stored-b";
  const status = route === "adapty"
    ? enabled ? "RU-gate закрыт. Показ отправляется в Adapty." : "Tracker не подключён. Работает прежний lifecycle Adapty."
    : route === "none" ? "RU-gate открыт, но коды невалидны. Отчёт эксперимента пропускается."
    : response === "assign-error" ? "Assign не удался. Paywall-shown не отправляется; экран продолжает работать."
    : response === "shown-error" ? "Назначение получено, отправка показа не удалась. Повтор — при следующем открытии."
    : isMismatch ? `Показ учитывается в stored-b. На экране остаётся вариант ${String(remote.segment_code)} из Adapty; расхождение нужно проверить.`
    : "Assign → paywall-shown. Один показ учитывается на backend RU Billing.";
  const code = method === "code" ? `// В существующем composition root
${enabled ? `let experiments = ruFactory.makeExperimentTracker(
    configuration: .broadApps
)` : "// Без optional tracker остаётся прежний lifecycle."}

let adaptyFactory = AdaptyMonetizationFactory(
    configuration: adaptyConfiguration,
    identityProvider: identityProvider,
    placementRegistry: placementRegistry,
    messages: messages,
    context: adaptyContext${enabled ? ",\n    ruBillingExperiments: experiments" : ""}
)

// Для существующего UI backend-каталога
let selection = RUExperimentCatalogSelector().select(
    productIDs: paywall.products.map(\\.productID),
    in: fullBackendCatalog,
    kind: .${section}
)` : `Подключи opt-in RU Billing A/B из BroadMonetization 1.4.1.
Прочитай руководство модуля Documentation/RUBillingExperiments.md
и текущий AppIntegrationPlan. Сначала проверь существующие RU-gate,
доказательство свежести, авторизацию checkout, endpoints, matching ID
и старые A/B callbacks. Недостающий backend-контракт вынеси на review.
После принятия этапа подключи один tracker; замени старую отправку,
сохрани обычную оплату. Selector подключи только к backend RU UI.
Проверь disabled, defaults, ошибки, reopen и смену аккаунта.
Продолжай по staged workflow host repository.`;

  return <section className="ru-ab-lab" aria-label="Проверка конфигурации RU Billing A/B">
    <div className="ru-ab-lab-heading"><span>ИНТЕРАКТИВНЫЙ ПРИМЕР</span><p>Все данные здесь учебные. Выберите условия вашего сценария и посмотрите результат.</p></div>
    <div className="ru-ab-controls">
      <fieldset><legend>1. Подключение и RU-gate</legend>
        <label><input type="checkbox" checked={enabled} onChange={(event) => setEnabled(event.target.checked)} /> Подключён optional tracker</label>
        <label><input type="checkbox" checked={fresh} onChange={(event) => setFresh(event.target.checked)} /> Свежесть payload подтверждена</label>
        <label><input type="checkbox" checked={deviceRU} onChange={(event) => setDeviceRU(event.target.checked)} /> Регион iPhone — RU</label>
        <label><input type="checkbox" checked={storefrontRU} onChange={(event) => setStorefrontRU(event.target.checked)} /> Текущий Storefront — RU</label>
        <small>Стандартный SDK callback не доказывает свежесть. Здесь вы задаёте условие примера вручную.</small>
      </fieldset>
      <fieldset><legend>2. Remote Config варианта</legend>
        <label htmlFor="ru-ab-remote">Учебный JSON</label>
        <textarea id="ru-ab-remote" spellCheck={false} rows={6} value={remoteText} onChange={(event) => setRemoteText(event.target.value)} aria-invalid={jsonError || !validMetadata} />
        <small>{jsonError ? "Нужен корректный JSON-объект." : validMetadata ? "Коды корректны: строки по 1–64 символа." : "Нужны experiment_code и segment_code: непустые строки по 1–64 символа."}</small>
        <button type="button" className="ru-ab-text-button" onClick={() => setRemoteText(sampleRemote)}>Вернуть пример JSON</button>
      </fieldset>
    </div>
    <fieldset className="ru-ab-products"><legend>3. Явный выбор backend-продуктов</legend>
      <div className="ru-ab-controls">
        <label>Раздел<select value={section} onChange={(event) => setSection(event.target.value)}>
          <option value="subscriptions">Обычные подписки</option><option value="tokens">Токены</option><option value="specialOffer">Special Offer</option>
        </select></label>
        <label>ID продуктов placement<input value={idsText} onChange={(event) => setIDsText(event.target.value)} placeholder="Например, fixture.plus" /></label>
      </div>
      <label><input type="checkbox" checked={defaults} onChange={(event) => setDefaults(event.target.checked)} /> Backend возвращает isDefault у резервных продуктов</label>
      <div className="ru-ab-catalog">
        <div><h3>Полный каталог · {catalog.length} строк</h3>{catalog.map((row) => <div className="ru-ab-row" key={row.id}><code>{row.id}</code><span>{row.label}</span>{defaults && row.default ? <b>default</b> : null}</div>)}</div>
        <div><h3>Набор для RU UI · {selected.length}</h3><p>{reason}</p>{selected.map((row) => <div className="ru-ab-row selected" key={row.id}><code>{row.id}</code><span>{row.label}</span></div>)}{missing.length ? <p className="ru-ab-missing">Не совпали: {missing.join(", ")}</p> : null}</div>
      </div>
      <small>Выбор выполняется отдельно от tracker. Исходный каталог сохранён. Строки plus и plus-copy имеют один SKU — обе остаются в результате.</small>
    </fieldset>
    <label className="ru-ab-response">4. Ответ backend<select value={response} onChange={(event) => setResponse(event.target.value)}>
      <option value="match">Assign и shown успешны</option><option value="mismatch">Backend уже назначил stored-b</option><option value="assign-error">Ошибка assign</option><option value="shown-error">Ошибка paywall-shown</option>
    </select></label>
    <div className={`ru-ab-result ${route}`} role="status"><strong>{status}</strong><p>{route === "backend" && response !== "assign-error" ? `segmentCode показа: ${shownCode}. ` : ""}Повторные callbacks одного открытия не создают новую попытку. Закрыли и открыли снова — новый presentationID.</p><small>Backend-вызовы здесь не выполняются. Таймаут RU-отчёта не переключает показ в Adapty.</small></div>
    <div className="ru-ab-method" role="group" aria-label="Способ подключения"><button type="button" aria-pressed={method === "code"} onClick={() => setMethod("code")}>Подключить кодом</button><button type="button" aria-pressed={method === "agent"} onClick={() => setMethod("agent")}>Задание для агента</button></div>
    <CodeBlock code={code} language={method === "code" ? "swift" : "text"} />
    <p className="ru-ab-footnote">Код использует объекты вашего composition root. Выбор условий в примере не сохраняет настройки приложения.</p>
  </section>;
}
