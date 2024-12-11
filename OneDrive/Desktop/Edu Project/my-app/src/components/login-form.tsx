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

export function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    role: "",
    terms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    const { id, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.role) newErrors.role = "Please select a role.";
    if (!formData.terms) newErrors.terms = "You must accept the terms.";
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
      <Card className="mx-auto max-w-lg bg-white shadow-2xl rounded-2xl overflow-hidden animate-fade-in">
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
                  className={`border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 ${
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
                    className="text-sm text-blue-500 underline hover:text-blue-600"
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
                  className={`border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 ${
                      errors.password ? "border-red-500 animate-shake" : "border-gray-300"
                  }`}
              />
              {errors.password && (
                  <p className="text-sm text-red-500 font-medium">{errors.password}</p>
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
                      className="focus:ring-blue-400"
                  />
                  <span className="text-gray-700">Обучающийся</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                      type="radio"
                      id="role"
                      name="role"
                      value="teacher"
                      onChange={handleChange}
                      className="focus:ring-blue-400"
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
                      className="focus:ring-blue-400"
                  />
                  <span className="text-gray-700">Работодатель</span>
                </label>
              </div>
              {errors.role && (
                  <p className="text-sm text-red-500 font-medium">{errors.role}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                  id="terms"
                  checked={formData.terms}
                  onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
                  className={`focus:ring-blue-400 ${
                      errors.terms ? "border-red-500 animate-shake" : "border-gray-300"
                  }`}
              />
              <label
                  htmlFor="terms"
                  className="text-sm text-gray-700 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Подтверждаю согласие на пользование
              </label>
            </div>
            {errors.terms && (
                <p className="text-sm text-red-500 font-medium">{errors.terms}</p>
            )}
            <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg shadow-md font-semibold text-lg"
            >
              Логин
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-700">
            Уже есть аккаунт?{" "}
            <Link href="/sign-in" className="underline text-blue-500 hover:text-blue-600">
              Вход
            </Link>
          </div>
        </CardContent>
      </Card>
  );
}