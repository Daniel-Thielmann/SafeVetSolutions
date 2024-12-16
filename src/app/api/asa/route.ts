import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = cookies().get('token');

    if (!token) {
      return NextResponse.json({ error: "Token não encontrado" }, { status: 401 });
    }

    const route = axios.create({
      baseURL: "https://sistema-safevet-hom.codejr.com.br/api",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    const response = await route.get("/user/asa/quiz");

    return NextResponse.json(response.data, { status: 200 });
    
  } catch (err: any) {
    const status = err.response ? err.response.status : 500;
    return NextResponse.json({
      quiz: { id: 0, title: "", created_at: "", updated_at: "" },
      questions: [],
      status: status,
      error: err.message || 'Erro desconhecido'
    }, { status });
  }
}