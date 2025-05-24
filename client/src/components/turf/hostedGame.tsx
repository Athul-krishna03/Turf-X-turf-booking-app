import { SharedBooking } from "../../types/Type";


export default function HostedGameCard({ game }: { game: SharedBooking }) {
  return (
    <div className="p-4 border rounded bg-white shadow">
      <h3 className="font-semibold">Host: {game.hostName}</h3>
      <p>{game.date} | {game.startTime} - {game.endTime}</p>
      <p>Turf: {game.turfName}</p>
      <p>Players Joined: {game.participants.length}/{game.maxPlayers}</p>
    </div>
  );
}
