import Form from "@/components/Form";
import { prisma } from "@/lib/prisma";
const bookPage = async () => {
  const books = await prisma.book.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <Form />

      <h1>รายการหนังสือ</h1>

      {books.length === 0 ? (
        <p>ไม่มีหนังสือ</p>
      ) : (
        <ul>
          {books.map((Book) => (
            <li key={Book.id}>
              <p className="font-semibold">ชื่อหนังสือ: {Book.title}</p>
              <p>ราคา: {Book.price.toLocaleString("th-TH")} บาท</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default bookPage;