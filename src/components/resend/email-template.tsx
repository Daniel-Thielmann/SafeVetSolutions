import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface SafeVetWelcomeEmailProps {
    userFirstname: string;
    userEmail: string;
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

export const SafeVetWelcomeEmail = ({
    userFirstname,
    userEmail,
}: SafeVetWelcomeEmailProps) => (
    <Html>
        <Head />
        <Preview>
            Bem-vindo ao SafeVet, sua plataforma de segurança para pets!
        </Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src="/pata.png"
                    width="170"
                    height="100"
                    alt="SafeVet"
                    style={logo}
                />
                <Text style={paragraph}>Olá {userFirstname}, (@{userEmail})</Text>
                <Text style={paragraph}>
                Obrigado por escolher a Safevet Solutions! Estamos comprometidos em oferecer as melhores soluções para elevar a qualidade e o bem-estar na medicina veterinária.
                </Text>
                <Section style={btnContainer}>
                    <Button style={button} href="https://res.cloudinary.com/dg2i96tqh/image/upload/b_rgb:FFFFFF/v1730725782/safevet_ieeemi.webp">
                        Comece agora
                    </Button>
                </Section>
                <Text style={paragraph}>
                    Atenciosamente,
                    <br />
                    Equipe SafeVet
                </Text>
                <Hr style={hr} />
            </Container>
        </Body>
    </Html>
);

SafeVetWelcomeEmail.PreviewProps = {
    userFirstname: "Nome",
} as SafeVetWelcomeEmailProps;

export default SafeVetWelcomeEmail;

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};

const logo = {
    margin: "0 auto",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};

const btnContainer = {
    textAlign: "center" as const,
};

const button = {
    backgroundColor: "#5F51E8",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
};

const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
};
