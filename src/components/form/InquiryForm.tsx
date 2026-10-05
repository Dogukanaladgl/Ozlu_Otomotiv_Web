"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  submitInquiry,
  type InquiryActionState,
} from "@/app/actions/inquiry";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { compressImage } from "@/lib/compress-image";
import { partDescriptionMaxLength } from "@/lib/validation";
import { cn } from "@/lib/cn";

const initialState: InquiryActionState = { status: "idle" };

const maxMb = Math.round(siteConfig.inquiry.maxImageBytes / (1024 * 1024));

type AcceptedImageType =
  (typeof siteConfig.inquiry.acceptedImageTypes)[number];

export function InquiryForm() {
  const [instance, setInstance] = useState(0);
  const [notice, setNotice] = useState<"success" | "error" | null>(null);

  return (
    <>
      <InquiryFormFields
        key={instance}
        onSuccess={() => {
          setNotice("success");
          setInstance((value) => value + 1);
        }}
        onSendError={() => setNotice("error")}
      />
      {notice ? (
        <ResultDialog kind={notice} onClose={() => setNotice(null)} />
      ) : null}
    </>
  );
}

function InquiryFormFields({
  onSuccess,
  onSendError,
}: {
  onSuccess: () => void;
  onSendError: () => void;
}) {
  const [state, setState] = useState<InquiryActionState>(initialState);
  const [pending, setPending] = useState(false);
  const [clientImageError, setClientImageError] = useState<string | null>(
    null,
  );
  const [imageName, setImageName] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [partLength, setPartLength] = useState(0);
  const [formStartedAt] = useState(() => String(Date.now()));
  const imageInputRef = useRef<HTMLInputElement>(null);
  const acceptedFileRef = useRef<File | null>(null);
  const formErrorId = useId();

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  function setInputFile(file: File | null) {
    const input = imageInputRef.current;
    if (!input) return;
    if (!file) {
      input.value = "";
      return;
    }
    const transfer = new DataTransfer();
    transfer.items.add(file);
    input.files = transfer.files;
  }

  function acceptImage(file: File) {
    if (file.size > siteConfig.inquiry.maxImageBytes) {
      setInputFile(acceptedFileRef.current);
      setClientImageError(`Görsel en fazla ${maxMb} MB olabilir.`);
      return;
    }
    if (
      !siteConfig.inquiry.acceptedImageTypes.includes(
        file.type as AcceptedImageType,
      )
    ) {
      setInputFile(acceptedFileRef.current);
      setClientImageError("Yalnızca JPG, PNG veya WEBP görseller kabul edilir.");
      return;
    }

    setInputFile(file);
    acceptedFileRef.current = file;
    setClientImageError(null);
    setImageName(file.name);
    setImagePreview(URL.createObjectURL(file));
  }

  function onImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    acceptImage(file);
  }

  function onDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragOver(true);
  }

  function onDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragOver(false);
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) acceptImage(file);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const formData = new FormData(event.currentTarget);
    const requiredMessage = "Bu alanın doldurulması zorunludur.";
    const requiredFields = ["brand", "model", "vin", "phone", "part"] as const;
    const missing = requiredFields.filter(
      (name) => !String(formData.get(name) ?? "").trim(),
    );
    if (missing.length > 0) {
      setState({
        status: "validation",
        message: "Lütfen zorunlu alanları doldurun.",
        errors: Object.fromEntries(
          missing.map((name) => [name, requiredMessage]),
        ),
      });
      document.getElementById(missing[0])?.focus();
      return;
    }
    setPending(true);
    try {
      const image = formData.get("image");
      if (image instanceof File && image.size > 0) {
        formData.set("image", await compressImage(image));
      }
      const result = await submitInquiry(state, formData);
      setState(result);
      if (result.status === "success") {
        onSuccess();
        return;
      }
      if (result.status === "error") {
        onSendError();
      }
    } catch {
      onSendError();
    } finally {
      setPending(false);
    }
  }

  const fieldError = (key: keyof NonNullable<InquiryActionState["errors"]>) =>
    state.errors?.[key];
  const imageError = clientImageError || fieldError("image");

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6"
      noValidate
      aria-describedby={state.status === "validation" ? formErrorId : undefined}
    >
      <div>
        <h2 className="font-display text-2xl font-bold text-ink">
          Sorgu Formu
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Lütfen zorunlu alanları doldurun. Görsel eklemek isteğe bağlıdır.
        </p>
      </div>

      {state.status === "validation" && (
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

      <input type="hidden" name="formStartedAt" value={formStartedAt} />

      <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
        <div className="space-y-5">
          <Field
            id="brand"
            label="Araç Markası"
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
            label="Araç Modeli"
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
            label="Şasi Numarası"
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
              Şasi / VIN bilgisini ruhsat veya araç kimlik plakasından yazın.
              Boşluk ve tireler otomatik temizlenir; tam 17 karakter zorunlu
              değildir.
            </p>
          </Field>

          <Field
            id="phone"
            label="Telefon Numarası"
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
              Tarafınıza ulaşabilmemiz için lütfen bir telefon numarası belirtin.
            </p>
          </Field>
        </div>

        <div className="flex min-h-56 flex-col lg:min-h-0">
          <span
            id="image-label"
            className="mb-1.5 block text-sm font-semibold text-ink"
          >
            Görsel Ekle
          </span>
          <div
            className={cn(
              "flex min-h-56 flex-1 flex-col rounded-[var(--radius-panel)] border border-dashed bg-surface/70 transition-colors",
              dragOver
                ? "border-accent bg-accent-soft"
                : imageError
                  ? "border-danger bg-danger-soft/40"
                  : "border-steel/35",
            )}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <input
              ref={imageInputRef}
              id="image"
              name="image"
              type="file"
              accept={siteConfig.inquiry.acceptedImageTypes.join(",")}
              onChange={onImageChange}
              className="peer sr-only"
              aria-invalid={!!imageError}
              aria-labelledby="image-label"
              aria-describedby={imageError ? "image-error" : "image-help"}
            />
            <label
              htmlFor="image"
              className="flex h-full min-h-56 flex-1 cursor-pointer flex-col items-center justify-center gap-3 px-5 py-6 text-center peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt={
                    imageName
                      ? `${imageName} önizlemesi`
                      : "Seçilen görsel önizlemesi"
                  }
                  className="max-h-40 w-full rounded-lg object-contain"
                />
              ) : (
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full",
                    dragOver
                      ? "bg-white text-accent"
                      : "bg-accent-soft text-accent",
                  )}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                    <path
                      d="M4 16.5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 16V5.5M12 5.5 8.5 9M12 5.5 15.5 9"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
              <span className="text-sm font-semibold text-ink">
                {imageName ?? "Sürükleyip bırakın"}
              </span>
              <span
                id="image-help"
                className="max-w-[16rem] text-xs leading-relaxed text-muted"
              >
                {imageName
                  ? "Değiştirmek için tıklayın veya yeni bir görsel bırakın."
                  : "Tıklayınca cihazınızdan veya galeriden görsel seçebilirsiniz."}
              </span>
              <span className="mt-1 inline-flex flex-wrap items-center justify-center gap-1.5 text-[0.68rem] font-semibold tracking-[0.08em] text-steel">
                <span className="rounded-full bg-white px-2 py-0.5">JPG</span>
                <span className="rounded-full bg-white px-2 py-0.5">PNG</span>
                <span className="rounded-full bg-white px-2 py-0.5">WEBP</span>
                <span className="rounded-full bg-white px-2 py-0.5">
                  {maxMb} MB
                </span>
              </span>
            </label>
          </div>
          {imageError ? (
            <p id="image-error" className="mt-1.5 text-sm text-danger" role="alert">
              {imageError}
            </p>
          ) : null}
        </div>
      </div>

      <Field
        id="part"
        label="İstenen Parça İle İlgili Açıklama"
        error={fieldError("part")}
        required
      >
        <textarea
          id="part"
          name="part"
          required
          rows={5}
          maxLength={partDescriptionMaxLength}
          placeholder="Örn. ön sağ far, debriyaj seti, sağ ön kapı"
          className={cn(inputClass(!!fieldError("part")), "resize-y")}
          aria-invalid={!!fieldError("part")}
          aria-describedby={
            fieldError("part") ? "part-error part-count" : "part-count"
          }
          onChange={(event) => setPartLength(event.target.value.length)}
        />
        <p id="part-count" className="mt-1.5 text-right text-xs text-muted">
          {partLength} / {partDescriptionMaxLength}
        </p>
      </Field>

      <div className="flex justify-center">
        <Button type="submit" disabled={pending} className="min-w-40">
          {pending ? "Gönderiliyor…" : "Gönder"}
        </Button>
      </div>
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
    "w-full rounded-lg border bg-white px-3.5 py-3 text-base text-ink shadow-[0_1px_2px_rgb(15_26_40/0.04)] outline-none transition-[border-color,box-shadow]",
    "placeholder:text-muted/70 focus:border-steel focus:ring-2 focus:ring-focus/25",
    hasError ? "border-danger" : "border-line",
  );
}

