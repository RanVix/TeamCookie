"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type FormData = {
    email: string;
    password: string;
    role: string;
    terms: boolean;
};

type FormErrors = {
    email?: string;
    password?: string;
    role?: string;
    terms?: string;
};

export function Login() {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        role: "",
        terms: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});

    // handleChange for input types (including checkbox)
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement> // strictly handle ChangeEvent for input elements
    ) => {
        const { id, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const validate = () => {
        const newErrors: FormErrors = {};
        if (!formData.email) newErrors.email = "Подтвердите Gmail";
        if (!formData.password) newErrors.password = "Подтвердите пароль";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            console.log("Form submitted", formData);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="mx-auto max-w-lg bg-white shadow-2xl rounded-2xl overflow-hidden animate-fade-in w-full">
                <CardHeader className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 p-6">
                    <CardTitle className="text-4xl text-gray-800 font-extrabold">Вход</CardTitle>
                    <CardDescription className="text-gray-600 mt-2">
                        Введите данные, чтобы войти в систему
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-gray-700 text-lg font-medium">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className={`border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-[#606c38] ${
                                    errors.email ? "border-red-500 animate-shake" : "border-gray-300"
                                }`}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 font-medium">{errors.email}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-gray-700 text-lg font-medium">Пароль</Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-[#606c38] underline hover:text-[#606c38]"
                                >
                                    Забыли пароль?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="********"
                                value={formData.password}
                                onChange={handleChange}
                                className={`border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-[#606c38] ${
                                    errors.password ? "border-red-500 animate-shake" : "border-gray-300"
                                }`}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500 font-medium">{errors.password}</p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-[#606c38] hover:bg-[#708638] text-white py-3 rounded-xl shadow-md font-semibold text-lg"
                        >
                            Логин
                        </Button>
                    </form>
                    <div className="mt-6 text-center text-sm text-gray-700">
                        Нет аккаунта?{" "}
                        <Link href="/sign-up" className="underline text-[#606c38] hover:text-[#606c38]">
                            Регистрация
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
