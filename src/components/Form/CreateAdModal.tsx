import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import axios from "axios";

import { Check, GameController } from "phosphor-react";
import { Input } from "./Input";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../lib/api";

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  console.log(weekDays);

  useEffect(() => {
    api("/games").then((response) => setGames(response.data));
  }, []);

  async function handleCreatedAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(formData);
    try {
      await api.post(`/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });
      alert("Anuncio creado correctamente!");
    } catch (error) {
      alert("Error al crear Anuncio");
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
      <Dialog.Content className='fixed bg-[#2A2634] py-8 px-7 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[490px] shadow-lg shadow-black/25'>
        <Dialog.Title className='text-3xl font-black'>
          Publique un anuncio
        </Dialog.Title>

        <form onSubmit={handleCreatedAd} className='mt-8 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='game' className='font-semibold'>
              Cual es el juego?
            </label>
            <select
              name='game'
              id='game'
              className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none'
              defaultValue=''>
              <option disabled value=''>
                Seleccione el juego que desea jugar
              </option>
              {games.map((game) => {
                return (
                  <option key={game.id} value={game.id}>
                    {game.title}
                  </option>
                );
              })}
            </select>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='name'>Su nombre (o nickname)</label>
            <Input
              name='name'
              id='name'
              placeholder='Como te llamas dentro del juego?'
            />
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='yearsPlaying'>Juega a cuantos años?</label>
              <Input
                name='yearsPlaying'
                id='yearsPlaying'
                type='number'
                placeholder='Tudo bem ser ZERO'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='discord'>Cual es su Discord?</label>
              <Input
                name='discord'
                id='discord'
                type='text'
                placeholder='Usuario#0000'
              />
            </div>
          </div>

          <div className='flex gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='weekDays'>Cuando acostubras jugar?</label>
              <div>
                <ToggleGroup.Root
                  type='multiple'
                  className='grid grid-cols-4 gap-2'
                  value={weekDays}
                  onValueChange={setWeekDays}>
                  <ToggleGroup.Item
                    value='0'
                    title='Domingo'
                    className={`w-8 h-8 rounded  ${
                      weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                    }`}>
                    D
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value='1'
                    title='Domingo'
                    className={`w-8 h-8 rounded  ${
                      weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                    }`}>
                    L
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value='2'
                    title='Domingo'
                    className={`w-8 h-8 rounded  ${
                      weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                    }`}>
                    M
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value='3'
                    title='Domingo'
                    className={`w-8 h-8 rounded  ${
                      weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                    }`}>
                    M
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value='4'
                    title='Domingo'
                    className={`w-8 h-8 rounded  ${
                      weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                    }`}>
                    J
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value='5'
                    title='Domingo'
                    className={`w-8 h-8 rounded  ${
                      weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                    }`}>
                    V
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value='6'
                    title='Domingo'
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900 "
                    }`}>
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
            </div>
            <div className='flex flex-col items-center gap-2 flex-1'>
              <label htmlFor='hourStart'>Cual horario del dia</label>
              <div className='grid grid-cols-2 gap-2'>
                <Input
                  name='hourStart'
                  id='hourStart'
                  type='time'
                  placeholder='De'
                />
                <Input
                  name='hourEnd'
                  id='hourEnd'
                  type='time'
                  placeholder='Até'
                />
              </div>
            </div>
          </div>

          <div className='mt-2 flex gap-2 text-sm'>
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true);
                } else {
                  setUseVoiceChannel(false);
                }
              }}
              className='w-6 h-6 p-1 rounded bg-zinc-900'>
              <Checkbox.Indicator>
                <Check className='w-4 h-4 text-emerald-400' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </div>

          <footer className='mt-4 flex justify-end gap-4'>
            <Dialog.Close
              type='button'
              className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
              Cancelar
            </Dialog.Close>
            <button
              className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
              type='submit'>
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