function ResultDialog({
  kind,
  onClose,
}: {
  kind: "success" | "error";
  onClose: () => void;
}) {
  const titleId = useId();
  const success = kind === "success";

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        type="button"
        className="result-dialog-backdrop absolute inset-0 bg-ink/45"
        aria-label="Kapat"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="result-dialog panel relative w-full max-w-md p-6 text-center sm:p-8"
      >
        <div
          className={cn(
            "result-dialog__mark mx-auto flex h-14 w-14 items-center justify-center rounded-full",
            success ? "bg-success-soft text-success" : "bg-danger-soft text-danger",
          )}
          aria-hidden="true"
        >
          {success ? (
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
              <path
                d="M5 12.5 9.2 17 19 7"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
              <path
                d="M12 7.5v6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M12 17.2h.01"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
        <h2
          id={titleId}
          className="mt-5 font-display text-xl font-bold text-ink"
        >
          {success
            ? "Sorgunuz başarıyla gönderilmiştir."
            : "Form gönderilemedi."}
        </h2>
        {success ? null : (
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Lütfen formu tekrar göndermeyi deneyin.
          </p>
        )}
        <Button
          autoFocus
          type="button"
          className="mt-6"
          variant={success ? "primary" : "outline"}
          onClick={onClose}
        >
          {success ? "Tamam" : "Tekrar Dene"}
        </Button>
      </div>
    </div>
  );
}
