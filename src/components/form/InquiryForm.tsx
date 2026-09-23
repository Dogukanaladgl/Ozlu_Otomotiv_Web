"use client";

import {
  useActionState,
  useId,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import {
  submitInquiry,
  type InquiryActionState,
} from "@/app/actions/inquiry";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const initialState: InquiryActionState = { status: "idle" };

const maxMb = Math.round(siteConfig.inquiry.maxImageBytes / (1024 * 1024));

export function InquiryForm() {
  const [instance, setInstance] = useState(0);

  return (
    <InquiryFormFields
      key={instance}
      onStartNew={() => setInstance((value) => value + 1)}
    />
  );
}

function InquiryFormFields({ onStartNew }: { onStartNew: () => void }) {
  const [state, formAction, pending] = useActionState(
    submitInquiry,
    initialState,
  );
  const [clientImageError, setClientImageError] = useState<string | null>(
    null,
  );
  const formErrorId = useId();

  function onImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      setClientImageError(null);
      return;
    }
    if (file.size > siteConfig.inquiry.maxImageBytes) {
      setClientImageError(`Görsel en fazla ${maxMb} MB olabilir.`);
      event.target.value = "";
      return;
    }
    if (
      !siteConfig.inquiry.acceptedImageTypes.includes(
        file.type as (typeof siteConfig.inquiry.acceptedImageTypes)[number],
      )
    ) {
      setClientImageError("Yalnızca JPG, PNG veya WEBP görseller kabul edilir.");
      event.target.value = "";
      return;
    }
    setClientImageError(null);
  }

  if (state.status === "success") {
    return (
      <div
        className="rounded-lg border border-success/30 bg-success-soft p-6"
        role="status"
        aria-live="polite"
      >
        <h2 className="font-display text-xl font-bold text-success">
          Sorgunuz alındı
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {state.message}
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-5"
          onClick={onStartNew}
        >
          Yeni sorgu gönder
        </Button>
      </div>
    );
  }

  const fieldError = (key: keyof NonNullable<InquiryActionState["errors"]>) =>
    state.errors?.[key];

  return (
    <form
      action={formAction}
      className="space-y-5"
      noValidate
      aria-describedby={
        state.status === "error" || state.status === "validation"
          ? formErrorId
          : undefined
      }
    >
      {(state.status === "error" || state.status === "validation") && (
        <div
          id={formErrorId}
          role="alert"
          className="rounded-md border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger"
        >
          {state.message}
        </div>
      )}

      <div
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Field
        id="brand"
        label="Araç markası"
        error={fieldError("brand")}
        required
      >
        <select
          id="brand"
          name="brand"
          required
          defaultValue=""
          className={inputClass(!!fieldError("brand"))}
          aria-invalid={!!fieldError("brand")}
          aria-describedby={
            fieldError("brand") ? "brand-error" : "brand-help"
          }
        >
          <option value="" disabled>
            Seçiniz
          </option>
          {siteConfig.inquiry.acceptedBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        <p id="brand-help" className="mt-1.5 text-xs text-muted">
          Şu an Hyundai ve Kia için parça sorgusu kabul ediyoruz.
        </p>
      </Field>

      <Field
        id="model"
        label="Araç modeli"
        error={fieldError("model")}
        required
      >
        <input
          id="model"
          name="model"
          type="text"
          required
          autoComplete="off"
          placeholder="Örn. i20, Sportage"
          className={inputClass(!!fieldError("model"))}
          aria-invalid={!!fieldError("model")}
          aria-describedby={fieldError("model") ? "model-error" : undefined}
        />
      </Field>

      <Field
        id="vin"
        label="Şasi / VIN numarası"
        error={fieldError("vin")}
        required
      >
        <input
          id="vin"
          name="vin"
          type="text"
          required
          autoComplete="off"
          spellCheck={false}
          className={inputClass(!!fieldError("vin"))}
          aria-invalid={!!fieldError("vin")}
          aria-describedby={fieldError("vin") ? "vin-error" : "vin-help"}
        />
        <p id="vin-help" className="mt-1.5 text-xs text-muted">
          Doğru parçayı eşleştirmek için şasi numarası önemlidir. Ruhsat veya
          araç kimlik plakasından bulabilirsiniz.
        </p>
      </Field>

      <Field
        id="part"
        label="İstenen parça"
        error={fieldError("part")}
        required
      >
        <textarea
          id="part"
          name="part"
          required
          rows={4}
          placeholder="Örn. ön sağ far, debriyaj seti, sağ ön kapı"
          className={cn(inputClass(!!fieldError("part")), "resize-y")}
          aria-invalid={!!fieldError("part")}
          aria-describedby={fieldError("part") ? "part-error" : undefined}
        />
      </Field>

      <Field
        id="phone"
        label="Telefon numarası"
        error={fieldError("phone")}
        required
      >
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="05XX XXX XX XX"
          className={inputClass(!!fieldError("phone"))}
          aria-invalid={!!fieldError("phone")}
          aria-describedby={
            fieldError("phone") ? "phone-error" : "phone-help"
          }
        />
        <p id="phone-help" className="mt-1.5 text-xs text-muted">
          Sizi arayabilmemiz için ulaşılabilir bir numara yazın.
        </p>
      </Field>

      <Field
        id="image"
        label="Parça / araç görseli (isteğe bağlı)"
        error={clientImageError || fieldError("image")}
      >
        <input
          id="image"
          name="image"
          type="file"
          accept={siteConfig.inquiry.acceptedImageTypes.join(",")}
          onChange={onImageChange}
          className="block w-full text-sm text-muted file:mr-3 file:rounded-md file:border-0 file:bg-ink file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-ink-soft"
          aria-invalid={!!(clientImageError || fieldError("image"))}
          aria-describedby={
            clientImageError || fieldError("image")
              ? "image-error"
              : "image-help"
          }
        />
        <p id="image-help" className="mt-1.5 text-xs text-muted">
          JPG, PNG veya WEBP. En fazla {maxMb} MB.
        </p>
      </Field>

      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Gönderiliyor…" : "Sorguyu Gönder"}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string | null;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required ? (
          <span className="text-accent" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-md border bg-white px-3 py-2.5 text-sm text-ink shadow-sm outline-none transition-colors",
    "placeholder:text-muted/70 focus:border-steel focus:ring-2 focus:ring-focus/30",
    hasError ? "border-danger" : "border-line",
  );
}
