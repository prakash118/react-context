import { User } from '@/types/user';

const users: User[] = [
  { id: 1, fullname: 'Bren Sollner' },
  { id: 2, fullname: 'Gillie Geikie' },
  { id: 3, fullname: 'Frankie Buncher' },
  { id: 4, fullname: 'Raymond Kleynermans' },
  { id: 5, fullname: 'Hertha Collumbell' },
  { id: 6, fullname: 'Davide Obington' },
  { id: 7, fullname: 'Giffy Avramovic' },
  { id: 8, fullname: 'Lyman Duchenne' },
  { id: 9, fullname: 'Milli Klink' },
  { id: 10, fullname: 'Margalit Battey' },
];

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export async function GET() {
  await sleep(1000);

  return new Response(JSON.stringify(users, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
