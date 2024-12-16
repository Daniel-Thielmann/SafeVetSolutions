'use client'

import { getTheToken } from "@/auth/post-checkout/get-the-token";
import postCheckout from "@/auth/post-checkout/post-checkout";
import { CartContext, CartItem } from "@/context/cart";
import { useContext, useState } from "react";

export default function SummaryCard() {

    const cartContext = useContext(CartContext);

    const [message, setMessage] = useState<string | null>(null);
    const [cartMessage, setCartMessage] = useState<string | null>(null)

    if (!cartContext) {
        throw new Error("CartContext is not provided!");
    }

    const { count, cartItems, clearCart } = cartContext;

    const cardItemCount = count();

    const totalPrice = cartItems.reduce((accumulator, item) => {
        const price = item.product?.price !== undefined ? parseFloat(item.product.price) : 0;
        return accumulator + price;
    }, 0);

    const productIds = cartItems.map(item => item.product!.id as number);
    console.log(productIds)

    const checkout = async () => {

        try {
            console.log("entrou no try")

            const token = await getTheToken();

            console.log(token)

            if (token !== undefined) {

                const response = await postCheckout(totalPrice, productIds, token);
                const {code} = response

                if (response) {
                    setMessage(response.message);
                    console.log(message)
                }

                GenerateURIWhatsApp("5532991973007", code)
            }


        } catch (error) {
            setMessage('Erro');
            console.log(message)
        }
    }

    const baseMessage = "Olá, gostaria de fazer um pedido com os seguinte(s) produto(s)! Obrigado(a).";

    const GenerateURIWhatsApp = (phone: string, code: string) => {
        let messageURI = baseMessage;

        cartItems.forEach((item, index) => {
            if (item.product) {
                messageURI += `\n\nProduto ${index + 1}: ${item.product.title}\nValor: R$${item.product.price}`;
            }
        });

        messageURI += `\n\nTotal: R$${totalPrice.toFixed(2)}\n Código da compra: ${code}`

        const whatsappLink = `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(messageURI)}`;

        window.open(whatsappLink, "_blank");

        setCartMessage("PEDIDO FEITO COM SUCESSO")
    }

    return (
        <div>
            {cartMessage && (
                <span className="flex w-full md:rounded-3xl px-4 items-center justify-center bg-green-400 mb-3">{cartMessage}</span>
            )}

            {cartItems && cartItems.length > 0 ? (
                <div className="flex flex-col w-full h-full bg-[#C6DDED] rounded-3xl py-16 px-4 gap-8 justify-between">
                    <div className="flex flex-col">
                        <div className="flex flex-col gap-4">
                            <h1 className="font-bunken w-full text-[#192355] text-lg lg:text-2xl uppercase py-1">
                                Resumo do pedido
                            </h1>
                            <p className="font-goldplay w-full font-normal text-[#192355] text-lg">
                                Pagamento Facilitado via WhatsApp.

                                Para tornar tudo mais simples e próximo, o pagamento pelos nossos produtos e serviços é realizado diretamente via WhatsApp. Assim, garantimos um atendimento personalizado e tiramos todas as suas dúvidas na hora de concluir sua compra.

                                Entre em contato conosco pelo WhatsApp através do botão abaixo e finalize o seu pagamento de forma fácil, segura e com toda a atenção que você merece!
                            </p>
                        </div>
                        <div className="flex flex-col w-full mt-10 gap-3 py-4">
                            {cartItems.map((item: CartItem, index: number) => (
                                <div key={index} className="flex justify-between items-center border-2 border-[#A1CAE3] p-2">
                                    <span className="font-goldplay font-normal text-[#192355] text-sm lg:text-md xl:text-xl uppercase">
                                        {item.product?.title}
                                    </span>
                                    <span className="font-goldplay font-normal text-[#192355] xl:text-xl">
                                        R$ {item.product?.price}
                                    </span>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="flex justify-between items-center">
                            <h1 className="font-bunken text-center text-[#192355] text-xl xl:text-2xl whitespace-nowrap overflow-hidden uppercase py-1">
                                total
                            </h1>
                            <span className="font-goldplay font-normal text-[#192355] text-2xl lg:text-3xl">
                                R$ {totalPrice.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-[#1C275F] border-4 text-[#F2F7FB] font-goldplay hover:bg-opacity-80 px-3 py-2 text-center rounded-xl text-lg lg:text-xl transition-all w-full xl:w-2/3"
                                onClick={() => { checkout(); clearCart() }}
                            >
                                Efetuar compra
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col w-full h-full bg-[#C6DDED] md:rounded-3xl py-16 px-4 gap-8 justify-between">
                    <span>Não há produtos no carrinho</span>
                </div>
            )}

        </div>
    )
}