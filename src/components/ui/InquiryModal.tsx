"use client";


// InquiryModal — "Request to Book" form, modeled on the FISR.com right-rail
// inquiry pattern. Opens as a centered dialog with a darkened backdrop;
// collects Name, Email, Phone, Dates Requested; POSTs to /api/inquiry.
//
// Currently the API route just logs the submission. Once Sydney confirms the
// destination inbox, the route swaps to a transactional email send.

import { useEffect, useId, useState } from "react";


type Props = {
	open: boolean;
	onClose: () => void;
	propertySlug?: string;
	propertyName?: string;
};


const INPUT =
	"h-12 w-full border border-brand-blue/30 bg-white px-4 font-sans text-[15px] text-brand-blue outline-none transition focus:border-brand-blue placeholder:text-brand-blue/50";


export default function InquiryModal({ open, onClose, propertySlug, propertyName }: Props) {
	const nameId = useId();
	const emailId = useId();
	const phoneId = useId();
	const datesId = useId();

	const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
	const [error, setError] = useState<string | null>(null);

	// Two-stage mount so the modal can animate in AND out. `render` keeps the
	// node in the DOM long enough for the exit transition to play.
	const [render, setRender] = useState(false);
	const [shown, setShown] = useState(false);

	useEffect(() => {
		if (open) {
			setRender(true);
			// Double rAF so the browser actually paints the initial (opacity-0,
			// scale-95) frame before we flip into the shown state — single rAF
			// gets batched with the same render and the transition is skipped.
			let inner = 0;
			const outer = requestAnimationFrame(() => {
				inner = requestAnimationFrame(() => setShown(true));
			});
			return () => {
				cancelAnimationFrame(outer);
				if (inner) cancelAnimationFrame(inner);
			};
		}
		setShown(false);
		const t = setTimeout(() => setRender(false), 300);
		return () => clearTimeout(t);
	}, [open]);

	// Freeze the body in place with position:fixed (preserving the current
	// scroll Y as a negative offset). This is the only approach that
	// reliably prevents wheel events from chaining through to the page
	// underneath. `scrollbar-gutter: stable` on html (globals.css) keeps the
	// page width steady so fixed elements like the nav don't shift.
	useEffect(() => {
		if (!render) return;
		const scrollY = window.scrollY;
		const body = document.body;
		const prev = {
			position: body.style.position,
			top: body.style.top,
			left: body.style.left,
			right: body.style.right,
			width: body.style.width,
		};
		body.style.position = "fixed";
		body.style.top = `-${scrollY}px`;
		body.style.left = "0";
		body.style.right = "0";
		body.style.width = "100%";
		return () => {
			body.style.position = prev.position;
			body.style.top = prev.top;
			body.style.left = prev.left;
			body.style.right = prev.right;
			body.style.width = prev.width;
			window.scrollTo(0, scrollY);
		};
	}, [render]);

	// Close on Escape.
	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);

	// Reset status whenever the modal opens fresh.
	useEffect(() => {
		if (open) {
			setStatus("idle");
			setError(null);
		}
	}, [open]);

	if (!render) return null;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const data = new FormData(form);
		setStatus("sending");
		setError(null);

		try {
			const res = await fetch("/api/inquiry", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: data.get("name"),
					email: data.get("email"),
					phone: data.get("phone"),
					dates: data.get("dates"),
					propertySlug,
					propertyName,
				}),
			});
			if (!res.ok) {
				const j = await res.json().catch(() => ({}));
				throw new Error((j as { error?: string }).error ?? `HTTP ${res.status}`);
			}
			setStatus("ok");
			form.reset();
		} catch (err) {
			setStatus("error");
			setError(err instanceof Error ? err.message : "Something went wrong");
		}
	};

	return (
		<div
			role="dialog"
			aria-modal="true"
			aria-labelledby="inquiry-title"
			data-shown={shown}
			className="fixed inset-0 z-[100] flex items-end justify-center bg-black/55 p-0 opacity-0 transition-opacity duration-300 ease-out data-[shown=true]:opacity-100 sm:items-center sm:p-6"
			onClick={(e) => {
				if (e.target === e.currentTarget) onClose();
			}}
		>
			<div
				data-shown={shown}
				className="relative w-full max-w-[480px] origin-center translate-y-12 bg-[#fffbf8] p-6 opacity-0 shadow-2xl transition-all duration-300 ease-out data-[shown=true]:translate-y-0 data-[shown=true]:opacity-100 sm:translate-y-0 sm:scale-95 sm:p-8 sm:data-[shown=true]:scale-100"
			>
				<button
					type="button"
					aria-label="Close"
					onClick={onClose}
					className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center text-brand-blue transition hover:bg-brand-blue/10"
				>
					<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M18 6 6 18M6 6l12 12" />
					</svg>
				</button>

				<p className="font-sans text-[12px] font-medium uppercase tracking-[0.22em] text-brand-blue">
					Request to Book
				</p>
				<h2 id="inquiry-title" className="mt-2 font-script text-[32px] leading-[1.1] text-brand-blue md:text-[36px]">
					{propertyName ? `Inquire about ${propertyName}` : "Tell us about your stay"}
				</h2>
				<p className="mt-2 font-sans text-[14px] text-brand-blue/80">
					We&apos;ll reply within one business day to confirm availability.
				</p>

				{status === "ok" ? (
					<div className="mt-6 border border-brand-blue/30 bg-white p-5 text-center">
						<p className="font-script text-[26px] leading-tight text-brand-blue">Thank you!</p>
						<p className="mt-2 font-sans text-[14px] text-brand-blue/80">
							Your request is in. We&apos;ll be in touch shortly.
						</p>
						<button
							type="button"
							onClick={onClose}
							className="mt-5 bg-brand-orange px-6 py-2 font-sans text-[14px] font-medium uppercase tracking-wider text-white transition hover:brightness-95"
						>
							Close
						</button>
					</div>
				) : (
					<form className="mt-5 flex flex-col gap-3" onSubmit={handleSubmit}>
						<label htmlFor={nameId} className="sr-only">Name</label>
						<input id={nameId} name="name" required placeholder="Full name" className={INPUT} />

						<label htmlFor={emailId} className="sr-only">Email</label>
						<input id={emailId} name="email" type="email" required placeholder="Email address" className={INPUT} />

						<label htmlFor={phoneId} className="sr-only">Phone</label>
						<input id={phoneId} name="phone" type="tel" placeholder="Phone number" className={INPUT} />

						<label htmlFor={datesId} className="sr-only">Dates requested</label>
						<input id={datesId} name="dates" placeholder="Dates requested (e.g. Jul 14 – Jul 21)" className={INPUT} />

						{error && (
							<p className="font-sans text-[13px] text-red-600">{error}</p>
						)}

						<button
							type="submit"
							disabled={status === "sending"}
							className="mt-2 cursor-pointer bg-brand-orange px-6 py-3 font-sans text-[15px] font-medium uppercase tracking-wider text-white transition hover:brightness-95 disabled:cursor-progress disabled:opacity-70"
						>
							{status === "sending" ? "Sending…" : "Send Request"}
						</button>
					</form>
				)}
			</div>
		</div>
	);
}
