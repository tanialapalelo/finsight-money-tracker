"use client";

import { Input } from "@/components/ui/input";
import { CurrencyInputProps } from "@/types";

export const CurrencyInput = ({
    value,
    onChange,
    currencySymbol = "Rp.",
    placeholder = "0",
}: CurrencyInputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^\d]/g, "");
        onChange(raw);
    };

    return (
        <div className="relative w-full input-class">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">
                {currencySymbol}
            </span>
            <Input
                className="pl-10" // space for the prefix
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                type="text"
                inputMode="numeric"
            />
        </div>
    );
};
