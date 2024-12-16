import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type ButtonProps = {
    text: string;
    href?: string;
};

type ModalProps = {
    closeModal: () => void;
    title: string;
    paragraph: string;
    buttons: ButtonProps[];
};

const ModalCadeado: React.FC<ModalProps> = ({ closeModal, title, paragraph, buttons }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleCloseModal = () => {
        setIsOpen(false);
        closeModal();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-[#F2F7FB] p-20 rounded-md shadow-md border-blue-900 border-2">
                <div className='flex justify-center'>
                     <Image
                        src="/assets/error.png"
                        alt="Error"
                        width={45}
                        height={45}
                        className=""
                    />
                </div>
                
                <p className="text-lg font-goldplayMedium">{paragraph}</p>
                <div className="flex justify-center mt-6 space-x-4 font-goldplayMedium">

                    {buttons.map((button, index) => (
                            <Link key={index} href={button.href!}>
                                <button
                                    className="px-4 py-2 bg-[#1C275F] text-white rounded-md hover:bg-[#3f4d94]"
                                    onClick={handleCloseModal} 
                                >
                                    {button.text}
                                </button>
                            </Link>
                    ))}
                <button
                                className="px-4 py-2 bg-[#1C275F] text-white rounded-md hover:bg-[#3f4d94]"
                                onClick={handleCloseModal} 
                            >
                                Fechar
                            </button>
                </div>
            </div>
        </div>
    );
};

export default ModalCadeado;
