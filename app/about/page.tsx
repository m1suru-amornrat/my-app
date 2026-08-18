//rafce

import Counter from "@/components/Counter";
import Image from "next/image";

const fetchTodos = async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5",
  );

  const data = await res.json();
  return data;
};

const aboutpage = async () => {

  //await new Promise((resolve) => setTimeout(resolve, 1000));
  //js
  const data = await fetchTodos();
  console.log(data);
  return (
    <div>

      <p>this is the about page.</p>


      <Counter />


      <ul>
        {data.map((item: { id: number; title: string }) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>


      <Image
        src="https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"
        alt="หมา"
        width={350}
        height={250}
      />

    </div>
  );
};
export default aboutpage;