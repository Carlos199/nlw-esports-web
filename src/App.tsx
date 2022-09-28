import "./styles/main.css";

import logoImg from "./assets/logo-nwl-esports.svg";
import { GameBanner } from "./components/GameBnner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { useEffect, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { CreateAdModal } from "./components/Form/CreateAdModal";
import { api } from "./lib/api";
import axios from "axios";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    console.log(api, "apii");
    api(`/games`).then((response) => {
      // console.log(response.data);
      setGames(response.data);
    });
    // .catch((error) => console.log(error, "error"));
  }, []);

  return (
    <div className=' max-w-7xl mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt='' />
      <h1 className='text-6xl text-white font-black mt-20'>
        Su{" "}
        <span className='text-transparent bg-nwl-gradient bg-clip-text'>
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
