"use client";
import { useState } from "react";
import Image from "next/image";
import UnknowAva from "../public/assets/DefAva.png";

const ProfilePage: React.FC = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [username, setUsername] = useState("Неизвестное имя");
  const [nickname, setNickname] = useState("Неизвестный ник");
  const [role, setRole] = useState("Ученик");
  const [isEditing, setIsEditing] = useState(false);
  const [portfolio, setPortfolio] = useState<File | null>(null);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAvatar(event.target.files[0]);
    }
  };

  const handlePortfolioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPortfolio(event.target.files[0]);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex">
      <div className="w-[310px] h-screen bg-[#606C38] p-4">
        <h2 className="text-white text-xl">Меню</h2>
      </div>
      <div className="ml-[250px] p-8 w-full">
        <div className="flex flex-col items-start">
          <div className="relative w-[325px] h-[325px] mb-4">
            <Image
              src={avatar ? URL.createObjectURL(avatar) : UnknowAva}
              alt="Avatar"
              layout="fill"
              objectFit="cover"
              className="rounded-full cursor-pointer transition-transform transform duration-200 hover:scale-105 hover:blur ml-[-10px]"
              onClick={() => document.getElementById('avatar-input')?.click()}
            />
            <input
              type="file"
              id="avatar-input"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
          {isEditing ? (
            <>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 w-[250px] rounded-lg mb-2"
                placeholder="Введите имя пользователя"
              />
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="border p-2 w-[250px] rounded-lg mb-2"
                placeholder="Введите ник"
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border p-2 w-[250px] rounded-lg mb-4"
              >
                <option value="Ученик">Ученик</option>
                <option value="Учитель">Учитель</option>
                <option value="Родитель">Родитель</option>
              </select>
            </>
          ) : (
            <>
              <p className="border p-2 w-[250px] rounded-lg mb-2 text-left">{username}</p>
              <p className="border p-2 w-[250px] rounded-lg mb-2 text-left">{nickname}</p>
              <p className="border p-2 w-[250px] rounded-lg mb-4 text-left">{role}</p>
            </>
          )}
          <button
            className="w-[300px] bg-white border border-[#606C38] text-[#606C38] py-2 rounded-lg hover:bg-[#606C38] hover:text-white transition-colors mb-4"
            onClick={handleEditToggle}
          >
            {isEditing ? "Сохранить настройки" : "Редактировать"}
          </button>
          {/* Блок портфолио в правом верхнем углу */}
          <div className="absolute right-40 w-400">
            <h3 className="text-lg">Портфолио:</h3>
            <div className="relative">
              {!portfolio ? (
                <>
                  <p className="text-gray-600">Вы еще не загрузили портфолио.</p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handlePortfolioChange}
                    className="mt-2"
                  />
                </>
              ) : (
                <>
                  <a
                    href={URL.createObjectURL(portfolio)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500"
                  >
                    {portfolio.name}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
        <p className="mt-4 text-center">Связаться для трудоустройства</p>
      </div>
    </div>
  );
};

export default ProfilePage;