import Link from "next/link"

const infopage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <div>infoage</div>
  );
};

export default infopage;