"use client";

import GameCardGrid from "./GameCardGrid";

export default function GameGrid({ games, isOutOfStock }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 md:gap-4">
      {games.map((game, i) => (
        <GameCardGrid
          key={i}
          index={i}
          game={game}
          isOutOfStock={isOutOfStock}
        />
      ))}
    </div>
  );
}
