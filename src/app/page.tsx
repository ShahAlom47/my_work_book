import Banner from "./Component/Banner";


export default function Home() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="max-w p-8">
        <h1 className="text-4xl font-bold mb-4 text-center">Welcome to MyWorkBook!</h1>
        <Banner></Banner>
      
      </div>
    </div>
  );
}
