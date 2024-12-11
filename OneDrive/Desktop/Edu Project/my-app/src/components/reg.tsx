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
    name: string;
};

type FormErrors = {
    email?: string;
    password?: string;
    role?: string;
    terms?: string;
    name?: string;
};

export function Reg() {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        role: "",
        terms: false,
        name: "",
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
        if (!formData.email) newErrors.email = "Введите Gmail";
        if (!formData.password) newErrors.password = "Введите пароль";
        if (!formData.name) newErrors.name = "Введите ваше ФИО";
        if (!formData.role) newErrors.role = "Укажите роль";
        if (!formData.terms) newErrors.terms = "Подтвердите условия пользования";
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
                    <CardTitle className="text-4xl text-gray-800 font-extrabold">Регистрация</CardTitle>
                    <CardDescription className="text-gray-600 mt-2">
                        Введите данные, чтобы создать аккаунт
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
                                className={`border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-[96,108,56] ${
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
                                className={`border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-[96,108,56] ${
                                    errors.password ? "border-red-500 animate-shake" : "border-gray-300"
                                }`}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500 font-medium">{errors.password}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-gray-700 text-lg font-medium">ФИО</Label>
                            </div>
                            <Input
                                id="search"
                                type="search"
                                placeholder=""
                                onChange={handleChange}
                                className={`border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-[96,108,56] ${
                                    errors.name ? "border-red-500 animate-shake" : "border-gray-300"
                                }`}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500 font-medium">{errors.name}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="role" className="text-gray-700 text-lg font-medium">Выберите роль</Label>
                            <div className="flex justify-between">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        id="role"
                                        name="role"
                                        value="student"
                                        onChange={handleChange}
                                        className="focus:ring-[96,108,56]"
                                    />
                                    <span className="text-gray-700">Студент</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        id="role"
                                        name="role"
                                        value="teacher"
                                        onChange={handleChange}
                                        className="focus:ring-[96,108,56]"
                                    />
                                    <span className="text-gray-700">Преподаватель</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        id="role"
                                        name="role"
                                        value="employer"
                                        onChange={handleChange}
                                        className="focus:ring-[96,108,56]"
                                    />
                                    <span className="text-gray-700">Работодатель</span>
                                </label>
                            </div>
                            {errors.role && (
                                <p className="text-sm text-red-500 font-medium">{errors.role}</p>
                            )}
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms"/>
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Принять условия и положения
                            </label>
                        </div>
                        {errors.terms && (
                            <p className="text-sm text-red-500 font-medium">{errors.terms}</p>
                        )}
                        <Button
                            type="submit"
                            className="w-full bg-[#606c38] hover:bg-[#708638] text-white py-3 rounded-xl shadow-md font-semibold text-lg"
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                    <div className="mt-6 text-center text-sm text-gray-700">
                        У вас уже есть аккаунт?{" "}
                        <Link href="/sign-in" className="underline text-[#606c38] hover:text-[#606c38]">
                            Войти
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
