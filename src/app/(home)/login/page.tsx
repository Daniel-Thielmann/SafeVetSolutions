import LoginCard from "@/components/user-sistem/login/login";

export default function LoginPage() {
    return (
        <main className="relative bg-[#F2F7FB] fonts-class min-h-screen overflow-hidden">
            <div className="flex flex-row justify-center items-center space-y-2">
                <h1 className="flex items-center justify-center text-[#1C275F] text-3xl lg:text-5xl" style={{ fontFamily: "var(--font-bunken)" }}>
                    Safe
                </h1>
                <h1 className="flex items-center justify-center text-[#1C275F] text-3xl lg:text-5xl" style={{ fontFamily: "var(--font-manilla)" }}>
                    Vet
                </h1>
            </div>
            <h2 className="flex items-center justify-center text-[#1C275F] text-3xl lg:text-5xl mb-10" style={{ fontFamily: "var(--font-bunken)" }}>
                Login
            </h2>
            <LoginCard />
        </main>
    );
}
