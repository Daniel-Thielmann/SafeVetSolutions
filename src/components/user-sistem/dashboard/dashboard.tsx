"use client";

import { LockKeyhole } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import ModalCadeado from "../modal/modal-cadeado";
import LogoutButtom from "@/components/logoutButtom";



type ApiResponseSchema = {
  dashboard: {
    asa: boolean;
    courses: boolean;
    consultancies: boolean;
    manuals: boolean;
    ebooks: boolean;
    certificates: boolean;
    purchases: boolean,
  };
  status: number;
};


type DashboardCardProps = {
  title: string;
  image: string;
  href: string;
  isLocked?: boolean;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  image,
  href,
  isLocked,
}) => {
  const buttons = [{ text: "Ir para loja", href: "/store/ebooks" }];
  const imagePath = `/dashboard/${image}.png`;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="h-full w-full">
      {isModalOpen && (
        <ModalCadeado
          title="Conteúdo Bloqueado"
          paragraph={
            title === 'asa'
              ? `Você não possui certificação ${title} ainda`
              : `Você não possui ${title} ainda`
          }
          buttons={buttons}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
      {isLocked ? (
        <div
          className="bg-[#1C275F] h-full w-full text-white p-3 rounded-md shadow-md flex items-center justify-between hover:bg-[#3f4d94] cursor-pointer z-10"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex items-center gap-4">
            <img src={imagePath} alt={title} className="rounded-md" />
            <h2 className="text-lg">{title}</h2>
          </div>
          <LockKeyhole size={24} className="text-lg" />
        </div>
      ) : (
        <Link
          href={href}
          className="bg-[#1C275F] h-full text-white p-3 rounded-md shadow-md flex items-center justify-between hover:bg-[#3f4d94] cursor-pointer z-10"
        >
          <div className="flex items-center gap-4">
            <img src={imagePath} alt={title} className="rounded-md" />
            <h2 className="text-lg">{title}</h2>
          </div>
        </Link>
      )}
    </div>
  );
};

export default function Dashboard({ dashboard }: { dashboard: ApiResponseSchema | null }) {
  const dashboardItems = [
    {
      title: "asa",
      image: "1",
      href: "/dashboard/asa",
      isLocked: !dashboard?.dashboard.asa,
    },
    {
      title: "cursos",
      image: "2",
      href: "/dashboard/courses",
      isLocked: !dashboard?.dashboard.courses,
    },
    {
      title: "consultorias",
      image: "3",
      href: "/dashboard/consultancies",
      isLocked: !dashboard?.dashboard.consultancies,
    },
    {
      title: "certificados",
      image: "4",
      href: "/dashboard/certificates",
      isLocked: !dashboard?.dashboard.certificates,
    },
    {
      title: "manuais",
      image: "5",
      href: "/dashboard/manuals",
      isLocked: !dashboard?.dashboard.manuals,
    },
    {
      title: "ebooks",
      image: "6",
      href: "/dashboard/e-books",
      isLocked: !dashboard?.dashboard.ebooks,
    },
    {
      title: "compras realizadas",
      image: "7",
      href: "/dashboard/purchases-made",
      isLocked: !dashboard?.dashboard.purchases,
    },
    {
      title: "meu perfil",
      image: "8",
      href: "/dashboard/my-profile",
      isLocked: false,
    },
  ];

  return (
    <div>
      {dashboard ? (
        <div className="flex flex-col justify-center items-center font-manilla gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full w-11/12 xl:w-3/5">
            {dashboardItems.map((item, index) => (
              <DashboardCard
                key={index}
                href={item.href}
                isLocked={item.isLocked}
                title={item.title}
                image={item.image}
              />
            ))}
          </div>
          <div className="flex flex-row-reverse h-full w-11/12 xl:w-3/5">
            <LogoutButtom />
          </div>
        </div>
      ) : (
        <div>Houve um erro!</div>
      )}
    </div>
  );
}
