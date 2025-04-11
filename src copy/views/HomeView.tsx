import { Header } from "../components/Header";
import { SearchForm } from "../components/SearchForm";

export const HomeView = () => {
  return (
    <>
      <Header />
      <main className="bg-gray-100 py-10 min-h-screen lg:bg-[url('../public/bg.svg')] bg-no-repeat bg-right-top  lg:bg-[length:50%]">
        <div className="max-w-5xl mx-auto mt-10">
          <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
            <h1 className="text-6xl font-black">
              All your <span className="text-cyan-500"> social networks</span>{" "}
              in one link
            </h1>
            <p className="text-slate-800 text-xl">
              Join over 200,000 developers by sharing their social media
              accounts, sharing your TikTok, Facebook, Instagram, YouTube,
              GitHub, and more...
            </p>

            <SearchForm />
          </div>
        </div>
      </main>
    </>
  );
};
