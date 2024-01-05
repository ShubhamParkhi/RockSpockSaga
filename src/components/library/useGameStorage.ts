interface Game {
  contractAddress: string;
  move: number;
  salt: number;
}

export const saveGame = (game: Game) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('game', JSON.stringify(game));
  }
}

export const loadGame = (): Game | null => {
  if (typeof window !== 'undefined') {
    const game = localStorage.getItem('game');
    if (game) {
      return JSON.parse(game);
    }
  }
  return null;
}
