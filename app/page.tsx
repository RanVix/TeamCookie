"use client";
import { useState } from "react";
import Image from "next/image";
import UnknowAva from "../public/assets/DefAva.png";

const ProfilePage: React.FC = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [username, setUsername] = useState("Неизвестное ФИО");
  const [nickname, setNickname] = useState("Неизвестный ник");
  const [role, setRole] = useState("Ученик");
  const [isEditing, setIsEditing] = useState(false);
  const [portfolio, setPortfolio] = useState<File | null>(null);
  const [description, setDescription] = useState("");

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

  const isEmployer = role === "Работодатель";

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <div className="w-[310px] bg-[#606C38] p-4 bg-opacity-55 fixed h-full">
          <h2 className="text-white text-xl">Тут будет меню</h2>
        </div>
        <div className="flex-grow ml-[310px] p-8">
          <div className="flex">
            <div className="flex flex-col items-start">
              <div className="relative w-[275px] h-[275px] mb-4">
                <Image
                  src={avatar ? URL.createObjectURL(avatar) : UnknowAva}
                  alt="Avatar"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full cursor-pointer transition-transform transform duration-200 hover:scale-105 ml-[-10px]"
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
                    className="border p-2 w-[250px] rounded-lg mb-2 font-sans font-normal text-[#29310E] text-opacity-80"
                    placeholder="Введите имя пользователя"
                  />
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="border p-2 w-[250px] rounded-lg mb-2 font-sans font-semibold text-[#29310E] text-opacity-60"
                    placeholder="Введите ник"
                  />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="border p-2 w-[150px] rounded-lg mb-4 font-sans font-normal text-[#29310E] text-opacity-80"
                  >
                    <option value="Ученик">Ученик</option>
                    <option value="Учитель">Учитель</option>
                    <option value="Работодатель">Работодатель</option>
                  </select>
                </>
              ) : (
                <>
                  <p className="border p-2 w-[250px] rounded-lg mb-2 text-left font-sans font-normal text-[#29310E] text-opacity-80">{username}</p>
                  <p className="border p-2 w-[250px] rounded-lg mb-2 text-left font-sans font-semibold text-[#29310E] text-opacity-60">{nickname}</p>
                  <p className="border p-2 w-[250px] rounded-lg mb-4 text-left font-sans font-normal text-[#29310E] text-opacity-80">{role}</p>
                </>
              )}
              <button
                className="w-[300px] bg-white border border-[#606C38] text-[#606C38] py-2 rounded-lg hover:bg-[#606C38] hover:text-white transition-colors mb-4"
                onClick={handleEditToggle}
              >
                {isEditing ? "Сохранить настройки" : "Редактировать"}
              </button>
            </div>

            <div className="ml-24 mt-8 flex flex-col">
              <div className="mb-8">
                <h3 className="mb-2 text-[#29310E] text-opacity-80 text-xl h-20">{isEmployer ? "О компании:" : "Портфолио:"}</h3>
                <div>
                  {!portfolio ? (
                    <>
                      <p className="mt-4 font-sans font-bold text-2xl text-[#29310E] text-opacity-80 mb-4 h-20 text-center ml-20 w-30">
                        {isEmployer
                          ? "Вы еще не загрузили информацию о компании."
                          : "Вы еще не загрузили портфолио."}
                      </p>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handlePortfolioChange}
                        className="mt-2 text-[#29310E] text-opacity-80 text-lg cursor-pointer"
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

              <div className="mt-8">
                <h3 className="text-xl mb-2 text-[#29310E] text-opacity-80">Описание профиля:</h3>
                {isEditing ? (
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 w-[650px] h-[300px] rounded-lg mb-2"
                    placeholder="Введите описание вашего профиля"
                  />
                ) : (
                  <p className="border p-2 w-[400px] min-h-[150px] rounded-lg mb-2 text-left text-[#29310E] text-opacity-70">
                    {description || "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
                  </p>
                )}
              </div>
            </div>
          </div>
          <p className="mt-1 text-left w-[300px] cursor-pointer">Связаться для <u>трудоустройства</u></p>
        </div>
      </div>
      <footer className="bg-white text-[#29310E] p-4">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <p className="mb-2 text-[#59636E] font-sans">© 2024 EduConnect, Inc.</p>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline text-[#59636E] font-sans">Условия</a></li>
            <li><a href="#" className="hover:underline text-[#59636E] font-sans">Конфиденциальность</a></li>
            <li><a href="#" className="hover:underline text-[#59636E] font-sans">Документация</a></li>
            <li><a href="#" className="hover:underline text-[#59636E] font-sans">Контакты</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;

