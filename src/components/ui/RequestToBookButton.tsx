"use client";


// Thin client wrapper that opens the inquiry modal. Lives in its own file so
// the surrounding PropertyOverview can remain a server component.

import { useState } from "react";
import InquiryModal from "@/components/ui/InquiryModal";


type Props = {
	propertySlug?: string;
	propertyName?: string;
	className?: string;
	children?: React.ReactNode;
};


export default function RequestToBookButton({
	propertySlug,
	propertyName,
	className,
	children = "Request to Book",
}: Props) {
	const [open, setOpen] = useState(false);
	return (
		<>
			<button type="button" onClick={() => setOpen(true)} className={className}>
				{children}
			</button>
			<InquiryModal
				open={open}
				onClose={() => setOpen(false)}
				propertySlug={propertySlug}
				propertyName={propertyName}
			/>
		</>
	);
}
