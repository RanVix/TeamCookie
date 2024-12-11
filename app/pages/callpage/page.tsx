"use client";
import Link from 'next/link';
import Image from "next/image";

import Phone from "../../../public/assets/phone.png"
import Cam from "../../../public/assets/cam.png"
import micro from "../../../public/assets/micro.png"

export default function Page() {
    return(
        <div className='flex'>
            <div className="w-[310px] bg-[#606C38] p-4 bg-opacity-55 fixed h-full">
            <Link href="/">
                <button className="text-white text-xl hover:cursor-pointer">Тут будет меню</button>
            </Link>
            </div>
            <div className='relative mt-[50px] ml-[500px] w-[1300px] h-[750px] bg-slate-300 border rounded-lg justify-between'></div>
            <div className=' absolute bg-[#606C38] w-[250px] h-[60px] rounded-3xl  mt-[840px] ml-[1025px] bg-opacity-70'>
            <Image
                src={Cam.src}
                alt="Cam"
                objectFit="cover"
                className="absolute cursor-pointer ml-[27px] mt-[18px] transition-transform transform duration-200 hover:scale-110"
                width={34}
                height={23}
            />
            <div className='absolute bg-red-600 h-[60px] w-[60px] rounded-full ml-[90px] cursor-pointer transition-transform transform duration-200 hover:scale-110'>
            <Image
                  src={Phone.src}
                  alt="Phone"
                  objectFit="cover"
                  className="cursor-pointer pt-[16px] ml-[15px]"
                  width={25}
                  height={25}
                />
            </div>
            <Image
                src={micro.src}
                alt="Cam"
                objectFit="cover"
                className="absolute cursor-pointer ml-[177px] mt-[12px] transition-transform transform duration-200 hover:scale-110"
                width={36}
                height={micro.height}
            />
            </div>
        </div>
    )
}