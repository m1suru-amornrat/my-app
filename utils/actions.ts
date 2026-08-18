"use server"

// type form_data = {
//     title: string;
//     price: number;
// }

// const data : form_data ={
//     title: "Nodejs",
//     price: 200
// }

import {prisma} from "@/lib/prisma";
import {revalidatePath} from "next/cache";

// export const createBook = async (_prevState, formData) => {
export const createBook = async (_prevState : string | null, formData: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("formData", formData);

    const title = String(formData.get("title") ?? "").trim();
    const price = Number(formData.get("price"));

    if(!title || !Number.isInteger(price) || price <= 0) {
        return "กรุณากรอกข้อมูลให้ถูกต้อง";
    }

    await prisma.book.create({
        data: {
            title,
            price,
        }
    });

    revalidatePath("/book");

    return "Book created successfully";
}